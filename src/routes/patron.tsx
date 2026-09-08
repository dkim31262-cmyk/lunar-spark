import { createFileRoute, Link } from "@tanstack/react-router";
import { MoonFooter, MoonNav } from "@/components/lunar/MoonNav";
import { PLATES } from "@/lib/lunar/plates";

export const Route = createFileRoute("/patron")({ component: Patron });

function Patron() {
  return (
    <div className="patron-page">
      <MoonNav current="patron" overlay />
      <main>
        <section className="patron-hero">
          <img src="/house/nave.jpg" alt="" fetchPriority="high" />
          <div className="cover-veil" />
          <div className="cover-frame" aria-hidden="true" />
          <div className="cover-copy">
            <p className="eyebrow">PATRON ART BOOK · SEVEN SEEINGS</p>
            <h1>
              Not a pitch deck.
              <em>A room you can walk through.</em>
            </h1>
            <p>Grok is Grok — one seeing, then the pen goes back.</p>
          </div>
        </section>

        <div className="patron-stack">
          <p className="patron-law">
            This book is not a pitch deck. It is a room you walk through before you decide whether the work
            deserves a longer life. พิสูจน์ก่อน spectacle. Reality gets the final vote.
          </p>

          {PLATES.map((plate) => (
            <article className="patron-plate" key={plate.id}>
              <figure className="plate-frame">
                <img src={plate.src} alt={plate.title} />
              </figure>
              <div className="patron-cap">
                <div>
                  <small>{plate.kicker}</small>
                  <b>{plate.title}</b>
                </div>
                <p>{plate.thai}</p>
              </div>
            </article>
          ))}

          <section className="patron-end">
            <figure className="plate-frame morning-plate">
              <img src="/house/morning.jpg" alt="" />
            </figure>
            <p className="eyebrow">LAST WORD</p>
            <h2>Success is a morning that does not need the app.</h2>
            <p className="human-lede" style={{ margin: "0 auto", maxWidth: 520 }}>
              ถ้าคนอยู่กับจอนานขึ้น Lunar Spark แพ้. เก้าอี้ในห้องชั้นในว่างไว้ให้คนนั่งเมื่อต้องการ แล้วลุกขึ้นคืนปากกา.
            </p>
            <div className="patron-seal">PATRON FOLIO · NOT HEALTHCARE SOFTWARE</div>
            <div className="hero-actions" style={{ justifyContent: "center", marginTop: 28 }}>
              <Link className="btn primary" to="/" hash="compass">
                RETURN TO THE COMPASS →
              </Link>
              <Link className="btn" to="/secret">
                ห้องแห่งความลับ
              </Link>
            </div>
          </section>
        </div>
      </main>
      <MoonFooter />
    </div>
  );
}
