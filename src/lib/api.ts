import { supabase } from "./supabase";
import type { HistoryType } from "@/routes/chat/ChatPage";
import type { UserData } from "@/components/common/Navbar";
import type { UserChatType } from "@/components/chat/ChatSidebar";

/**
 * Supabase-backed replacements for the old Express/Mongo endpoints
 * (/api/user/*, /api/chat/*). Shapes mirror the old responses so the
 * components keep working: chats expose `_id`, history items keep
 * { role, parts: [{ text }], img }.
 */

export type ChatDataType = {
  _id: string;
  userId: string;
  history: HistoryType[];
  createdAt: Date;
  updatedAt: Date;
};

type AuthResult = {
  success: boolean;
  message: string;
  token?: string;
};

// POST /api/user/register
export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<AuthResult> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });

  if (error) return { success: false, message: error.message };

  // If email confirmation is enabled there is no session yet
  if (!data.session) {
    return {
      success: false,
      message: "Check your email to confirm your account, then login",
    };
  }

  return {
    success: true,
    message: "User Registered Successfully",
    token: data.session.access_token,
  };
}

// POST /api/user/login
export async function loginUser(
  email: string,
  password: string
): Promise<AuthResult> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { success: false, message: error.message };

  return {
    success: true,
    message: "User Logged in Successfully",
    token: data.session.access_token,
  };
}

export async function logoutUser() {
  localStorage.removeItem("UserSession");
  await supabase.auth.signOut();
}

// POST /api/user/get — user data now comes straight from the auth session
export async function getUser(): Promise<UserData | null> {
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user) return null;

  return {
    _id: user.id,
    name: (user.user_metadata?.name as string) || user.email || "User",
    email: user.email ?? "",
    password: "",
    lastLogin: new Date(user.last_sign_in_at ?? user.created_at),
    createdAt: new Date(user.created_at),
    updatedAt: new Date(user.updated_at ?? user.created_at),
    chats: [],
  };
}

// POST /api/user/chats
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

// POST /api/chat/create — returns the new chat id
export async function createNewChat(
  userId: string,
  text: string
): Promise<string> {
  const { data, error } = await supabase
    .from("chats")
    .insert({
      user_id: userId,
      title: text.substring(0, 40),
      history: [{ role: "user", parts: [{ text }] }],
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);
  return data.id;
}

// GET /api/chat/get/:id
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

// PUT /api/chat/update/:id — append question/answer to history
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

// DELETE /api/chat/delete/:id
export async function deleteChat(chatId: string) {
  const { error } = await supabase.from("chats").delete().eq("id", chatId);
  if (error) throw new Error(error.message);
  return { success: true };
}

// ImageKit replacement — upload to the public `chat-images` bucket,
// return the public URL (stored in history as `img`).
export async function uploadChatImage(
  file: File,
  userId: string
): Promise<string> {
  const ext = file.name.split(".").pop() || "png";
  const path = `${userId}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from("chat-images")
    .upload(path, file, { contentType: file.type });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from("chat-images").getPublicUrl(path);
  return data.publicUrl;
}
