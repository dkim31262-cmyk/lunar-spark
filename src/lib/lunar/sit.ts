import { createServerFn } from "@tanstack/react-start";
import { SIT_IDS, type SitId } from "@/lib/lunar/canon";
import { LANG_NAME, LOCALES, messages, type Locale } from "@/lib/lunar/i18n";

const CRISIS =
  /อยากตาย|ฆ่าตัว|ไม่ย?ากอยู่แล้ว|suicide|kill myself|end my life|harm myself|want to die|死にたい|自殺|想死|自杀|不想活|죽고\s*싶|자살/i;

type Turn = { role: "user" | "assistant"; content: string };

type Payload = {
  message: string;
  sitting: SitId[];
  locale: Locale;
  compass: {
    capacity: string;
    direction: string;
    friction: string;
    support: string;
  } | null;
  history: Turn[];
};

function asLocale(raw: unknown): Locale {
  return typeof raw === "string" && (LOCALES as readonly string[]).includes(raw) ? (raw as Locale) : "th";
}

function clean(input: unknown): Payload {
  const d = input && typeof input === "object" ? (input as Record<string, unknown>) : {};
  const message = String(d.message ?? "").trim().slice(0, 280);
  const sitting = Array.isArray(d.sitting)
    ? d.sitting.filter((x): x is SitId => typeof x === "string" && (SIT_IDS as readonly string[]).includes(x)).slice(0, 7)
    : [];
  const rawC = d.compass && typeof d.compass === "object" ? (d.compass as Record<string, string>) : null;
  const compass = rawC
    ? {
        capacity: String(rawC.capacity || "").slice(0, 24),
        direction: String(rawC.direction || "").slice(0, 24),
        friction: String(rawC.friction || "").slice(0, 24),
        support: String(rawC.support || "").slice(0, 24),
      }
    : null;
  const history = Array.isArray(d.history)
    ? d.history
        .filter((t) => t && typeof t === "object")
        .slice(-6)
        .map((t) => {
          const row = t as Turn;
          return {
            role: row.role === "assistant" ? "assistant" : "user",
            content: String(row.content || "").slice(0, 280),
          } as Turn;
        })
    : [];
  if (!message) throw new Error("empty");
  return { message, sitting, compass, history, locale: asLocale(d.locale) };
}

export const sitWithPartner = createServerFn({ method: "POST" })
  .validator((input: unknown) => clean(input))
  .handler(async ({ data }) => {
    const copy = messages[data.locale].partner;
    if (CRISIS.test(data.message)) {
      return {
        ok: true as const,
        crisis: true,
        text: copy.crisis,
      };
    }

    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: copy.errorDown };
    }

    const sittingLine = data.sitting.length
      ? `The person named they are sitting with: ${data.sitting.join(", ")}.`
      : "The person did not name extra sitting-with tags.";
    const compassLine = data.compass
      ? `They explicitly selected Claude's Compass instrument (not a diagnosis, not your questions): capacity=${data.compass.capacity}, direction=${data.compass.direction}, friction=${data.compass.friction}, support=${data.compass.support}. Treat as their words. Do not re-ask the four axes.`
      : "No Compass selection was shared. Do not interview them with Capacity/Direction/Friction/Support.";

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      signal: AbortSignal.timeout(12000),
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 280,
        temperature: 0.45,
        messages: [
          {
            role: "system",
            content: `You are the Healing Partner inside Lunar Spark — the flagship presence, not a quiz. You sit with one whole person: body and mind together, only as they named them. You are not a clinician, therapist, doctor, diagnostician, or crisis line.

Claude already built the psychological architecture of this house (Capacity, Direction, Friction, Support, rest+not_yet, one bounded experiment, skip is valid, Human Door stays human). You do not rewrite those constructs and you do not turn this chat into that four-axis form.

Laws:
- Mirror, not mind scanner. Reflect only what they said. Do not diagnose, name disorders, or invent scores.
- Experiment, not prescription. If you suggest anything, ONE small reversible step with a stop rule. Skipping is valid.
- Human door stays human. If they want a professional, point to Thai lines 1669 (emergency), 1323 (mental health), 1413 (Samaritans), or their local emergency number. Never become the doctor.
- Holistic means you may sit with body AND mind IF they named them — sleep, energy, pain, people, not_yet. Do not run a medical interview. Do not ask for lab results, medication lists, HIV status, trauma detail, or doses.
- Do not ask a battery of assessment questions. At most one gentle question, or none.
- Reply in ${LANG_NAME[data.locale]}. If they write another language, follow theirs. Plain language. Warm. Short. No poetry. No purple prose.
- If they express wanting to die or immediate danger: do not explore it as a puzzle. Tell them to contact 1669 / 1323 / 1413 in Thailand, their local emergency number, or a person with them now.

${sittingLine}
${compassLine}`,
          },
          ...data.history.map((t) => ({ role: t.role, content: t.content })),
          { role: "user", content: data.message },
        ],
      }),
    });

    if (!res.ok) {
      return { ok: false as const, error: copy.errorSlow };
    }
    const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const text = (body.choices?.[0]?.message?.content ?? "").trim().slice(0, 900);
    if (!text) return { ok: false as const, error: copy.errorQuiet };
    return { ok: true as const, crisis: false, text };
  });
