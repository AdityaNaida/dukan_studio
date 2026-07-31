"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signup, type AuthState } from "@/app/auth/actions";

const inputClass =
  "w-full rounded-lg border border-ink/20 bg-paper-raised px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink-soft/50 focus:border-vermilion";
const labelClass =
  "mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft";

export default function SignupPage() {
  const [state, action, pending] = useActionState<AuthState, FormData>(
    signup,
    {},
  );

  return (
    <div className="flex flex-1 items-center justify-center bg-paper px-5 py-16 text-ink">
      <div className="w-full max-w-md">
        <Link href="/" className="font-display text-xl leading-none">
          dukaan<span className="text-vermilion">.</span>studio
        </Link>

        <h1 className="mt-8 font-display text-3xl leading-tight">
          Open your studio.
        </h1>
        <p className="mt-3 leading-relaxed text-ink-soft">
          Name, email, password — that&#8217;s it. No OTP, no verification
          hoops.
        </p>

        <form
          action={action}
          className="mt-8 rounded-xl border border-ink/12 bg-paper-raised p-6 shadow-[0_12px_32px_rgba(34,29,24,0.10)]"
        >
          {state.error && (
            <p
              role="alert"
              className="mb-5 rounded-lg border border-vermilion/30 bg-vermilion/10 px-4 py-3 text-sm leading-relaxed text-vermilion"
            >
              {state.error}
            </p>
          )}
          {state.notice && (
            <p
              role="status"
              className="mb-5 rounded-lg border border-leaf/30 bg-leaf/10 px-4 py-3 text-sm leading-relaxed text-leaf"
            >
              {state.notice}
            </p>
          )}

          <div className="mb-5">
            <label htmlFor="name" className={labelClass}>
              Your name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Sharma Ji"
              required
              className={inputClass}
            />
            {state.fieldErrors?.name && (
              <p className="mt-2 text-sm text-vermilion">
                {state.fieldErrors.name}
              </p>
            )}
          </div>

          <div className="mb-5">
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@shop.in"
              required
              className={inputClass}
            />
            {state.fieldErrors?.email && (
              <p className="mt-2 text-sm text-vermilion">
                {state.fieldErrors.email}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className={labelClass}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="At least 6 characters"
              required
              minLength={6}
              className={inputClass}
            />
            {state.fieldErrors?.password && (
              <p className="mt-2 text-sm text-vermilion">
                {state.fieldErrors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-vermilion px-6 py-3 text-sm font-semibold text-paper-raised shadow-[0_10px_24px_rgba(197,48,12,0.35)] transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-60"
          >
            {pending ? "Creating your account…" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-sm text-ink-soft">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-ink underline decoration-marigold decoration-2 underline-offset-4"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
