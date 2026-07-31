/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import UploadImage from "../upload/UploadImage";
import Markdown from "react-markdown";
import model from "@/lib/gemini";
import { updateChat } from "@/lib/api";
import "./NewPrompt.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { HistoryType } from "@/routes/chat/ChatPage";

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

export default function NewPrompt({ data }: Props) {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [image, setImage] = useState<any>({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });

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
      const initialPrompt = data.history[0].parts[0].text;
      add(initialPrompt, true);
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
            setImage({
              isLoading: false,
              error: "",
              dbData: {},
              aiData: {},
            });
            setIsGenerating(false);
          }, 500);
        });
    },
    onError: (error) => {
      console.log(error);
      setIsGenerating(false);
    },
  });

  const add = async (userInput: string, isInitial: boolean = false) => {
    try {
      setIsGenerating(true);

      if (!isInitial) {
        setQuestion(userInput);
      }

      // Reset answer to show thinking animation
      setAnswer("");

      const result = await chat.sendMessageStream(
        Object.entries(image.aiData).length
          ? [image.aiData, userInput]
          : userInput
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
        img: image.dbData?.filePath || undefined,
      });
    } catch (error) {
      console.log(error);
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!userInput || isGenerating) return;
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
      {image.isLoading && uploadProgress && (
        <div className="h-40 w-60 rounded-xl border border-ink/10 bg-paper-deep/60 flex items-center justify-center gap-2 place-self-end-safe">
          <p className="text-sm text-ink-soft">
            File Uploading...{uploadProgress}%
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            className="animate-spin text-ink-soft"
          >
            <path
              fill="currentColor"
              d="M12 2.25c-5.384 0-9.75 4.366-9.75 9.75s4.366 9.75 9.75 9.75v-2.437A7.312 7.312 0 1 1 19.313 12h2.437c0-5.384-4.366-9.75-9.75-9.75"
            ></path>
          </svg>
        </div>
      )}

      {image.dbData?.filePath && (
        <div className="place-self-end-safe max-w-60 md:max-w-96">
          <img
            src={image.dbData?.filePath}
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

      <div ref={endChatRef} className="mt-20 md:mt-10" />

      <form
        onSubmit={handleSubmit}
        className="w-[calc(100%-24px)] md:w-full md:max-w-2xl absolute bottom-4 md:bottom-2 z-20 left-1/2 p-4 flex items-center justify-between gap-2 rounded-xl border border-ink/15 bg-paper-raised shadow-[0_14px_36px_rgba(34,29,24,0.14)]"
        style={{ transform: `translate(-50%,0%)` }}
      >
        <input
          type="text"
          placeholder={isGenerating ? "Please wait..." : "Ask about your poster..."}
          className="text-sm flex-1 min-w-0 bg-transparent outline-none placeholder:text-ink-soft/60"
          required
          name="text"
          value={userInput}
          onChange={(e) => {
            setUserInput(e.target.value);
          }}
          disabled={isGenerating}
        />

        <div className="flex items-center gap-2">
          <UploadImage
            setImage={setImage}
            setUploadProgress={setUploadProgress}
          />
          <button
            type="submit"
            disabled={isGenerating}
            className={
              isGenerating ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-8 text-vermilion transition-transform hover:scale-105"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </form>
    </>
  );
}
