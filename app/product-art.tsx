export type ProductId = "chai" | "nankhatai" | "jutti";

export function Aperture({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle
        cx="12"
        cy="12"
        r="10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none">
        {[0, 60, 120, 180, 240, 300].map((r) => (
          <path key={r} d="M12 4.6 L14.8 10.2" transform={`rotate(${r} 12 12)`} />
        ))}
      </g>
    </svg>
  );
}

function ChaiJar() {
  return (
    <svg viewBox="0 0 200 220" className="h-full w-auto" aria-hidden="true">
      <rect x="58" y="30" width="84" height="22" rx="8" fill="#3f2d1c" />
      <rect x="58" y="46" width="84" height="8" fill="#2e2114" />
      <rect x="50" y="54" width="100" height="140" rx="14" fill="#a9622a" />
      <path
        d="M50 130 h100 v50 a14 14 0 0 1 -14 14 h-72 a14 14 0 0 1 -14 -14 z"
        fill="#8a4d1f"
      />
      <rect x="60" y="62" width="9" height="122" rx="4.5" fill="#ffffff" opacity="0.16" />
      <rect x="62" y="92" width="76" height="56" rx="6" fill="#f3e8d2" />
      <circle cx="100" cy="109" r="8" fill="#c5300c" />
      <text
        x="100"
        y="130"
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        letterSpacing="1.5"
        fill="#221d18"
        fontFamily="var(--font-geist-sans)"
      >
        MASALA
      </text>
      <text
        x="100"
        y="142"
        textAnchor="middle"
        fontSize="7.5"
        letterSpacing="3"
        fill="#6b5c4c"
        fontFamily="var(--font-geist-sans)"
      >
        CHAI · 250g
      </text>
    </svg>
  );
}

function BiscuitPacket() {
  return (
    <svg viewBox="0 0 200 220" className="h-full w-auto" aria-hidden="true">
      <path
        d="M58 48 l8.4 -12 8.4 12 8.4 -12 8.4 12 8.4 -12 8.4 12 8.4 -12 8.4 12 8.4 -12 8.4 12 v8 h-84 z"
        fill="#c9861b"
      />
      <path
        d="M56 56 h88 l8 116 a16 16 0 0 1 -16 16 h-72 a16 16 0 0 1 -16 -16 z"
        fill="#eda012"
      />
      <path d="M62 64 h8 l4 116 h-8 z" fill="#ffffff" opacity="0.18" />
      <path d="M50 116 l100 -9 v42 l-100 9 z" fill="#f3e8d2" />
      <text
        transform="rotate(-4.5 100 134)"
        x="100"
        y="134"
        textAnchor="middle"
        fontSize="12.5"
        fontWeight="700"
        letterSpacing="1"
        fill="#221d18"
        fontFamily="var(--font-geist-sans)"
      >
        NANKHATAI
      </text>
      <text
        transform="rotate(-4.5 100 148)"
        x="100"
        y="148"
        textAnchor="middle"
        fontSize="7"
        letterSpacing="2.4"
        fill="#6b5c4c"
        fontFamily="var(--font-geist-sans)"
      >
        GHEE BAKED · 400g
      </text>
      <g fill="#d9a75e" stroke="#b9853e" strokeWidth="1.5">
        <circle cx="76" cy="176" r="11" />
        <circle cx="102" cy="180" r="11" />
        <circle cx="128" cy="174" r="11" />
      </g>
      <g fill="#a9713a">
        <circle cx="73" cy="173" r="1.4" />
        <circle cx="80" cy="178" r="1.4" />
        <circle cx="99" cy="177" r="1.4" />
        <circle cx="106" cy="183" r="1.4" />
        <circle cx="125" cy="171" r="1.4" />
        <circle cx="132" cy="177" r="1.4" />
      </g>
    </svg>
  );
}

function Jutti() {
  return (
    <svg viewBox="0 0 200 220" className="h-full w-auto" aria-hidden="true">
      <path
        d="M30 150 C 28 168, 44 176, 64 176 L 148 176 C 176 176, 186 158, 179 141 C 173 127, 157 120, 138 116 L 96 107 C 66 101, 40 118, 32 138 Z"
        fill="#9e3a24"
      />
      <path
        d="M179 141 C 192 137, 194 120, 183 112 C 176 107, 166 109, 163 116 C 173 121, 177 130, 172 141 Z"
        fill="#7c2a18"
      />
      <ellipse
        cx="80"
        cy="132"
        rx="31"
        ry="13"
        transform="rotate(-8 80 132)"
        fill="#58200f"
      />
      <path
        d="M52 118 C 74 104, 104 104, 136 115"
        fill="none"
        stroke="#eda012"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M36 166 L 168 172" stroke="#58200f" strokeWidth="3" strokeLinecap="round" />
      <g fill="#eda012">
        <circle cx="146" cy="132" r="2.6" />
        <circle cx="156" cy="140" r="2.6" />
        <circle cx="146" cy="150" r="2.6" />
        <circle cx="136" cy="140" r="2.6" />
        <circle cx="146" cy="140" r="4" />
      </g>
    </svg>
  );
}

export function ProductArt({ id }: { id: ProductId }) {
  if (id === "chai") return <ChaiJar />;
  if (id === "nankhatai") return <BiscuitPacket />;
  return <Jutti />;
}

/**
 * The seller's phone photo: dim, tilted, blurred, harsh flash, cluttered
 * table in the background.
 */
export function BeforeShot({
  id,
  fileName,
  className = "",
}: {
  id: ProductId;
  fileName?: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-[#4a3826] ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          background:
            "repeating-linear-gradient(97deg, #513c27 0 26px, #46331f 26px 54px, #563f28 54px 78px)",
        }}
      />
      <div className="absolute -left-4 top-3 h-10 w-24 rotate-12 rounded bg-[#2f2416] opacity-70 blur-[2px]" />
      <div className="absolute -right-3 bottom-8 h-16 w-12 -rotate-6 rounded bg-[#5d4a2e] opacity-60 blur-[2px]" />
      <div
        className="absolute inset-0 flex items-end justify-center pb-1"
        style={{
          filter: "blur(1.4px) brightness(0.72) saturate(0.65) sepia(0.28)",
          transform: "rotate(-7deg) scale(1.04) translateY(3%)",
        }}
      >
        <ProductArt id={id} />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 38% 28%, rgba(255,244,214,0.5), transparent 42%), radial-gradient(circle at 50% 55%, transparent 52%, rgba(12,8,4,0.66))",
        }}
      />
      {fileName && (
        <span className="absolute left-2 top-2 rounded bg-black/55 px-1.5 py-0.5 font-mono text-[9px] text-white/75">
          {fileName}
        </span>
      )}
    </div>
  );
}

/** The rendered result: same product on a seamless studio sweep. */
export function AfterShot({
  id,
  label,
  sheen = false,
  className = "",
}: {
  id: ProductId;
  label?: string;
  sheen?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-b from-[#fdfaf2] via-[#f6eeda] to-[#e5d6b4] ${className}`}
    >
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#d3bf94]/60 to-transparent" />
      <div className="absolute bottom-[6%] left-1/2 h-[5%] w-[58%] -translate-x-1/2 rounded-full bg-[#221d18]/25 blur-md" />
      <div className="absolute inset-0 flex items-end justify-center pb-[8%]">
        <div
          className="h-[84%]"
          style={{ filter: "drop-shadow(0 10px 14px rgba(34,29,24,0.18))" }}
        >
          <ProductArt id={id} />
        </div>
      </div>
      {sheen && <span className="sheen" aria-hidden="true" />}
      {label && (
        <span className="absolute right-2 top-2 rounded-full bg-ink/80 px-2 py-0.5 font-mono text-[9px] tracking-wide text-paper">
          {label}
        </span>
      )}
    </div>
  );
}
