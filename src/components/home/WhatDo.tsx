import { NavLink } from "react-router-dom";
import {
  SAMPLE_REVIEW,
  VERDICT_META,
  type CheckStatus,
} from "@/lib/review";

const STATUS_STYLE: Record<
  CheckStatus,
  { mark: string; chip: string; text: string }
> = {
  pass: { mark: "✓", chip: "border-leaf/40 bg-leaf/10", text: "text-leaf" },
  warn: {
    mark: "!",
    chip: "border-amber-600/40 bg-marigold/15",
    text: "text-amber-700",
  },
  fail: {
    mark: "✗",
    chip: "border-vermilion/40 bg-vermilion/10",
    text: "text-vermilion",
  },
};

const TONE_STYLE: Record<
  "leaf" | "marigold" | "vermilion",
  { text: string; bar: string; border: string }
> = {
  leaf: { text: "text-leaf", bar: "bg-leaf", border: "border-leaf" },
  marigold: {
    text: "text-amber-700",
    bar: "bg-marigold",
    border: "border-amber-600",
  },
  vermilion: {
    text: "text-vermilion",
    bar: "bg-vermilion",
    border: "border-vermilion",
  },
};

const AXES = [
  {
    number: "Question 1",
    title: "Is the product perfectly captured?",
    intro:
      "The craft half of the score. If the product isn't clearly seen, nothing else matters.",
    items: [
      { name: "Focus", note: "sharp where it matters" },
      { name: "Lighting", note: "no shadow eating the label" },
      { name: "Framing", note: "centred, with room to breathe" },
      { name: "Background", note: "nothing stealing the eye" },
      { name: "Fully visible", note: "no crop, no blockage" },
    ],
  },
  {
    number: "Question 2",
    title: "Will it earn engagement?",
    intro:
      "The commerce half. The reviewer reads your poster the way a scroller does — in half a second, at arm's length, price first.",
    items: [
      { name: "Thumb-stop", note: "something arrests the scroll" },
      { name: "Legibility", note: "text readable at phone size" },
      { name: "Price", note: "visible before the caption" },
      { name: "Urgency", note: "a reason to act now — festival, offer" },
    ],
  },
];

const STEPS = [
  {
    number: "01",
    title: "Upload the poster",
    body: "The Instagram post, the WhatsApp status, the festival offer card — straight off your phone, exactly as you made it.",
  },
  {
    number: "02",
    title: "Read the verdict",
    body: "Post it, fix first, or reshoot — an honest verdict, not just praise, with an engagement score out of 100 and every check explained.",
  },
  {
    number: "03",
    title: "Fix, re-check, post",
    body: "Apply the top fix, run it again, watch the pulse climb. Post the moment it says post it.",
  },
];

export default function WhatDo() {
  const review = SAMPLE_REVIEW;
  const meta = VERDICT_META[review.verdict];
  const tone = TONE_STYLE[meta.tone];

  return (
    <div>
      {/* The report card */}
      <section id="report" className="border-y border-ink/10 bg-paper-deep/50">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-20 md:grid-cols-[1.02fr_0.98fr] md:items-start md:px-8 md:py-28">
          {/* Marksheet */}
          <article className="rounded-xl border border-ink/12 bg-paper-raised p-6 shadow-[0_20px_48px_rgba(34,29,24,0.14)] sm:p-7">
            <div className="flex items-baseline justify-between gap-3 border-b border-dashed border-ink/20 pb-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-soft">
                Poster report
              </p>
              <p className="font-mono text-[10px] tracking-wider text-ink-soft">
                {review.product_guess}
              </p>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span
                className={`rounded border-2 px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.2em] ${tone.text} ${tone.border}`}
              >
                {meta.label}
              </span>
              <p className="min-w-0 flex-1 text-sm leading-snug text-ink-soft">
                {review.verdict_line}
              </p>
            </div>

            <div className="mt-6">
              <div className="flex items-baseline justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                  Engagement score
                </p>
                <p className="font-display text-3xl">
                  {review.engagement_score}
                  <span className="text-base text-ink-soft">/100</span>
                </p>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/10">
                <div
                  className={`h-full rounded-full ${tone.bar}`}
                  style={{ width: `${review.engagement_score}%` }}
                />
              </div>
            </div>

            <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
              <span className="text-ink">Capture</span> — is the product
              perfectly shot?
            </p>
            <ul className="mt-3 space-y-2.5">
              {review.capture.map((item) => {
                const style = STATUS_STYLE[item.status];
                return (
                  <li key={item.check} className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border font-mono text-[10px] font-bold ${style.chip} ${style.text}`}
                      aria-label={item.status}
                    >
                      {style.mark}
                    </span>
                    <p className="text-sm leading-snug">
                      <span className="font-medium">{item.check}.</span>{" "}
                      <span className="text-ink-soft">{item.note}</span>
                    </p>
                  </li>
                );
              })}
            </ul>

            <p className="mt-6 border-t border-dashed border-ink/20 pt-4 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-soft">
              Sample report · this is the real output format
            </p>
          </article>

          {/* Ranked fixes + trilingual verdict */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-vermilion">
              The report card
            </p>
            <h2 className="font-display mt-4 text-[clamp(1.8rem,5vw,2.8rem)] leading-tight">
              Every point lost is named. Every fix is ranked.
            </h2>
            <p className="mt-5 leading-relaxed text-ink-soft">
              No vague &#8220;looks nice&#8221;. The reviewer returns at most
              three fixes, ordered by the engagement they win back — each one
              doable with a phone and what&#8217;s already in the house.
            </p>

            <ol className="mt-8 space-y-5">
              {review.fixes.map((fix, i) => (
                <li key={fix.title} className="flex gap-4">
                  <span className="font-display flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-ink/30 text-sm">
                    {i + 1}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold tracking-tight">
                        {fix.title}
                      </h3>
                      {i === 0 && (
                        <span className="rounded-full bg-vermilion/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-vermilion">
                          biggest lift
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                      {fix.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8 rounded-lg border border-dashed border-ink/25 bg-paper-raised/70 p-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-soft">
                The verdict, in the language you sell in
              </p>
              <p className="font-hindi mt-3 leading-relaxed">
                {review.verdict_hi}
              </p>
              <p className="font-bangla mt-2 leading-relaxed">
                {review.verdict_bn}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The two questions */}
      <section className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-vermilion">
          How posters get better
        </p>
        <h2 className="font-display mt-4 max-w-xl text-[clamp(1.8rem,5vw,2.8rem)] leading-tight">
          Two questions decide every verdict.
        </h2>
        <p className="mt-5 max-w-xl leading-relaxed text-ink-soft">
          Half the score is craft, half is commerce. A beautiful photo nobody
          acts on fails the exam the same way a blurry one does.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {AXES.map((axis) => (
            <article
              key={axis.number}
              className="rounded-xl border border-ink/12 bg-paper-raised p-6 shadow-[0_12px_32px_rgba(34,29,24,0.10)] sm:p-8"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                {axis.number}
              </p>
              <h3 className="font-display mt-3 text-xl leading-snug">
                {axis.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {axis.intro}
              </p>
              <ul className="mt-5 space-y-2.5">
                {axis.items.map((item) => (
                  <li key={item.name} className="flex items-baseline gap-3">
                    <span
                      className="font-mono text-[10px] text-marigold"
                      aria-hidden
                    >
                      ✦
                    </span>
                    <p className="text-sm leading-snug">
                      <span className="font-medium">{item.name}</span>{" "}
                      <span className="text-ink-soft">— {item.note}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Steps + CTA */}
      <section className="bg-ink text-paper">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-marigold">
            From draft to posted
          </p>
          <h2 className="font-display mt-4 max-w-2xl text-[clamp(1.8rem,5vw,2.8rem)] leading-tight">
            Twenty seconds between made-it and post-it.
          </h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {STEPS.map((step) => (
              <li key={step.number}>
                <span className="font-display flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-paper/30 text-lg">
                  {step.number}
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-paper/60">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-14 flex flex-wrap items-center gap-4">
            <NavLink
              to="/signup"
              className="rounded-full bg-marigold px-7 py-3.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
            >
              Review my poster →
            </NavLink>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/50">
              Upload · verdict · fix · post
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
