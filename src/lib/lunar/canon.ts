import type { Capacity, Direction, Friction, Outcome, Support } from "./core";

export const AXES: {
  key: "capacity" | "direction" | "friction" | "support";
  title: string;
  hint: string;
  options: { value: Capacity | Direction | Friction | Support; label: string }[];
}[] = [
  {
    key: "capacity",
    title: "Capacity",
    hint: "แรงที่มีให้วันนี้",
    options: [
      { value: "low", label: "แรงน้อยมาก" },
      { value: "limited", label: "ขยับได้ทีละนิด" },
      { value: "steady", label: "มีพื้นที่พอลอง" },
    ],
  },
  {
    key: "direction",
    title: "Direction",
    hint: "อยากขยับไปทางไหน",
    options: [
      { value: "rest", label: "พัก / ลดเสียง" },
      { value: "clarify", label: "ทำให้ชัดขึ้น" },
      { value: "reconnect", label: "กลับไปหาคน / โลก" },
      { value: "one_thing", label: "ทำหนึ่งอย่างจริง" },
    ],
  },
  {
    key: "friction",
    title: "Friction",
    hint: "สิ่งที่รู้สึกว่าดึงไว้",
    options: [
      { value: "noise", label: "noise เยอะ" },
      { value: "body", label: "ร่างกาย / ความล้า" },
      { value: "not_yet", label: "ยังไม่อยากแตะตอนนี้" },
      { value: "overload", label: "หลายเรื่องทับกัน" },
      { value: "unknown", label: "ยังไม่รู้" },
    ],
  },
  {
    key: "support",
    title: "Support",
    hint: "อยากเดินแบบไหน",
    options: [
      { value: "solo", label: "ลองเองก่อน" },
      { value: "someone", label: "มีใครสักคน" },
      { value: "professional", label: "อยากหาผู้เชี่ยวชาญ" },
    ],
  },
];

export const REFLECTION_LABELS = {
  capacity: {
    low: "แรงน้อย — ขอให้เล็กมาก",
    limited: "พอขยับได้ทีละนิด",
    steady: "มีพื้นที่พอลองของจริง",
  },
  direction: {
    rest: "พัก / ลดเสียง",
    clarify: "ทำให้เรื่องหนึ่งชัดขึ้น",
    reconnect: "กลับไปหาคนหรือโลก",
    one_thing: "ทำของจริงหนึ่งอย่าง",
  },
  friction: {
    noise: "เสียงในหัว/สิ่งรบกวนเยอะ",
    body: "ร่างกายหรือความล้าดึงไว้",
    not_yet: "ยังไม่อยากแตะตอนนี้",
    overload: "หลายเรื่องทับกัน",
    unknown: "ยังไม่รู้ว่าติดตรงไหน",
  },
  support: {
    solo: "ลองเองก่อน",
    someone: "อยากมีใครสักคนร่วมทาง",
    professional: "อยากคุยกับผู้เชี่ยวชาญ",
  },
} as const;

export const OUTCOME_COPY: Record<Outcome, string> = {
  tried: "บันทึกว่า “ลองแล้ว” — สิ่งต่อไปคือดูว่าโลกตอบอะไร ไม่ใช่รีบสรุปว่าดี/ไม่ดี",
  not_for_me: "“ไม่ใช่สำหรับฉัน” เป็น evidence ที่มีค่า ไม่ใช่ความล้มเหลว",
  worse_for_me: "รับรู้แล้วว่า “แย่ลงสำหรับฉัน” — จะไม่ตีความกลับให้เป็นความสำเร็จ",
  stop_rule_used: "บันทึกว่าใช้ stop rule แล้ว — การหยุดตามกติกาเป็นข้อมูล ไม่ใช่ความล้มเหลว",
  need_human: "รับรู้แล้วว่าอยากได้คนช่วย — ระบบจะไม่แกล้งเป็นผู้เชี่ยวชาญแทน",
  skipped: "ข้ามได้เต็มที่ การไม่ทำ experiment ก็เป็นข้อมูล",
};

export const OUTCOME_BUTTONS: { id: Outcome; label: string; spark?: boolean }[] = [
  { id: "tried", label: "I TRIED IT" },
  { id: "not_for_me", label: "NOT FOR ME" },
  { id: "worse_for_me", label: "WORSE FOR ME", spark: true },
  { id: "stop_rule_used", label: "I USED THE STOP RULE" },
  { id: "need_human", label: "I NEED A HUMAN", spark: true },
  { id: "skipped", label: "SKIP" },
];

export const PRINCIPLES = [
  {
    title: "ดูสิ่งที่คุณบอก",
    body: "ระบบไม่เดาเรื่องที่คุณไม่ได้พูด และไม่มีการวินิจฉัย",
  },
  {
    title: "ก้าวเล็ก ๆ ไม่ใช่คำสั่ง",
    body: "ลองได้ ข้ามได้ หยุดได้ — ไม่มีคะแนนว่าดีหรือไม่ดี",
  },
  {
    title: "คนจริงอยู่คนละประตู",
    body: "อยากได้หมอหรือสายด่วน กดได้เลย แอปไม่แกล้งเป็นคน",
  },
];


export const SIT_IDS = ["mind", "body", "sleep", "energy", "pain", "people", "not_yet"] as const;
export type SitId = (typeof SIT_IDS)[number];

export const SIT_WITH: { id: SitId; label: string }[] = [
  { id: "mind", label: "ใจ" },
  { id: "body", label: "ร่างกาย" },
  { id: "sleep", label: "การนอน" },
  { id: "energy", label: "แรง / ความเหนื่อย" },
  { id: "pain", label: "ความเจ็บ" },
  { id: "people", label: "คนรอบตัว" },
  { id: "not_yet", label: "ยังไม่พร้อมบอก" },
];

export const WINGS = [
  {
    id: "healing",
    kicker: "01 · CLAUDE",
    title: "Healing Partner",
    body: "เรือธงของบ้าน. นั่งด้วยใจและร่างกายตามที่คุณบอก ไม่ใช่แบบทดสอบสั้น ๆ. Compass สี่แกนเป็นเครื่องมือที่คุณเลือกเอง — ไม่มีคะแนน และไม่แกล้งเป็นนักบำบัด.",
    href: "/#partner",
    cta: "OPEN THE PARTNER",
  },
  {
    id: "secret",
    kicker: "02 · GROK",
    title: "ห้องแห่งความลับ",
    body: "สมาคมเงียบสำหรับคนที่ยังไม่อยากให้ใครรู้ — ซึมเศร้า จิต หรือ HIV. ไม่ใช่แชทสด และไม่ขึ้นเวทีหลัก.",
    href: "/secret",
    cta: "ENTER THE ROOM",
  },
] as const;

export type ChamberId = "circle" | "whisper" | "hiv";

export const CHAMBERS: {
  id: ChamberId;
  kicker: string;
  title: string;
  oneLine: string;
}[] = [
  {
    id: "circle",
    kicker: "01 · สมาคมที่ไม่มีชื่อ",
    title: "วงที่ไม่อยากให้ใครรู้",
    oneLine: "สำหรับวันที่ซึมเศร้าหรือจิตยังไม่ใช่เรื่องที่เล่าได้",
  },
  {
    id: "whisper",
    kicker: "02 · จดหมายปิดผนึก",
    title: "พูดโดยไม่ถูกเรียกชื่อ",
    oneLine: "เขียนแล้วอยู่เครื่องนี้เท่านั้น — ไม่มีผู้รับในโลกจริง",
  },
  {
    id: "hiv",
    kicker: "03 · ร่างกายและความลับ",
    title: "HIV",
    oneLine: "ทางเดินทางการแพทย์–สังคม ไม่ใช่คะแนนใน Compass",
  },
];

export const CIRCLE_VOICES = [
  {
    mark: "COMPOSITE 01",
    text: "ฉันไม่ได้หาย ฉันแค่ยังไม่อยากเล่าให้คนที่บ้านฟัง. การได้อยู่ในห้องที่ไม่มีใครเรียกชื่อ ทำให้ฉันหายใจได้หนึ่งรอบ.",
  },
  {
    mark: "COMPOSITE 02",
    text: "คนคิดว่าซึมเศร้าต้องดูเศร้า. ฉันไปทำงานได้ ยิ้มได้ และยังไม่อยากให้ใครรู้.",
  },
  {
    mark: "COMPOSITE 03",
    text: "HIV ไม่ใช่บุคลิกของฉัน และไม่ใช่คะแนนในแอป. ฉันมาที่นี่เพราะยังไม่อยากอธิบายตัวเอง.",
  },
  {
    mark: "COMPOSITE 04",
    text: "ถ้าวันนี้มีแรงแค่ปิดประตู แค่นั้นก็พอ. ไม่ต้องกลายเป็นแรงบันดาลใจของใคร.",
  },
];

export type HivDoorId = "now" | "status" | "live" | "prevent";

export const HIV_DOORS: {
  id: HivDoorId;
  kicker: string;
  title: string;
  oneLine: string;
}[] = [
  { id: "now", kicker: "01 · ชั่วโมงนี้", title: "เพิ่งสัมผัส", oneLine: "อย่ารอหน้านี้ตัดสินแทนห้องตรวจ" },
  { id: "status", kicker: "02 · ความจริง", title: "อยากรู้สถานะ", oneLine: "การตรวจเป็นเรื่องของหน่วยบริการ ไม่ใช่แบบทดสอบบนจอ" },
  { id: "live", kicker: "03 · อยู่กับเชื้อ", title: "ใช้ชีวิตต่อ", oneLine: "HIV ไม่ใช่ประโยคปิดชีวิต และไม่ใช่คะแนนในแอป" },
  { id: "prevent", kicker: "04 · ป้องกัน", title: "ลดโอกาสครั้งหน้า", oneLine: "PrEP / ถุงยาง / สิทธิในระบบจริง — ไม่ใช่ใบสั่งยาจาก AI" },
];

export const HIV_PANELS: Record<
  HivDoorId,
  { law: string; facts: string[]; never: string; next: string }
> = {
  now: {
    law: "PEP เป็นการตัดสินของคลินิกในชั่วโมงจริง ไม่ใช่ปุ่มบนเว็บ.",
    facts: [
      "ถ้าเพิ่งมีเพศสัมพันธ์โดยไม่ป้องกัน ถุงยางแตก เข็มเปื้อน หรือถูกบังคับ — นี่เป็นเรื่องเวลา ไม่ใช่เรื่องความอาย.",
      "แนวทางสากลและไทยชี้ให้เริ่ม PEP เร็ว ภายในหน้าต่างเวลาที่จำกัด. ตัวเลขชั่วโมงที่เป็นปัจจุบันเป็นของแนวทางคลินิก — ไม่ล็อกในหน้านี้.",
      "อย่าเริ่มยาจากคำแนะนำของ AI. อย่าแบ่งยาของคนอื่น. อย่ารอจน ‘แน่ใจว่าติด’.",
      "ถ้ามีบาดแผล การถูกทำร้าย หรืออาการไม่นิ่ง ให้ physiology และความปลอดภัยมาก่อนชื่อโรค.",
    ],
    never: "หน้านี้ไม่มีแบบประเมินความเสี่ยงที่ให้คำตอบว่าติดหรือไม่ และไม่มีขนาดยา.",
    next: "ไปหน่วยบริการวันนี้. แล้วค่อยกลับมาอ่านประตูอื่น.",
  },
  status: {
    law: "มีทางเดียวที่จะรู้สถานะ HIV ของตัวเอง: การตรวจในโลกจริง.",
    facts: [
      "หน้านี้ไม่ใช่แบบทดสอบ ไม่ใช่ chatbot วินิจฉัย และจะไม่ทายจากอาการ.",
      "ในระบบสาธารณสุขไทยมีการตรวจ ชุดตรวจด้วยตนเอง และคลินิกนิรนาม — สิทธิและสถานที่ดูจาก HIV INFO HUB / หน่วยบริการปัจจุบัน.",
      "ช่วงหน้าต่างว่าง (window period) ทำให้ผลลบเร็วเกินไปยังไม่ปิดเรื่อง. การอ่านผลเป็นของผู้ให้บริการ.",
      "ผลบวกไม่ใช่ประโยคปิดชีวิต. ผลลบไม่ใช่ใบอนุญาตให้เลิกป้องกัน.",
    ],
    never: "ไม่เก็บคำตอบแบบฟอร์มที่แอบเป็น diagnosis และไม่สร้าง ‘คะแนนความเสี่ยง’.",
    next: "เลือกหน่วยตรวจ. อย่าส่งผลเลือดหรือรายละเอียดทางคลินิกมาให้ AI.",
  },
  live: {
    law: "ผู้มีชีวิตอยู่กับ HIV ไม่ใช่เคสของแอป และไม่ใช่บทลงโทษ.",
    facts: [
      "HIV กดได้ด้วยยาต้านไวรัส (ART) ที่แพทย์สั่ง. หน้านี้ไม่ระบุสูตรยา ขนาด หรือค่า CD4 เป็นคำสั่ง.",
      "U=U — เมื่อปริมาณเชื้อในเลือดถูกกดจนตรวจไม่พบตามนิยามทางคลินิก การไม่ถ่ายทอดทางเพศสัมพันธ์เป็นหลักฐานที่วงการยอมรับ. การยืนยันสถานะนั้นเป็นของคลินิก ไม่ใช่ของหน้านี้.",
      "เอดส์ (AIDS) คือภาวะที่ภูมิคุ้มกันถูกทำลายจนเกิดโรคฉวยโอกาส — ไม่ใช่คำพ้องของ HIV ทุกคน.",
      "การตีตราทำให้คนไม่ไปตรวจและไม่ไปรักษา. ความอายไม่ใช่ข้อมูลทางการแพทย์.",
    ],
    never: "ไม่ทำ viral load เป็นสกอร์ใน UI และไม่แกล้งเป็นคลินิกติดตามยา.",
    next: "การรักษากลับไปที่แพทย์/คลินิก. ถ้าใจไม่ไหว มี Healing Partner และประตูคนแยกต่างหาก.",
  },
  prevent: {
    law: "การป้องกันที่มีหลักฐานอยู่ในโลกจริง: ถุงยาง PrEP PEP ART ของคู่นอนที่กดเชื้อได้ — ไม่ได้อยู่ในโมเดล.",
    facts: [
      "ถุงยางยังเป็นเครื่องมือที่จับต้องได้และไม่ต้องรอใบสั่งจากแอป.",
      "PrEP คือยาป้องกันก่อนสัมผัส สำหรับคนที่ยังไม่มีเชื้อ. ต้องตรวจและรับจากหน่วยบริการ. หน้านี้ไม่เลือกสูตรให้.",
      "PEP คือหลังสัมผัส. PrEP คือก่อน. อย่าสลับกันเอง.",
      "การมีเพศสัมพันธ์ การใช้สาร และการถูกบังคับ ไม่ได้อยู่บนแกนศีลธรรมของหน้านี้.",
    ],
    never: "ไม่จัดกลุ่มคนเป็น ‘เสี่ยงสูง’ จากคลิกเดียว และไม่ขายความกลัว.",
    next: "ถามหน่วยบริการเรื่อง PrEP / ถุงยาง / วัคซีนตับอักเสบถ้าเกี่ยวข้อง. ไม่ถาม AI เพื่อได้ยา.",
  },
};

export const LINES = [
  { title: "1669", body: "ฉุกเฉิน / ร่างกายไม่นิ่ง", href: "tel:1669" },
  { title: "1323", body: "สายด่วนสุขภาพจิต", href: "tel:1323" },
  { title: "1413", body: "สะมาริตันส์แห่งประเทศไทย", href: "tel:1413" },
];
