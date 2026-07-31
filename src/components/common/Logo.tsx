export default function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <g transform="rotate(-5 24 24)">
        <rect
          x="9"
          y="5"
          width="30"
          height="38"
          rx="4"
          fill="#fcf7eb"
          stroke="#221d18"
          strokeWidth="2.5"
        />
        <circle cx="17" cy="13" r="3" fill="#eda012" />
        <path
          d="M14 27h5l3.5-8 4.5 13 3-7h4"
          fill="none"
          stroke="#c5300c"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 36h12"
          stroke="#221d18"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.35"
        />
      </g>
    </svg>
  );
}
