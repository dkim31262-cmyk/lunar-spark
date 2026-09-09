import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Compass } from "@/components/lunar/Compass";
import { HumanDoor } from "@/components/lunar/HumanDoor";
import { Later } from "@/components/lunar/Later";
import { Ledger } from "@/components/lunar/Ledger";
import { useI18n } from "@/components/lunar/Locale";
import { MoonFooter, MoonNav } from "@/components/lunar/MoonNav";
import { Partner } from "@/components/lunar/Partner";
import { PlateImg } from "@/components/lunar/PlateImg";
import { normalizeCompass, type Trace } from "@/lib/lunar/core";
import { load, TRACE_KEY } from "@/lib/lunar/storage";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { m } = useI18n();
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
          <PlateImg name="harbor" className="cover-img" eager sizes="100vw" />
          <div className="cover-veil" />
          <div className="cover-frame" aria-hidden="true" />
          <div className="cover-copy">
            <p className="eyebrow">LUNAR SPARK</p>
            <h1>
              {m.cover.h1}
              <em>{m.cover.em}</em>
            </h1>
            <p>{m.cover.lede}</p>
            <div className="hero-actions">
              <a className="btn primary" href="#partner">
                {m.cover.sit}
              </a>
              <a className="btn" href="#walks">
                {m.cover.walk}
              </a>
            </div>
          </div>
        </section>

        <section className="threshold" id="threshold">
          <div className="quiet-law">
            <b>{m.threshold.law}</b>
            <span>{m.threshold.lawBody}</span>
          </div>
          <p className="threshold-note">{m.threshold.note}</p>
        </section>

        <section className="walks-plate" id="walks">
          <div className="walks-visual">
            <PlateImg name="walks" sizes="100vw" />
            <div className="walk-veil" />
            <div className="cover-frame" aria-hidden="true" />
          </div>
          <div className="walk-hits">
            <a className="walk-hit left" href="#partner">
              <small>{m.walks.leftKicker}</small>
              <h2>{m.walks.leftTitle}</h2>
              <p>{m.walks.leftBody}</p>
              <span>{m.walks.leftCta}</span>
            </a>
            <Link className="walk-hit right" to="/secret">
              <small>{m.walks.rightKicker}</small>
              <h2>{m.walks.rightTitle}</h2>
              <p>{m.walks.rightBody}</p>
              <span>{m.walks.rightCta}</span>
            </Link>
          </div>
        </section>

        <section className="spark-band">
          <figure className="plate-frame">
            <PlateImg name="hands" />
          </figure>
          <div>
            <p className="eyebrow">{m.spark.kicker}</p>
            <h2>
              {m.spark.h2a}
              <br />
              {m.spark.h2b}
            </h2>
            <p>{m.spark.body}</p>
          </div>
        </section>

        <section className="principles">
          <div className="principles-inner">
            {m.principles.map((p) => (
              <div className="principle" key={p.title}>
                <b>{p.title}</b>
                <span>{p.body}</span>
              </div>
            ))}
          </div>
        </section>

        <Partner />
        <Later hashes={["compass", "professional", "experimentPanel"]}>
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
              <p className="eyebrow">{m.patron.inviteKicker}</p>
              <h2>
                {m.patron.inviteH2a}
                <br />
                {m.patron.inviteH2b}
              </h2>
              <p className="human-lede">{m.patron.inviteLede}</p>
              <div className="hero-actions">
                <Link className="btn primary" to="/patron">
                  {m.patron.inviteCta}
                </Link>
              </div>
            </div>
            <figure className="plate-frame">
              <PlateImg name="sanctum" />
            </figure>
          </section>
        </Later>
      </main>
      <MoonFooter />
    </div>
  );
}
