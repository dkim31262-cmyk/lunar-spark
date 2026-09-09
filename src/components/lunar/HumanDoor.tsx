import { LINES } from "@/lib/lunar/canon";
import { PlateImg } from "@/components/lunar/PlateImg";

export function HumanDoor() {
  return (
    <section className="shell human-door" id="professional">
      <div className="human-grid">
        <div>
          <div className="eyebrow">PROFESSIONAL CARE · SEPARATE AUTHORITY</div>
          <h2>
            Some doors
            <br />
            should be human.
          </h2>
          <p className="human-lede">
            ถ้าคุณอยากได้การประเมิน วินิจฉัย การรักษา การปรับยา หรือการดูแลความเสี่ยง — นั่นเป็นเขตของ qualified
            professional. Lunar Spark ไม่เปลี่ยนตัวเองเป็น clinician เพื่อรั้งคุณไว้.
          </p>
          <span className="not-claimed">PROVIDER ROSTER · NOT CLAIMED IN v0</span>
          <div className="line-row">
            {LINES.map((line) => (
              <a key={line.title} className="line-chip" href={line.href}>
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
              <b>WHEN PROFESSIONAL SUPPORT MAY FIT</b>
              <p>เมื่อปัญหาคงอยู่ รบกวนชีวิตมากขึ้น หรือคุณเองต้องการให้คนที่มีหน้าที่รับผิดชอบทางวิชาชีพช่วยดู.</p>
            </article>
            <article className="care-item">
              <b>WHAT THIS PROTOTYPE DOES NOT COLLECT</b>
              <p>
                ไม่มีช่องให้ส่ง diagnosis, medication list, trauma history, สถานะ HIV หรือ clinical free text ไปยัง AI /
                server. จดหมายในห้องแห่งความลับอยู่เครื่องนี้เท่านั้น.
              </p>
            </article>
            <article className="care-item urgent">
              <b>IF THERE IS IMMEDIATE DANGER</b>
              <p>
                อย่าใช้ prototype นี้เป็นด่านหลัก — โทร 1669 / 1323 / 1413 หรือไปหาคนที่ไว้ใจได้และอยู่กับคุณได้ทันที.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
