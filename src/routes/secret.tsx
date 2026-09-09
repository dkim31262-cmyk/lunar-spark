import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { HumanDoor } from "@/components/lunar/HumanDoor";
import { useI18n } from "@/components/lunar/Locale";
import { MoonFooter, MoonNav } from "@/components/lunar/MoonNav";
import { PlateImg } from "@/components/lunar/PlateImg";
import { type ChamberId, type HivDoorId } from "@/lib/lunar/canon";
import { LETTER_KEY, load, save } from "@/lib/lunar/storage";

export const Route = createFileRoute("/secret")({ component: SecretRoom });

type Letter = { id: string; at: string; body: string };

const CHAMBER_IDS: ChamberId[] = ["circle", "whisper", "hiv"];
const HIV_IDS: HivDoorId[] = ["now", "status", "live", "prevent"];

function SecretRoom() {
  const { m } = useI18n();
  const [chamber, setChamber] = useState<ChamberId | null>(null);
  const [hiv, setHiv] = useState<HivDoorId | null>(null);
  const [draft, setDraft] = useState("");
  const [letters, setLetters] = useState<Letter[]>([]);
  const [saved, setSaved] = useState("");

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash === "circle" || hash === "whisper" || hash === "hiv") setChamber(hash);
    const stored = load<Letter[]>(LETTER_KEY, []);
    setLetters(Array.isArray(stored) ? stored.filter((x) => x && typeof x.body === "string") : []);
  }, []);

  function openChamber(id: ChamberId | null) {
    setChamber(id);
    if (id !== "hiv") setHiv(null);
    const next = id ? `#${id}` : "";
    history.replaceState(null, "", `/secret${next}`);
  }

  function sealLetter() {
    const body = draft.trim().slice(0, 280);
    if (!body) return;
    const next = [...letters, { id: crypto.randomUUID(), at: new Date().toISOString(), body }].slice(-40);
    setLetters(next);
    save(LETTER_KEY, next);
    setDraft("");
    setSaved(m.secret.sealed);
  }

  function clearLetters() {
    if (!confirm(m.secret.confirmClear)) return;
    try {
      localStorage.removeItem(LETTER_KEY);
    } catch {
      /* ignore */
    }
    setLetters([]);
    setSaved(m.secret.cleared);
  }

  const hivPanel = hiv ? m.secret.hiv[hiv] : null;

  return (
    <div className="house-root">
      <MoonNav current="secret" overlay />
      <main>
        <section className="secret-cover">
          <PlateImg name="walks" className="secret-cover-img" eager sizes="100vw" />
          <div className="cover-veil" />
          <div className="cover-frame" aria-hidden="true" />
          <div className="cover-copy">
            <p className="eyebrow">{m.secret.kicker}</p>
            <h1>
              {m.secret.h1}
              <em>{m.secret.em}</em>
            </h1>
            <p>{m.secret.lede}</p>
            <div className="hero-actions">
              <button className="btn primary" type="button" onClick={() => openChamber("circle")}>
                {m.secret.enterCircle}
              </button>
              <Link className="btn" to="/" hash="partner">
                {m.secret.back}
              </Link>
            </div>
          </div>
        </section>

        <section className="threshold">
          <div className="quiet-law">
            <b>{m.secret.law}</b>
            <span>{m.secret.lawBody}</span>
          </div>
        </section>

        <section className="shell reader-shell" id="chambers">
          <div className="reader-head">
            <div>
              <div className="eyebrow">{m.secret.chambersKicker}</div>
              <h2>
                {m.secret.chambersH2a}
                <br />
                {m.secret.chambersH2b}
              </h2>
            </div>
            <p>{m.secret.chambersLede}</p>
          </div>

          <div className="wing-grid">
            {CHAMBER_IDS.map((id) => {
              const c = m.secret.chambers[id];
              const active = chamber === id;
              return (
                <button
                  key={id}
                  type="button"
                  className={active ? "wing-card active" : "wing-card"}
                  aria-expanded={active}
                  onClick={() => openChamber(active ? null : id)}
                >
                  <small>{c.kicker}</small>
                  <h3>{c.title}</h3>
                  <p>{c.oneLine}</p>
                  <span>{active ? m.secret.close : m.secret.open} →</span>
                </button>
              );
            })}
          </div>

          {chamber === "circle" && (
            <article className="secret-folio">
              <div className="folio-meta">
                <span>{m.secret.circleMeta}</span>
                <span>{m.secret.circleLive}</span>
              </div>
              <div className="folio-intro">
                <h3>{m.secret.circleTitle}</h3>
                <p>{m.secret.circleBody}</p>
              </div>
              <div className="circle-list">
                {m.secret.voices.map((voice) => (
                  <blockquote key={voice.mark} className="circle-note">
                    <small>{voice.mark}</small>
                    <p>{voice.text}</p>
                  </blockquote>
                ))}
              </div>
              <p className="secret-law">{m.secret.circleLaw}</p>
            </article>
          )}

          {chamber === "whisper" && (
            <article className="secret-folio">
              <div className="folio-meta">
                <span>{m.secret.whisperMeta}</span>
                <span>{m.secret.whisperLocal}</span>
              </div>
              <div className="folio-intro">
                <h3>{m.secret.whisperTitle}</h3>
                <p>{m.secret.whisperBody}</p>
              </div>
              <label className="whisper-label" htmlFor="whisper">
                {m.secret.whisperLabel}
              </label>
              <textarea
                id="whisper"
                className="whisper"
                maxLength={280}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={m.secret.whisperPh}
              />
              <div className="compass-actions">
                <button className="btn primary" type="button" onClick={sealLetter} disabled={!draft.trim()}>
                  {m.secret.seal}
                </button>
                <button className="btn" type="button" onClick={clearLetters}>
                  {m.secret.clear}
                </button>
                <span className="compass-status">{saved}</span>
              </div>
              <div className="circle-list">
                {letters.length === 0 ? (
                  <p className="empty-ledger">{m.secret.emptyLetters}</p>
                ) : (
                  letters
                    .slice()
                    .reverse()
                    .map((letter) => (
                      <blockquote key={letter.id} className="circle-note">
                        <small>SEALED · {letter.at.slice(0, 10)}</small>
                        <p>{letter.body}</p>
                      </blockquote>
                    ))
                )}
              </div>
            </article>
          )}

          {chamber === "hiv" && (
            <article className="secret-folio">
              <div className="folio-meta">
                <span>{m.secret.hivMeta}</span>
                <span>{m.secret.hivClinic}</span>
              </div>
              <div className="folio-intro">
                <h3>{m.secret.hivTitle}</h3>
                <p>{m.secret.hivBody}</p>
              </div>
              <div className="hiv-grid">
                {HIV_IDS.map((id) => {
                  const d = m.secret.hiv[id];
                  const active = hiv === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      className={active ? "hiv-door active" : "hiv-door"}
                      aria-expanded={active}
                      onClick={() => setHiv(active ? null : id)}
                    >
                      <small>{d.kicker}</small>
                      <b>{d.title}</b>
                      <span>{d.oneLine}</span>
                    </button>
                  );
                })}
              </div>
              {hivPanel && hiv && (
                <div className="hiv-panel">
                  <p className="secret-law">{hivPanel.law}</p>
                  <ol>
                    {hivPanel.facts.map((fact, i) => (
                      <li key={fact}>
                        <small>{String(i + 1).padStart(2, "0")}</small>
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ol>
                  <p>{hivPanel.never}</p>
                  <p>{hivPanel.next}</p>
                  <div className="hero-actions">
                    <a className="btn primary" href="#professional">
                      {m.secret.humanCta}
                    </a>
                    <a className="btn" href="https://hivhub.ddc.moph.go.th/" target="_blank" rel="noopener">
                      {m.secret.hub}
                    </a>
                    <a className="btn" href="https://www.trcarc.org/" target="_blank" rel="noopener">
                      {m.secret.redcross}
                    </a>
                  </div>
                </div>
              )}
            </article>
          )}
        </section>
        <HumanDoor />
      </main>
      <MoonFooter />
    </div>
  );
}
