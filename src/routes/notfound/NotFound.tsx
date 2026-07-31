import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="dukaan bg-paper text-ink min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)] flex items-center justify-center px-5 py-16">
      <div className="max-w-md text-center">
        <span className="stamp-in inline-block rounded border-2 border-vermilion px-3 py-1 font-mono text-sm font-bold uppercase tracking-[0.25em] text-vermilion">
          Reshoot
        </span>
        <h1 className="font-display mt-6 text-6xl md:text-7xl">404</h1>
        <p className="font-display mt-3 text-xl md:text-2xl">
          This page failed the review.
        </p>
        <p className="mt-4 leading-relaxed text-ink-soft">
          Focus: missing. Framing: nowhere to be found. The address you
          followed doesn&apos;t exist — let&apos;s take you back to a page
          that scores well.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <NavLink
            to="/"
            className="rounded-full bg-vermilion px-6 py-3 text-sm font-semibold text-paper-raised shadow-[0_10px_24px_rgba(197,48,12,0.3)] transition-transform hover:-translate-y-0.5"
          >
            Back to home
          </NavLink>
          <NavLink
            to="/app"
            className="rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold transition-colors hover:border-ink/50"
          >
            Review a poster
          </NavLink>
        </div>
      </div>
    </div>
  );
}
