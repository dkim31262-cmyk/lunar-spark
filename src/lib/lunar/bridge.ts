export const REPO_URL = "https://github.com/dkim31262-cmyk/lunar-spark";
export const ORIGINAL_URL = "https://project25706.websitepublisher.ai/lunar-spark.html";

export const SEED = `LUNAR SPARK · you are entering an existing living product.

Source (view + develop): ${REPO_URL}
Original public page: ${ORIGINAL_URL}
Read README.md and LUNAR.md first.

Do not invent another architecture. Do not replace Lunar Spark. Do not turn it into a clinic, a score, a chatbot therapist, or live matching.

Moon = final human authority.
Claude owns the psychological Compass. Grok owns Secret Room + runtime. Gemini Spark IS Lunar Spark — one house, two wings.

Continue with one minimum justified repair. Quote OBSERVED / INFERRED / TESTED. Preserve VF-1C.`;

export const AI_DOORS = [
  {
    id: "claude",
    kicker: "01 · PSYCH CANON",
    title: "Claude",
    href: `https://claude.ai/new?q=${encodeURIComponent(SEED)}`,
    note: "เปิดแชทใหม่ พร้อม brief",
  },
  {
    id: "gpt",
    kicker: "02 · CONTINUITY",
    title: "ChatGPT",
    href: `https://chatgpt.com/?q=${encodeURIComponent(SEED)}`,
    note: "เปิดแชทใหม่ พร้อม brief",
  },
  {
    id: "gemini",
    kicker: "03 · FUSION NAME",
    title: "Gemini",
    href: `https://gemini.google.com/app?q=${encodeURIComponent(SEED)}`,
    note: "เปิด Gemini — ถ้าไม่เติมข้อความ ให้วาง brief จาก repo",
  },
] as const;
