import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/components/lunar/Locale";
import { MoonFooter, MoonNav } from "@/components/lunar/MoonNav";
import { PlateImg } from "@/components/lunar/PlateImg";
import { PLATES } from "@/lib/lunar/plates";

export const Route = createFileRoute("/patron")({ component: Patron });

function Patron() {
  const { m } = useI18n();
  return (
    <div className="patron-page">
      <MoonNav current="patron" overlay />
      <main>
        <section className="patron-hero">
          <PlateImg name="nave" className="cover-img" eager sizes="100vw" />
          <div className="cover-veil" />
          <div className="cover-frame" aria-hidden="true" />
          <div className="cover-copy">
            <p className="eyebrow">{m.patron.kicker}</p>
            <h1>
              {m.patron.h1}
              <em>{m.patron.em}</em>
            </h1>
            <p>{m.patron.lede}</p>
          </div>
        </section>

        <div className="patron-stack">
          <p className="patron-law">{m.patron.law}</p>

          {PLATES.map((plate) => (
            <article className="patron-plate" key={plate.id}>
              <figure className="plate-frame">
                <PlateImg name={plate.id} alt={plate.title} />
              </figure>
              <div className="patron-cap">
                <div>
                  <small>{plate.kicker}</small>
                  <b>{plate.title}</b>
                </div>
                <p>{m.patron.caps[plate.id] ?? plate.thai}</p>
              </div>
            </article>
          ))}

          <section className="patron-end">
            <figure className="plate-frame morning-plate">
              <PlateImg name="morning" />
            </figure>
            <p className="eyebrow">{m.patron.last}</p>
            <h2>{m.patron.morning}</h2>
            <p className="human-lede" style={{ margin: "0 auto", maxWidth: 520 }}>
              {m.patron.morningBody}
            </p>
            <div className="patron-seal">{m.patron.seal}</div>
            <div className="hero-actions" style={{ justifyContent: "center", marginTop: 28 }}>
              <Link className="btn primary" to="/" hash="partner">
                {m.patron.back}
              </Link>
              <Link className="btn" to="/secret">
                {m.patron.secret}
              </Link>
            </div>
          </section>
        </div>
      </main>
      <MoonFooter />
    </div>
  );
}
