import { NavLink } from "react-router-dom";

const TICKER_ITEMS = [
  "know before you post",
  "engagement score out of 100",
  "at most 3 fixes, ranked by impact",
  "English · हिन्दी · বাংলা",
  "verdict in about 20 seconds",
];

function TickerRow({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-center gap-5 whitespace-nowrap py-2 pl-5 font-mono text-[11px] uppercase tracking-[0.18em]"
    >
      {TICKER_ITEMS.map((item) => (
        <span key={item} className="flex items-center gap-5">
          <span>{item}</span>
          <span className="text-marigold" aria-hidden>
            ✦
          </span>
        </span>
      ))}
    </div>
  );
}

function ChaiPouch({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 260" className={className} aria-hidden>
      <rect x="36" y="22" width="128" height="20" rx="5" fill="#143523" />
      <path
        d="M40 32h120"
        stroke="#0c2417"
        strokeWidth="2"
        strokeDasharray="5 4"
      />
      <path
        d="M36 42h128l7 176a15 15 0 0 1-15 16H44a15 15 0 0 1-15-16z"
        fill="#1e4d34"
      />
      <path
        d="M42 48l-4 172a9 9 0 0 0 7 9"
        stroke="#2d6848"
        strokeWidth="9"
        fill="none"
        opacity="0.6"
        strokeLinecap="round"
      />
      <rect x="52" y="86" width="96" height="116" rx="10" fill="#f6efe2" />
      <text
        x="100"
        y="106"
        textAnchor="middle"
        fill="#6b5c4c"
        fontSize="10"
        letterSpacing="3"
        fontFamily='"Geist Mono", monospace'
      >
        SHARMA&#8217;S
      </text>
      <circle cx="100" cy="134" r="20" fill="#c5300c" />
      <path d="M91 130h18l-3 15H94z" fill="#f6efe2" />
      <path
        d="M96 121c-1.5-2.5 1.5-3.5 0-6M104 121c-1.5-2.5 1.5-3.5 0-6"
        stroke="#f6efe2"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
      <text
        x="100"
        y="176"
        textAnchor="middle"
        fill="#221d18"
        fontSize="17"
        fontFamily='"Young Serif", Georgia, serif'
      >
        MASALA
      </text>
      <text
        x="100"
        y="194"
        textAnchor="middle"
        fill="#221d18"
        fontSize="17"
        fontFamily='"Young Serif", Georgia, serif'
      >
        CHAI
      </text>
      <text
        x="100"
        y="222"
        textAnchor="middle"
        fill="#a8c3ae"
        fontSize="9"
        letterSpacing="2"
        fontFamily='"Geist Mono", monospace'
      >
        NET 250g
      </text>
    </svg>
  );
}

const MARKUP = [
  {
    label: "! shadow on the name",
    tone: "border-amber-600/40 text-amber-700",
    className: "-left-2 top-[12%] -rotate-2",
  },
  {
    label: "! busy counter",
    tone: "border-amber-600/40 text-amber-700",
    className: "-right-3 top-[40%] rotate-2",
  },
  {
    label: "✗ price barely visible",
    tone: "border-vermilion/50 text-vermilion",
    className: "-left-3 bottom-[17%] rotate-1",
  },
];

function PosterUnderReview() {
  return (
    <figure
      role="img"
      aria-label="A seller's chai poster under review, marked up in red ink: shadow on the brand name, busy counter, price barely visible — engagement score 61, verdict: fix first"
      className="relative w-full -rotate-[1.5deg] rounded-md border border-ink/10 bg-paper-raised p-2 pb-3 shadow-[0_18px_44px_rgba(34,29,24,0.22)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[linear-gradient(160deg,#4a3c2c,#28211a_70%)]">
        <div className="absolute -left-8 top-10 h-24 w-24 rounded-full bg-[#6b5133] blur-xl" />
        <div className="absolute -right-6 bottom-6 h-28 w-20 rounded-lg bg-[#173021] blur-lg" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_14%,rgba(255,255,255,0.4),transparent_45%)]" />
        <ChaiPouch className="absolute left-1/2 top-1/2 w-[56%] -translate-x-[58%] -translate-y-1/2 rotate-6 blur-[1.1px] brightness-[0.72] saturate-[0.65]" />
        <span className="absolute left-2 top-2 font-mono text-[9px] tracking-wider text-white/60">
          IMG_4207.jpg
        </span>
        <span className="absolute bottom-2 left-2 font-mono text-[9px] tracking-wider text-white/50">
          made on the shop counter
        </span>
      </div>

      {/* Red-ink markup */}
      <div aria-hidden>
        {MARKUP.map((note) => (
          <span
            key={note.label}
            className={`absolute z-10 rounded-sm border bg-paper-raised px-2 py-1 font-mono text-[9px] uppercase tracking-[0.12em] shadow-md ${note.tone} ${note.className}`}
          >
            {note.label}
          </span>
        ))}
        <span className="stamp-in absolute right-3 top-8 z-10 rounded border-2 border-amber-600 bg-paper-raised/70 px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-amber-700">
          Fix first
        </span>
      </div>

      <figcaption className="flex items-center justify-between px-1 pt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-soft">
        <span className="text-amber-700">● under review</span>
        <span>pulse 61/100</span>
      </figcaption>
    </figure>
  );
}

function FixedPreview() {
  return (
    <figure
      role="img"
      aria-label="The same poster with the fixes applied: plain marigold background, price shown large, festive ribbon — engagement score 89, verdict: post it"
      className="relative w-full rotate-[3deg] rounded-md border border-ink/10 bg-paper-raised p-1.5 pb-2 shadow-[0_24px_56px_rgba(34,29,24,0.28)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[radial-gradient(circle_at_50%_26%,#f8bb3f,#e69306_75%)]">
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-[linear-gradient(to_top,rgba(140,80,0,0.28),transparent)]" />
        <div className="absolute bottom-[9%] left-1/2 h-3 w-[52%] -translate-x-1/2 rounded-[100%] bg-[#8c5000]/35 blur-[3px]" />
        <ChaiPouch className="absolute bottom-[10%] left-1/2 w-[68%] -translate-x-1/2" />
        <span className="font-bangla absolute right-1.5 top-1.5 rounded-full bg-vermilion px-2 py-0.5 text-[9px] text-paper-raised">
          পুজোর প্যাক
        </span>
        <span className="absolute bottom-1.5 left-1.5 rounded bg-ink/85 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-paper-raised">
          ₹120
        </span>
      </div>
      <span
        aria-hidden
        className="stamp-in absolute -left-3 top-4 z-10 rounded border-2 border-leaf bg-paper-raised/90 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-leaf"
      >
        Post it ✓
      </span>
      <figcaption className="flex items-center justify-between px-1 pt-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-ink-soft">
        <span className="text-leaf">● post it</span>
        <span>pulse 89/100</span>
      </figcaption>
    </figure>
  );
}

export default function Hero() {
  return (
    <section className="overflow-x-clip">
      {/* Ticker */}
      <div className="overflow-hidden border-b border-ink/10 bg-ink text-paper">
        <div className="flex w-max animate-marquee">
          <TickerRow />
          <TickerRow ariaHidden />
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-6xl gap-14 px-5 pb-24 pt-12 md:px-8 md:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p
            className="rise font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft"
            style={{ animationDelay: "0ms" }}
          >
            PosterPulse · the poster reviewer
          </p>
          <h1
            className="rise font-display mt-5 text-[clamp(2.4rem,8.5vw,4.4rem)] leading-[1.05]"
            style={{ animationDelay: "90ms" }}
          >
            Post it. Or{" "}
            <span className="text-vermilion underline decoration-wavy decoration-vermilion/60 decoration-[3px] underline-offset-[10px]">
              fix it
            </span>{" "}
            first.
          </h1>
          <p
            className="rise mt-6 text-lg leading-relaxed text-ink-soft"
            style={{ animationDelay: "180ms" }}
          >
            <span className="font-hindi text-ink">
              पोस्ट करने से पहले जान लीजिए।
            </span>{" "}
            <span className="font-bangla text-ink">
              পোস্ট করার আগে জেনে নিন।
            </span>
          </p>
          <p
            className="rise mt-4 max-w-md leading-relaxed text-ink-soft"
            style={{ animationDelay: "260ms" }}
          >
            Upload your social-media poster. PosterPulse reviews it like a
            creative director — checks focus, lighting, framing and
            legibility, scores engagement out of 100, and hands you at most
            three fixes ranked by the attention they win back. In about 20
            seconds, before your audience sees it.
          </p>
          <div
            className="rise mt-8 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "340ms" }}
          >
            <NavLink
              to="/signup"
              className="rounded-full bg-vermilion px-6 py-3 text-sm font-semibold text-paper-raised shadow-[0_10px_24px_rgba(197,48,12,0.35)] transition-transform hover:-translate-y-0.5"
            >
              Review my poster →
            </NavLink>
            <a
              href="#report"
              className="rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold transition-colors hover:border-ink/50"
            >
              See a sample report ↓
            </a>
            <NavLink
              to="/about"
              className="px-2 py-3 text-sm font-medium text-ink-soft underline underline-offset-4 transition-colors hover:text-ink"
            >
              About us
            </NavLink>
          </div>
          <p
            className="rise mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft"
            style={{ animationDelay: "420ms" }}
          >
            Honest verdicts · no design degree needed
          </p>
        </div>

        {/* The graded poster */}
        <div
          className="rise relative mx-auto mb-14 w-full max-w-[420px] lg:mb-6"
          style={{ animationDelay: "300ms" }}
        >
          <div className="pr-14 sm:pr-20">
            <PosterUnderReview />
          </div>
          <div className="absolute -bottom-12 right-0 w-[52%] sm:w-[48%]">
            <FixedPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
