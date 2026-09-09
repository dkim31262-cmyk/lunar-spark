import { useI18n } from "@/components/lunar/Locale";
import { PlateImg } from "@/components/lunar/PlateImg";

export function HumanDoor() {
  const { m } = useI18n();
  return (
    <section className="shell human-door" id="professional">
      <div className="human-grid">
        <div>
          <div className="eyebrow">{m.human.kicker}</div>
          <h2>
            {m.human.h2a}
            <br />
            {m.human.h2b}
          </h2>
          <p className="human-lede">{m.human.lede}</p>
          <span className="not-claimed">{m.human.roster}</span>
          <div className="line-row">
            {m.human.lines.map((line) => (
              <a key={line.title} className="line-chip" href={`tel:${line.title}`}>
                <b>{line.title}</b>
                <span>{line.body}</span>
              </a>
            ))}
          </div>
        </div>
        <div>
          <figure className="door-plate plate-frame">
            <PlateImg name="door" />
          </figure>
          <div className="human-notes">
            <article className="care-item">
              <b>{m.human.fit}</b>
              <p>{m.human.fitBody}</p>
            </article>
            <article className="care-item">
              <b>{m.human.collect}</b>
              <p>{m.human.collectBody}</p>
            </article>
            <article className="care-item urgent">
              <b>{m.human.danger}</b>
              <p>{m.human.dangerBody}</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
