import { Link } from "@tanstack/react-router";
import { openManual } from "@/components/lunar/Gate";
import { LangSwitch, useI18n } from "@/components/lunar/Locale";

export function MoonNav({
  current,
  overlay,
}: {
  current?: "home" | "secret" | "handoff" | "patron";
  overlay?: boolean;
}) {
  const { m } = useI18n();
  return (
    <header className={overlay ? "shell moon-nav overlay" : "shell moon-nav"}>
      <Link className="brand" to="/" aria-current={current === "home" ? "page" : undefined}>
        <span className="sigil" />
        <span>
          <b>LUNAR SPARK</b>
          <small>{m.footer.tag}</small>
        </span>
      </Link>
      <nav>
        <Link to="/" hash="partner">
          {m.nav.partner}
        </Link>
        <Link to="/secret" aria-current={current === "secret" ? "page" : undefined}>
          {m.nav.secret}
        </Link>
        <Link to="/patron" aria-current={current === "patron" ? "page" : undefined}>
          {m.nav.patron}
        </Link>
        <Link to="/handoff" aria-current={current === "handoff" ? "page" : undefined}>
          {m.nav.handoff}
        </Link>
        <button type="button" onClick={openManual}>
          {m.nav.manual}
        </button>
        <LangSwitch placement="nav" />
      </nav>
    </header>
  );
}

export function MoonFooter() {
  const { m } = useI18n();
  return (
    <>
      <section className="review-foot">
        <span>{m.footer.law}</span>
        <span>
          <button type="button" className="foot-manual" onClick={openManual}>
            {m.footer.openManual}
          </button>
          {" · "}
          <Link to="/handoff">{m.nav.handoff} ↗</Link>
        </span>
      </section>
      <footer className="footer">
        <div>
          <b>LUNAR SPARK</b>
          <br />
          {m.footer.tag}
        </div>
        <div>
          {m.footer.rooms}
          <br />
          {m.footer.local}
        </div>
      </footer>
    </>
  );
}
