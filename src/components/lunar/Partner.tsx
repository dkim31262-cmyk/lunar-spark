import { useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "@/components/lunar/Locale";
import { SIT_IDS, type SitId } from "@/lib/lunar/canon";
import { normalizeCompass, type CompassState } from "@/lib/lunar/core";
import { sitWithPartner } from "@/lib/lunar/sit";
import { load, PARTNER_KEY, STATE_KEY, save } from "@/lib/lunar/storage";

type Turn = { role: "user" | "assistant"; content: string };

const CRISIS =
  /อยากตาย|ฆ่าตัว|ไม่ย?ากอยู่แล้ว|suicide|kill myself|end my life|harm myself|want to die|死にたい|自殺|死にましょう|想死|自杀|不想活|죽고\s*싶|자살/i;

export function Partner() {
  const { locale, m } = useI18n();
  const [sitting, setSitting] = useState<SitId[]>([]);
  const [draft, setDraft] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState(m.partner.idle);
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = load<{ sitting?: SitId[]; turns?: Turn[] }>(PARTNER_KEY, {});
    if (Array.isArray(stored.sitting)) {
      setSitting(stored.sitting.filter((id) => (SIT_IDS as readonly string[]).includes(id)) as SitId[]);
    }
    if (Array.isArray(stored.turns)) {
      setTurns(stored.turns.filter((t) => t && (t.role === "user" || t.role === "assistant")).slice(-12));
    }
  }, []);

  useEffect(() => {
    if (!busy) setStatus(m.partner.idle);
  }, [locale, m.partner.idle, busy]);

  useEffect(() => {
    const node = threadRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [turns, busy]);

  const persist = useMemo(
    () => (nextSit: SitId[], nextTurns: Turn[]) => {
      save(PARTNER_KEY, { sitting: nextSit, turns: nextTurns.slice(-12) });
    },
    [],
  );

  function toggle(id: SitId) {
    setSitting((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id].slice(0, 7);
      persist(next, turns);
      return next;
    });
  }

  async function send() {
    const message = draft.trim().slice(0, 280);
    if (!message || busy) return;
    if (CRISIS.test(message)) {
      const next: Turn[] = [
        ...turns,
        { role: "user", content: message },
        { role: "assistant", content: m.partner.crisis },
      ];
      setTurns(next);
      persist(sitting, next);
      setDraft("");
      setStatus(m.partner.crisisStatus);
      document.getElementById("professional")?.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
      return;
    }
    setBusy(true);
    setStatus(m.partner.sending);
    const history = turns.slice(-6);
    let compass: CompassState | null = null;
    try {
      compass = normalizeCompass(load(STATE_KEY, {}));
    } catch {
      compass = null;
    }
    const nextTurns = [...turns, { role: "user" as const, content: message }];
    setTurns(nextTurns);
    setDraft("");
    try {
      const res = await Promise.race([
        sitWithPartner({
          data: { message, sitting, compass, history, locale },
        }),
        new Promise<never>((_, reject) => setTimeout(() => reject(new Error("timeout")), 16000)),
      ]);
      if (!res.ok) {
        setStatus(res.error);
        setTurns(nextTurns);
        persist(sitting, nextTurns);
        return;
      }
      const done = [...nextTurns, { role: "assistant" as const, content: res.text }];
      setTurns(done);
      persist(sitting, done);
      setStatus(res.crisis ? m.partner.crisisStatus : m.partner.done);
      if (res.crisis) {
        document.getElementById("professional")?.scrollIntoView({
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
          block: "start",
        });
      }
    } catch {
      setStatus(m.partner.timeout);
      setTurns(nextTurns);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="shell partner-stage" id="partner">
      <div className="reader-head">
        <div>
          <div className="eyebrow">{m.partner.kicker}</div>
          <h2>
            {m.partner.h2a}
            <br />
            {m.partner.h2b}
          </h2>
        </div>
        <p>{m.partner.lede}</p>
      </div>

      <div className="partner-grid">
        <div className="partner-presence">
          <div className="spark-stage">
            <div className={busy ? "spark-vessel sitting listening" : "spark-vessel sitting"} aria-hidden="true">
              <span>{busy ? m.partner.vesselBusy : m.partner.vesselIdle}</span>
            </div>
          </div>
          <p className="partner-law">{m.partner.law}</p>
          <a className="partner-compass-link" href="#compass">
            {m.partner.compassLink}
          </a>
        </div>

        <div className="partner-sit">
          <p className="whisper-label">{m.partner.sitLabel}</p>
          <div className="sit-chips">
            {SIT_IDS.map((id) => {
              const on = sitting.includes(id);
              return (
                <button
                  key={id}
                  type="button"
                  className={on ? "option active" : "option"}
                  aria-pressed={on}
                  onClick={() => toggle(id)}
                >
                  {m.partner.sit[id]}
                </button>
              );
            })}
          </div>

          <div className="partner-thread" ref={threadRef}>
            {turns.length === 0 ? (
              <blockquote className="circle-note partner-welcome">
                <small>{m.partner.name}</small>
                <p>{m.partner.welcome}</p>
              </blockquote>
            ) : (
              turns.map((turn, i) => (
                <blockquote key={`${turn.role}-${i}`} className="circle-note">
                  <small>{turn.role === "user" ? m.partner.you : m.partner.name}</small>
                  <p>{turn.content}</p>
                </blockquote>
              ))
            )}
            {busy ? (
              <blockquote className="circle-note partner-wait">
                <small>{m.partner.name}</small>
                <p>{m.partner.waiting}</p>
              </blockquote>
            ) : null}
          </div>

          <p className="whisper-label">{m.partner.seedsLabel}</p>
          <div className="sit-chips partner-seeds">
            {m.partner.seeds.map((seed) => (
              <button
                key={seed.label}
                type="button"
                className="option"
                onClick={() => setDraft(seed.text)}
              >
                {seed.label}
              </button>
            ))}
          </div>

          <form
            className="partner-compose"
            onSubmit={(e) => {
              e.preventDefault();
              void send();
            }}
          >
            <label className="whisper-label" htmlFor="partner-draft">
              {m.partner.draftLabel}
            </label>
            <textarea
              id="partner-draft"
              className="whisper partner-draft"
              maxLength={280}
              value={draft}
              disabled={busy}
              autoComplete="off"
              onChange={(e) => setDraft(e.target.value)}
              placeholder={m.partner.placeholder}
            />
            <div className="compass-actions partner-send-row">
              <button
                id="partner-send"
                className="btn primary"
                type="submit"
                disabled={busy || !draft.trim()}
              >
                {busy ? m.partner.sending : m.partner.send}
              </button>
              <span className="compass-status" role="status" aria-live="polite">
                {status}
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
