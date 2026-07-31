/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import model from "@/lib/gemini";
import { updateChat } from "@/lib/api";
import "./NewPrompt.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { HistoryType } from "@/routes/chat/ChatPage";
import Composer, { EMPTY_IMAGE } from "@/components/chat/Composer";

//type
type ChatDataType = {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  history: HistoryType[];
};

type Props = {
  data: ChatDataType;
};

type MutationPayload = {
  question?: string;
  answer: string;
  img?: string;
};

// Rebuild Gemini inlineData from a stored public image URL, so the first
// reply of a chat created with an attachment can still see the poster.
async function urlToInlinePart(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Could not fetch image");
  const blob = await res.blob();
  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result.split(",")[1]);
      } else {
        reject(new Error("Could not read image"));
      }
    };
    reader.onerror = () => reject(new Error("Could not read image"));
    reader.readAsDataURL(blob);
  });
  return {
    inlineData: { data: base64, mimeType: blob.type || "image/jpeg" },
  };
}

export default function NewPrompt({ data }: Props) {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [image, setImage] = useState<any>({ ...EMPTY_IMAGE });

  const chat = model.startChat({
    history: [
      ...data.history.map((e) => ({
        role: e.role,
        parts: [{ text: e.parts[0].text }],
      })),
    ],
    generationConfig: {},
  });

  const endChatRef = useRef<HTMLDivElement | null>(null);

  // Check if we need to process initial prompt
  useEffect(() => {
    const needsInitialResponse =
      data.history.length === 1 &&
      data.history[0].role === "user" &&
      !isGenerating;

    if (needsInitialResponse) {
      const first = data.history[0];
      const initialPrompt = first.parts[0].text;

      if (first.img) {
        urlToInlinePart(first.img)
          .then((part) => add(initialPrompt, true, part))
          .catch(() => add(initialPrompt, true));
      } else {
        add(initialPrompt, true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.history]);

  useEffect(() => {
    if (endChatRef.current) {
      endChatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [question, answer, image.dbData, data, isGenerating]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: MutationPayload) => updateChat(data._id, payload),
    onSuccess: (value) => {
      console.log(value);
      queryClient
        .invalidateQueries({ queryKey: ["chats", data._id] })
        .then(() => {
          setTimeout(() => {
            setQuestion("");
            setAnswer("");
            setImage({ ...EMPTY_IMAGE });
            setIsGenerating(false);
          }, 500);
        });
    },
    onError: (error) => {
      console.log(error);
      setIsGenerating(false);
    },
  });

  const add = async (
    userInput: string,
    isInitial: boolean = false,
    inlinePart?: any
  ) => {
    try {
      setIsGenerating(true);

      if (!isInitial) {
        setQuestion(userInput);
      }

      // Reset answer to show thinking animation
      setAnswer("");

      const imagePart =
        inlinePart ??
        (Object.entries(image.aiData).length ? image.aiData : null);

      const result = await chat.sendMessageStream(
        imagePart ? [imagePart, userInput] : userInput
      );

      let accumulatedText = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        accumulatedText += chunkText;
        setAnswer(accumulatedText);
      }

      mutation.mutate({
        question: !isInitial && userInput.length ? userInput : undefined,
        answer: accumulatedText,
        img: !isInitial ? image.dbData?.filePath || undefined : undefined,
      });
    } catch (error) {
      console.log(error);
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!userInput || isGenerating || image.isLoading) return;
      await add(userInput);
      setUserInput("");
    } catch (error) {
      console.log(error);
    }
  };

  // Thinking animation component
  const ThinkingAnimation = () => (
    <div className="flex items-center gap-2 text-ink-soft py-2">
      <span className="text-xs">Reviewing</span>
      <div className="flex gap-1">
        <div
          className="w-1 h-1 bg-vermilion rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        ></div>
        <div
          className="w-1 h-1 bg-marigold rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        ></div>
        <div
          className="w-1 h-1 bg-leaf rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        ></div>
      </div>
    </div>
  );

  return (
    <>
      {/* Optimistic view of the message just sent, until the refetch lands */}
      {question && image.dbData?.filePath && (
        <div className="place-self-end-safe max-w-60 md:max-w-96">
          <img
            src={image.dbData.filePath}
            alt="uploaded poster"
            className="w-full h-auto"
            style={{ borderRadius: `10px` }}
          />
        </div>
      )}

      {question && (
        <div
          className="place-self-end-safe bg-paper-deep/70 border border-ink/10 text-right px-3 py-3 text-sm"
          style={{ borderRadius: `10px` }}
        >
          {question}
        </div>
      )}

      {/* Show thinking animation when generating and no answer yet */}
      {isGenerating && !answer && (
        <div className="text-sm">
          <ThinkingAnimation />
        </div>
      )}

      {/* Show answer when available */}
      {answer && (
        <div className="text-sm">
          <Markdown>{answer}</Markdown>
        </div>
      )}

      <div ref={endChatRef} className="mt-36 md:mt-28" />

      <Composer
        value={userInput}
        onChange={setUserInput}
        onSubmit={handleSubmit}
        image={image}
        setImage={setImage}
        placeholder="Ask about your poster..."
        disabled={isGenerating}
      />
    </>
  );
}
