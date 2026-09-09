import { Link } from "@tanstack/react-router";
import { openManual } from "@/components/lunar/Gate";

export function MoonNav({
  current,
  overlay,
}: {
  current?: "home" | "secret" | "handoff" | "patron";
  overlay?: boolean;
}) {
  return (
    <header className={overlay ? "shell moon-nav overlay" : "shell moon-nav"}>
      <Link className="brand" to="/" aria-current={current === "home" ? "page" : undefined}>
        <span className="sigil" />
        <span>
          <b>LUNAR SPARK</b>
          <small>ที่เงียบ ๆ สำหรับวันที่เหนื่อย</small>
        </span>
      </Link>
      <nav>
        <Link to="/" hash="partner">
          คู่หู
        </Link>
        <Link to="/secret" aria-current={current === "secret" ? "page" : undefined}>
          ห้องลับ
        </Link>
        <Link to="/patron" aria-current={current === "patron" ? "page" : undefined}>
          ภาพบ้าน
        </Link>
        <button type="button" onClick={openManual}>
          คู่มือ
        </button>
      </nav>
    </header>
  );
}

export function MoonFooter() {
  return (
    <>
      <section className="review-foot">
        <span>ไม่ใช่คลินิก · ไม่มีคะแนน</span>
        <span>
          <button type="button" className="foot-manual" onClick={openManual}>
            เปิดคู่มือ
          </button>
          {" · "}
          <Link to="/handoff">HANDOFF ↗</Link>
        </span>
      </section>
      <footer className="footer">
        <div>
          <b>LUNAR SPARK</b>
          <br />
          ที่เงียบ ๆ สำหรับวันที่เหนื่อย
        </div>
        <div>
          Compass · ห้องลับ · คนจริง
          <br />
          ข้อมูลอยู่เครื่องนี้เท่านั้น
        </div>
      </footer>
    </>
  );
}
