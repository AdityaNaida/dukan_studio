import { supabase } from "./supabase";
import type { HistoryType } from "@/routes/chat/ChatPage";
import type { UserChatType } from "@/components/chat/ChatSidebar";

/**
 * Supabase-backed replacements for the old Express/Mongo chat endpoints
 * (/api/chat/*, /api/user/chats) and the ImageKit upload. Shapes mirror the
 * old responses so the components keep working: chats expose `_id`, history
 * items keep { role, parts: [{ text }], img }.
 */

export type ChatDataType = {
  _id: string;
  userId: string;
  history: HistoryType[];
  createdAt: Date;
  updatedAt: Date;
};

// was POST /api/user/chats
export async function getUserChats(userId: string): Promise<UserChatType[]> {
  const { data, error } = await supabase
    .from("chats")
    .select("id, title, created_at")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data.map((row) => ({
    _id: row.id,
    title: row.title,
    createdAt: new Date(row.created_at),
  }));
}

// was POST /api/chat/create — returns the new chat id
export async function createNewChat(
  userId: string,
  text: string,
  img?: string
): Promise<string> {
  const { data, error } = await supabase
    .from("chats")
    .insert({
      user_id: userId,
      title: text.substring(0, 40),
      history: [{ role: "user", parts: [{ text }], ...(img && { img }) }],
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);
  return data.id;
}

// was GET /api/chat/get/:id
export async function getChat(chatId: string): Promise<ChatDataType> {
  const { data, error } = await supabase
    .from("chats")
    .select("*")
    .eq("id", chatId)
    .single();

  if (error) throw new Error(error.message);

  return {
    _id: data.id,
    userId: data.user_id,
    history: data.history as HistoryType[],
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
  };
}

// was PUT /api/chat/update/:id — append question/answer to history
export async function updateChat(
  chatId: string,
  payload: { question?: string; answer: string; img?: string }
) {
  const { question, answer, img } = payload;

  const newItems = [
    ...(question
      ? [{ role: "user", parts: [{ text: question }], ...(img && { img }) }]
      : []),
    { role: "model", parts: [{ text: answer }] },
  ];

  const { data, error } = await supabase
    .from("chats")
    .select("history")
    .eq("id", chatId)
    .single();

  if (error) throw new Error(error.message);

  const { error: updateError } = await supabase
    .from("chats")
    .update({ history: [...(data.history as HistoryType[]), ...newItems] })
    .eq("id", chatId);

  if (updateError) throw new Error(updateError.message);
  return { success: true };
}

// was DELETE /api/chat/delete/:id
export async function deleteChat(chatId: string) {
  const { error } = await supabase.from("chats").delete().eq("id", chatId);
  if (error) throw new Error(error.message);
  return { success: true };
}

// ImageKit replacement — upload to the public `chat-images` bucket and
// return the public URL (stored in history as `img`).
export async function uploadChatImage(file: File): Promise<string> {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error("Not signed in");

  const ext = file.name.split(".").pop() || "png";
  const path = `${userData.user.id}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from("chat-images")
    .upload(path, file, { contentType: file.type });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from("chat-images").getPublicUrl(path);
  return data.publicUrl;
}
