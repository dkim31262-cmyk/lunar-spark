import { PlateImg } from "@/components/lunar/PlateImg";
import { LangSwitch, useI18n } from "@/components/lunar/Locale";
import { useEffect, useState, type ReactNode } from "react";
import { GATE_KEY, load, save } from "@/lib/lunar/storage";

type Phase = "pending" | "door" | "manual" | "in";

export function openManual() {
  window.dispatchEvent(new Event("lunar:open-manual"));
}

export function Gate({ children }: { children: ReactNode }) {
  const { m } = useI18n();
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
      <div className="gate" role="dialog" aria-label={m.door.aria}>
        <PlateImg name="poster" className="gate-img" eager sizes="100vw" />
        <div className="gate-veil" />
        <div className="cover-frame" aria-hidden="true" />
        <div className="gate-door">
          <LangSwitch placement="door" />
          <p className="eyebrow">LUNAR SPARK</p>
          <h1>{m.door.title}</h1>
          <p>{m.door.lede}</p>
          <button className="btn primary gate-enter-btn" type="button" onClick={enterSite}>
            {m.door.enter}
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
        <LangSwitch placement="door" />
        <p className="eyebrow">{m.manual.kicker}</p>
        <h2 id="manual-title">{m.manual.title}</h2>
        <p>{m.manual.p1}</p>
        <p>{m.manual.p2}</p>

        <h3>{m.manual.can}</h3>
        <ol className="manual-list">
          <li>
            <b>{m.manual.partnerTitle}</b>
            <span>{m.manual.partnerBody}</span>
          </li>
          <li>
            <b>{m.manual.secretTitle}</b>
            <span>{m.manual.secretBody}</span>
          </li>
          <li>
            <b>{m.manual.humanTitle}</b>
            <span>{m.manual.humanBody}</span>
          </li>
          <li>
            <b>{m.manual.patronTitle}</b>
            <span>{m.manual.patronBody}</span>
          </li>
        </ol>

        <h3>{m.manual.not}</h3>
        <p>{m.manual.notBody}</p>

        <div className="manual-actions">
          <button className="btn primary gate-enter-btn" type="button" onClick={closeManual}>
            {m.manual.close}
          </button>
        </div>
      </article>
    </div>
  );
}
