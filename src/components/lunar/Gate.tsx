import { PlateImg } from "@/components/lunar/PlateImg";
import { useEffect, useState, type ReactNode } from "react";
import { GATE_KEY, load, save } from "@/lib/lunar/storage";

type Phase = "pending" | "door" | "manual" | "in";

export function openManual() {
  window.dispatchEvent(new Event("lunar:open-manual"));
}

export function Gate({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>("pending");

  useEffect(() => {
    const entered = load<string>(GATE_KEY, "") === "entered";
    setPhase(entered ? "in" : "door");
    const onOpen = () => setPhase("manual");
    window.addEventListener("lunar:open-manual", onOpen);
    return () => window.removeEventListener("lunar:open-manual", onOpen);
  }, []);

  useEffect(() => {
    const lock = phase === "door" || phase === "manual" || phase === "pending";
    document.body.classList.toggle("gate-lock", lock);
    return () => document.body.classList.remove("gate-lock");
  }, [phase]);

  function enterSite() {
    setPhase("manual");
  }

  function closeManual() {
    save(GATE_KEY, "entered");
    setPhase("in");
  }

  if (phase === "in") return <>{children}</>;

  if (phase === "pending") {
    return <div className="gate" aria-hidden="true" />;
  }

  if (phase === "door") {
    return (
      <div className="gate" role="dialog" aria-label="ประตูเข้า Lunar Spark">
        <PlateImg name="poster" className="gate-img" eager sizes="100vw" />
        <div className="gate-veil" />
        <div className="cover-frame" aria-hidden="true" />
        <div className="gate-door">
          <p className="eyebrow">LUNAR SPARK</p>
          <h1>ประตู</h1>
          <p>ที่เงียบ ๆ สำหรับวันที่เหนื่อย</p>
          <button className="btn primary gate-enter-btn" type="button" onClick={enterSite}>
            ENTER SITE
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="gate gate-manual" role="dialog" aria-labelledby="manual-title">
      <PlateImg name="poster" className="gate-img manual-poster" eager sizes="100vw" />
      <div className="gate-veil manual-veil" />
      <article className="manual-sheet">
        <p className="eyebrow">คู่มือสั้น ๆ · อ่านแล้วปิดได้</p>
        <h2 id="manual-title">Lunar Spark คืออะไร</h2>
        <p>เป็นเว็บเงียบ ๆ สำหรับวันที่คุณเหนื่อย เครียด หรือมีเรื่องที่ยังไม่พร้อมเล่าให้ใครฟัง</p>
        <p>ไม่ใช่คลินิก ไม่ใช่แบบทดสอบให้คะแนน และไม่มีคำวินิจฉัย</p>

        <h3>คุณทำอะไรได้บ้าง</h3>
        <ol className="manual-list">
          <li>
            <b>นั่งกับ Healing Partner</b>
            <span>
              คู่หูสำหรับใจและร่างกายตามที่คุณบอก — พูดได้เลย ไม่ใช่ข้อสอบสั้น ๆ แล้วค่อยใช้ Compass เป็นเครื่องมือของ
              Claude ถ้าอยากเลือกเอง
            </span>
          </li>
          <li>
            <b>เข้าห้องลับ</b>
            <span>สำหรับเรื่องที่ยังไม่อยากให้ใครรู้ เช่น ซึมเศร้า หรือ HIV — ไม่ใช่แชทสด</span>
          </li>
          <li>
            <b>หาคนจริง</b>
            <span>กดสายด่วนได้เลย โดยไม่ต้องตอบคำถามก่อน · 1669 / 1323 / 1413</span>
          </li>
          <li>
            <b>ดูภาพบ้าน</b>
            <span>ห้อง Patron เป็นโปสเตอร์และภาพ ไม่มีปุ่มจ่ายเงิน</span>
          </li>
        </ol>

        <h3>สิ่งที่เว็บนี้ไม่ทำ</h3>
        <p>ไม่แกล้งเป็นหมอ ไม่เก็บข้อมูลสุขภาพขึ้นเซิร์ฟเวอร์ ไม่จับคู่ให้คุยกับคนแปลกหน้า</p>

        <div className="manual-actions">
          <button className="btn primary gate-enter-btn" type="button" onClick={closeManual}>
            ปิดคู่มือ เข้าเว็บ →
          </button>
        </div>
      </article>
    </div>
  );
}
