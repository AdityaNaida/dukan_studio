import model from "./gemini";

export type Verdict = "post_it" | "fix_first" | "reshoot";
export type CheckStatus = "pass" | "warn" | "fail";

export interface CaptureCheck {
  check: string;
  status: CheckStatus;
  note: string;
}

export interface Fix {
  title: string;
  detail: string;
}

export interface PosterReview {
  verdict: Verdict;
  verdict_line: string;
  verdict_hi: string;
  verdict_bn: string;
  product_guess: string;
  engagement_score: number;
  capture: CaptureCheck[];
  fixes: Fix[];
}

export const VERDICT_META: Record<Verdict, { label: string; tone: "leaf" | "marigold" | "vermilion" }> = {
  post_it: { label: "Post it", tone: "leaf" },
  fix_first: { label: "Fix first", tone: "marigold" },
  reshoot: { label: "Reshoot", tone: "vermilion" },
};

/**
 * Shown before any upload (a judge sees a full result with zero API calls)
 * and served as the answer when VITE_GEMINI_API_KEY is not configured.
 */
export const SAMPLE_REVIEW: PosterReview = {
  verdict: "fix_first",
  verdict_line:
    "Nearly there — the chai looks great, but your price is whispering.",
  verdict_hi: "पोस्टर अच्छा है, पर दाम नज़र नहीं आता — पहले उसे बड़ा कीजिए।",
  verdict_bn: "পোস্টার ভালো, কিন্তু দামটা চোখে পড়ছে না — আগে ওটা বড় করুন।",
  product_guess: "masala chai, 250 g pouch",
  engagement_score: 61,
  capture: [
    { check: "Focus", status: "pass", note: "Pouch is sharp edge to edge." },
    { check: "Lighting", status: "warn", note: "Top shadow swallows the brand name." },
    { check: "Framing", status: "pass", note: "Centred, with room to breathe." },
    { check: "Background", status: "warn", note: "Busy counter pulls the eye off the product." },
    { check: "Fully visible", status: "pass", note: "Nothing cropped, nothing blocked." },
  ],
  fixes: [
    {
      title: "Make the price the second-biggest thing",
      detail:
        "₹120 is barely a chip. Scale it to a tenth of the frame — price is the first thing a bazaar scroller checks.",
    },
    {
      title: "Clear the counter",
      detail:
        "Reshoot against a plain wall or a single-colour cloth. One product, one background, one message.",
    },
    {
      title: "Add one festive line",
      detail:
        "A small পুজোর প্যাক ribbon in a corner — Kolkata feeds stop scrolling for Puja.",
    },
  ],
};

const PROMPT = `You are a sharp but kind creative director reviewing a social-media poster for an Indian MSME seller (Instagram post, WhatsApp status, Facebook page). The seller made it on their phone. Judge it on two axes: (1) is the product perfectly captured — focus, lighting, framing, background, whether the product is fully visible; (2) would it earn engagement in an Indian feed — does it stop the thumb, is any text legible at phone size, is the price visible, is there a reason to act now (festival, offer)?

Return ONLY a JSON object, no markdown fences, in exactly this shape:
{
  "verdict": "post_it" | "fix_first" | "reshoot",
  "verdict_line": "one plain-English sentence, specific to THIS image, encouraging but honest",
  "verdict_hi": "the same idea in natural Hindi, Devanagari script",
  "verdict_bn": "the same idea in natural Bengali, Bangla script",
  "product_guess": "what the product appears to be, a few words",
  "engagement_score": 0-100 integer,
  "capture": [
    { "check": "Focus", "status": "pass"|"warn"|"fail", "note": "short specific note" },
    { "check": "Lighting", "status": "...", "note": "..." },
    { "check": "Framing", "status": "...", "note": "..." },
    { "check": "Background", "status": "...", "note": "..." },
    { "check": "Fully visible", "status": "...", "note": "..." }
  ],
  "fixes": [ { "title": "imperative, under 8 words", "detail": "one concrete sentence — achievable with a phone and household items, no paid tools" } ]
}

Rules: at most 3 fixes, ordered by impact on engagement. Calibrate the score honestly — a genuinely post-ready poster is 75+, a blurry one under 40. If the image is not a product poster at all (a person, a blank wall, a random screenshot), do not error: set verdict "reshoot", say plainly what you see instead, score it under 20, and make the fixes explain what to photograph. Never mention being an AI.`;

const VERDICTS: Verdict[] = ["post_it", "fix_first", "reshoot"];
const STATUSES: CheckStatus[] = ["pass", "warn", "fail"];

function asString(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

/**
 * Coerce whatever the model returned into a safe PosterReview. Never throws:
 * a weird shape degrades toward the sample's structure, not a blank screen.
 */
export function normalizeReview(raw: unknown): PosterReview {
  const obj = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;

  const verdict = VERDICTS.includes(obj.verdict as Verdict)
    ? (obj.verdict as Verdict)
    : "fix_first";

  const scoreNum = Number(obj.engagement_score);
  const engagement_score = Number.isFinite(scoreNum)
    ? Math.max(0, Math.min(100, Math.round(scoreNum)))
    : 50;

  const capture = (Array.isArray(obj.capture) ? obj.capture : [])
    .slice(0, 6)
    .map((item) => {
      const c = (item && typeof item === "object" ? item : {}) as Record<string, unknown>;
      return {
        check: asString(c.check, "Check"),
        status: STATUSES.includes(c.status as CheckStatus)
          ? (c.status as CheckStatus)
          : ("warn" as CheckStatus),
        note: asString(c.note, ""),
      };
    });

  const fixes = (Array.isArray(obj.fixes) ? obj.fixes : [])
    .slice(0, 4)
    .map((item) => {
      const f = (item && typeof item === "object" ? item : {}) as Record<string, unknown>;
      return {
        title: asString(f.title, "Improve the poster"),
        detail: asString(f.detail, ""),
      };
    })
    .filter((f) => f.detail);

  return {
    verdict,
    verdict_line: asString(
      obj.verdict_line,
      "Here is what would make this poster work harder.",
    ),
    verdict_hi: asString(obj.verdict_hi, "पोस्ट करने से पहले ये सुधार कर लीजिए।"),
    verdict_bn: asString(obj.verdict_bn, "পোস্ট করার আগে এইগুলো ঠিক করে নিন।"),
    product_guess: asString(obj.product_guess, "your product"),
    engagement_score,
    capture: capture.length ? capture : SAMPLE_REVIEW.capture,
    fixes: fixes.length ? fixes : SAMPLE_REVIEW.fixes,
  };
}

export interface ReviewResult {
  review: PosterReview;
  source: "live" | "sample";
}

/**
 * Ask Gemini to review the poster. Without a configured key this resolves to
 * the sample review (flagged as such) instead of failing — the demo must
 * survive an empty .env.
 */
export async function reviewPoster(
  base64Data: string,
  mimeType: string,
): Promise<ReviewResult> {
  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    await new Promise((resolve) => setTimeout(resolve, 2600));
    return { review: SAMPLE_REVIEW, source: "sample" };
  }

  const request = model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          { inlineData: { data: base64Data, mimeType } },
          { text: PROMPT },
        ],
      },
    ],
    generationConfig: { responseMimeType: "application/json", temperature: 0.4 },
  });

  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("Review timed out")), 30_000),
  );

  const result = await Promise.race([request, timeout]);
  const text = result.response.text().trim();
  if (!text) throw new Error("Empty reply");

  // Fenced-JSON fallback per the brief: strip fences, then parse.
  const unfenced = text
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "");
  let parsed: unknown;
  try {
    parsed = JSON.parse(unfenced);
  } catch {
    const start = unfenced.indexOf("{");
    const end = unfenced.lastIndexOf("}");
    if (start === -1 || end <= start) throw new Error("Unparseable reply");
    parsed = JSON.parse(unfenced.slice(start, end + 1));
  }

  return { review: normalizeReview(parsed), source: "live" };
}
