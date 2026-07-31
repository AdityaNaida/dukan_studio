const TICKER_ITEMS = [
  "₹2 a shoot",
  "under 20 seconds",
  "English · हिन्दी · বাংলা",
  "no login, no signup",
  "built on Gemini + Nano Banana",
  "deployed on Google Cloud Run",
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
        fontFamily="var(--font-geist-mono)"
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
        fontFamily="var(--font-young-serif)"
      >
        MASALA
      </text>
      <text
        x="100"
        y="194"
        textAnchor="middle"
        fill="#221d18"
        fontSize="17"
        fontFamily="var(--font-young-serif)"
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
        fontFamily="var(--font-geist-mono)"
      >
        NET 250g
      </text>
    </svg>
  );
}

function BeforeCard() {
  return (
    <figure
      role="img"
      aria-label="Before: a dim, blurry phone photo of a chai pouch on a kitchen counter"
      className="w-full -rotate-[5deg] rounded-md border border-ink/10 bg-paper-raised p-2 pb-3 shadow-[0_18px_44px_rgba(34,29,24,0.22)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[linear-gradient(160deg,#4a3c2c,#28211a_70%)]">
        <div className="absolute -left-8 top-10 h-24 w-24 rounded-full bg-[#6b5133] blur-xl" />
        <div className="absolute -right-6 bottom-6 h-28 w-20 rounded-lg bg-[#173021] blur-lg" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_14%,rgba(255,255,255,0.4),transparent_45%)]" />
        <ChaiPouch className="absolute left-1/2 top-1/2 w-[62%] -translate-x-[58%] -translate-y-1/2 rotate-6 blur-[1.4px] brightness-[0.68] saturate-[0.6]" />
        <span className="absolute left-2 top-2 font-mono text-[9px] tracking-wider text-white/60">
          IMG_4207.jpg
        </span>
        <span className="absolute bottom-2 left-2 font-mono text-[9px] tracking-wider text-white/50">
          08:14 PM · kitchen counter
        </span>
      </div>
      <figcaption className="flex items-center justify-between px-1 pt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-soft">
        <span className="text-vermilion">● Before</span>
        <span>the photo you have</span>
      </figcaption>
    </figure>
  );
}

function AfterCard() {
  return (
    <figure
      role="img"
      aria-label="After: the same chai pouch as a clean studio shot on a marigold backdrop"
      className="w-full rotate-[3deg] rounded-md border border-ink/10 bg-paper-raised p-2 pb-3 shadow-[0_24px_56px_rgba(34,29,24,0.28)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[radial-gradient(circle_at_50%_26%,#f8bb3f,#e69306_75%)]">
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-[linear-gradient(to_top,rgba(140,80,0,0.28),transparent)]" />
        <div className="absolute bottom-[9%] left-1/2 h-3 w-[52%] -translate-x-1/2 rounded-[100%] bg-[#8c5000]/35 blur-[3px]" />
        <ChaiPouch className="absolute bottom-[10%] left-1/2 w-[64%] -translate-x-1/2" />
        <span className="absolute right-2 top-2 rounded-full bg-ink/80 px-2 py-0.5 font-mono text-[9px] tracking-wider text-paper">
          1080 × 1350
        </span>
        <div className="sheen" aria-hidden />
      </div>
      <figcaption className="flex items-center justify-between px-1 pt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-soft">
        <span className="text-leaf">● After</span>
        <span>Dukaan Studio · 18s</span>
      </figcaption>
    </figure>
  );
}

const COPY_CARDS = [
  {
    lang: "English",
    tag: "EN",
    hook: "festive gifting hook",
    headline: "Strong brew. Fair price.",
    body: "Sharma’s Masala Chai — the festive pack at ₹120. Gift warmth this season.",
    fontClass: "font-sans font-semibold tracking-tight",
  },
  {
    lang: "हिन्दी",
    tag: "HI",
    hook: "दिवाली hook",
    headline: "कड़क चाय, वाजिब दाम।",
    body: "शर्मा मसाला चाय — त्योहारी पैक सिर्फ़ ₹120। इस दिवाली रिश्तों में घोलिए मिठास।",
    fontClass: "font-hindi",
  },
  {
    lang: "বাংলা",
    tag: "BN",
    hook: "পুজো hook",
    headline: "কড়া লিকার, ন্যায্য দাম।",
    body: "শর্মার মশলা চা — পুজোর প্যাক মাত্র ₹১২০। এই পুজোয় আড্ডা জমুক চায়ে।",
    fontClass: "font-bangla",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Upload the photo you have",
    body: "Badly lit, tilted, taken on the shop counter — that is the point. No login, no crop tool, no instructions.",
  },
  {
    number: "02",
    title: "The agent writes the brief",
    body: "Gemini studies the product and decides for itself which assets it needs — an assets_needed plan, not a fixed pipeline.",
  },
  {
    number: "03",
    title: "The shoot lands in ~20s",
    body: "Nano Banana renders the studio shot while the copy arrives in English, Hindi and Bengali with a seasonal hook. About ₹2, all in.",
  },
];

const STACK_TILES = [
  {
    name: "Gemini API",
    role: "The agent",
    body: "Reads the photo, identifies the product, plans the asset list and writes the trilingual ad copy.",
  },
  {
    name: "Nano Banana",
    role: "The studio",
    body: "Takes the plan and renders the clean studio shot — backdrop, light and shadow included.",
  },
  {
    name: "Google Cloud Run",
    role: "The shopfront",
    body: "Serves this page from asia-south1. One container, no servers to mind, cold start under the hero.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-paper text-ink">
      {/* Ticker */}
      <div className="overflow-hidden border-b border-ink/10 bg-ink text-paper">
        <div className="flex w-max animate-marquee">
          <TickerRow />
          <TickerRow ariaHidden />
        </div>
      </div>

      {/* Header */}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 pb-4 pt-6 md:px-8">
        <p className="font-display text-xl leading-none">
          dukaan<span className="text-vermilion">.</span>studio
        </p>
        <div className="flex items-center gap-3">
          <p className="rounded-full border border-ink/15 bg-paper-raised px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
            Built on <span className="text-ink">Gemini</span>
          </p>
          <a
            href="/login"
            className="rounded-full border border-ink/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink transition-colors hover:border-ink/50"
          >
            Sign in
          </a>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto grid w-full max-w-6xl gap-14 px-5 pb-20 pt-10 md:px-8 md:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p
              className="rise font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft"
              style={{ animationDelay: "0ms" }}
            >
              AI Day for Startups India · Kolkata · 2026
            </p>
            <h1
              className="rise mt-5 font-display text-[clamp(2.4rem,8.5vw,4.6rem)] leading-[1.04]"
              style={{ animationDelay: "90ms" }}
            >
              One{" "}
              <span className="text-vermilion underline decoration-wavy decoration-vermilion/60 decoration-[3px] underline-offset-[10px]">
                bad
              </span>{" "}
              photo in.
              <br />
              A brand shoot out.
            </h1>
            <p
              className="rise mt-6 text-lg leading-relaxed text-ink-soft"
              style={{ animationDelay: "180ms" }}
            >
              <span className="font-hindi text-ink">
                एक धुंधली फोटो से पूरा ब्रांड शूट।
              </span>{" "}
              <span className="font-bangla text-ink">
                একটা ঝাপসা ছবি থেকে পুরো ব্র্যান্ড শুট।
              </span>
            </p>
            <p
              className="rise mt-4 max-w-md leading-relaxed text-ink-soft"
              style={{ animationDelay: "260ms" }}
            >
              Upload one badly-lit product photo. An agent studies it, decides
              which marketing assets it needs, and returns a studio shot plus ad
              copy in three languages — in under 20 seconds, for about ₹2.
            </p>
            <div
              className="rise mt-8 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "340ms" }}
            >
              <a
                href="#result"
                className="rounded-full bg-vermilion px-6 py-3 text-sm font-semibold text-paper-raised shadow-[0_10px_24px_rgba(197,48,12,0.35)] transition-transform hover:-translate-y-0.5"
              >
                See what comes back ↓
              </a>
              <a
                href="#how"
                className="rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold transition-colors hover:border-ink/50"
              >
                How it works
              </a>
            </div>
            <p
              className="rise mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft"
              style={{ animationDelay: "420ms" }}
            >
              Gemini · Nano Banana · Cloud Run — nothing else
            </p>
          </div>

          {/* Before / after */}
          <div
            className="rise relative mx-auto w-full max-w-[420px]"
            style={{ animationDelay: "300ms" }}
          >
            <svg
              viewBox="0 0 120 70"
              className="absolute -top-4 left-1/2 z-20 w-24 -translate-x-1/4 text-ink/70"
              aria-hidden
            >
              <path
                d="M8 58 C 30 12, 78 6, 104 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeDasharray="6 5"
                strokeLinecap="round"
              />
              <path
                d="M96 20 l10 9 -14 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="grid grid-cols-[1fr_1.15fr] items-center gap-0">
              <div className="relative z-0 -mr-8">
                <BeforeCard />
              </div>
              <div className="relative z-10">
                <AfterCard />
                <span className="absolute -bottom-3 -left-4 z-20 -rotate-6 rounded-full bg-leaf px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-paper-raised shadow-md">
                  done in 18s
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Agent brief */}
        <section id="result" className="border-y border-ink/10 bg-paper-deep/50">
          <div className="reveal mx-auto grid w-full max-w-6xl gap-10 px-5 py-20 md:grid-cols-[0.9fr_1.1fr] md:items-center md:px-8 md:py-28">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-vermilion">
                Pillar 01 · Agentic
              </p>
              <h2 className="mt-4 font-display text-[clamp(1.8rem,5vw,2.8rem)] leading-tight">
                First, the agent writes its own brief.
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-ink-soft">
                This is not a fixed chain. Gemini looks at your product and
                plans the shoot itself — the{" "}
                <code className="rounded bg-ink/8 px-1.5 py-0.5 font-mono text-[0.85em] text-ink">
                  assets_needed
                </code>{" "}
                array below is the model&#8217;s own decision, and the app
                branches on it. A pickle jar and a saree get different shoots.
              </p>
            </div>
            <pre className="overflow-x-auto rounded-xl border border-ink/60 bg-ink p-5 font-mono text-[12px] leading-relaxed text-paper/80 shadow-[0_20px_48px_rgba(34,29,24,0.28)] md:text-[13px]">
              <code>
                {`{
  "product": "masala chai, 250g pouch",
  "audience": "daily drinkers + festive gifting",
`}
                <span className="text-marigold">
                  {`  "assets_needed": [
    "studio_shot",
    "ad_copy_en_hi_bn",
    "festive_hook"
  ],
`}
                </span>
                {`  "festival": "Durga Puja",
  "backdrop": "marigold seamless",
  "price_anchor": "₹120"
}`}
              </code>
            </pre>
          </div>
        </section>

        {/* Trilingual copy */}
        <section className="reveal mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-vermilion">
            Pillars 02 + 03 · Multimodal × Sovereign
          </p>
          <h2 className="mt-4 max-w-xl font-display text-[clamp(1.8rem,5vw,2.8rem)] leading-tight">
            Copy that speaks bazaar, not boardroom.
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed text-ink-soft">
            Image in; image and language out. Every shoot returns ad copy in
            English, Hindi and Bengali with a seasonal hook the model picks
            itself — Durga Puja in Kolkata, Diwali up north. Real script, never
            boxes.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {COPY_CARDS.map((card, i) => (
              <article
                key={card.tag}
                className={`rounded-xl border border-ink/12 bg-paper-raised p-6 shadow-[0_12px_32px_rgba(34,29,24,0.10)] ${
                  i === 1 ? "md:-translate-y-3" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                    {card.lang}
                  </span>
                  <span className="rounded-full bg-marigold/25 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-ink">
                    {card.hook}
                  </span>
                </div>
                <h3 className={`mt-5 text-2xl leading-snug ${card.fontClass}`}>
                  {card.headline}
                </h3>
                <p
                  className={`mt-3 leading-relaxed text-ink-soft ${card.fontClass === "font-sans font-semibold tracking-tight" ? "font-sans font-normal" : card.fontClass}`}
                >
                  {card.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Numbers */}
        <section className="bg-ink text-paper">
          <div className="reveal mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-28">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-marigold">
              Why this matters
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.8rem,5vw,2.8rem)] leading-tight">
              6.3 crore MSMEs post blurry photos and lose to brands with
              budgets.
            </h2>
            <div className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-6">
              <div>
                <p className="font-display text-4xl md:text-5xl">
                  <span className="text-paper/40 line-through decoration-2">
                    ₹15,000
                  </span>{" "}
                  <span className="text-marigold">₹2</span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-paper/60">
                  What one product shoot costs an Indian seller — before and
                  after.
                </p>
              </div>
              <div>
                <p className="font-display text-4xl md:text-5xl">
                  <span className="text-paper/40 line-through decoration-2">
                    1 week
                  </span>{" "}
                  <span className="text-marigold">20s</span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-paper/60">
                  From booking a studio to holding the assets.
                </p>
              </div>
              <div>
                <p className="font-display text-4xl md:text-5xl">
                  63,000,000
                </p>
                <p className="mt-3 text-sm leading-relaxed text-paper/60">
                  MSMEs in India today. Almost none will ever afford a shoot.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section
          id="how"
          className="reveal mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-28"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-vermilion">
            How it works
          </p>
          <h2 className="mt-4 font-display text-[clamp(1.8rem,5vw,2.8rem)] leading-tight">
            Forty seconds, start to shoot.
          </h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {STEPS.map((step) => (
              <li key={step.number} className="relative">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-ink/30 font-display text-lg">
                  {step.number}
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 leading-relaxed text-ink-soft">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Google stack */}
        <section
          id="stack"
          className="border-y border-ink/10 bg-paper-deep/50"
        >
          <div className="reveal mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-28">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-vermilion">
              Under the hood
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.8rem,5vw,2.8rem)] leading-tight">
              Built openly on the Google AI stack.
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {STACK_TILES.map((tile) => (
                <article
                  key={tile.name}
                  className="rounded-xl border border-ink/12 bg-paper-raised p-6"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                    {tile.role}
                  </p>
                  <h3 className="mt-3 font-display text-xl">{tile.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {tile.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mx-auto w-full max-w-6xl px-5 py-14 md:px-8">
        <p className="font-display text-[clamp(1.6rem,6vw,2.6rem)] leading-snug">
          dukaan · <span className="font-hindi">दुकान</span> ·{" "}
          <span className="font-bangla">দোকান</span>
        </p>
        <div className="mt-6 flex flex-col gap-2 text-sm text-ink-soft md:flex-row md:items-center md:justify-between">
          <p>
            Build with Google AI Hackathon — AI Day for Startups India 2026,
            IIM Calcutta, Kolkata.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em]">
            No login · no signup · one page
          </p>
        </div>
      </footer>
    </div>
  );
}
