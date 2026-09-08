import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Compass } from "@/components/lunar/Compass";
import { HumanDoor } from "@/components/lunar/HumanDoor";
import { Ledger } from "@/components/lunar/Ledger";
import { MoonFooter, MoonNav } from "@/components/lunar/MoonNav";
import { PRINCIPLES } from "@/lib/lunar/canon";
import { normalizeCompass, type Trace } from "@/lib/lunar/core";
import { load, TRACE_KEY } from "@/lib/lunar/storage";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [traces, setTraces] = useState<Trace[]>([]);
  const [epoch, setEpoch] = useState(0);

  useEffect(() => {
    const stored = load<unknown>(TRACE_KEY, []);
    const rows = Array.isArray(stored) ? stored : [];
    setTraces(
      rows.filter((t) => {
        if (!t || typeof t !== "object") return false;
        const row = t as Trace;
        if (!row.compass || typeof row.at !== "string") return false;
        try {
          if (row.compass.friction === ("avoidance" as string)) {
            row.compass = { ...row.compass, friction: "not_yet" };
          }
          normalizeCompass(row.compass);
          return true;
        } catch {
          return false;
        }
      }),
    );
  }, []);

  return (
    <div className="house-root">
      <MoonNav current="home" overlay />
      <main>
        <section className="cover">
          <img className="cover-img" src="/house/harbor.jpg" alt="" fetchPriority="high" />
          <div className="cover-veil" />
          <div className="cover-frame" aria-hidden="true" />
          <div className="cover-copy">
            <p className="eyebrow">LUNAR SPARK</p>
            <h1>
              ที่เงียบ ๆ
              <em>สำหรับวันที่เหนื่อย</em>
            </h1>
            <p>ไม่ใช่คลินิก ไม่มีคะแนน และไม่ต้องเล่าทุกอย่าง</p>
            <div className="hero-actions">
              <a className="btn primary" href="#walks">
                เดินต่อในบ้าน →
              </a>
              <Link className="btn" to="/patron">
                ดูภาพบ้าน
              </Link>
            </div>
          </div>
        </section>

        <section className="threshold" id="threshold">
          <div className="quiet-law">
            <b>ไม่ใช่คลินิก</b>
            <span>เว็บนี้ไม่วินิจฉัย ไม่ให้คะแนน และไม่แกล้งเป็นหมอ</span>
          </div>
          <p className="threshold-note">
            ทางซ้ายสำหรับดูวันนี้เป็นยังไง · ทางขวาเป็นห้องลับ
          </p>
        </section>

        <section className="walks-plate" id="walks">
          <div className="walks-visual">
            <img src="/house/walks.jpg" alt="" />
            <div className="walk-veil" />
            <div className="cover-frame" aria-hidden="true" />
          </div>
          <div className="walk-hits">
            <a className="walk-hit left" href="#compass">
              <small>ทางซ้าย · ดูวันนี้เป็นยังไง</small>
              <h2>Compass</h2>
              <p>ตอบ 4 ข้อสั้น ๆ ไม่มีถูกผิด ไม่มีคะแนน</p>
              <span>เปิด Compass →</span>
            </a>
            <Link className="walk-hit right" to="/secret">
              <small>ทางขวา · ห้องลับ</small>
              <h2>ห้องที่ยังไม่ต้องบอกชื่อ</h2>
              <p>สำหรับเรื่องที่ยังไม่อยากให้ใครรู้ ไม่ใช่แชทสด</p>
              <span>เข้าห้องลับ →</span>
            </Link>
          </div>
        </section>

        <section className="spark-band">
          <figure className="plate-frame">
            <img src="/house/hands.jpg" alt="" />
          </figure>
          <div>
            <p className="eyebrow">ไฟดวงเล็กก็พอ</p>
            <h2>
              ไม่ต้องสมบูรณ์
              <br />
              ก่อนจะใช้ชีวิต
            </h2>
            <p>
              Lunar Spark ไม่ได้ทำให้คุณหายในหน้าจอ แค่ช่วยให้มีก้าวเล็ก ๆ แล้วกลับไปใช้ชีวิตต่อ
            </p>
          </div>
        </section>

        <section className="principles">
          <div className="principles-inner">
            {PRINCIPLES.map((p) => (
              <div className="principle" key={p.title}>
                <b>{p.title}</b>
                <span>{p.body}</span>
              </div>
            ))}
          </div>
        </section>

        <Compass key={epoch} traces={traces} onTraces={setTraces} />
        <Ledger
          traces={traces}
          onClear={() => {
            setTraces([]);
            setEpoch((n) => n + 1);
          }}
        />
        <HumanDoor />

        <section className="patron-invite">
          <div>
            <p className="eyebrow">ห้องภาพ</p>
            <h2>
              เดินดูบ้าน
              <br />
              ได้ก่อน
            </h2>
            <p className="human-lede">
              Patron คือโปสเตอร์และภาพของบ้านนี้ ยังไม่มีปุ่มจ่ายเงิน
            </p>
            <div className="hero-actions">
              <Link className="btn primary" to="/patron">
                เปิดห้องภาพ →
              </Link>
            </div>
          </div>
          <figure className="plate-frame">
            <img src="/house/sanctum.jpg" alt="" />
          </figure>
        </section>
      </main>
      <MoonFooter />
    </div>
  );
}
