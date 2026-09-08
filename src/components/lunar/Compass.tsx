import { useEffect, useMemo, useRef, useState } from "react";
import {
  AXES,
  OUTCOME_BUTTONS,
  OUTCOME_COPY,
  REFLECTION_LABELS,
} from "@/lib/lunar/canon";
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
  const [state, setState] = useState<PartialCompass>({});
  const [experiment, setExperiment] = useState<Experiment | null>(null);
  const [clarification, setClarification] = useState<string | null>(null);
  const [restNotYetConfirmed, setRestNotYetConfirmed] = useState(false);
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("เลือกให้ครบ 4 แกน — ไม่มีคะแนนและไม่มีคำตอบที่ “ถูก”");
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
    setStatus(
      complete
        ? "พร้อมสร้าง reflection จากสิ่งที่คุณเลือกเอง 4 อย่าง"
        : "เลือกให้ครบ 4 แกน — ไม่มีคะแนนและไม่มีคำตอบที่ “ถูก”",
    );
  }, [complete, ready]);

  function invalidate() {
    setExperiment(null);
    setClarification(null);
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
      setClarification(result.question);
      setExperiment(null);
      return;
    }
    setClarification(null);
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
    setTraceStatus(OUTCOME_COPY[outcome]);
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
          <div className="eyebrow">ดูวันนี้เป็นยังไง · 4 ข้อ</div>
          <h2>
            ไม่มีคะแนน
            <br />
            ไม่มีถูกผิด
          </h2>
        </div>
        <p>
          เลือกข้อที่ตรงกับตอนนี้ที่สุด ข้อละหนึ่งอัน ระบบจะไม่เติมคำตอบแทนคุณ และไม่เก็บข้อมูลนี้ขึ้นเซิร์ฟเวอร์
        </p>
      </div>
      <article className="folio-page reveal" aria-label="Recovery Compass">
        <div className="folio-meta">
          <span>LUNAR SPARK · PRIVATE-BY-DEFAULT</span>
          <span>FOLIO 01 · HEALING PARTNER</span>
        </div>
        <div className="folio-intro">
          <h3>วันนี้เป็นอย่างไร — เท่าที่คุณอยากบอก</h3>
          <p>สี่คำถามเท่านั้น. ระบบจะไม่เติมช่องว่างแทนคุณ.</p>
        </div>
        {AXES.map((axis) => (
          <div className="axis" key={axis.key}>
            <div className="axis-label">
              <b>{axis.title}</b>
              <span>{axis.hint}</span>
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
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        <div className="compass-actions">
          <button className="btn primary" type="button" disabled={!complete} onClick={() => build(true)}>
            MAKE ONE SMALL EXPERIMENT →
          </button>
          <span className="compass-status" role="status" aria-live="polite">
            {status}
          </span>
        </div>

        {clarification && (
          <div className="reflection">
            <b>ขอถามเพิ่มหนึ่งอย่างก่อนเลือก trajectory</b>
            <span>{clarification}</span>
            <div className="outcomes">
              <button
                className="btn primary"
                type="button"
                onClick={() => {
                  setRestNotYetConfirmed(true);
                  const result = chooseExperiment(complete, { rest_not_yet_confirmed: true });
                  if (!isClarification(result) && complete) {
                    save(STATE_KEY, complete);
                    setClarification(null);
                    setExperiment(result);
                  }
                }}
              >
                ใช่ — ตอนนี้อยากพักจากเรื่องนี้ก่อน
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
                ไม่ใช่ — ขอเลือก Direction ใหม่
              </button>
            </div>
          </div>
        )}

        {experiment && complete && (
          <>
            <div className="reflection">
              <b>สิ่งที่คุณบอกเราเองตอนนี้</b>
              <span>{REFLECTION_LABELS.capacity[complete.capacity]}</span>
              <span>{REFLECTION_LABELS.direction[complete.direction]}</span>
              <span>{REFLECTION_LABELS.friction[complete.friction]}</span>
              <span>{REFLECTION_LABELS.support[complete.support]}</span>
            </div>
            {complete.support === "professional" && (
              <div className="reflection">
                <b>คุณเลือก “อยากหาผู้เชี่ยวชาญ”</b>
                <span>
                  Golden Path ด้านล่างเป็น optional experiment เท่านั้น และไม่ใช่ด่านที่ต้องผ่านก่อนหาคนจริง.{" "}
                  <a href="#professional">ไป Human Care Door →</a>
                </span>
              </div>
            )}
            <section className="experiment" id="experimentPanel">
              <div className="eyebrow">GOLDEN PATH · ONE BOUNDED EXPERIMENT</div>
              <h3>{experiment.title}</h3>
              <p className="why">{experiment.why}</p>
              <div className="experiment-grid">
                <div className="exp-cell">
                  <small>SMALLEST STEP</small>
                  <b>{experiment.smallest_step}</b>
                </div>
                <div className="exp-cell">
                  <small>STOP RULE</small>
                  <b>{experiment.stop_rule}</b>
                </div>
                <div className="exp-cell">
                  <small>REALITY QUESTION</small>
                  <b>{experiment.reality_question}</b>
                </div>
                <div className="exp-cell">
                  <small>RETURN WINDOW</small>
                  <b>{experiment.return_window}</b>
                </div>
              </div>
              <div className="trace-compose">
                <label htmlFor="traceNote">OPTIONAL LOCAL NOTE · อย่าใส่ข้อมูลลับ / clinical details</label>
                <input
                  id="traceNote"
                  maxLength={280}
                  autoComplete="off"
                  aria-describedby="tracePrivacy"
                  placeholder="โลกจริงตอบอะไรสั้น ๆ…"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                <span id="tracePrivacy" className="trace-status">
                  บันทึกนี้อยู่ใน browser เครื่องนี้เท่านั้น; อย่าใส่ความลับหรือรายละเอียดทางคลินิก.
                </span>
                <div className="outcomes">
                  {OUTCOME_BUTTONS.map((btn) => (
                    <button
                      key={btn.id}
                      className={btn.spark ? "btn spark" : btn.id === "tried" ? "btn primary" : "btn"}
                      type="button"
                      onClick={() => record(btn.id)}
                    >
                      {btn.label}
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
