export const ALLOWED = {
  capacity: ["low", "limited", "steady"] as const,
  direction: ["rest", "clarify", "reconnect", "one_thing"] as const,
  friction: ["noise", "body", "not_yet", "overload", "unknown"] as const,
  support: ["solo", "someone", "professional"] as const,
};

export type Capacity = (typeof ALLOWED.capacity)[number];
export type Direction = (typeof ALLOWED.direction)[number];
export type Friction = (typeof ALLOWED.friction)[number];
export type Support = (typeof ALLOWED.support)[number];
export type CompassState = {
  capacity: Capacity;
  direction: Direction;
  friction: Friction;
  support: Support;
};
export type PartialCompass = Partial<CompassState>;
export type Outcome =
  | "tried"
  | "not_for_me"
  | "worse_for_me"
  | "stop_rule_used"
  | "need_human"
  | "skipped";

export type Experiment = {
  id: string;
  title: string;
  smallest_step: string;
  stop_rule: string;
  reality_question: string;
  return_window: string;
  why: string;
  support_preference: Support;
  professional_support_selected: boolean;
  authority_note: string;
  clinical: false;
};

export type Clarification = {
  needs_clarification: true;
  clarification_id: "rest-not-yet";
  question: string;
  clinical: false;
};

export type Trace = {
  version: "0.1";
  experiment_id: string;
  experiment_title: string;
  compass: CompassState;
  outcome: Outcome;
  note: string;
  at: string;
  clinical: false;
};

const EXPERIMENTS: Record<
  Direction,
  Record<
    Capacity,
    Pick<Experiment, "id" | "title" | "smallest_step" | "stop_rule" | "reality_question" | "return_window">
  >
> = {
  rest: {
    low: {
      id: "rest-low",
      title: "Make a smaller landing",
      smallest_step:
        "Choose one ordinary thing you can pause for ten quiet minutes without needing to improve anything.",
      stop_rule: "Stop if the pause feels more demanding than restorative; skipping is a valid outcome.",
      reality_question: "After ten minutes, is there even 1% more room to choose what happens next?",
      return_window: "10 minutes",
    },
    limited: {
      id: "rest-limited",
      title: "Protect one pocket of quiet",
      smallest_step: "Remove one optional demand from the next thirty minutes and keep that space unfilled.",
      stop_rule: "Stop if removing it creates a real obligation or consequence you cannot safely ignore.",
      reality_question: "Did the empty space reduce noise or simply move the pressure elsewhere?",
      return_window: "30 minutes",
    },
    steady: {
      id: "rest-steady",
      title: "Schedule a deliberate off-switch",
      smallest_step: "Pick one bounded block today when you will stop producing, optimizing, and catching up.",
      stop_rule: "Stop or shorten the block if an actual time-sensitive responsibility appears.",
      reality_question: "Did deliberate rest protect capacity for something you actually value later?",
      return_window: "later today",
    },
  },
  clarify: {
    low: {
      id: "clarify-low",
      title: "Name one knot",
      smallest_step: 'Write one sentence beginning “The part that feels hardest to decide is…” and do not solve it yet.',
      stop_rule: "Stop after one sentence if more writing starts to feel like interrogation.",
      reality_question: "Is the knot now more specific than it was one minute ago?",
      return_window: "2 minutes",
    },
    limited: {
      id: "clarify-limited",
      title: "Split fact from guess",
      smallest_step: "Make two tiny columns: what you know from reality, and what you are currently guessing.",
      stop_rule: "Stop at three items per column; this is orientation, not a full analysis.",
      reality_question: "Which one guess matters enough to test first?",
      return_window: "10 minutes",
    },
    steady: {
      id: "clarify-steady",
      title: "Run one decision probe",
      smallest_step:
        "Choose one reversible option and identify the smallest real-world signal that would make it look better or worse.",
      stop_rule: "Stop before turning the probe into a permanent commitment.",
      reality_question: "What did the world reveal that thinking alone could not?",
      return_window: "within 24 hours",
    },
  },
  reconnect: {
    low: {
      id: "reconnect-low",
      title: "Send one low-pressure signal",
      smallest_step:
        "Send one safe person a simple message that asks for nothing heavy — even just a hello, emoji, or “thinking of you.”",
      stop_rule: "Stop before explaining everything; do not continue if contact feels unsafe or coercive.",
      reality_question: "Did contact create a little more connection, no change, or more strain?",
      return_window: "after one message",
    },
    limited: {
      id: "reconnect-limited",
      title: "Make one human appointment",
      smallest_step: "Invite one trusted person to a short, bounded check-in such as a ten-minute call, coffee, or walk.",
      stop_rule: "Stop if the person or setting does not feel safe, respectful, or optional.",
      reality_question: "Afterward, did you feel more alone, less alone, or simply clearer about what support fits?",
      return_window: "after the check-in",
    },
    steady: {
      id: "reconnect-steady",
      title: "Return to one living thread",
      smallest_step:
        "Choose one relationship or community thread you genuinely want back and take one concrete, non-grand gesture toward it.",
      stop_rule: "Stop if the contact leaves you feeling more pressured, less safe, or less free to choose the next step.",
      reality_question: "Did this thread feel alive enough to continue another small step?",
      return_window: "within 48 hours",
    },
  },
  one_thing: {
    low: {
      id: "one-thing-low",
      title: "One visible completion",
      smallest_step: "Pick a task that can be visibly finished in five minutes or less and complete only that.",
      stop_rule: "Stop when the one task is done; do not let success turn into a catch-up marathon.",
      reality_question: "After finishing it, does the next small choice feel any easier to make?",
      return_window: "5 minutes",
    },
    limited: {
      id: "one-thing-limited",
      title: "One useful move",
      smallest_step: "Choose one action under fifteen minutes that makes tomorrow easier, clearer, or safer.",
      stop_rule: "Stop at fifteen minutes even if the project could expand.",
      reality_question: "What concrete friction is now smaller than before?",
      return_window: "15 minutes",
    },
    steady: {
      id: "one-thing-steady",
      title: "Ship a reversible slice",
      smallest_step: "Take one project or life task and produce the smallest version future-you can actually use.",
      stop_rule: "Stop before polishing beyond the testable slice.",
      reality_question: "What did using or showing the slice teach you that planning did not?",
      return_window: "within 24 hours",
    },
  },
};

export const OUTCOMES: Outcome[] = [
  "tried",
  "not_for_me",
  "worse_for_me",
  "stop_rule_used",
  "need_human",
  "skipped",
];

export function normalizeCompass(input: unknown): CompassState {
  const source = input && typeof input === "object" ? (input as Record<string, unknown>) : {};
  const out = {} as CompassState;
  (Object.keys(ALLOWED) as (keyof typeof ALLOWED)[]).forEach((key) => {
    const value = String(source[key] || "").trim();
    if (!(ALLOWED[key] as readonly string[]).includes(value)) {
      throw new Error(`Invalid ${key}`);
    }
    (out as Record<string, string>)[key] = value;
  });
  return out;
}

export function chooseExperiment(
  rawState: unknown,
  options?: { rest_not_yet_confirmed?: boolean },
): Experiment | Clarification {
  const state = normalizeCompass(rawState);
  if (state.direction === "rest" && state.friction === "not_yet" && options?.rest_not_yet_confirmed !== true) {
    return {
      needs_clarification: true,
      clarification_id: "rest-not-yet",
      question: "ตอนนี้อยาก “พักจากเรื่องนี้ก่อน” จริง ๆ หรือยังไม่อยากแตะมันแต่ต้องการขยับไปทางอื่น?",
      clinical: false,
    };
  }
  const base = EXPERIMENTS[state.direction][state.capacity];
  const professional = state.support === "professional";
  return {
    ...base,
    why: `Chosen from your explicit direction (${state.direction}) and current capacity (${state.capacity}); friction (${state.friction}) and support preference (${state.support}) remain context, not diagnoses.`,
    support_preference: state.support,
    professional_support_selected: professional,
    authority_note: professional
      ? "You selected professional support. This experiment is optional and is not a prerequisite for seeking human or professional care."
      : "This is an optional, reversible experiment based only on what you explicitly selected.",
    clinical: false,
  };
}

export function makeTrace(
  rawState: unknown,
  experiment: { id: string; title?: string },
  outcome: Outcome,
  note: string,
  now?: string,
): Trace {
  const state = normalizeCompass(rawState);
  if (!experiment || typeof experiment.id !== "string" || !experiment.id) {
    throw new Error("Invalid experiment");
  }
  if (!OUTCOMES.includes(outcome)) throw new Error("Invalid outcome");
  const at = new Date(now || Date.now());
  if (Number.isNaN(at.getTime())) throw new Error("Invalid timestamp");
  return {
    version: "0.1",
    experiment_id: experiment.id,
    experiment_title: String(experiment.title || ""),
    compass: state,
    outcome,
    note: String(note || "").trim().slice(0, 280),
    at: at.toISOString(),
    clinical: false,
  };
}

export function summarizeLedger(traces: Trace[] | unknown) {
  const rows = Array.isArray(traces)
    ? (traces as Trace[]).filter((x) => x && OUTCOMES.includes(x.outcome))
    : [];
  const counts: Record<Outcome, number> = {
    tried: 0,
    not_for_me: 0,
    worse_for_me: 0,
    stop_rule_used: 0,
    need_human: 0,
    skipped: 0,
  };
  rows.forEach((x) => {
    counts[x.outcome] += 1;
  });
  const latest = rows.map((x) => x.at).filter(Boolean).sort().at(-1) || null;
  return { total: rows.length, counts, latest_at: latest };
}

export function buildHandoffPacket(rawState: unknown, traces: Trace[]) {
  const state = normalizeCompass(rawState);
  return {
    product: "Lunar Spark",
    release: "v0.2-gemini",
    lineage: "Career Experiment Room → Living Lab → Lunar Spark → Gemini Spark (two wings)",
    current_compass: state,
    ledger: summarizeLedger(traces),
    boundaries: {
      non_clinical_is_not_clinical_care: true,
      compass_is_not_diagnosis: true,
      ai_proposal_is_not_human_action: true,
      local_data_private_by_default: true,
      provider_availability_not_claimed: true,
      secret_room_is_not_live_matching: true,
      hiv_is_not_a_psychology_score: true,
    },
    preserve_invariants: [
      "Healing Partner remains non-clinical.",
      "Professional Care Bridge remains a separate authority lane.",
      "Compass reflects explicit choices only; no hidden score or diagnosis.",
      "Experiments stay small, reversible, skippable, and reality-tested.",
      "No fake metrics or fake provider availability.",
      "Secret Room stays private-by-default and is not a live clinic or live matching board in v0.",
      "HIV remains medical/psychosocial orientation, never a Compass axis.",
      "Pakin remains one identity; no persona proliferation.",
      "Evidence must precede expansion.",
    ],
  };
}

export function isClarification(value: Experiment | Clarification): value is Clarification {
  return "needs_clarification" in value && value.needs_clarification === true;
}
