import { decodeJwt } from "jose";
import { supabase } from "@/lib/supabase";

export async function getSessionFromLocalStorage() {
  // supabase-js owns the real session (and refreshes it automatically);
  // the "UserSession" key is kept in sync as the flag the route guards check.
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session || !session.user) {
    localStorage.removeItem("UserSession");
    return null;
  }

  localStorage.setItem("UserSession", session.access_token);

  const { iat, exp } = decodeJwt(session.access_token);
  const meta = (session.user.user_metadata ?? {}) as { full_name?: string };

  return {
    exp,
    iat,
    expires: new Date((exp ?? 0) * 1000),
    user: {
      _id: session.user.id,
      email: session.user.email ?? "",
      name: meta.full_name ?? "",
    },
  };
}
