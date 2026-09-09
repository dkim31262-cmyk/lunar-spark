import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MoonFooter, MoonNav } from "@/components/lunar/MoonNav";
import { useI18n } from "@/components/lunar/Locale";
import { AI_DOORS, CONTINUE_URL, ORIGINAL_URL, REPO_URL, SEED } from "@/lib/lunar/bridge";

export const Route = createFileRoute("/handoff")({ component: Handoff });

function Handoff() {
  const { m } = useI18n();
  const h = m.handoff;
  const [copied, setCopied] = useState<"brief" | "repo" | "">("");

  async function copy(text: string, which: "brief" | "repo") {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(which);
    } catch {
      setCopied("");
    }
  }

  const notes: Record<(typeof AI_DOORS)[number]["id"], string> = {
    claude: h.claude,
    gpt: h.gpt,
    gemini: h.gemini,
  };

  return (
    <div>
      <MoonNav current="handoff" />
      <main className="shell handoff-shell">
        <div className="eyebrow">{h.kicker}</div>
        <h1>
          {h.title}
          <em>{h.em}</em>
        </h1>
        <p className="path-yes">{h.yes}</p>
        <p className="handoff-lede">{h.why}</p>

        <ol className="path-steps">
          <li className="path-step">
            <small>{h.step1k}</small>
            <b>{h.step1t}</b>
            <p>{h.step1b}</p>
            <div className="hero-actions">
              <a className="btn primary" href={REPO_URL} target="_blank" rel="noopener">
                {h.step1cta} →
              </a>
              <button className="btn" type="button" onClick={() => copy(REPO_URL, "repo")}>
                {copied === "repo" ? h.copiedRepo : h.copyRepo}
              </button>
            </div>
          </li>
          <li className="path-step">
            <small>{h.step2k}</small>
            <b>{h.step2t}</b>
            <p>{h.step2b}</p>
            <div className="hero-actions">
              <a className="btn" href={ORIGINAL_URL} target="_blank" rel="noopener">
                {h.step2cta} →
              </a>
            </div>
          </li>
          <li className="path-step">
            <small>{h.step3k}</small>
            <b>{h.step3t}</b>
            <p>{h.step3b}</p>
          </li>
        </ol>

        <div className="bridge-grid">
          {AI_DOORS.map((door) => (
            <a key={door.id} className="bridge-card" href={door.href} target="_blank" rel="noopener">
              <small>{door.kicker}</small>
              <b>{door.title}</b>
              <span>{notes[door.id]}</span>
            </a>
          ))}
        </div>

        <p className="handoff-lede">
          {h.sourceLabel}:{" "}
          <a href={CONTINUE_URL} target="_blank" rel="noopener">
            CONTINUE.md
          </a>
          {" · "}
          <a href={REPO_URL} target="_blank" rel="noopener">
            {REPO_URL}
          </a>
        </p>

        <div className="quiet-law path-law">
          <b>{h.lawTitle}</b>
          <span>{h.lawBody}</span>
        </div>

        <div className="hero-actions">
          <button className="btn primary" type="button" onClick={() => copy(SEED, "brief")}>
            {copied === "brief" ? h.copiedBrief : h.copyBrief} →
          </button>
          <Link className="btn" to="/">
            {h.back}
          </Link>
        </div>
        <pre className="handoff-brief">{SEED}</pre>
      </main>
      <MoonFooter />
    </div>
  );
}
