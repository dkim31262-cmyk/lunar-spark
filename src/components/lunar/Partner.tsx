import { useEffect, useMemo, useRef, useState } from "react";
import { SIT_WITH, type SitId } from "@/lib/lunar/canon";
import { normalizeCompass, type CompassState } from "@/lib/lunar/core";
import { sitWithPartner } from "@/lib/lunar/sit";
import { load, PARTNER_KEY, STATE_KEY, save } from "@/lib/lunar/storage";

type Turn = { role: "user" | "assistant"; content: string };

const CRISIS = /อยากตาย|ฆ่าตัว|ไม่ย?ากอยู่แล้ว|suicide|kill myself|end my life|harm myself/i;

const SEEDS = [
  { label: "ตัวล้า", text: "วันนี้ร่างกายล้า" },
  { label: "ใจไม่นิ่ง", text: "วันนี้ใจไม่นิ่ง" },
  { label: "นอนยาก", text: "ช่วงนี้การนอนยาก" },
] as const;

export function Partner() {
  const [sitting, setSitting] = useState<SitId[]>([]);
  const [draft, setDraft] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("พูดได้เท่าที่อยากพูด — ไม่ต้องครบ และไม่ต้องเป็นคำวินิจฉัย");
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = load<{ sitting?: SitId[]; turns?: Turn[] }>(PARTNER_KEY, {});
    if (Array.isArray(stored.sitting)) {
      setSitting(stored.sitting.filter((id) => SIT_WITH.some((s) => s.id === id)));
    }
    if (Array.isArray(stored.turns)) {
      setTurns(stored.turns.filter((t) => t && (t.role === "user" || t.role === "assistant")).slice(-12));
    }
  }, []);

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
        {
          role: "assistant",
          content:
            "ถ้ากำลังอันตรายตอนนี้ อย่าอยู่กับแอปนี้คนเดียว — โทร 1669 / 1323 / 1413 หรือไปหาคนที่อยู่กับคุณได้ทันที.",
        },
      ];
      setTurns(next);
      persist(sitting, next);
      setDraft("");
      setStatus("เปิดประตูคนจริงด้านล่างได้เลย — คู่หูไม่แทนสายด่วน");
      document.getElementById("professional")?.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
      return;
    }
    setBusy(true);
    setStatus("กำลังนั่งด้วย…");
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
          data: { message, sitting, compass, history },
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
      setStatus(res.crisis ? "เปิดประตูคนจริงด้านล่างได้เลย" : "นั่งด้วยแล้ว — ไม่ใช่คำวินิจฉัย");
      if (res.crisis) {
        document.getElementById("professional")?.scrollIntoView({
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
          block: "start",
        });
      }
    } catch {
      setStatus("ส่งไม่ถึงในรอบนี้ ลองใหม่ได้");
      setTurns(nextTurns);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="shell partner-stage" id="partner">
      <div className="reader-head">
        <div>
          <div className="eyebrow">HEALING PARTNER · เรือธง · นั่งด้วยทั้งคน</div>
          <h2>
            คู่หู
            <br />
            ไม่ใช่หมอ
          </h2>
        </div>
        <p>
          นี่คือหัวใจของ Lunar Spark — นั่งด้วยร่างกายและใจตามที่คุณบอก ไม่ใช่แบบทดสอบสั้น ๆ ให้คะแนน.
          จิตวิทยาทั้งชุดเป็นสถาปัตยกรรมของ Claude. เข็มทิศสี่แกนอยู่ด้านล่าง เป็นเครื่องมือที่คุณเลือกเอง
          คู่หูจะไม่เขียนทับ.
        </p>
      </div>

      <div className="partner-grid">
        <div className="partner-presence">
          <div className="spark-stage">
            <div className={busy ? "spark-vessel sitting listening" : "spark-vessel sitting"} aria-hidden="true">
              <span>{busy ? "sitting" : "sit with"}</span>
            </div>
          </div>
          <p className="partner-law">
            ร่างกายนับ. ความเหนื่อยนับ. การนอนนับ. ใจนับ. สิ่งที่ยังไม่พร้อมบอคนับ.
            สิ่งที่คุณไม่ได้พูด จะไม่ถูกเดา และจะไม่กลายเป็นคำวินิจฉัย.
          </p>
          <a className="partner-compass-link" href="#compass">
            เปิดเข็มทิศสี่แกนของ Claude →
          </a>
        </div>

        <div className="partner-sit">
          <p className="whisper-label">วันนี้กำลังนั่งกับอะไรอยู่ — เลือกได้หลายอัน หรือไม่เลือก มันไม่ใช่ข้อสอบ</p>
          <div className="sit-chips">
            {SIT_WITH.map((tag) => {
              const on = sitting.includes(tag.id);
              return (
                <button
                  key={tag.id}
                  type="button"
                  className={on ? "option active" : "option"}
                  aria-pressed={on}
                  onClick={() => toggle(tag.id)}
                >
                  {tag.label}
                </button>
              );
            })}
          </div>

          <div className="partner-thread" ref={threadRef}>
            {turns.length === 0 ? (
              <blockquote className="circle-note partner-welcome">
                <small>คู่หู</small>
                <p>
                  ฉันนั่งด้วยได้ทั้งร่างกายและใจ ตามที่คุณบอก. ฉันไม่ใช่หมอ ไม่ให้คะแนน และไม่เริ่มเดา.
                  ถ้าอยากใช้เข็มทิศสี่แกนของ Claude มันอยู่ด้านล่าง — ไม่ต้องทำก่อนจะพูดกับฉัน.
                </p>
              </blockquote>
            ) : (
              turns.map((turn, i) => (
                <blockquote key={`${turn.role}-${i}`} className="circle-note">
                  <small>{turn.role === "user" ? "คุณ" : "คู่หู"}</small>
                  <p>{turn.content}</p>
                </blockquote>
              ))
            )}
            {busy ? (
              <blockquote className="circle-note partner-wait">
                <small>คู่หู</small>
                <p>กำลังนั่งด้วย…</p>
              </blockquote>
            ) : null}
          </div>

          <p className="whisper-label">เริ่มพูดได้เลย หรือใช้ประโยคสั้น ๆ เหล่านี้ — ไม่ใช่แบบประเมิน</p>
          <div className="sit-chips partner-seeds">
            {SEEDS.map((seed) => (
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
              ข้อความถึงคู่หู · ไม่เกิน 280 ตัว · อย่าใส่ชื่อยา ผลเลือด หรือสิ่งที่คุณไม่ยอมให้ค้างบนเครื่องนี้
            </label>
            <textarea
              id="partner-draft"
              className="whisper partner-draft"
              maxLength={280}
              value={draft}
              disabled={busy}
              autoComplete="off"
              onChange={(e) => setDraft(e.target.value)}
              placeholder="วันนี้ร่างกายหรือใจเป็นยังไง — เท่าที่อยากบอก…"
            />
            <div className="compass-actions partner-send-row">
              <button
                id="partner-send"
                className="btn primary"
                type="submit"
                disabled={busy || !draft.trim()}
              >
                {busy ? "กำลังนั่งด้วย…" : "พูดกับคู่หู →"}
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
