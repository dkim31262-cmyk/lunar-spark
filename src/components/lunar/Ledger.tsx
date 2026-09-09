import { useI18n } from "@/components/lunar/Locale";
import { buildHandoffPacket, summarizeLedger, type Trace } from "@/lib/lunar/core";
import { load, STATE_KEY, TRACE_KEY } from "@/lib/lunar/storage";
import type { PartialCompass } from "@/lib/lunar/core";

export function Ledger({
  traces,
  onClear,
}: {
  traces: Trace[];
  onClear: () => void;
}) {
  const { m } = useI18n();
  const summary = summarizeLedger(traces);

  function exportData() {
    let current = null;
    try {
      current = load<PartialCompass>(STATE_KEY, {});
      current = current && typeof current === "object" ? current : null;
    } catch {
      current = null;
    }
    let packet = null;
    try {
      packet = current ? buildHandoffPacket(current, traces) : null;
    } catch {
      packet = null;
    }
    const payload = {
      exported_at: new Date().toISOString(),
      current_compass: packet ? packet.current_compass : null,
      packet,
      traces,
      export_note: packet
        ? "Current Compass reflects explicit selections only."
        : "No current Compass exported because no complete explicit selection exists.",
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `Lunar_Spark_Local_Evidence_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    const url = a.href;
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 800);
    const msg = document.getElementById("ledgerMessage");
    if (msg) msg.textContent = m.ledger.exported;
  }

  function clearLocal() {
    if (!confirm(m.ledger.confirm)) return;
    try {
      localStorage.removeItem(STATE_KEY);
      localStorage.removeItem(TRACE_KEY);
    } catch {
      /* ignore */
    }
    onClear();
    const msg = document.getElementById("ledgerMessage");
    if (msg) msg.textContent = m.ledger.cleared;
  }

  return (
    <section className="ledger-shell" id="lab">
      <div className="shell ledger">
        <div className="ledger-top">
          <div className="ledger-copy">
            <div className="eyebrow">{m.ledger.kicker}</div>
            <h2 className="ledger-title">
              {m.ledger.h2a}
              <br />
              {m.ledger.h2b}
            </h2>
            <p>{m.ledger.lede}</p>
          </div>
          <div className="stats">
            <div className="stat">
              <small>{m.ledger.total}</small>
              <b>{summary.total}</b>
            </div>
            <div className="stat">
              <small>TRIED</small>
              <b>{summary.counts.tried}</b>
            </div>
            <div className="stat">
              <small>NOT FOR ME</small>
              <b>{summary.counts.not_for_me}</b>
            </div>
            <div className="stat">
              <small>WORSE FOR ME</small>
              <b>{summary.counts.worse_for_me}</b>
            </div>
            <div className="stat">
              <small>STOP RULE USED</small>
              <b>{summary.counts.stop_rule_used}</b>
            </div>
            <div className="stat">
              <small>NEED HUMAN</small>
              <b>{summary.counts.need_human}</b>
            </div>
            <div className="stat">
              <small>SKIPPED</small>
              <b>{summary.counts.skipped}</b>
            </div>
          </div>
        </div>
        <div className="ledger-rows">
          {traces.length === 0 ? (
            <div className="empty-ledger">{m.ledger.empty}</div>
          ) : (
            traces
              .slice(-6)
              .reverse()
              .map((t) => (
                <article className="trace" key={`${t.at}-${t.experiment_id}-${t.outcome}`}>
                  <div>
                    <small>
                      {t.at.slice(0, 10)} · {t.outcome.replaceAll("_", " ")}
                    </small>
                    <b>{t.experiment_title}</b>
                    {t.note ? <p>{t.note}</p> : null}
                  </div>
                  <span>{m.compass.reflection.direction[t.compass.direction]}</span>
                </article>
              ))
          )}
        </div>
        <div className="ledger-actions">
          <button className="btn" type="button" onClick={exportData}>
            {m.ledger.export}
          </button>
          <button className="btn" type="button" onClick={clearLocal}>
            {m.ledger.clear}
          </button>
        </div>
        <div className="ledger-message" id="ledgerMessage" role="status" aria-live="polite">
          {m.ledger.stay}
        </div>
      </div>
    </section>
  );
}
