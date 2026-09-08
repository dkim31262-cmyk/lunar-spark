import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MoonNav } from "@/components/lunar/MoonNav";
import { AI_DOORS, ORIGINAL_URL, REPO_URL, SEED } from "@/lib/lunar/bridge";

export const Route = createFileRoute("/handoff")({ component: Handoff });

function Handoff() {
  const [copied, setCopied] = useState<"brief" | "repo" | "">("");

  async function copy(text: string, which: "brief" | "repo") {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(which);
    } catch {
      setCopied("");
    }
  }

  return (
    <div>
      <MoonNav current="handoff" />
      <main className="shell handoff-shell">
        <div className="eyebrow">BRIDGE · CLAUDE · CHATGPT · GEMINI</div>
        <h1>
          One door.
          <em>Three seats at the same table.</em>
        </h1>
        <p className="handoff-lede">
          นี่คือลิงก์ตรงของ Lunar Spark. เปิด GitHub เพื่อชมบ้านและพัฒนาต่อ. ปุ่มด้านล่างส่ง brief เข้า Claude,
          ChatGPT, หรือ Gemini โดยไม่ต้องสร้างสถาปัตยกรรมใหม่.
        </p>

        <div className="hero-actions">
          <a className="btn primary" href={REPO_URL} target="_blank" rel="noopener">
            OPEN THE SOURCE →
          </a>
          <button className="btn" type="button" onClick={() => copy(REPO_URL, "repo")}>
            {copied === "repo" ? "COPIED REPO" : "COPY REPO LINK"}
          </button>
          <a className="btn" href={ORIGINAL_URL} target="_blank" rel="noopener">
            ORIGINAL WP PAGE
          </a>
        </div>

        <div className="bridge-grid">
          {AI_DOORS.map((door) => (
            <a key={door.id} className="bridge-card" href={door.href} target="_blank" rel="noopener">
              <small>{door.kicker}</small>
              <b>{door.title}</b>
              <span>{door.note}</span>
            </a>
          ))}
        </div>

        <p className="handoff-lede">
          Direct source: <a href={REPO_URL}>{REPO_URL}</a>
        </p>

        <div className="hero-actions">
          <button className="btn primary" type="button" onClick={() => copy(SEED, "brief")}>
            {copied === "brief" ? "COPIED BRIEF" : "COPY BRIEF FOR ANY AI →"}
          </button>
          <Link className="btn" to="/">
            BACK TO THE HOUSE
          </Link>
        </div>
        <pre className="handoff-brief">{SEED}</pre>
      </main>
    </div>
  );
}
