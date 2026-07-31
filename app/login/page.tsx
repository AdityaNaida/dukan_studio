"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login, type AuthState } from "@/app/auth/actions";

const inputClass =
  "w-full rounded-lg border border-ink/20 bg-paper-raised px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink-soft/50 focus:border-vermilion";
const labelClass =
  "mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft";

export default function LoginPage() {
  const [state, action, pending] = useActionState<AuthState, FormData>(
    login,
    {},
  );

  return (
    <div className="flex flex-1 items-center justify-center bg-paper px-5 py-16 text-ink">
      <div className="w-full max-w-md">
        <Link href="/" className="font-display text-xl leading-none">
          dukaan<span className="text-vermilion">.</span>studio
        </Link>

        <h1 className="mt-8 font-display text-3xl leading-tight">
          Welcome back.
        </h1>
        <p className="mt-3 leading-relaxed text-ink-soft">
          Sign in with your email and password.
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
          </div>

          <div className="mb-6">
            <label htmlFor="password" className={labelClass}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Your password"
              required
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-vermilion px-6 py-3 text-sm font-semibold text-paper-raised shadow-[0_10px_24px_rgba(197,48,12,0.35)] transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-60"
          >
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-sm text-ink-soft">
          New here?{" "}
          <Link
            href="/signup"
            className="font-semibold text-ink underline decoration-marigold decoration-2 underline-offset-4"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
