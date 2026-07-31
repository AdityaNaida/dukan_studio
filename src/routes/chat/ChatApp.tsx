/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import type { Sessiontype, UserData } from "@/components/common/Navbar";
import { getSessionFromLocalStorage } from "@/lib/globalMethod";
import { createNewChat } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Composer, { EMPTY_IMAGE } from "@/components/chat/Composer";

const SUGGESTIONS = [
  {
    title: "Review my poster",
    hint: "before the sale goes live",
    hiddenOnMobile: false,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
      />
    ),
  },
  {
    title: "Score my design",
    hint: "will it stop the scroll?",
    hiddenOnMobile: false,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
      />
    ),
  },
  {
    title: "Write a better caption",
    hint: "with hashtags that convert",
    hiddenOnMobile: true,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"
      />
    ),
  },
];

export default function ChatApp() {
  const [userInput, setUserInput] = useState<string>("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [image, setImage] = useState<any>({ ...EMPTY_IMAGE });
  const session = localStorage.getItem("UserSession");

  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: ({ text, img }: { text: string; img?: string }) => {
      if (!userData?._id) throw new Error("Not signed in");
      return createNewChat(userData._id, text, img);
    },
    onSuccess: (id) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["users", userData?._id] });
      navigate(`/c/${id}`);
    },
  });

  useEffect(() => {
    async function fetchSession() {
      const session = (await getSessionFromLocalStorage()) as Sessiontype;

      if (session && session.user) {
        setUserData({
          _id: session.user._id,
          name: session.user.name,
          email: session.user.email,
        } as UserData);
      } else {
        console.log("No valid session found.");
      }
    }

    fetchSession();
  }, [session]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!userInput || image.isLoading || mutation.isPending) return;
      mutation.mutate({
        text: userInput,
        img: image.dbData?.filePath || undefined,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full relative md:px-10">
      <div className="h-[calc(100dvh-100px)] gap-3 mx-auto max-w-2xl flex items-center justify-center flex-col md:h-[calc(100dvh-120px)] overflow-y-auto scroll-smooth transition-all ease duration-100 px-1">
        {userData && (
          <p className="font-display text-2xl md:text-3xl text-center">
            Welcome, {userData.name.split(" ").shift()}
            <span className="text-vermilion">.</span>
          </p>
        )}
        <p className="text-sm text-ink-soft">
          Attach a poster and tell me what you want to know.
        </p>

        <div className="grid w-full grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mt-6">
          {SUGGESTIONS.map((card) => (
            <div
              key={card.title}
              className={`space-y-1.5 rounded-xl border border-ink/15 bg-paper-raised p-4 shadow-[0_8px_20px_rgba(34,29,24,0.08)] ${
                card.hiddenOnMobile ? "hidden md:block" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-vermilion"
              >
                {card.icon}
              </svg>

              <p className="text-sm font-medium">{card.title}</p>
              <p className="text-xs text-ink-soft">{card.hint}</p>
            </div>
          ))}
        </div>
      </div>

      <Composer
        value={userInput}
        onChange={setUserInput}
        onSubmit={handleSubmit}
        image={image}
        setImage={setImage}
        placeholder="Ask about your poster..."
        disabled={mutation.isPending}
      />
    </div>
  );
}
