export const REPO_URL = "https://github.com/dkim31262-cmyk/lunar-spark";
export const ORIGINAL_URL = "https://project25706.websitepublisher.ai/lunar-spark.html";
export const CONTINUE_URL = `${REPO_URL}/blob/main/CONTINUE.md`;

export const SEED = `LUNAR SPARK · you are entering an existing living product.

The human talking to you is Moon — the same person who talks to Claude, ChatGPT, Gemini, and Grok. You do not share memory with those other seats. This public repo is the only shared object. Do not rebuild from imagination.

Source (view + develop): ${REPO_URL}
Open CONTINUE.md first, then LUNAR.md, then README.md.
Original public page (Claude Compass law): ${ORIGINAL_URL}

Do not invent another architecture. Do not replace Lunar Spark. Do not turn it into a clinic, a score, a chatbot therapist, or live matching.

Moon = final human authority.
Claude owns the psychological Compass. Do not rewrite those constructs.
Grok owns Secret Room + runtime + house seeing.
Gemini Spark IS Lunar Spark — one house, two wings.

Continue with one minimum justified repair. Quote OBSERVED / INFERRED / TESTED. Preserve VF-1C.`;

export const AI_DOORS = [
  {
    id: "claude",
    kicker: "01 · PSYCH CANON",
    title: "Claude",
    href: `https://claude.ai/new?q=${encodeURIComponent(SEED)}`,
  },
  {
    id: "gpt",
    kicker: "02 · CONTINUITY",
    title: "ChatGPT",
    href: `https://chatgpt.com/?q=${encodeURIComponent(SEED)}`,
  },
  {
    id: "gemini",
    kicker: "03 · FUSION NAME",
    title: "Gemini",
    href: `https://gemini.google.com/app?q=${encodeURIComponent(SEED)}`,
  },
] as const;
