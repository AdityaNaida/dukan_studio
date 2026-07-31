import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/auth/actions";

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const name = (user.user_metadata.full_name as string) ?? "there";
  const joined = new Date(user.created_at).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-1 items-center justify-center bg-paper px-5 py-16 text-ink">
      <div className="w-full max-w-md">
        <Link href="/" className="font-display text-xl leading-none">
          dukaan<span className="text-vermilion">.</span>studio
        </Link>

        <h1 className="mt-8 font-display text-3xl leading-tight">
          Namaste, {name}.
        </h1>
        <p className="mt-3 leading-relaxed text-ink-soft">
          Your studio is open. Signed in — no OTP needed.
        </p>

        <div className="mt-8 rounded-xl border border-ink/12 bg-paper-raised p-6 shadow-[0_12px_32px_rgba(34,29,24,0.10)]">
          <dl className="space-y-4">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
                Name
              </dt>
              <dd className="mt-1 font-semibold">{name}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
                Email
              </dt>
              <dd className="mt-1 font-semibold">{user.email}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
                Member since
              </dt>
              <dd className="mt-1 font-semibold">{joined}</dd>
            </div>
          </dl>

          <form action={logout} className="mt-6">
            <button
              type="submit"
              className="w-full rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold transition-colors hover:border-vermilion hover:text-vermilion"
            >
              Sign out
            </button>
          </form>
        </div>

        <p className="mt-6 text-sm text-ink-soft">
          <Link
            href="/"
            className="font-semibold text-ink underline decoration-marigold decoration-2 underline-offset-4"
          >
            ← Back to the studio
          </Link>
        </p>
      </div>
    </div>
  );
}
