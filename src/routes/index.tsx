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
            <p className="eyebrow">A QUIET LIVING LAB · THE HOUSE</p>
            <h1>
              A small spark.
              <em>Back toward life.</em>
            </h1>
            <p>บ้านที่มีรอยร้าว และไฟเล็กกว่าหัวแม่มือ. ความงามที่นี่คือการซ่อม.</p>
            <div className="hero-actions">
              <a className="btn primary" href="#walks">
                ENTER THE HOUSE →
              </a>
              <Link className="btn" to="/patron">
                PATRON FOLIO
              </Link>
            </div>
          </div>
        </section>

        <section className="threshold" id="threshold">
          <div className="quiet-law">
            <b>THIS IS NOT A CLINIC · SUPPORT IS NOT TREATMENT</b>
            <span>ไม่มี diagnosis · ไม่มี recovery score · ไม่มี AI แกล้งเป็น therapist หรือ clinician.</span>
          </div>
          <p className="threshold-note">
            ปีกซ้ายเป็นกระจกจิต. ปีกขวาเป็นห้องแห่งความลับ. ทั้งสองไม่แยกบ้าน.
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
              <small>01 · CLAUDE · HEALING PARTNER</small>
              <h2>The cool walk.</h2>
              <p>กระจกที่สะท้อนเฉพาะสิ่งที่คุณเลือกบอก. Compass สี่แกน ไม่มีคะแนน ไม่มีวินิจฉัย.</p>
              <span>OPEN THE COMPASS →</span>
            </a>
            <Link className="walk-hit right" to="/secret">
              <small>02 · GROK · ห้องแห่งความลับ</small>
              <h2>The locked walk.</h2>
              <p>สมาคมเงียบของคนที่ยังไม่อยากให้ใครรู้ — ซึมเศร้า จิต HIV. ไม่ใช่แชทสด.</p>
              <span>ENTER THE ROOM →</span>
            </Link>
          </div>
        </section>

        <section className="spark-band">
          <figure className="plate-frame">
            <img src="/house/hands.jpg" alt="" />
          </figure>
          <div>
            <p className="eyebrow">THE REMAINING SPARK</p>
            <h2>
              Beauty here
              <br />
              is repair.
            </h2>
            <p>
              สะเก็ดไฟไม่ใช่โคมระย้า. รอยทองคือรอยที่เคยแตก. Lunar Spark ไม่ได้ทำให้คนดูสมบูรณ์ —
              มันถือไฟดวงเล็กไว้ให้จนคนนั้นเดินกลับไปใช้ชีวิต.
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
            <p className="eyebrow">PATRON FOLIO · INNER ROOM</p>
            <h2>
              A room you walk
              <br />
              before you fund.
            </h2>
            <p className="human-lede">
              นี่ไม่ใช่ pitch deck. เป็นห้องชั้นในของบ้าน — เจ็ดภาพ หนึ่งกฎ: ทุนที่ถูกทางไม่ซื้อการวินิจฉัย.
            </p>
            <div className="hero-actions">
              <Link className="btn primary" to="/patron">
                OPEN THE PATRON FOLIO →
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
