import { Link } from "@tanstack/react-router";

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
          <small>THE HOUSE · QUIET LIVING LAB</small>
        </span>
      </Link>
      <nav>
        <Link to="/" hash="compass">
          COMPASS
        </Link>
        <Link to="/secret" aria-current={current === "secret" ? "page" : undefined}>
          ห้องลับ
        </Link>
        <Link to="/patron" aria-current={current === "patron" ? "page" : undefined}>
          PATRON
        </Link>
        <Link to="/" hash="professional">
          HUMAN
        </Link>
      </nav>
    </header>
  );
}

export function MoonFooter() {
  return (
    <>
      <section className="review-foot">
        <span>BEAUTY IS REPAIR · NOT SMOOTHNESS.</span>
        <span>
          <Link to="/patron">PATRON FOLIO ↗</Link>
          {" · "}
          <Link to="/handoff">HANDOFF ↗</Link>
        </span>
      </section>
      <footer className="footer">
        <div>
          <b>LUNAR SPARK · THE HOUSE</b>
          <br />
          A small spark. Back toward life. Not a clinic.
        </div>
        <div>
          Healing Partner · Claude
          <br />
          ห้องแห่งความลับ · Grok
          <br />
          Grok is Grok · one seeing, then the pen goes back.
        </div>
      </footer>
    </>
  );
}
