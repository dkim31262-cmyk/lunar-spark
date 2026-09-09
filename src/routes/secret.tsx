import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { HumanDoor } from "@/components/lunar/HumanDoor";
import { MoonFooter, MoonNav } from "@/components/lunar/MoonNav";
import { PlateImg } from "@/components/lunar/PlateImg";
import {
  CHAMBERS,
  CIRCLE_VOICES,
  HIV_DOORS,
  HIV_PANELS,
  type ChamberId,
  type HivDoorId,
} from "@/lib/lunar/canon";
import { LETTER_KEY, load, save } from "@/lib/lunar/storage";

export const Route = createFileRoute("/secret")({ component: SecretRoom });

type Letter = { id: string; at: string; body: string };

function SecretRoom() {
  const [chamber, setChamber] = useState<ChamberId | null>(null);
  const [hiv, setHiv] = useState<HivDoorId | null>(null);
  const [draft, setDraft] = useState("");
  const [letters, setLetters] = useState<Letter[]>([]);
  const [saved, setSaved] = useState("");

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash === "circle" || hash === "whisper" || hash === "hiv") setChamber(hash);
    const stored = load<Letter[]>(LETTER_KEY, []);
    setLetters(Array.isArray(stored) ? stored.filter((x) => x && typeof x.body === "string") : []);
  }, []);

  function openChamber(id: ChamberId | null) {
    setChamber(id);
    if (id !== "hiv") setHiv(null);
    const next = id ? `#${id}` : "";
    history.replaceState(null, "", `/secret${next}`);
  }

  function sealLetter() {
    const body = draft.trim().slice(0, 280);
    if (!body) return;
    const next = [...letters, { id: crypto.randomUUID(), at: new Date().toISOString(), body }].slice(-40);
    setLetters(next);
    save(LETTER_KEY, next);
    setDraft("");
    setSaved("ผนึกแล้ว. จดหมายนี้อยู่เครื่องนี้เท่านั้น — ไม่มีสมาชิกคนอื่นอ่านได้ใน v0.");
  }

  function clearLetters() {
    if (!confirm("ล้างจดหมายปิดผนึกในเครื่องนี้?")) return;
    try {
      localStorage.removeItem(LETTER_KEY);
    } catch {
      /* ignore */
    }
    setLetters([]);
    setSaved("ล้างจดหมายท้องถิ่นแล้ว.");
  }

  const hivPanel = hiv ? HIV_PANELS[hiv] : null;

  return (
    <div className="house-root">
      <MoonNav current="secret" overlay />
      <main>
        <section className="secret-cover">
          <PlateImg name="walks" className="secret-cover-img" eager sizes="100vw" />
          <div className="cover-veil" />
          <div className="cover-frame" aria-hidden="true" />
          <div className="cover-copy">
            <p className="eyebrow">GEMINI SPARK · WING TWO · GROK</p>
            <h1>
              ห้องแห่งความลับ
              <em>No one has to know.</em>
            </h1>
            <p>สมาคมเงียบสำหรับคนที่มีเรื่องซึมเศร้า จิต หรือ HIV และยังไม่อยากให้ใครรู้.</p>
            <div className="hero-actions">
              <button className="btn primary" type="button" onClick={() => openChamber("circle")}>
                เข้าวงที่ไม่มีชื่อ →
              </button>
              <Link className="btn" to="/" hash="partner">
                กลับ Healing Partner
              </Link>
            </div>
          </div>
        </section>

        <section className="threshold">
          <div className="quiet-law">
            <b>SECRET ROOM STAYS SECRET · NOT LIVE MATCHING</b>
            <span>ไม่มีโปรไฟล์ ไม่มีชื่อ ไม่มีสถานะโรคเป็นตัวตน และไม่มีสมาชิกคนอื่นบนเซิร์ฟเวอร์ในรุ่นนี้.</span>
          </div>
        </section>

        <section className="shell reader-shell" id="chambers">
          <div className="reader-head">
            <div>
              <div className="eyebrow">THREE CHAMBERS · OPEN ONE</div>
              <h2>
                One door
                <br />
                at a time.
              </h2>
            </div>
            <p>
              อย่าเปิดทุกห้องพร้อมกัน. เลือกห้องที่ตรงกับตอนนี้ แล้วอีกห้องค่อยว่ากัน. Compass ของ Healing Partner
              ไม่ได้ถูกย้ายมาที่นี่ — จิตวิทยาไม่กลายเป็นคะแนน HIV และ HIV ไม่กลายเป็นแกน Compass.
            </p>
          </div>

          <div className="wing-grid">
            {CHAMBERS.map((c) => {
              const active = chamber === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  className={active ? "wing-card active" : "wing-card"}
                  aria-expanded={active}
                  onClick={() => openChamber(active ? null : c.id)}
                >
                  <small>{c.kicker}</small>
                  <h3>{c.title}</h3>
                  <p>{c.oneLine}</p>
                  <span>{active ? "CLOSE" : "OPEN"} →</span>
                </button>
              );
            })}
          </div>

          {chamber === "circle" && (
            <article className="secret-folio">
              <div className="folio-meta">
                <span>SECRET ROOM · UNNAMED CIRCLE</span>
                <span>NOT LIVE CHAT</span>
              </div>
              <div className="folio-intro">
                <h3>วงที่ไม่มีใครต้องแนะนำตัว</h3>
                <p>
                  นี่คือสมาคมในความหมายของห้องร่วม — ไม่ใช่ฟีด ไม่ใช่เพื่อน และไม่ใช่กลุ่มบำบัด. เสียงด้านล่างเป็น composite
                  ที่เขียนขึ้นเพื่อไม่ปล่อยให้ห้องว่างจนรู้สึกถูกทิ้ง แต่ไม่ใช่คนจริงในระบบ.
                </p>
              </div>
              <div className="circle-list">
                {CIRCLE_VOICES.map((voice) => (
                  <blockquote key={voice.mark} className="circle-note">
                    <small>{voice.mark}</small>
                    <p>{voice.text}</p>
                  </blockquote>
                ))}
              </div>
              <p className="secret-law">
                ถ้าต้องการคนจริง: Healing Partner มีประตู reconnect ที่คุณเลือกเอง และ Human Care Door เปิดโดยไม่ต้องผ่านห้องนี้.
                การจับคู่คนกับคนแบบนิรนามยังไม่ถูก claim — อย่าให้ AI รุ่นถัดไปแกล้งมีสมาชิก.
              </p>
            </article>
          )}

          {chamber === "whisper" && (
            <article className="secret-folio">
              <div className="folio-meta">
                <span>SECRET ROOM · SEALED LETTER</span>
                <span>LOCAL ONLY</span>
              </div>
              <div className="folio-intro">
                <h3>พูดได้ โดยไม่ถูกเรียกชื่อ</h3>
                <p>
                  จดหมายนี้ไม่มีผู้รับ. อย่าใส่ชื่อจริง เบอร์ ยา ผลเลือด หรือสิ่งที่คุณไม่ยอมให้ค้างบนเครื่องนี้.
                </p>
              </div>
              <label className="whisper-label" htmlFor="whisper">
                280 ตัวอักษร · ปิดผนึกใน browser
              </label>
              <textarea
                id="whisper"
                className="whisper"
                maxLength={280}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="สิ่งที่ยังเล่าให้ใครไม่ได้…"
              />
              <div className="compass-actions">
                <button className="btn primary" type="button" onClick={sealLetter} disabled={!draft.trim()}>
                  SEAL ON THIS DEVICE →
                </button>
                <button className="btn" type="button" onClick={clearLetters}>
                  CLEAR LETTERS
                </button>
                <span className="compass-status">{saved}</span>
              </div>
              <div className="circle-list">
                {letters.length === 0 ? (
                  <p className="empty-ledger">ยังไม่มีจดหมายบนเครื่องนี้ — และเราจะไม่แต่งข้อความมาแทนคุณ.</p>
                ) : (
                  letters
                    .slice()
                    .reverse()
                    .map((letter) => (
                      <blockquote key={letter.id} className="circle-note">
                        <small>SEALED · {letter.at.slice(0, 10)}</small>
                        <p>{letter.body}</p>
                      </blockquote>
                    ))
                )}
              </div>
            </article>
          )}

          {chamber === "hiv" && (
            <article className="secret-folio">
              <div className="folio-meta">
                <span>SECRET ROOM · HIV LIFELINE</span>
                <span>NOT A CLINIC</span>
              </div>
              <div className="folio-intro">
                <h3>ทางเดินที่ชัด โดยไม่ต้องประกาศตัว</h3>
                <p>
                  HIV อยู่ในห้องแห่งความลับเพราะการตีตรายังทำให้คนไม่ไปตรวจ. หน้านี้บอกทางไปคนจริง — ไม่ทายว่าติด ไม่สั่งยา
                  และไม่ทำ HIV ให้กลายเป็นคะแนนจิตวิทยา.
                </p>
              </div>
              <div className="hiv-grid">
                {HIV_DOORS.map((d) => {
                  const active = hiv === d.id;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      className={active ? "hiv-door active" : "hiv-door"}
                      aria-expanded={active}
                      onClick={() => setHiv(active ? null : d.id)}
                    >
                      <small>{d.kicker}</small>
                      <b>{d.title}</b>
                      <span>{d.oneLine}</span>
                    </button>
                  );
                })}
              </div>
              {hivPanel && hiv && (
                <div className="hiv-panel">
                  <p className="secret-law">{hivPanel.law}</p>
                  <ol>
                    {hivPanel.facts.map((fact, i) => (
                      <li key={fact}>
                        <small>{String(i + 1).padStart(2, "0")}</small>
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ol>
                  <p>{hivPanel.never}</p>
                  <p>{hivPanel.next}</p>
                  <div className="hero-actions">
                    <a className="btn primary" href="#professional">
                      ไปประตูคนจริง →
                    </a>
                    <a className="btn" href="https://hivhub.ddc.moph.go.th/" target="_blank" rel="noopener">
                      HIV INFO HUB
                    </a>
                    <a className="btn" href="https://www.trcarc.org/" target="_blank" rel="noopener">
                      คลินิกนิรนาม สภากาชาด
                    </a>
                  </div>
                </div>
              )}
            </article>
          )}
        </section>
        <HumanDoor />
      </main>
      <MoonFooter />
    </div>
  );
}
