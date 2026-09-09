import { useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "@/components/lunar/Locale";
import { AXES, OUTCOME_BUTTONS } from "@/lib/lunar/canon";
import {
  chooseExperiment,
  isClarification,
  makeTrace,
  normalizeCompass,
  type CompassState,
  type Experiment,
  type Outcome,
  type PartialCompass,
  type Trace,
} from "@/lib/lunar/core";
import { load, save, STATE_KEY, TRACE_KEY } from "@/lib/lunar/storage";

type Props = {
  traces: Trace[];
  onTraces: (next: Trace[]) => void;
};

export function Compass({ traces, onTraces }: Props) {
  const { m } = useI18n();
  const [state, setState] = useState<PartialCompass>({});
  const [experiment, setExperiment] = useState<Experiment | null>(null);
  const [clarification, setClarification] = useState(false);
  const [restNotYetConfirmed, setRestNotYetConfirmed] = useState(false);
  const [note, setNote] = useState("");
  const [status, setStatus] = useState(m.compass.needFour);
  const [traceStatus, setTraceStatus] = useState("");
  const [ready, setReady] = useState(false);
  const touched = useRef(false);

  useEffect(() => {
    if (touched.current) {
      setReady(true);
      return;
    }
    const stored = load<PartialCompass>(STATE_KEY, {});
    const next =
      stored && stored.friction === ("avoidance" as string)
        ? { ...stored, friction: "not_yet" as const }
        : stored;
    setState(next && typeof next === "object" ? next : {});
    setReady(true);
  }, []);

  const complete = useMemo(() => {
    try {
      return normalizeCompass(state);
    } catch {
      return null;
    }
  }, [state]);

  useEffect(() => {
    if (!ready) return;
    setStatus(complete ? m.compass.ready : m.compass.needFour);
  }, [complete, ready, m.compass.ready, m.compass.needFour]);

  function invalidate() {
    setExperiment(null);
    setClarification(false);
    setRestNotYetConfirmed(false);
    setTraceStatus("");
  }

  function select(axis: keyof CompassState, value: string) {
    touched.current = true;
    setState((prev) => {
      const changed = prev[axis] !== value;
      if (changed) invalidate();
      return { ...prev, [axis]: value };
    });
  }

  function build(shouldScroll = true) {
    if (!complete) return;
    const result = chooseExperiment(complete, { rest_not_yet_confirmed: restNotYetConfirmed });
    save(STATE_KEY, complete);
    if (isClarification(result)) {
      setClarification(true);
      setExperiment(null);
      return;
    }
    setClarification(false);
    setExperiment(result);
    if (shouldScroll) {
      requestAnimationFrame(() => {
        document.getElementById("experimentPanel")?.scrollIntoView({
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
          block: "start",
        });
      });
    }
  }

  function record(outcome: Outcome) {
    if (!complete || !experiment) return;
    const trace = makeTrace(complete, experiment, outcome, note, new Date().toISOString());
    const next = [...traces, trace].slice(-100);
    onTraces(next);
    save(TRACE_KEY, next);
    setNote("");
    setTraceStatus(m.compass.outcomes[outcome].copy);
    if (outcome === "need_human") {
      document.getElementById("professional")?.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    }
  }

  return (
    <section className="shell reader-shell" id="compass">
      <div className="reader-head">
        <div>
          <div className="eyebrow">{m.compass.kicker}</div>
          <h2>
            {m.compass.h2a}
            <br />
            {m.compass.h2b}
          </h2>
        </div>
        <p>{m.compass.lede}</p>
      </div>
      <article className="folio-page reveal" aria-label="Recovery Compass">
        <div className="folio-meta">
          <span>{m.compass.folioA}</span>
          <span>{m.compass.folioB}</span>
        </div>
        <div className="folio-intro">
          <h3>{m.compass.introTitle}</h3>
          <p>{m.compass.introBody}</p>
        </div>
        {AXES.map((axis) => {
          const copy = m.compass[axis.key];
          return (
            <div className="axis" key={axis.key}>
              <div className="axis-label">
                <b>{copy.title}</b>
                <span>{copy.hint}</span>
              </div>
              <div className="options">
                {axis.options.map((opt) => {
                  const selected = state[axis.key] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      className={selected ? "option active" : "option"}
                      aria-pressed={selected}
                      onClick={() => select(axis.key, opt.value)}
                    >
                      {copy.options[opt.value as keyof typeof copy.options]}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
        <div className="compass-actions">
          <button className="btn primary" type="button" disabled={!complete} onClick={() => build(true)}>
            {m.compass.make}
          </button>
          <span className="compass-status" role="status" aria-live="polite">
            {status}
          </span>
        </div>

        {clarification && (
          <div className="reflection">
            <b>{m.compass.restAsk}</b>
            <span>{m.compass.restQuestion}</span>
            <div className="outcomes">
              <button
                className="btn primary"
                type="button"
                onClick={() => {
                  setRestNotYetConfirmed(true);
                  const result = chooseExperiment(complete, { rest_not_yet_confirmed: true });
                  if (!isClarification(result) && complete) {
                    save(STATE_KEY, complete);
                    setClarification(false);
                    setExperiment(result);
                  }
                }}
              >
                {m.compass.restYes}
              </button>
              <button
                className="btn"
                type="button"
                onClick={() =>
                  document.getElementById("compass")?.scrollIntoView({
                    behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
                    block: "start",
                  })
                }
              >
                {m.compass.restNo}
              </button>
            </div>
          </div>
        )}

        {experiment && complete && (
          <>
            <div className="reflection">
              <b>{m.compass.told}</b>
              <span>{m.compass.reflection.capacity[complete.capacity]}</span>
              <span>{m.compass.reflection.direction[complete.direction]}</span>
              <span>{m.compass.reflection.friction[complete.friction]}</span>
              <span>{m.compass.reflection.support[complete.support]}</span>
            </div>
            {complete.support === "professional" && (
              <div className="reflection">
                <b>{m.compass.proTitle}</b>
                <span>
                  {m.compass.proBody} <a href="#professional">{m.compass.proLink}</a>
                </span>
              </div>
            )}
            <section className="experiment" id="experimentPanel">
              <div className="eyebrow">{m.compass.path}</div>
              <h3>{experiment.title}</h3>
              <p className="why">{experiment.why}</p>
              <div className="experiment-grid">
                <div className="exp-cell">
                  <small>{m.compass.step}</small>
                  <b>{experiment.smallest_step}</b>
                </div>
                <div className="exp-cell">
                  <small>{m.compass.stop}</small>
                  <b>{experiment.stop_rule}</b>
                </div>
                <div className="exp-cell">
                  <small>{m.compass.reality}</small>
                  <b>{experiment.reality_question}</b>
                </div>
                <div className="exp-cell">
                  <small>{m.compass.window}</small>
                  <b>{experiment.return_window}</b>
                </div>
              </div>
              <div className="trace-compose">
                <label htmlFor="traceNote">{m.compass.noteLabel}</label>
                <input
                  id="traceNote"
                  maxLength={280}
                  autoComplete="off"
                  aria-describedby="tracePrivacy"
                  placeholder={m.compass.notePh}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                <span id="tracePrivacy" className="trace-status">
                  {m.compass.notePrivacy}
                </span>
                <div className="outcomes">
                  {OUTCOME_BUTTONS.map((btn) => (
                    <button
                      key={btn.id}
                      className={btn.spark ? "btn spark" : btn.id === "tried" ? "btn primary" : "btn"}
                      type="button"
                      onClick={() => record(btn.id)}
                    >
                      {m.compass.outcomes[btn.id].btn}
                    </button>
                  ))}
                </div>
                <div className="trace-status" role="status" aria-live="polite">
                  {traceStatus}
                </div>
              </div>
            </section>
          </>
        )}
      </article>
    </section>
  );
}
