import NewPrompt from "@/components/chat/NewPrompt";
import MarkdownRenderer from "@/components/common/MarkdownRender";
import { getChat } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation } from "react-router-dom";

//type
export type HistoryType = {
  role: "user" | "model";
  parts: [{ text: string }];
  img: string | null;
};

export default function ChatPage() {
  const userSession = localStorage.getItem("UserSession");
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();
  const { isPending, error, data } = useQuery({
    queryKey: ["chats", chatId],
    queryFn: () => getChat(chatId as string),
    enabled: !!chatId,
  });

  if (!userSession) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="h-full relative md:px-10">
      <div className="h-[calc(100vh-100px)] gap-4 mx-auto max-w-2xl flex flex-col md:h-[calc(100vh-120px)] overflow-y-auto overflow-x-hidden scroll-smooth transition-all ease duration-100">
        {isPending ? (
          <div className="flex flex-1 items-center justify-center">
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
        ) : error ? (
          <div className="mx-auto mt-10 max-w-sm rounded-xl border border-vermilion/30 bg-vermilion/5 p-4 text-center text-sm text-ink-soft">
            This chat didn&apos;t load. Check your connection and refresh the
            page.
          </div>
        ) : (
          data?.history.map((e: HistoryType, i: number) => (
            <div key={i} className="w-full min-w-0">
              {e.img && (
                <div className="place-self-end-safe max-w-60 md:max-w-96 mb-3">
                  <img
                    src={e.img}
                    alt="uploaded poster"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto"
                    style={{ borderRadius: `10px` }}
                  />
                </div>
              )}
              <div
                className={`text-sm  min-w-0 ${
                  e.role === "user"
                    ? "place-self-end-safe w-fit max-w-2/3 bg-paper-deep/70 border border-ink/10 px-3 py-3"
                    : "w-fit max-w-full"
                }`}
                style={{ borderRadius: `10px` }}
              >
                <div className="w-full min-w-0 overflow-hidden">
                  <MarkdownRenderer content={e.parts[0].text} />
                </div>
              </div>
            </div>
          ))
        )}
        {data && <NewPrompt data={data} />}
      </div>
    </div>
  );
}
