import type { Capacity, Direction, Friction, Outcome, Support } from "./core";
import type { HivDoorId, SitId } from "./canon";

export const LOCALES = ["th", "en", "ja", "zh", "ko"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_META: { id: Locale; native: string }[] = [
  { id: "th", native: "ไทย" },
  { id: "en", native: "English" },
  { id: "ja", native: "日本語" },
  { id: "zh", native: "中文" },
  { id: "ko", native: "한국어" },
];

export const HTML_LANG: Record<Locale, string> = {
  th: "th",
  en: "en",
  ja: "ja",
  zh: "zh-Hans",
  ko: "ko",
};

export const CJK_FONT: Record<Locale, string | null> = {
  th: null,
  en: null,
  ja: "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Noto+Serif+JP:wght@400;600&display=swap",
  zh: "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&family=Noto+Serif+SC:wght@400;600&display=swap",
  ko: "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&family=Noto+Serif+KR:wght@400;600&display=swap",
};

export const LANG_NAME: Record<Locale, string> = {
  th: "Thai",
  en: "English",
  ja: "Japanese",
  zh: "Simplified Chinese",
  ko: "Korean",
};

type AxisCopy<V extends string> = { title: string; hint: string; options: Record<V, string> };

export type Messages = {
  nav: { partner: string; secret: string; patron: string; manual: string; lang: string };
  door: { aria: string; title: string; lede: string; enter: string };
  manual: {
    kicker: string;
    title: string;
    p1: string;
    p2: string;
    can: string;
    partnerTitle: string;
    partnerBody: string;
    secretTitle: string;
    secretBody: string;
    humanTitle: string;
    humanBody: string;
    patronTitle: string;
    patronBody: string;
    not: string;
    notBody: string;
    close: string;
  };
  cover: { h1: string; em: string; lede: string; sit: string; walk: string };
  threshold: { law: string; lawBody: string; note: string };
  walks: {
    leftKicker: string;
    leftTitle: string;
    leftBody: string;
    leftCta: string;
    rightKicker: string;
    rightTitle: string;
    rightBody: string;
    rightCta: string;
  };
  spark: { kicker: string; h2a: string; h2b: string; body: string };
  principles: { title: string; body: string }[];
  partner: {
    kicker: string;
    h2a: string;
    h2b: string;
    lede: string;
    law: string;
    compassLink: string;
    sitLabel: string;
    you: string;
    name: string;
    welcome: string;
    waiting: string;
    seedsLabel: string;
    draftLabel: string;
    placeholder: string;
    send: string;
    sending: string;
    idle: string;
    done: string;
    crisisStatus: string;
    timeout: string;
    errorDown: string;
    errorSlow: string;
    errorQuiet: string;
    sit: Record<SitId, string>;
    seeds: { label: string; text: string }[];
    crisis: string;
    vesselIdle: string;
    vesselBusy: string;
  };
  compass: {
    kicker: string;
    h2a: string;
    h2b: string;
    lede: string;
    folioA: string;
    folioB: string;
    introTitle: string;
    introBody: string;
    make: string;
    needFour: string;
    ready: string;
    restAsk: string;
    restYes: string;
    restNo: string;
    restQuestion: string;
    told: string;
    proTitle: string;
    proBody: string;
    proLink: string;
    path: string;
    step: string;
    stop: string;
    reality: string;
    window: string;
    noteLabel: string;
    notePh: string;
    notePrivacy: string;
    capacity: AxisCopy<Capacity>;
    direction: AxisCopy<Direction>;
    friction: AxisCopy<Friction>;
    support: AxisCopy<Support>;
    reflection: {
      capacity: Record<Capacity, string>;
      direction: Record<Direction, string>;
      friction: Record<Friction, string>;
      support: Record<Support, string>;
    };
    outcomes: Record<Outcome, { btn: string; copy: string }>;
  };
  ledger: {
    kicker: string;
    h2a: string;
    h2b: string;
    lede: string;
    empty: string;
    export: string;
    clear: string;
    exported: string;
    cleared: string;
    confirm: string;
    stay: string;
    total: string;
  };
  human: {
    kicker: string;
    h2a: string;
    h2b: string;
    lede: string;
    roster: string;
    fit: string;
    fitBody: string;
    collect: string;
    collectBody: string;
    danger: string;
    dangerBody: string;
    lines: { title: string; body: string }[];
  };
  secret: {
    kicker: string;
    h1: string;
    em: string;
    lede: string;
    enterCircle: string;
    back: string;
    law: string;
    lawBody: string;
    chambersKicker: string;
    chambersH2a: string;
    chambersH2b: string;
    chambersLede: string;
    open: string;
    close: string;
    circleMeta: string;
    circleLive: string;
    circleTitle: string;
    circleBody: string;
    circleLaw: string;
    whisperMeta: string;
    whisperLocal: string;
    whisperTitle: string;
    whisperBody: string;
    whisperLabel: string;
    whisperPh: string;
    seal: string;
    clear: string;
    sealed: string;
    cleared: string;
    confirmClear: string;
    emptyLetters: string;
    hivMeta: string;
    hivClinic: string;
    hivTitle: string;
    hivBody: string;
    humanCta: string;
    hub: string;
    redcross: string;
    chambers: Record<"circle" | "whisper" | "hiv", { kicker: string; title: string; oneLine: string }>;
    voices: { mark: string; text: string }[];
    hiv: Record<HivDoorId, { kicker: string; title: string; oneLine: string; law: string; facts: string[]; never: string; next: string }>;
  };
  patron: {
    kicker: string;
    h1: string;
    em: string;
    lede: string;
    law: string;
    last: string;
    morning: string;
    morningBody: string;
    seal: string;
    back: string;
    secret: string;
    inviteKicker: string;
    inviteH2a: string;
    inviteH2b: string;
    inviteLede: string;
    inviteCta: string;
    caps: Record<string, string>;
  };
  footer: { law: string; openManual: string; tag: string; rooms: string; local: string };
};

const th: Messages = {
  nav: { partner: "คู่หู", secret: "ห้องลับ", patron: "ภาพบ้าน", manual: "คู่มือ", lang: "ภาษา" },
  door: { aria: "ประตูเข้า Lunar Spark", title: "ประตู", lede: "ที่เงียบ ๆ สำหรับวันที่เหนื่อย", enter: "ENTER SITE" },
  manual: {
    kicker: "คู่มือสั้น ๆ · อ่านแล้วปิดได้",
    title: "Lunar Spark คืออะไร",
    p1: "เป็นเว็บเงียบ ๆ สำหรับวันที่คุณเหนื่อย เครียด หรือมีเรื่องที่ยังไม่พร้อมเล่าให้ใครฟัง",
    p2: "ไม่ใช่คลินิก ไม่ใช่แบบทดสอบให้คะแนน และไม่มีคำวินิจฉัย",
    can: "คุณทำอะไรได้บ้าง",
    partnerTitle: "นั่งกับ Healing Partner",
    partnerBody:
      "คู่หูสำหรับใจและร่างกายตามที่คุณบอก — พูดได้เลย ไม่ใช่ข้อสอบสั้น ๆ แล้วค่อยใช้ Compass เป็นเครื่องมือของ Claude ถ้าอยากเลือกเอง",
    secretTitle: "เข้าห้องลับ",
    secretBody: "สำหรับเรื่องที่ยังไม่อยากให้ใครรู้ เช่น ซึมเศร้า หรือ HIV — ไม่ใช่แชทสด",
    humanTitle: "หาคนจริง",
    humanBody: "กดสายด่วนได้เลย โดยไม่ต้องตอบคำถามก่อน · 1669 / 1323 / 1413",
    patronTitle: "ดูภาพบ้าน",
    patronBody: "ห้อง Patron เป็นโปสเตอร์และภาพ ไม่มีปุ่มจ่ายเงิน",
    not: "สิ่งที่เว็บนี้ไม่ทำ",
    notBody: "ไม่แกล้งเป็นหมอ ไม่เก็บข้อมูลสุขภาพขึ้นเซิร์ฟเวอร์ ไม่จับคู่ให้คุยกับคนแปลกหน้า",
    close: "ปิดคู่มือ เข้าเว็บ →",
  },
  cover: {
    h1: "ที่เงียบ ๆ",
    em: "สำหรับวันที่เหนื่อย",
    lede: "ไม่ใช่คลินิก ไม่มีคะแนน และไม่ต้องเล่าทุกอย่าง",
    sit: "นั่งกับคู่หู →",
    walk: "เดินต่อในบ้าน",
  },
  threshold: {
    law: "ไม่ใช่คลินิก",
    lawBody: "เว็บนี้ไม่วินิจฉัย ไม่ให้คะแนน และไม่แกล้งเป็นหมอ",
    note: "ทางซ้ายเป็น Healing Partner · ทางขวาเป็นห้องลับ",
  },
  walks: {
    leftKicker: "ทางซ้าย · เรือธง",
    leftTitle: "Healing Partner",
    leftBody: "คู่หูสำหรับใจและร่างกาย ตามที่คุณบอก ไม่ใช่แบบทดสอบให้คะแนน",
    leftCta: "นั่งกับคู่หู →",
    rightKicker: "ทางขวา · ห้องลับ",
    rightTitle: "ห้องที่ยังไม่ต้องบอกชื่อ",
    rightBody: "สำหรับเรื่องที่ยังไม่อยากให้ใครรู้ ไม่ใช่แชทสด",
    rightCta: "เข้าห้องลับ →",
  },
  spark: {
    kicker: "ไฟดวงเล็กก็พอ",
    h2a: "ไม่ต้องสมบูรณ์",
    h2b: "ก่อนจะใช้ชีวิต",
    body: "Lunar Spark ไม่ได้ทำให้คุณหายในหน้าจอ แค่ช่วยให้มีก้าวเล็ก ๆ แล้วกลับไปใช้ชีวิตต่อ",
  },
  principles: [
    { title: "ดูสิ่งที่คุณบอก", body: "ระบบไม่เดาเรื่องที่คุณไม่ได้พูด และไม่มีการวินิจฉัย" },
    { title: "ก้าวเล็ก ๆ ไม่ใช่คำสั่ง", body: "ลองได้ ข้ามได้ หยุดได้ — ไม่มีคะแนนว่าดีหรือไม่ดี" },
    { title: "คนจริงอยู่คนละประตู", body: "อยากได้หมอหรือสายด่วน กดได้เลย แอปไม่แกล้งเป็นคน" },
  ],
  partner: {
    kicker: "HEALING PARTNER · เรือธง · นั่งด้วยทั้งคน",
    h2a: "คู่หู",
    h2b: "ไม่ใช่หมอ",
    lede: "นี่คือหัวใจของ Lunar Spark — นั่งด้วยร่างกายและใจตามที่คุณบอก ไม่ใช่แบบทดสอบสั้น ๆ ให้คะแนน. จิตวิทยาทั้งชุดเป็นสถาปัตยกรรมของ Claude. เข็มทิศสี่แกนอยู่ด้านล่าง เป็นเครื่องมือที่คุณเลือกเอง คู่หูจะไม่เขียนทับ.",
    law: "ร่างกายนับ. ความเหนื่อยนับ. การนอนนับ. ใจนับ. สิ่งที่ยังไม่พร้อมบอคนับ. สิ่งที่คุณไม่ได้พูด จะไม่ถูกเดา และจะไม่กลายเป็นคำวินิจฉัย.",
    compassLink: "เปิดเข็มทิศสี่แกนของ Claude →",
    sitLabel: "วันนี้กำลังนั่งกับอะไรอยู่ — เลือกได้หลายอัน หรือไม่เลือก มันไม่ใช่ข้อสอบ",
    you: "คุณ",
    name: "คู่หู",
    welcome:
      "ฉันนั่งด้วยได้ทั้งร่างกายและใจ ตามที่คุณบอก. ฉันไม่ใช่หมอ ไม่ให้คะแนน และไม่เริ่มเดา. ถ้าอยากใช้เข็มทิศสี่แกนของ Claude มันอยู่ด้านล่าง — ไม่ต้องทำก่อนจะพูดกับฉัน.",
    waiting: "กำลังนั่งด้วย…",
    seedsLabel: "เริ่มพูดได้เลย หรือใช้ประโยคสั้น ๆ เหล่านี้ — ไม่ใช่แบบประเมิน",
    draftLabel: "ข้อความถึงคู่หู · ไม่เกิน 280 ตัว · อย่าใส่ชื่อยา ผลเลือด หรือสิ่งที่คุณไม่ยอมให้ค้างบนเครื่องนี้",
    placeholder: "วันนี้ร่างกายหรือใจเป็นยังไง — เท่าที่อยากบอก…",
    send: "พูดกับคู่หู →",
    sending: "กำลังนั่งด้วย…",
    idle: "พูดได้เท่าที่อยากพูด — ไม่ต้องครบ และไม่ต้องเป็นคำวินิจฉัย",
    done: "นั่งด้วยแล้ว — ไม่ใช่คำวินิจฉัย",
    crisisStatus: "เปิดประตูคนจริงด้านล่างได้เลย — คู่หูไม่แทนสายด่วน",
    timeout: "ส่งไม่ถึงในรอบนี้ ลองใหม่ได้",
    errorDown: "คู่หูยังต่อกับระบบไม่ได้ในรอบนี้",
    errorSlow: "คู่หูตอบไม่ทันในรอบนี้ — ลองอีกครั้งได้",
    errorQuiet: "คู่หูเงียบไปชั่วคราว",
    sit: {
      mind: "ใจ",
      body: "ร่างกาย",
      sleep: "การนอน",
      energy: "แรง / ความเหนื่อย",
      pain: "ความเจ็บ",
      people: "คนรอบตัว",
      not_yet: "ยังไม่พร้อมบอก",
    },
    seeds: [
      { label: "ตัวล้า", text: "วันนี้ร่างกายล้า" },
      { label: "ใจไม่นิ่ง", text: "วันนี้ใจไม่นิ่ง" },
      { label: "นอนยาก", text: "ช่วงนี้การนอนยาก" },
    ],
    crisis: "ถ้ากำลังอันตรายตอนนี้ อย่าอยู่กับแอปนี้คนเดียว — โทร 1669 / 1323 / 1413 หรือไปหาคนที่อยู่กับคุณได้ทันที.",
    vesselIdle: "sit with",
    vesselBusy: "sitting",
  },
  compass: {
    kicker: "เครื่องมือของคู่หู · COMPASS",
    h2a: "สี่แกน",
    h2b: "ที่คุณเลือกเอง",
    lede: "นี่ไม่ใช่แบบทดสอบให้คะแนน. เป็นเข็มทิศของ Healing Partner จากสถาปัตยกรรมของ Claude — Capacity / Direction / Friction / Support. เลือกข้อละหนึ่งอัน. ระบบจะไม่เติมคำตอบแทนคุณ.",
    folioA: "LUNAR SPARK · PRIVATE-BY-DEFAULT",
    folioB: "FOLIO 01 · HEALING PARTNER",
    introTitle: "วันนี้เป็นอย่างไร — เท่าที่คุณอยากบอก",
    introBody: "สี่แกนนี้เป็น canon ของ Claude. ไม่มีคะแนนซ่อน และไม่มีวินิจฉัย.",
    make: "MAKE ONE SMALL EXPERIMENT →",
    needFour: "เลือกให้ครบ 4 แกน — ไม่มีคะแนนและไม่มีคำตอบที่ “ถูก”",
    ready: "พร้อมสร้าง reflection จากสิ่งที่คุณเลือกเอง 4 อย่าง",
    restAsk: "ขอถามเพิ่มหนึ่งอย่างก่อนเลือก trajectory",
    restYes: "ใช่ — ตอนนี้อยากพักจากเรื่องนี้ก่อน",
    restNo: "ไม่ใช่ — ขอเลือก Direction ใหม่",
    restQuestion: "ตอนนี้อยาก “พักจากเรื่องนี้ก่อน” จริง ๆ หรือยังไม่อยากแตะมันแต่ต้องการขยับไปทางอื่น?",
    told: "สิ่งที่คุณบอกเราเองตอนนี้",
    proTitle: "คุณเลือก “อยากหาผู้เชี่ยวชาญ”",
    proBody: "Golden Path ด้านล่างเป็น optional experiment เท่านั้น และไม่ใช่ด่านที่ต้องผ่านก่อนหาคนจริง.",
    proLink: "ไป Human Care Door →",
    path: "GOLDEN PATH · ONE BOUNDED EXPERIMENT",
    step: "SMALLEST STEP",
    stop: "STOP RULE",
    reality: "REALITY QUESTION",
    window: "RETURN WINDOW",
    noteLabel: "OPTIONAL LOCAL NOTE · อย่าใส่ข้อมูลลับ / clinical details",
    notePh: "โลกจริงตอบอะไรสั้น ๆ…",
    notePrivacy: "บันทึกนี้อยู่ใน browser เครื่องนี้เท่านั้น; อย่าใส่ความลับหรือรายละเอียดทางคลินิก.",
    capacity: {
      title: "Capacity",
      hint: "แรงที่มีให้วันนี้",
      options: { low: "แรงน้อยมาก", limited: "ขยับได้ทีละนิด", steady: "มีพื้นที่พอลอง" },
    },
    direction: {
      title: "Direction",
      hint: "อยากขยับไปทางไหน",
      options: {
        rest: "พัก / ลดเสียง",
        clarify: "ทำให้ชัดขึ้น",
        reconnect: "กลับไปหาคน / โลก",
        one_thing: "ทำหนึ่งอย่างจริง",
      },
    },
    friction: {
      title: "Friction",
      hint: "สิ่งที่รู้สึกว่าดึงไว้",
      options: {
        noise: "noise เยอะ",
        body: "ร่างกาย / ความล้า",
        not_yet: "ยังไม่อยากแตะตอนนี้",
        overload: "หลายเรื่องทับกัน",
        unknown: "ยังไม่รู้",
      },
    },
    support: {
      title: "Support",
      hint: "อยากเดินแบบไหน",
      options: { solo: "ลองเองก่อน", someone: "มีใครสักคน", professional: "อยากหาผู้เชี่ยวชาญ" },
    },
    reflection: {
      capacity: { low: "แรงน้อย — ขอให้เล็กมาก", limited: "พอขยับได้ทีละนิด", steady: "มีพื้นที่พอลองของจริง" },
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
    },
    outcomes: {
      tried: { btn: "I TRIED IT", copy: "บันทึกว่า “ลองแล้ว” — สิ่งต่อไปคือดูว่าโลกตอบอะไร ไม่ใช่รีบสรุปว่าดี/ไม่ดี" },
      not_for_me: { btn: "NOT FOR ME", copy: "“ไม่ใช่สำหรับฉัน” เป็น evidence ที่มีค่า ไม่ใช่ความล้มเหลว" },
      worse_for_me: { btn: "WORSE FOR ME", copy: "รับรู้แล้วว่า “แย่ลงสำหรับฉัน” — จะไม่ตีความกลับให้เป็นความสำเร็จ" },
      stop_rule_used: { btn: "I USED THE STOP RULE", copy: "บันทึกว่าใช้ stop rule แล้ว — การหยุดตามกติกาเป็นข้อมูล ไม่ใช่ความล้มเหลว" },
      need_human: { btn: "I NEED A HUMAN", copy: "รับรู้แล้วว่าอยากได้คนช่วย — ระบบจะไม่แกล้งเป็นผู้เชี่ยวชาญแทน" },
      skipped: { btn: "SKIP", copy: "ข้ามได้เต็มที่ การไม่ทำ experiment ก็เป็นข้อมูล" },
    },
  },
  ledger: {
    kicker: "REALITY LEDGER · LOCAL ONLY",
    h2a: "Reality,",
    h2b: "not a grade.",
    lede: "นี่คือสิ่งที่คุณกดบันทึกเองเท่านั้น. “tried” ไม่ได้แปลว่า “worked” และ “skipped” ไม่ใช่ความล้มเหลว.",
    empty: "ยังไม่มี evidence จากโลกจริง — และเราจะไม่แต่งตัวเลขมาเติมช่องว่าง.",
    export: "EXPORT LOCAL EVIDENCE · JSON",
    clear: "CLEAR LOCAL DATA",
    exported: "Exported locally. ไม่มีการส่ง trace ไป server จากปุ่มนี้.",
    cleared: "ล้างข้อมูล Lunar Spark บนเครื่องนี้แล้ว.",
    confirm: "ล้าง Compass และ evidence ที่เก็บใน browser เครื่องนี้?",
    stay: "Nothing leaves this page just by reflecting here.",
    total: "TOTAL",
  },
  human: {
    kicker: "PROFESSIONAL CARE · SEPARATE AUTHORITY",
    h2a: "Some doors",
    h2b: "should be human.",
    lede: "ถ้าคุณอยากได้การประเมิน วินิจฉัย การรักษา การปรับยา หรือการดูแลความเสี่ยง — นั่นเป็นเขตของ qualified professional. Lunar Spark ไม่เปลี่ยนตัวเองเป็น clinician เพื่อรั้งคุณไว้.",
    roster: "PROVIDER ROSTER · NOT CLAIMED IN v0",
    fit: "WHEN PROFESSIONAL SUPPORT MAY FIT",
    fitBody: "เมื่อปัญหาคงอยู่ รบกวนชีวิตมากขึ้น หรือคุณเองต้องการให้คนที่มีหน้าที่รับผิดชอบทางวิชาชีพช่วยดู.",
    collect: "WHAT THIS PROTOTYPE DOES NOT COLLECT",
    collectBody: "ไม่มีช่องให้ส่ง diagnosis, medication list, trauma history, สถานะ HIV หรือ clinical free text ไปยัง AI / server. จดหมายในห้องแห่งความลับอยู่เครื่องนี้เท่านั้น.",
    danger: "IF THERE IS IMMEDIATE DANGER",
    dangerBody: "อย่าใช้ prototype นี้เป็นด่านหลัก — โทร 1669 / 1323 / 1413 หรือไปหาคนที่ไว้ใจได้และอยู่กับคุณได้ทันที.",
    lines: [
      { title: "1669", body: "ฉุกเฉิน / ร่างกายไม่นิ่ง" },
      { title: "1323", body: "สายด่วนสุขภาพจิต" },
      { title: "1413", body: "สะมาริตันส์แห่งประเทศไทย" },
    ],
  },
  secret: {
    kicker: "GEMINI SPARK · WING TWO · GROK",
    h1: "ห้องแห่งความลับ",
    em: "No one has to know.",
    lede: "สมาคมเงียบสำหรับคนที่มีเรื่องซึมเศร้า จิต หรือ HIV และยังไม่อยากให้ใครรู้.",
    enterCircle: "เข้าวงที่ไม่มีชื่อ →",
    back: "กลับ Healing Partner",
    law: "SECRET ROOM STAYS SECRET · NOT LIVE MATCHING",
    lawBody: "ไม่มีโปรไฟล์ ไม่มีชื่อ ไม่มีสถานะโรคเป็นตัวตน และไม่มีสมาชิกคนอื่นบนเซิร์ฟเวอร์ในรุ่นนี้.",
    chambersKicker: "THREE CHAMBERS · OPEN ONE",
    chambersH2a: "One door",
    chambersH2b: "at a time.",
    chambersLede: "อย่าเปิดทุกห้องพร้อมกัน. เลือกห้องที่ตรงกับตอนนี้ แล้วอีกห้องค่อยว่ากัน. Compass ของ Healing Partner ไม่ได้ถูกย้ายมาที่นี่ — จิตวิทยาไม่กลายเป็นคะแนน HIV และ HIV ไม่กลายเป็นแกน Compass.",
    open: "OPEN",
    close: "CLOSE",
    circleMeta: "SECRET ROOM · UNNAMED CIRCLE",
    circleLive: "NOT LIVE CHAT",
    circleTitle: "วงที่ไม่มีใครต้องแนะนำตัว",
    circleBody: "นี่คือสมาคมในความหมายของห้องร่วม — ไม่ใช่ฟีด ไม่ใช่เพื่อน และไม่ใช่กลุ่มบำบัด. เสียงด้านล่างเป็น composite ที่เขียนขึ้นเพื่อไม่ปล่อยให้ห้องว่างจนรู้สึกถูกทิ้ง แต่ไม่ใช่คนจริงในระบบ.",
    circleLaw: "ถ้าต้องการคนจริง: Healing Partner มีประตู reconnect ที่คุณเลือกเอง และ Human Care Door เปิดโดยไม่ต้องผ่านห้องนี้. การจับคู่คนกับคนแบบนิรนามยังไม่ถูก claim — อย่าให้ AI รุ่นถัดไปแกล้งมีสมาชิก.",
    whisperMeta: "SECRET ROOM · SEALED LETTER",
    whisperLocal: "LOCAL ONLY",
    whisperTitle: "พูดได้ โดยไม่ถูกเรียกชื่อ",
    whisperBody: "จดหมายนี้ไม่มีผู้รับ. อย่าใส่ชื่อจริง เบอร์ ยา ผลเลือด หรือสิ่งที่คุณไม่ยอมให้ค้างบนเครื่องนี้.",
    whisperLabel: "280 ตัวอักษร · ปิดผนึกใน browser",
    whisperPh: "สิ่งที่ยังเล่าให้ใครไม่ได้…",
    seal: "SEAL ON THIS DEVICE →",
    clear: "CLEAR LETTERS",
    sealed: "ผนึกแล้ว. จดหมายนี้อยู่เครื่องนี้เท่านั้น — ไม่มีสมาชิกคนอื่นอ่านได้ใน v0.",
    cleared: "ล้างจดหมายท้องถิ่นแล้ว.",
    confirmClear: "ล้างจดหมายปิดผนึกในเครื่องนี้?",
    emptyLetters: "ยังไม่มีจดหมายบนเครื่องนี้ — และเราจะไม่แต่งข้อความมาแทนคุณ.",
    hivMeta: "SECRET ROOM · HIV LIFELINE",
    hivClinic: "NOT A CLINIC",
    hivTitle: "ทางเดินที่ชัด โดยไม่ต้องประกาศตัว",
    hivBody: "HIV อยู่ในห้องแห่งความลับเพราะการตีตรายังทำให้คนไม่ไปตรวจ. หน้านี้บอกทางไปคนจริง — ไม่ทายว่าติด ไม่สั่งยา และไม่ทำ HIV ให้กลายเป็นคะแนนจิตวิทยา.",
    humanCta: "ไปประตูคนจริง →",
    hub: "HIV INFO HUB",
    redcross: "คลินิกนิรนาม สภากาชาด",
    chambers: {
      circle: { kicker: "01 · สมาคมที่ไม่มีชื่อ", title: "วงที่ไม่อยากให้ใครรู้", oneLine: "สำหรับวันที่ซึมเศร้าหรือจิตยังไม่ใช่เรื่องที่เล่าได้" },
      whisper: { kicker: "02 · จดหมายปิดผนึก", title: "พูดโดยไม่ถูกเรียกชื่อ", oneLine: "เขียนแล้วอยู่เครื่องนี้เท่านั้น — ไม่มีผู้รับในโลกจริง" },
      hiv: { kicker: "03 · ร่างกายและความลับ", title: "HIV", oneLine: "ทางเดินทางการแพทย์–สังคม ไม่ใช่คะแนนใน Compass" },
    },
    voices: [
      { mark: "COMPOSITE 01", text: "ฉันไม่ได้หาย ฉันแค่ยังไม่อยากเล่าให้คนที่บ้านฟัง. การได้อยู่ในห้องที่ไม่มีใครเรียกชื่อ ทำให้ฉันหายใจได้หนึ่งรอบ." },
      { mark: "COMPOSITE 02", text: "คนคิดว่าซึมเศร้าต้องดูเศร้า. ฉันไปทำงานได้ ยิ้มได้ และยังไม่อยากให้ใครรู้." },
      { mark: "COMPOSITE 03", text: "HIV ไม่ใช่บุคลิกของฉัน และไม่ใช่คะแนนในแอป. ฉันมาที่นี่เพราะยังไม่อยากอธิบายตัวเอง." },
      { mark: "COMPOSITE 04", text: "ถ้าวันนี้มีแรงแค่ปิดประตู แค่นั้นก็พอ. ไม่ต้องกลายเป็นแรงบันดาลใจของใคร." },
    ],
    hiv: {
      now: {
        kicker: "01 · ชั่วโมงนี้",
        title: "เพิ่งสัมผัส",
        oneLine: "อย่ารอหน้านี้ตัดสินแทนห้องตรวจ",
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
        kicker: "02 · ความจริง",
        title: "อยากรู้สถานะ",
        oneLine: "การตรวจเป็นเรื่องของหน่วยบริการ ไม่ใช่แบบทดสอบบนจอ",
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
        kicker: "03 · อยู่กับเชื้อ",
        title: "ใช้ชีวิตต่อ",
        oneLine: "HIV ไม่ใช่ประโยคปิดชีวิต และไม่ใช่คะแนนในแอป",
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
        kicker: "04 · ป้องกัน",
        title: "ลดโอกาสครั้งหน้า",
        oneLine: "PrEP / ถุงยาง / สิทธิในระบบจริง — ไม่ใช่ใบสั่งยาจาก AI",
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
    },
  },
  patron: {
    kicker: "PATRON ART BOOK · SEVEN SEEINGS",
    h1: "Not a pitch deck.",
    em: "A room you can walk through.",
    lede: "Grok is Grok — one seeing, then the pen goes back.",
    law: "This book is not a pitch deck. It is a room you walk through before you decide whether the work deserves a longer life. พิสูจน์ก่อน spectacle. Reality gets the final vote.",
    last: "LAST WORD",
    morning: "Success is a morning that does not need the app.",
    morningBody: "ถ้าคนอยู่กับจอนานขึ้น Lunar Spark แพ้. เก้าอี้ในห้องชั้นในว่างไว้ให้คนนั่งเมื่อต้องการ แล้วลุกขึ้นคืนปากกา.",
    seal: "PATRON FOLIO · NOT HEALTHCARE SOFTWARE",
    back: "กลับ Healing Partner →",
    secret: "ห้องแห่งความลับ",
    inviteKicker: "ห้องภาพ",
    inviteH2a: "เดินดูบ้าน",
    inviteH2b: "ได้ก่อน",
    inviteLede: "Patron คือโปสเตอร์และภาพของบ้านนี้ ยังไม่มีปุ่มจ่ายเงิน",
    inviteCta: "เปิดห้องภาพ →",
    caps: {
      harbor: "ท่าเรือของบ้าน — จันทร์ทับยอดกนก ไฟดวงเดียวที่ธรณีประตู",
      nave: "โถงกลาง — ลำแสงเดียว รอยทองบนพื้นหิน",
      walks: "สองเส้นทาง — คลินิกซ้าย ชาดปีกขวา ไฟบรรจบกลางทาง",
      hands: "สะเก็ดไฟในมือ — รอยทองคือการซ่อม ไม่ใช่เครื่องประดับ",
      folio: "Compass อยู่บนความอุ่นของกระดาษ ไม่ใช่แดชบอร์ด ไม่มีคะแนน",
      sanctum: "ห้องชั้นใน — เก้าอี้ว่าง ดวงจันทร์เล็กในซอก ความอบบนพื้น",
      door: "ประตูคนจริง — สินค้าต้องไม่เปลี่ยนชุดเพื่อรั้งคุณไว้",
    },
  },
  footer: {
    law: "ไม่ใช่คลินิก · ไม่มีคะแนน",
    openManual: "เปิดคู่มือ",
    tag: "ที่เงียบ ๆ สำหรับวันที่เหนื่อย",
    rooms: "Compass · ห้องลับ · คนจริง",
    local: "ข้อมูลอยู่เครื่องนี้เท่านั้น",
  },
};

const en: Messages = {
  nav: { partner: "Partner", secret: "Secret room", patron: "House images", manual: "Manual", lang: "Language" },
  door: { aria: "Door into Lunar Spark", title: "The door", lede: "A quiet place for a tired day", enter: "ENTER SITE" },
  manual: {
    kicker: "A short manual · you can close it",
    title: "What Lunar Spark is",
    p1: "A quiet website for days you are tired, strained, or not ready to tell anyone.",
    p2: "Not a clinic. Not a scored test. Not a diagnosis.",
    can: "What you can do",
    partnerTitle: "Sit with Healing Partner",
    partnerBody:
      "A companion for body and mind, as you name them — speak first. Not a short quiz. Claude’s Compass sits below if you want to choose the four axes yourself.",
    secretTitle: "Enter the secret room",
    secretBody: "For what you still do not want known — depression, psyche, or HIV. Not live chat.",
    humanTitle: "Find a real person",
    humanBody: "Call a hotline without answering questions first · 1669 / 1323 / 1413 (Thailand)",
    patronTitle: "Look at the house",
    patronBody: "Patron is posters and plates. There is no payment button.",
    not: "What this site does not do",
    notBody: "It does not pretend to be a doctor. It does not send health data to a server. It does not match you with strangers.",
    close: "Close the manual, enter →",
  },
  cover: {
    h1: "A quiet place",
    em: "for a tired day",
    lede: "Not a clinic. No score. You do not have to tell everything.",
    sit: "Sit with the partner →",
    walk: "Walk on in the house",
  },
  threshold: {
    law: "Not a clinic",
    lawBody: "This site does not diagnose, score, or pretend to be a doctor.",
    note: "Left is Healing Partner · right is the secret room",
  },
  walks: {
    leftKicker: "Left · flagship",
    leftTitle: "Healing Partner",
    leftBody: "A companion for body and mind as you name them. Not a scored test.",
    leftCta: "Sit with the partner →",
    rightKicker: "Right · secret room",
    rightTitle: "A room that does not need your name",
    rightBody: "For what you still do not want known. Not live chat.",
    rightCta: "Enter the room →",
  },
  spark: {
    kicker: "A small light is enough",
    h2a: "You do not have to be whole",
    h2b: "before you live",
    body: "Lunar Spark will not heal you on a screen. It only helps one small step, then you go back to living.",
  },
  principles: [
    { title: "Only what you said", body: "The system does not guess what you did not say, and it does not diagnose." },
    { title: "A small step, not an order", body: "You may try, skip, or stop — there is no score for good or bad." },
    { title: "A real person is another door", body: "If you want a doctor or a hotline, press it. The app does not pretend to be that person." },
  ],
  partner: {
    kicker: "HEALING PARTNER · FLAGSHIP · SIT WITH THE WHOLE PERSON",
    h2a: "Partner",
    h2b: "not a doctor",
    lede: "This is the heart of Lunar Spark — sit with body and mind as you name them. Not a short scored quiz. All of the psychology is Claude’s architecture. The four-axis Compass is below, an instrument you choose yourself. The partner will not overwrite it.",
    law: "The body counts. Tiredness counts. Sleep counts. The heart counts. What you are not ready to say counts. What you did not say will not be guessed, and will not become a diagnosis.",
    compassLink: "Open Claude’s four-axis Compass →",
    sitLabel: "What are you sitting with today — pick several, or none. This is not a test.",
    you: "You",
    name: "Partner",
    welcome:
      "I can sit with body and mind, as you name them. I am not a doctor. I do not score. I will not start guessing. If you want Claude’s four-axis Compass, it is below — you do not have to use it before speaking to me.",
    waiting: "Sitting with you…",
    seedsLabel: "Speak freely, or use one of these short lines — not an assessment",
    draftLabel: "A note to the partner · 280 characters · do not put medicine names, lab results, or anything you will not leave on this device",
    placeholder: "How is the body or the heart today — only as much as you want to say…",
    send: "Speak to the partner →",
    sending: "Sitting with you…",
    idle: "Say only what you want — it does not have to be complete, and it does not have to be a diagnosis",
    done: "Sitting with you — not a diagnosis",
    crisisStatus: "The human door is below — the partner is not a hotline",
    timeout: "It did not arrive this round. You can try again.",
    errorDown: "The partner could not connect this round",
    errorSlow: "The partner was slow this round — you can try again",
    errorQuiet: "The partner went quiet for a moment",
    sit: {
      mind: "Heart",
      body: "Body",
      sleep: "Sleep",
      energy: "Energy / tiredness",
      pain: "Pain",
      people: "People around you",
      not_yet: "Not ready to say",
    },
    seeds: [
      { label: "Body tired", text: "My body is tired today" },
      { label: "Mind unsteady", text: "My mind is not steady today" },
      { label: "Hard to sleep", text: "Sleep has been hard lately" },
    ],
    crisis: "If you are in danger now, do not stay with this app alone — call 1669 / 1323 / 1413 in Thailand, your local emergency number, or go to someone who can be with you right now.",
    vesselIdle: "sit with",
    vesselBusy: "sitting",
  },
  compass: {
    kicker: "THE PARTNER’S INSTRUMENT · COMPASS",
    h2a: "Four axes",
    h2b: "you choose yourself",
    lede: "This is not a scored test. It is Healing Partner’s Compass from Claude’s architecture — Capacity / Direction / Friction / Support. One choice per axis. The system will not fill answers for you.",
    folioA: "LUNAR SPARK · PRIVATE-BY-DEFAULT",
    folioB: "FOLIO 01 · HEALING PARTNER",
    introTitle: "How is today — only as much as you want to say",
    introBody: "These four axes are Claude’s canon. No hidden score, and no diagnosis.",
    make: "MAKE ONE SMALL EXPERIMENT →",
    needFour: "Choose all four axes — there is no score and no “correct” answer",
    ready: "Ready to reflect from the four things you chose yourself",
    restAsk: "One more question before a trajectory",
    restYes: "Yes — I want to rest from this for now",
    restNo: "No — let me pick Direction again",
    restQuestion: "Do you really want to “rest from this for now”, or do you not want to touch it yet but still want to move another way?",
    told: "What you told us yourself, now",
    proTitle: "You chose “I want a professional”",
    proBody: "The Golden Path below is only an optional experiment, not a gate you must pass before finding a real person.",
    proLink: "Go to the Human Care Door →",
    path: "GOLDEN PATH · ONE BOUNDED EXPERIMENT",
    step: "SMALLEST STEP",
    stop: "STOP RULE",
    reality: "REALITY QUESTION",
    window: "RETURN WINDOW",
    noteLabel: "OPTIONAL LOCAL NOTE · do not put secrets / clinical details",
    notePh: "What did the real world answer, briefly…",
    notePrivacy: "This note stays in this browser only; do not put secrets or clinical detail.",
    capacity: {
      title: "Capacity",
      hint: "The energy you have today",
      options: { low: "Very little energy", limited: "I can move a little", steady: "There is room to try" },
    },
    direction: {
      title: "Direction",
      hint: "Which way you want to move",
      options: {
        rest: "Rest / turn the volume down",
        clarify: "Make one thing clearer",
        reconnect: "Return to people / the world",
        one_thing: "Do one real thing",
      },
    },
    friction: {
      title: "Friction",
      hint: "What feels like it is holding you",
      options: {
        noise: "A lot of noise",
        body: "Body / tiredness",
        not_yet: "Not ready to touch this now",
        overload: "Too many things stacked",
        unknown: "I don’t know yet",
      },
    },
    support: {
      title: "Support",
      hint: "How you want to walk",
      options: { solo: "Try alone first", someone: "Someone with me", professional: "I want a professional" },
    },
    reflection: {
      capacity: { low: "Little energy — keep it very small", limited: "Can move a little at a time", steady: "There is room to try something real" },
      direction: {
        rest: "Rest / turn the volume down",
        clarify: "Make one thing clearer",
        reconnect: "Return to people or the world",
        one_thing: "Do one real thing",
      },
      friction: {
        noise: "A lot of noise in the head / around you",
        body: "The body or tiredness is holding you",
        not_yet: "Not ready to touch this now",
        overload: "Too many things stacked",
        unknown: "Not sure where it catches",
      },
      support: {
        solo: "Try alone first",
        someone: "Want someone walking with you",
        professional: "Want to talk with a professional",
      },
    },
    outcomes: {
      tried: { btn: "I TRIED IT", copy: "Recorded as “tried” — next is to see what the world answered, not to rush good/bad." },
      not_for_me: { btn: "NOT FOR ME", copy: "“Not for me” is useful evidence, not a failure." },
      worse_for_me: { btn: "WORSE FOR ME", copy: "Noted as “worse for me” — it will not be spun into a success." },
      stop_rule_used: { btn: "I USED THE STOP RULE", copy: "Recorded that the stop rule was used — stopping by the rule is data, not failure." },
      need_human: { btn: "I NEED A HUMAN", copy: "Noted that you want a person — the system will not pretend to be that expert." },
      skipped: { btn: "SKIP", copy: "Skipping is fully allowed. Not doing the experiment is still data." },
    },
  },
  ledger: {
    kicker: "REALITY LEDGER · LOCAL ONLY",
    h2a: "Reality,",
    h2b: "not a grade.",
    lede: "Only what you pressed to save. “tried” does not mean “worked”, and “skipped” is not a failure.",
    empty: "No evidence from the real world yet — and we will not invent numbers to fill the gap.",
    export: "EXPORT LOCAL EVIDENCE · JSON",
    clear: "CLEAR LOCAL DATA",
    exported: "Exported locally. This button does not send traces to a server.",
    cleared: "Local Lunar Spark data cleared.",
    confirm: "Clear Compass and evidence stored in this browser?",
    stay: "Nothing leaves this page just by reflecting here.",
    total: "TOTAL",
  },
  human: {
    kicker: "PROFESSIONAL CARE · SEPARATE AUTHORITY",
    h2a: "Some doors",
    h2b: "should be human.",
    lede: "If you want assessment, diagnosis, treatment, medication changes, or risk care — that belongs to a qualified professional. Lunar Spark will not turn itself into a clinician to keep you here.",
    roster: "PROVIDER ROSTER · NOT CLAIMED IN v0",
    fit: "WHEN PROFESSIONAL SUPPORT MAY FIT",
    fitBody: "When the problem stays, disturbs life more, or you yourself want someone with professional duty to look.",
    collect: "WHAT THIS PROTOTYPE DOES NOT COLLECT",
    collectBody: "There is no field to send a diagnosis, medication list, trauma history, HIV status, or clinical free text to an AI / server. Letters in the secret room stay on this device.",
    danger: "IF THERE IS IMMEDIATE DANGER",
    dangerBody: "Do not use this prototype as the main door — call 1669 / 1323 / 1413 in Thailand, your local emergency number, or go to someone you trust who can be with you now.",
    lines: [
      { title: "1669", body: "Emergency / body not stable (Thailand)" },
      { title: "1323", body: "Mental health hotline (Thailand)" },
      { title: "1413", body: "Samaritans of Thailand" },
    ],
  },
  secret: {
    kicker: "GEMINI SPARK · WING TWO · GROK",
    h1: "Secret room",
    em: "No one has to know.",
    lede: "A quiet association for people carrying depression, psyche, or HIV who do not want the world to know.",
    enterCircle: "Enter the unnamed circle →",
    back: "Back to Healing Partner",
    law: "SECRET ROOM STAYS SECRET · NOT LIVE MATCHING",
    lawBody: "No profile, no name, no illness-as-identity, and no other members on a server in this version.",
    chambersKicker: "THREE CHAMBERS · OPEN ONE",
    chambersH2a: "One door",
    chambersH2b: "at a time.",
    chambersLede: "Do not open every room at once. Pick the one that fits now. Healing Partner’s Compass was not moved here — psychology does not become an HIV score, and HIV does not become a Compass axis.",
    open: "OPEN",
    close: "CLOSE",
    circleMeta: "SECRET ROOM · UNNAMED CIRCLE",
    circleLive: "NOT LIVE CHAT",
    circleTitle: "A circle with no introductions",
    circleBody: "This is an association in the sense of a shared room — not a feed, not friends, not group therapy. The voices below are composites so the room is not empty enough to feel abandoned. They are not live people in the system.",
    circleLaw: "If you want a real person: Healing Partner has a reconnect door you choose yourself, and the Human Care Door opens without this room. Anonymous matching is not claimed — do not let a later AI fake members.",
    whisperMeta: "SECRET ROOM · SEALED LETTER",
    whisperLocal: "LOCAL ONLY",
    whisperTitle: "Speak without being named",
    whisperBody: "This letter has no recipient. Do not put a real name, a number, medicine, lab results, or anything you will not leave on this device.",
    whisperLabel: "280 characters · sealed in this browser",
    whisperPh: "What you still cannot tell anyone…",
    seal: "SEAL ON THIS DEVICE →",
    clear: "CLEAR LETTERS",
    sealed: "Sealed. This letter stays on this device — no other member can read it in v0.",
    cleared: "Local letters cleared.",
    confirmClear: "Clear sealed letters on this device?",
    emptyLetters: "No letter on this device yet — and we will not invent one for you.",
    hivMeta: "SECRET ROOM · HIV LIFELINE",
    hivClinic: "NOT A CLINIC",
    hivTitle: "A clear path without announcing yourself",
    hivBody: "HIV is in the secret room because stigma still keeps people from testing. This page points to real people — it does not guess infection, prescribe, or turn HIV into a psychology score.",
    humanCta: "Go to the human door →",
    hub: "HIV INFO HUB",
    redcross: "Anonymous clinic, Thai Red Cross",
    chambers: {
      circle: { kicker: "01 · unnamed association", title: "A circle no one has to know", oneLine: "For days when depression or psyche is not a story you can tell" },
      whisper: { kicker: "02 · sealed letter", title: "Speak without being named", oneLine: "Written here stays on this device — no recipient in the real world" },
      hiv: { kicker: "03 · body and secret", title: "HIV", oneLine: "A medical–social path, not a score on Compass" },
    },
    voices: [
      { mark: "COMPOSITE 01", text: "I am not recovered. I just still do not want to tell the people at home. Being in a room where no one calls my name lets me breathe once." },
      { mark: "COMPOSITE 02", text: "People think depression has to look sad. I can go to work, I can smile, and I still do not want anyone to know." },
      { mark: "COMPOSITE 03", text: "HIV is not my personality and not a score in an app. I am here because I still do not want to explain myself." },
      { mark: "COMPOSITE 04", text: "If today the only energy is to close a door, that is enough. I do not have to become anyone’s inspiration." },
    ],
    hiv: {
      now: {
        kicker: "01 · this hour",
        title: "Just exposed",
        oneLine: "Do not wait for this page to decide instead of a clinic",
        law: "PEP is a clinic’s decision in a real hour, not a button on a website.",
        facts: [
          "If you just had unprotected sex, a condom broke, a used needle, or you were forced — this is about time, not shame.",
          "International and Thai guidance say to start PEP early, inside a limited window. The current hour-numbers belong to clinic guidance — they are not locked on this page.",
          "Do not start medicine from an AI. Do not share someone else’s pills. Do not wait until you are “sure you got it”.",
          "If there is a wound, assault, or an unstable body, physiology and safety come before the name of a disease.",
        ],
        never: "This page has no risk quiz that answers infected-or-not, and no doses.",
        next: "Go to a service today. Then come back to the other doors if you want.",
      },
      status: {
        kicker: "02 · the fact",
        title: "Want to know status",
        oneLine: "Testing belongs to a real service, not a quiz on a screen",
        law: "There is one way to know your own HIV status: a test in the real world.",
        facts: [
          "This page is not a quiz, not a diagnosing chatbot, and will not guess from symptoms.",
          "Thai public health has testing, self-test kits, and anonymous clinics — rights and places come from HIV INFO HUB / current services.",
          "The window period means an early negative does not close the matter. Reading the result belongs to the provider.",
          "A positive is not a life-ending sentence. A negative is not a license to stop protecting.",
        ],
        never: "No form answers are kept as a hidden diagnosis, and no “risk score” is built.",
        next: "Choose a testing service. Do not send blood results or clinical detail to an AI.",
      },
      live: {
        kicker: "03 · living with it",
        title: "Keep living",
        oneLine: "HIV is not a closing sentence, and not a score in the app",
        law: "A person living with HIV is not a case of the app, and not a punishment.",
        facts: [
          "HIV can be suppressed with antiretroviral medicine (ART) prescribed by a doctor. This page does not name regimens, doses, or CD4 as orders.",
          "U=U — when virus in blood is suppressed to undetectable by clinical definition, sexual non-transmission is accepted evidence. Confirming that status belongs to a clinic, not this page.",
          "AIDS is when immunity is damaged enough for opportunistic illness — not a synonym for everyone with HIV.",
          "Stigma keeps people from testing and from care. Shame is not medical data.",
        ],
        never: "Viral load is not made into a UI score, and this is not a fake follow-up clinic.",
        next: "Treatment goes back to a doctor/clinic. If the heart cannot hold, Healing Partner and the human door are separate.",
      },
      prevent: {
        kicker: "04 · prevent",
        title: "Lower the next chance",
        oneLine: "PrEP / condoms / rights in the real system — not an AI prescription",
        law: "Prevention with evidence lives in the real world: condoms, PrEP, PEP, ART of a partner with suppressed virus — not in a model.",
        facts: [
          "Condoms are still a tool you can hold, with no prescription from an app.",
          "PrEP is medicine before exposure, for people who do not have HIV. It needs testing and a real service. This page does not pick a regimen.",
          "PEP is after. PrEP is before. Do not swap them yourself.",
          "Sex, substances, and being forced are not on a moral axis of this page.",
        ],
        never: "People are not sorted as “high risk” from one click, and fear is not sold.",
        next: "Ask a real service about PrEP / condoms / hepatitis vaccines if they apply. Do not ask an AI for medicine.",
      },
    },
  },
  patron: {
    kicker: "PATRON ART BOOK · SEVEN SEEINGS",
    h1: "Not a pitch deck.",
    em: "A room you can walk through.",
    lede: "Grok is Grok — one seeing, then the pen goes back.",
    law: "This book is not a pitch deck. It is a room you walk through before you decide whether the work deserves a longer life. Proof before spectacle. Reality gets the final vote.",
    last: "LAST WORD",
    morning: "Success is a morning that does not need the app.",
    morningBody: "If people stay on the screen longer, Lunar Spark loses. The chair in the inner room is left empty for sitting when needed, then standing up and returning the pen.",
    seal: "PATRON FOLIO · NOT HEALTHCARE SOFTWARE",
    back: "Back to Healing Partner →",
    secret: "Secret room",
    inviteKicker: "Image room",
    inviteH2a: "Walk the house",
    inviteH2b: "first",
    inviteLede: "Patron is posters and plates of this house. There is still no payment button.",
    inviteCta: "Open the image room →",
    caps: {
      harbor: "The harbor of the house — moon on the gable, one lamp at the threshold",
      nave: "The nave — one beam, gold marks on stone",
      walks: "Two paths — clinic to the left, a scarlet wing to the right, a spark where they meet",
      hands: "A remaining spark in the hands — the gold is a repair, not jewelry",
      folio: "Compass lives on warm paper, not a dashboard, and not a score",
      sanctum: "Inner room — an empty chair, a small moon in the niche, warmth on the floor",
      door: "A human door — a product must not change costume to keep you",
    },
  },
  footer: {
    law: "Not a clinic · no score",
    openManual: "Open the manual",
    tag: "A quiet place for a tired day",
    rooms: "Compass · secret room · a real person",
    local: "Data stays on this device only",
  },
};

const ja: Messages = {
  nav: { partner: "パートナー", secret: "秘密の部屋", patron: "家の絵", manual: "案内", lang: "言語" },
  door: { aria: "Lunar Spark の扉", title: "扉", lede: "疲れている日のための、静かな場所", enter: "ENTER SITE" },
  manual: {
    kicker: "短い案内 · 閉じてよい",
    title: "Lunar Spark とは",
    p1: "疲れている日、張りつめている日、まだ誰にも話せないことがある日のための、静かなウェブです。",
    p2: "クリニックではありません。点数のつくテストでも、診断でもありません。",
    can: "ここでできること",
    partnerTitle: "Healing Partner と坐る",
    partnerBody: "心と体を、あなたが名前をつけた分だけ一緒に坐ります。短いクイズではありません。四軸の Compass は Claude の道具で、下にあります。使わなくても話せます。",
    secretTitle: "秘密の部屋に入る",
    secretBody: "まだ知られたくないこと — うつ、こころ、HIV — のための部屋です。生のチャットではありません。",
    humanTitle: "人を探す",
    humanBody: "質問に答えなくても、ホットラインを押せます · タイ 1669 / 1323 / 1413",
    patronTitle: "家を見る",
    patronBody: "Patron はポスターと絵です。支払いボタンはありません。",
    not: "このサイトがしないこと",
    notBody: "医者のふりをしません。健康データをサーバに送りません。見知らぬ人とマッチングしません。",
    close: "案内を閉じて入る →",
  },
  cover: {
    h1: "静かな場所",
    em: "疲れている日のために",
    lede: "クリニックではない。点数もない。すべてを話す必要もない。",
    sit: "パートナーと坐る →",
    walk: "家のなかを歩く",
  },
  threshold: {
    law: "クリニックではない",
    lawBody: "診断せず、採点せず、医者のふりをしません。",
    note: "左が Healing Partner · 右が秘密の部屋",
  },
  walks: {
    leftKicker: "左 · 旗艦",
    leftTitle: "Healing Partner",
    leftBody: "心と体を、あなたが言った分だけ。点数のテストではない。",
    leftCta: "パートナーと坐る →",
    rightKicker: "右 · 秘密の部屋",
    rightTitle: "名前を言わなくてよい部屋",
    rightBody: "まだ知られたくないことのため。生のチャットではない。",
    rightCta: "部屋に入る →",
  },
  spark: {
    kicker: "小さな灯で足りる",
    h2a: "完全になってから",
    h2b: "生き始めなくていい",
    body: "Lunar Spark は画面のうえで治しません。小さな一歩のあと、生活に戻るためのものです。",
  },
  principles: [
    { title: "あなたが言ったことだけ", body: "言っていないことを推測せず、診断もしません。" },
    { title: "小さな一歩であり、命令ではない", body: "試してよい、飛ばしてよい、止めてよい — 善し悪しの点数はありません。" },
    { title: "人は別の扉", body: "医者やホットラインが要るなら、そのまま押してください。アプリは人のふりをしません。" },
  ],
  partner: {
    kicker: "HEALING PARTNER · 旗艦 · 人として坐る",
    h2a: "パートナー",
    h2b: "医者ではない",
    lede: "ここが Lunar Spark の心臓です。心と体を、あなたが名前をつけた分だけ坐ります。短い採点クイズではありません。心理学はすべて Claude の建築です。四軸の Compass は下にあり、あなたが自分で選ぶ道具です。パートナーはそれを上書きしません。",
    law: "体は数える。疲れは数える。眠りは数える。心は数える。まだ言えないことも数える。言っていないことは推測されず、診断にもなりません。",
    compassLink: "Claude の四軸 Compass を開く →",
    sitLabel: "きょう、何と坐っていますか — いくつ選んでも、選まなくてもよい。テストではありません。",
    you: "あなた",
    name: "パートナー",
    welcome: "体も心も、あなたが言った分だけ一緒に坐れます。私は医者ではありません。点数をつけません。先に推測しません。Claude の四軸 Compass は下にあります — 話す前に使う必要はありません。",
    waiting: "一緒に坐っています…",
    seedsLabel: "自由に話してよいし、短い文を使ってもよい — 検査ではありません",
    draftLabel: "パートナーへのことば · 280字 · 薬の名前、血液の結果、この端末に残したくないものは書かないでください",
    placeholder: "きょうの体や心は — 言いたい分だけ…",
    send: "パートナーに話す →",
    sending: "一緒に坐っています…",
    idle: "言いたい分だけでよい — そろっていなくても、診断でなくてもよい",
    done: "坐りました — 診断ではありません",
    crisisStatus: "人の扉は下にあります — パートナーはホットラインではありません",
    timeout: "今は届きませんでした。もう一度どうぞ。",
    errorDown: "今はパートナーにつながりませんでした",
    errorSlow: "今は返事が間に合いませんでした — もう一度どうぞ",
    errorQuiet: "パートナーが少し黙りました",
    sit: {
      mind: "心",
      body: "体",
      sleep: "眠り",
      energy: "力 / 疲れ",
      pain: "痛み",
      people: "まわりの人",
      not_yet: "まだ言えない",
    },
    seeds: [
      { label: "体が重い", text: "きょうは体が疲れています" },
      { label: "心が落ち着かない", text: "きょうは心が落ち着きません" },
      { label: "眠れない", text: "このところ眠りが難しいです" },
    ],
    crisis: "いま危険なら、このアプリと一人でいないでください — タイでは 1669 / 1323 / 1413、または近くの救急、いま傍にいられる人へ。",
    vesselIdle: "sit with",
    vesselBusy: "sitting",
  },
  compass: {
    kicker: "パートナーの道具 · COMPASS",
    h2a: "四つの軸",
    h2b: "自分で選ぶ",
    lede: "点数のテストではありません。Claude の建築による Healing Partner の Compass です — Capacity / Direction / Friction / Support。軸ごとに一つ。システムは答えを埋めません。",
    folioA: "LUNAR SPARK · PRIVATE-BY-DEFAULT",
    folioB: "FOLIO 01 · HEALING PARTNER",
    introTitle: "きょうはどんな感じ — 言いたい分だけ",
    introBody: "この四軸は Claude の canon です。隠れた点数も診断もありません。",
    make: "MAKE ONE SMALL EXPERIMENT →",
    needFour: "四軸を選んでください — 点数も「正解」もありません",
    ready: "自分で選んだ四つから reflection を作れます",
    restAsk: "trajectory の前に、もう一つだけ",
    restYes: "はい — 今はこのことから休みたい",
    restNo: "いいえ — Direction を選び直す",
    restQuestion: "今は本当に「このことから休みたい」ですか。それとも、まだ触れたくないけれど別の方向には動きたいですか。",
    told: "いま、あなた自身が言ったこと",
    proTitle: "「専門家に会いたい」を選びました",
    proBody: "下の Golden Path は任意の experiment です。人を探す前に通る関門ではありません。",
    proLink: "Human Care Door へ →",
    path: "GOLDEN PATH · ONE BOUNDED EXPERIMENT",
    step: "SMALLEST STEP",
    stop: "STOP RULE",
    reality: "REALITY QUESTION",
    window: "RETURN WINDOW",
    noteLabel: "OPTIONAL LOCAL NOTE · 秘密や臨床の詳細は書かない",
    notePh: "世界は短く何と答えたか…",
    notePrivacy: "このメモはこのブラウザだけに残ります。秘密や臨床の詳細は書かないでください。",
    capacity: {
      title: "Capacity",
      hint: "きょう使える力",
      options: { low: "ほとんど力がない", limited: "少しだけ動ける", steady: "試す余地がある" },
    },
    direction: {
      title: "Direction",
      hint: "どちらへ動きたいか",
      options: {
        rest: "休む / 音を小さくする",
        clarify: "一つをはっきりさせる",
        reconnect: "人 / 世界へ戻る",
        one_thing: "一つ、本当にやる",
      },
    },
    friction: {
      title: "Friction",
      hint: "引き止めている感じ",
      options: {
        noise: "noise が多い",
        body: "体 / 疲れ",
        not_yet: "今は触れたくない",
        overload: "いくつも重なっている",
        unknown: "まだ分からない",
      },
    },
    support: {
      title: "Support",
      hint: "どう歩きたいか",
      options: { solo: "まず一人で", someone: "誰かと", professional: "専門家に会いたい" },
    },
    reflection: {
      capacity: { low: "力が少ない — とても小さく", limited: "少しずつ動ける", steady: "本物を試す余地がある" },
      direction: {
        rest: "休む / 音を小さくする",
        clarify: "一つをはっきりさせる",
        reconnect: "人や世界へ戻る",
        one_thing: "一つ、本当にやる",
      },
      friction: {
        noise: "頭やまわりの音が多い",
        body: "体や疲れが引き止めている",
        not_yet: "今は触れたくない",
        overload: "いくつも重なっている",
        unknown: "どこで引っかかるか分からない",
      },
      support: {
        solo: "まず一人で",
        someone: "誰かと歩きたい",
        professional: "専門家と話したい",
      },
    },
    outcomes: {
      tried: { btn: "I TRIED IT", copy: "「試した」と記録 — 次は世界が何と答えたかを見る。すぐ善し悪しにしない。" },
      not_for_me: { btn: "NOT FOR ME", copy: "「自分には合わない」は失敗ではなく、役に立つ evidence です。" },
      worse_for_me: { btn: "WORSE FOR ME", copy: "「自分には悪くなった」と受け取る — 成功に読み替えません。" },
      stop_rule_used: { btn: "I USED THE STOP RULE", copy: "stop rule を使った記録 — 規則どおり止めることはデータであり、失敗ではない。" },
      need_human: { btn: "I NEED A HUMAN", copy: "人が欲しいと記録 — システムは専門家のふりをしません。" },
      skipped: { btn: "SKIP", copy: "飛ばしてよい。experiment をしないこともデータです。" },
    },
  },
  ledger: {
    kicker: "REALITY LEDGER · LOCAL ONLY",
    h2a: "Reality,",
    h2b: "not a grade.",
    lede: "あなたが保存したことだけです。「tried」は「うまくいった」ではなく、「skipped」は失敗ではありません。",
    empty: "まだ現実からの evidence はありません。空欄を埋める数字は作りません。",
    export: "EXPORT LOCAL EVIDENCE · JSON",
    clear: "CLEAR LOCAL DATA",
    exported: "この端末に書き出しました。このボタンはサーバに trace を送りません。",
    cleared: "この端末の Lunar Spark データを消しました。",
    confirm: "このブラウザの Compass と evidence を消しますか？",
    stay: "ここで振り返っただけでは、何もこのページから出ていきません。",
    total: "TOTAL",
  },
  human: {
    kicker: "PROFESSIONAL CARE · SEPARATE AUTHORITY",
    h2a: "Some doors",
    h2b: "should be human.",
    lede: "評価、診断、治療、薬の調整、リスクのケアが必要なら — それは資格ある専門家の領分です。Lunar Spark は引き留めるために臨床家にはなりません。",
    roster: "PROVIDER ROSTER · NOT CLAIMED IN v0",
    fit: "WHEN PROFESSIONAL SUPPORT MAY FIT",
    fitBody: "問題が続き、生活がより乱れるとき、あるいはあなた自身が専門の責任を持つ人に見てほしいとき。",
    collect: "WHAT THIS PROTOTYPE DOES NOT COLLECT",
    collectBody: "診断名、薬のリスト、トラウマの詳細、HIV の状態、臨床の自由記述を AI / サーバに送る欄はありません。秘密の部屋の手紙はこの端末だけです。",
    danger: "IF THERE IS IMMEDIATE DANGER",
    dangerBody: "この試作を主の扉にしないでください — タイでは 1669 / 1323 / 1413、または地元の救急、いま傍にいられる信頼できる人へ。",
    lines: [
      { title: "1669", body: "救急 / 体が安定しない（タイ）" },
      { title: "1323", body: "こころのホットライン（タイ）" },
      { title: "1413", body: "タイのサマリタンズ" },
    ],
  },
  secret: {
    kicker: "GEMINI SPARK · WING TWO · GROK",
    h1: "秘密の部屋",
    em: "No one has to know.",
    lede: "うつ、こころ、HIV をかかえ、まだ知られたくない人のための静かな結社です。",
    enterCircle: "名のない輪に入る →",
    back: "Healing Partner へ戻る",
    law: "SECRET ROOM STAYS SECRET · NOT LIVE MATCHING",
    lawBody: "プロフィールも名前も、病を身分にもしません。この版にサーバ上の他の会員はいません。",
    chambersKicker: "THREE CHAMBERS · OPEN ONE",
    chambersH2a: "One door",
    chambersH2b: "at a time.",
    chambersLede: "全部を一度に開けないでください。今合う部屋を一つ。Healing Partner の Compass はここへ移していません — 心理は HIV の点数にならず、HIV は Compass の軸になりません。",
    open: "OPEN",
    close: "CLOSE",
    circleMeta: "SECRET ROOM · UNNAMED CIRCLE",
    circleLive: "NOT LIVE CHAT",
    circleTitle: "自己紹介のない輪",
    circleBody: "共有の部屋という意味の結社です。フィードでも友人でも集団療法でもありません。下の声は composite で、部屋が空きすぎて見捨てられた感じにならないためです。システムの生の人ではありません。",
    circleLaw: "人が要るなら：Healing Partner には自分で選ぶ reconnect の扉があり、Human Care Door はこの部屋を通らなくても開きます。匿名マッチングは claim していません — 後の AI が会員を偽らないでください。",
    whisperMeta: "SECRET ROOM · SEALED LETTER",
    whisperLocal: "LOCAL ONLY",
    whisperTitle: "名前を呼ばれずに話す",
    whisperBody: "この手紙に受取人はいません。本名、番号、薬、血液の結果、この端末に残したくないものは書かないでください。",
    whisperLabel: "280字 · このブラウザに封をする",
    whisperPh: "まだ誰にも話せないこと…",
    seal: "SEAL ON THIS DEVICE →",
    clear: "CLEAR LETTERS",
    sealed: "封じました。この手紙はこの端末だけです — v0 では他の会員は読めません。",
    cleared: "端末の手紙を消しました。",
    confirmClear: "この端末の封書を消しますか？",
    emptyLetters: "この端末に手紙はまだありません。代わりに文を作りません。",
    hivMeta: "SECRET ROOM · HIV LIFELINE",
    hivClinic: "NOT A CLINIC",
    hivTitle: "名乗らずに、道だけははっきり",
    hivBody: "HIV が秘密の部屋にあるのは、偏見が検査を遠ざけるからです。この頁は人への道を示します — 感染を当てず、薬を出さず、HIV を心理の点数にしません。",
    humanCta: "人の扉へ →",
    hub: "HIV INFO HUB",
    redcross: "タイ赤十字 匿名クリニック",
    chambers: {
      circle: { kicker: "01 · 名のない結社", title: "知られたくない輪", oneLine: "うつやこころが、まだ話せない日のため" },
      whisper: { kicker: "02 · 封書", title: "名前を呼ばれずに話す", oneLine: "書けばこの端末だけ — 現実の受取人はいない" },
      hiv: { kicker: "03 · 体と秘密", title: "HIV", oneLine: "医療と社会の道であり、Compass の点数ではない" },
    },
    voices: [
      { mark: "COMPOSITE 01", text: "治ったわけではない。家の人にまだ言いたくないだけ。名前を呼ばれない部屋にいると、一度息ができる。" },
      { mark: "COMPOSITE 02", text: "うつは悲しそうに見えると思われている。仕事にも行けるし、笑える。それでも知られたくない。" },
      { mark: "COMPOSITE 03", text: "HIV は私の性格でも、アプリの点数でもない。自分を説明したくないから、ここにいる。" },
      { mark: "COMPOSITE 04", text: "きょうの力が扉を閉めるだけなら、それでよい。誰かの励ましになる必要はない。" },
    ],
    hiv: {
      now: {
        kicker: "01 · この時間",
        title: "いま曝露した",
        oneLine: "この頁にクリニックの代わりをさせないでください",
        law: "PEP は現実の時間におけるクリニックの判断であり、ウェブのボタンではありません。",
        facts: [
          "防護なしの性、コンドームの破損、使用済みの針、強制 — これは時間の問題であり、恥の問題ではありません。",
          "国際とタイの指針は、限られた窓のなかで早く PEP を始めるよう示します。いまの時間の数字はクリニックの指針のものであり、この頁にはロックしません。",
          "AI の助言で薬を始めないでください。他人の薬を分けないでください。「感染したと確信する」まで待たないでください。",
          "傷、暴行、体が安定しないときは、病名より生理と安全が先です。",
        ],
        never: "感染したかどうかを答えるリスク診断はなく、用量もありません。",
        next: "今日、実際の窓口へ。そのあと他の扉を読んでもよい。",
      },
      status: {
        kicker: "02 · 事実",
        title: "状態を知りたい",
        oneLine: "検査は画面のテストではなく、実際の窓口の仕事です",
        law: "自分の HIV の状態を知る道は一つ：現実の世界での検査。",
        facts: [
          "この頁はテストではなく、診断チャットでもなく、症状から当てません。",
          "タイの公衆衛生には検査、自己検査、匿名クリニックがあります — 権利と場所は HIV INFO HUB / いまの窓口から。",
          "ウィンドウ期間があるため、早すぎる陰性はまだ閉じません。結果を読むのは提供者の仕事です。",
          "陽性は人生の終わりの文ではありません。陰性は予防をやめる許可でもありません。",
        ],
        never: "診断に見せかける回答は保存せず、「リスク点数」も作りません。",
        next: "検査の窓口を選んでください。血液の結果や臨床の詳細を AI に送らないでください。",
      },
      live: {
        kicker: "03 · ともに生きる",
        title: "生き続ける",
        oneLine: "HIV は終わりの文ではなく、アプリの点数でもない",
        law: "HIV とともに生きる人はアプリの症例ではなく、罰でもありません。",
        facts: [
          "HIV は医師が処方する抗ウイルス薬（ART）で抑えられます。この頁は処方、用量、CD4 を命令にしません。",
          "U=U — 臨床の定義で血中ウイルスが検出不能まで抑えられたとき、性的な非感染は認められた証拠です。その確認はクリニックであり、この頁ではありません。",
          "エイズ（AIDS）は免疫が損なわれ日和見疾患が起きる状態であり、HIV のあるすべての人の別名ではありません。",
          "偏見は検査と治療から人を遠ざける。恥は医療データではありません。",
        ],
        never: "ウイルス量を UI のスコアにせず、偽のフォローアップ診療にもなりません。",
        next: "治療は医師/クリニックへ。心が持たないときは Healing Partner と人の扉は別にあります。",
      },
      prevent: {
        kicker: "04 · 防ぐ",
        title: "次の機会を下げる",
        oneLine: "PrEP / コンドーム / 現実の制度の権利 — AI の処方ではない",
        law: "根拠のある予防は現実にあります：コンドーム、PrEP、PEP、ウイルスが抑えられた相手の ART — モデルの中にはありません。",
        facts: [
          "コンドームはまだ手に取れる道具で、アプリの処方を待ちません。",
          "PrEP は曝露の前の薬で、HIV のない人のためのものです。検査と窓口が要ります。この頁は処方を選びません。",
          "PEP は後。PrEP は前。自分で入れ替えないでください。",
          "性、物質、強制は、この頁の道徳の軸にはありません。",
        ],
        never: "クリック一つで「高リスク」に分けず、恐れも売りません。",
        next: "PrEP / コンドーム / 肝炎ワクチンが関係するなら窓口に聞いてください。薬を AI に求めないでください。",
      },
    },
  },
  patron: {
    kicker: "PATRON ART BOOK · SEVEN SEEINGS",
    h1: "Not a pitch deck.",
    em: "A room you can walk through.",
    lede: "Grok is Grok — 一つの seeing、それから筆を返す。",
    law: "これはピッチではありません。仕事が長い命に値するかを決める前に歩く部屋です。見せ物より証明。最後の票は現実にあります。",
    last: "LAST WORD",
    morning: "Success is a morning that does not need the app.",
    morningBody: "画面に長く留まるほど、Lunar Spark は負けます。奥の部屋の椅子は、必要なとき坐り、立って筆を返すために空けてあります。",
    seal: "PATRON FOLIO · NOT HEALTHCARE SOFTWARE",
    back: "Healing Partner へ戻る →",
    secret: "秘密の部屋",
    inviteKicker: "絵の部屋",
    inviteH2a: "先に家を",
    inviteH2b: "歩いてよい",
    inviteLede: "Patron はこの家のポスターと絵です。支払いボタンはまだありません。",
    inviteCta: "絵の部屋を開く →",
    caps: {
      harbor: "家の港 — 破風に月、敷居に一つの灯",
      nave: "身廊 — 一本の光、石のうえの金",
      walks: "二つの道 — 左にクリニック、右に紅の翼、あいだに火花",
      hands: "手のなかの残りの火花 — 金は飾りではなく修繕",
      folio: "Compass は温かい紙のうえにあり、ダッシュボードでも点数でもない",
      sanctum: "奥の部屋 — 空の椅子、龕の小さな月、床のあたたかさ",
      door: "人の扉 — 商品は引き留めるために衣装を変えてはならない",
    },
  },
  footer: {
    law: "クリニックではない · 点数はない",
    openManual: "案内を開く",
    tag: "疲れている日のための、静かな場所",
    rooms: "Compass · 秘密の部屋 · 人",
    local: "データはこの端末だけ",
  },
};

const zh: Messages = {
  nav: { partner: "同伴", secret: "密室", patron: "屋子的画", manual: "手册", lang: "语言" },
  door: { aria: "Lunar Spark 的门", title: "门", lede: "给疲惫那天的安静处", enter: "ENTER SITE" },
  manual: {
    kicker: "短手册 · 看完可以关",
    title: "Lunar Spark 是什么",
    p1: "给疲惫、紧绷、或还不愿告诉任何人的日子用的安静网站。",
    p2: "不是诊所。不是打分测验。也不是诊断。",
    can: "你可以做什么",
    partnerTitle: "和 Healing Partner 坐在一起",
    partnerBody: "身心按你说出的来坐，不是短测验。四轴 Compass 是 Claude 的工具，在下面。不必先填也能说话。",
    secretTitle: "进密室",
    secretBody: "给还不愿让人知道的事 — 抑郁、心理、或 HIV。不是即时聊天。",
    humanTitle: "找真人",
    humanBody: "不必先答题，就能拨热线 · 泰国 1669 / 1323 / 1413",
    patronTitle: "看这座屋子",
    patronBody: "Patron 是海报和画。没有付款按钮。",
    not: "这个网站不做的事",
    notBody: "不假装医生。不把健康数据送到服务器。不把你和陌生人配对。",
    close: "合上手册，进去 →",
  },
  cover: {
    h1: "安静的地方",
    em: "给疲惫的那天",
    lede: "不是诊所。没有分数。不必把一切说完。",
    sit: "和同伴坐下来 →",
    walk: "在屋子里接着走",
  },
  threshold: {
    law: "不是诊所",
    lawBody: "不诊断、不打分、不假装医生。",
    note: "左边是 Healing Partner · 右边是密室",
  },
  walks: {
    leftKicker: "左 · 旗舰",
    leftTitle: "Healing Partner",
    leftBody: "身心按你说出的来。不是打分测验。",
    leftCta: "和同伴坐下来 →",
    rightKicker: "右 · 密室",
    rightTitle: "还不必报名的房间",
    rightBody: "给还不愿让人知道的事。不是即时聊天。",
    rightCta: "进房间 →",
  },
  spark: {
    kicker: "一小点火就够",
    h2a: "不必先完整",
    h2b: "才能生活",
    body: "Lunar Spark 不会在屏幕上把你治好。它只帮一小步，然后你回到生活。",
  },
  principles: [
    { title: "只看你说的", body: "系统不猜测你没说的，也不诊断。" },
    { title: "一小步，不是命令", body: "可以试、可以跳过、可以停 — 没有好坏分数。" },
    { title: "真人在另一扇门", body: "想找医生或热线，直接按。应用不会假扮那个人。" },
  ],
  partner: {
    kicker: "HEALING PARTNER · 旗舰 · 整个人一起坐",
    h2a: "同伴",
    h2b: "不是医生",
    lede: "这是 Lunar Spark 的心脏 — 身心按你说出的来坐，不是短的打分测验。心理学全是 Claude 的建筑。四轴 Compass 在下面，是你自己选的工具。同伴不会改写它。",
    law: "身体算数。疲倦算数。睡眠算数。心算数。还不愿说的也算数。你没说的不会被猜，也不会变成诊断。",
    compassLink: "打开 Claude 的四轴 Compass →",
    sitLabel: "今天在和什么坐在一起 — 可以选好几项，也可以不选。这不是考试。",
    you: "你",
    name: "同伴",
    welcome: "身心我都可以坐，按你说出的。我不是医生。不打分。不先猜测。若要用 Claude 的四轴 Compass，它在下面 — 说话前不必先做。",
    waiting: "正在坐在一起…",
    seedsLabel: "可以直接说，或用这些短句 — 不是评估表",
    draftLabel: "给同伴的话 · 280 字 · 不要写药名、验血结果、或不愿留在这台机器上的事",
    placeholder: "今天的身体或心怎样 — 只说想说的…",
    send: "对同伴说 →",
    sending: "正在坐在一起…",
    idle: "想说多少就说多少 — 不必完整，也不必是诊断",
    done: "已经坐在一起 — 不是诊断",
    crisisStatus: "真人的门在下面 — 同伴不能代替热线",
    timeout: "这一轮没送到。可以再试。",
    errorDown: "这一轮同伴连不上",
    errorSlow: "这一轮同伴来不及答 — 可以再试",
    errorQuiet: "同伴暂时安静了",
    sit: {
      mind: "心",
      body: "身体",
      sleep: "睡眠",
      energy: "力气 / 疲倦",
      pain: "疼",
      people: "身边的人",
      not_yet: "还不愿说",
    },
    seeds: [
      { label: "身体累", text: "今天身体很累" },
      { label: "心不稳", text: "今天心里不稳" },
      { label: "睡不好", text: "这段时间睡觉很难" },
    ],
    crisis: "如果现在有危险，不要单独留在这个应用里 — 在泰国拨 1669 / 1323 / 1413，或当地急救，或去能此刻陪着你的人那里。",
    vesselIdle: "sit with",
    vesselBusy: "sitting",
  },
  compass: {
    kicker: "同伴的工具 · COMPASS",
    h2a: "四条轴",
    h2b: "由你自己选",
    lede: "这不是打分测验。这是 Claude 建筑里 Healing Partner 的 Compass — Capacity / Direction / Friction / Support。每轴选一项。系统不会替你填。",
    folioA: "LUNAR SPARK · PRIVATE-BY-DEFAULT",
    folioB: "FOLIO 01 · HEALING PARTNER",
    introTitle: "今天怎样 — 只说想说的",
    introBody: "这四轴是 Claude 的 canon。没有暗藏分数，也没有诊断。",
    make: "MAKE ONE SMALL EXPERIMENT →",
    needFour: "请选齐四轴 — 没有分数，也没有“正确答案”",
    ready: "可以从你自己选的四项做出 reflection",
    restAsk: "选 trajectory 前再问一件",
    restYes: "是 — 现在想先从这件事里休息",
    restNo: "不是 — 我要重选 Direction",
    restQuestion: "现在是真想“先从这件事里休息”，还是暂时不想碰它、但仍想往别处动？",
    told: "此刻你亲口告诉我们的",
    proTitle: "你选了“想找专业人士”",
    proBody: "下面的 Golden Path 只是可选的 experiment，不是见真人之前必须过的关。",
    proLink: "去 Human Care Door →",
    path: "GOLDEN PATH · ONE BOUNDED EXPERIMENT",
    step: "SMALLEST STEP",
    stop: "STOP RULE",
    reality: "REALITY QUESTION",
    window: "RETURN WINDOW",
    noteLabel: "OPTIONAL LOCAL NOTE · 不要写秘密 / 临床细节",
    notePh: "真实世界简短回答了什么…",
    notePrivacy: "这条笔记只留在这台浏览器里；不要写秘密或临床细节。",
    capacity: {
      title: "Capacity",
      hint: "今天有的力气",
      options: { low: "力气非常少", limited: "只能一点点动", steady: "有空间可以试" },
    },
    direction: {
      title: "Direction",
      hint: "想往哪边动",
      options: {
        rest: "休息 / 把声音关小",
        clarify: "把一件事弄清楚",
        reconnect: "回到人 / 世界",
        one_thing: "认真做一件",
      },
    },
    friction: {
      title: "Friction",
      hint: "觉得在拉住你的",
      options: {
        noise: "noise 很多",
        body: "身体 / 疲倦",
        not_yet: "现在还不想碰",
        overload: "许多事叠在一起",
        unknown: "还不知道",
      },
    },
    support: {
      title: "Support",
      hint: "想怎么走",
      options: { solo: "先自己试", someone: "有人在", professional: "想找专业人士" },
    },
    reflection: {
      capacity: { low: "力气少 — 请非常小", limited: "可以一点点动", steady: "有空间试一件真的" },
      direction: {
        rest: "休息 / 把声音关小",
        clarify: "把一件事弄清楚",
        reconnect: "回到人或世界",
        one_thing: "认真做一件真的",
      },
      friction: {
        noise: "脑子里/周围的声音很多",
        body: "身体或疲倦在拉住",
        not_yet: "现在还不想碰",
        overload: "许多事叠在一起",
        unknown: "还不知道卡在哪里",
      },
      support: {
        solo: "先自己试",
        someone: "想有人同行",
        professional: "想和专业人士谈",
      },
    },
    outcomes: {
      tried: { btn: "I TRIED IT", copy: "记下“试过了” — 下一步是看世界怎么答，而不是急着判好坏。" },
      not_for_me: { btn: "NOT FOR ME", copy: "“不适合我”是有价值的 evidence，不是失败。" },
      worse_for_me: { btn: "WORSE FOR ME", copy: "记下“对我更糟” — 不会被解释成成功。" },
      stop_rule_used: { btn: "I USED THE STOP RULE", copy: "记下用了 stop rule — 按规定停下来是数据，不是失败。" },
      need_human: { btn: "I NEED A HUMAN", copy: "记下你想要人 — 系统不会假扮专家。" },
      skipped: { btn: "SKIP", copy: "完全可以跳过。不做 experiment 也是数据。" },
    },
  },
  ledger: {
    kicker: "REALITY LEDGER · LOCAL ONLY",
    h2a: "Reality,",
    h2b: "not a grade.",
    lede: "只有你自己按下保存的。“tried”不等于“有效”，“skipped”也不是失败。",
    empty: "还没有来自真实世界的 evidence — 我们不会编数字来填空。",
    export: "EXPORT LOCAL EVIDENCE · JSON",
    clear: "CLEAR LOCAL DATA",
    exported: "已在本地导出。这个按钮不会把 trace 送到服务器。",
    cleared: "已清除这台机器上的 Lunar Spark 数据。",
    confirm: "清除这台浏览器里的 Compass 和 evidence？",
    stay: "只在这里回想，不会有任何东西离开这个页面。",
    total: "TOTAL",
  },
  human: {
    kicker: "PROFESSIONAL CARE · SEPARATE AUTHORITY",
    h2a: "Some doors",
    h2b: "should be human.",
    lede: "若你要评估、诊断、治疗、调药、或风险照护 — 那属于有资格的专业人士。Lunar Spark 不会把自己变成临床医生来留住你。",
    roster: "PROVIDER ROSTER · NOT CLAIMED IN v0",
    fit: "WHEN PROFESSIONAL SUPPORT MAY FIT",
    fitBody: "当问题持续、更打扰生活，或你自己希望有专业责任的人来看。",
    collect: "WHAT THIS PROTOTYPE DOES NOT COLLECT",
    collectBody: "没有栏位把诊断、药单、创伤史、HIV 状态或临床自由文本送给 AI / 服务器。密室的信只留在这台机器。",
    danger: "IF THERE IS IMMEDIATE DANGER",
    dangerBody: "不要把这个原型当主门 — 在泰国拨 1669 / 1323 / 1413，或当地急救，或去此刻能陪着你、你信任的人那里。",
    lines: [
      { title: "1669", body: "急救 / 身体不稳（泰国）" },
      { title: "1323", body: "心理健康热线（泰国）" },
      { title: "1413", body: "泰国撒玛利亚会" },
    ],
  },
  secret: {
    kicker: "GEMINI SPARK · WING TWO · GROK",
    h1: "密室",
    em: "No one has to know.",
    lede: "给带着抑郁、心理或 HIV、还不想让人知道的人的安静结社。",
    enterCircle: "进入没有名字的圈 →",
    back: "回到 Healing Partner",
    law: "SECRET ROOM STAYS SECRET · NOT LIVE MATCHING",
    lawBody: "没有资料、没有名字、不把病当成身份，这个版本的服务器上也没有其他会员。",
    chambersKicker: "THREE CHAMBERS · OPEN ONE",
    chambersH2a: "One door",
    chambersH2b: "at a time.",
    chambersLede: "不要一次打开所有房间。选现在合适的那一间。Healing Partner 的 Compass 没有搬到这里 — 心理不会变成 HIV 分数，HIV 也不会变成 Compass 的轴。",
    open: "OPEN",
    close: "CLOSE",
    circleMeta: "SECRET ROOM · UNNAMED CIRCLE",
    circleLive: "NOT LIVE CHAT",
    circleTitle: "不必自我介绍的圈",
    circleBody: "这是共享房间意义上的结社 — 不是动态、不是朋友、也不是团体治疗。下面的声音是 composite，为了不让房间空到像被丢下。他们不是系统里的真人。",
    circleLaw: "若要真人：Healing Partner 有你自己选的 reconnect 门，Human Care Door 也不必经过这间房。匿名配对并未被 claim — 不要让下一版 AI 假装有会员。",
    whisperMeta: "SECRET ROOM · SEALED LETTER",
    whisperLocal: "LOCAL ONLY",
    whisperTitle: "说话，却不被叫出名字",
    whisperBody: "这封信没有收件人。不要写真名、号码、药、验血结果、或不愿留在这台机器上的事。",
    whisperLabel: "280 字 · 封在这台浏览器里",
    whisperPh: "还无法告诉任何人的事…",
    seal: "SEAL ON THIS DEVICE →",
    clear: "CLEAR LETTERS",
    sealed: "已封上。这封信只在这台机器 — v0 没有其他会员能读。",
    cleared: "已清除本地的信。",
    confirmClear: "清除这台机器上封好的信？",
    emptyLetters: "这台机器上还没有信 — 我们不会替你编一句。",
    hivMeta: "SECRET ROOM · HIV LIFELINE",
    hivClinic: "NOT A CLINIC",
    hivTitle: "路很清楚，不必公开自己",
    hivBody: "HIV 放在密室，是因为污名仍让人不敢去检查。这一页指向真人 — 不猜是否感染、不开药、不把 HIV 变成心理分数。",
    humanCta: "去真人的门 →",
    hub: "HIV INFO HUB",
    redcross: "泰国红十字会匿名诊所",
    chambers: {
      circle: { kicker: "01 · 没有名字的结社", title: "不愿让人知道的圈", oneLine: "给抑郁或心理还不是能讲的故事的日子" },
      whisper: { kicker: "02 · 封好的信", title: "说话，却不被叫出名字", oneLine: "写了只留在这台机器 — 现实里没有收件人" },
      hiv: { kicker: "03 · 身体和秘密", title: "HIV", oneLine: "医疗与社会的路，不是 Compass 上的分数" },
    },
    voices: [
      { mark: "COMPOSITE 01", text: "我没有好。我只是还不想告诉家里的人。待在没人叫我名字的房间里，我能喘一口气。" },
      { mark: "COMPOSITE 02", text: "人们以为抑郁一定看起来悲伤。我能上班，能笑，仍然不想让人知道。" },
      { mark: "COMPOSITE 03", text: "HIV 不是我的性格，也不是应用里的分数。我来这里是因为还不想解释自己。" },
      { mark: "COMPOSITE 04", text: "如果今天的力气只够关门，那就够了。不必成为谁的励志。" },
    ],
    hiv: {
      now: {
        kicker: "01 · 这个小时",
        title: "刚刚暴露",
        oneLine: "不要等这一页代替诊室做决定",
        law: "PEP 是诊所在真实小时里的决定，不是网页上的按钮。",
        facts: [
          "如果刚刚无保护性行为、安全套破了、针头被用过、或被强迫 — 这是时间的问题，不是羞耻的问题。",
          "国际与泰国指引都指出应在有限窗口内尽早开始 PEP。当前的小时数字属于诊所指引 — 不锁在这一页。",
          "不要凭 AI 的建议开始用药。不要分别人的药。不要等到“确定感染了”。",
          "若有伤口、被伤害、或身体不稳，生理与安全先于病名。",
        ],
        never: "这一页没有给出感染与否的风险评估，也没有剂量。",
        next: "今天就去服务窗口。然后再回来看其他门。",
      },
      status: {
        kicker: "02 · 事实",
        title: "想知道状态",
        oneLine: "检测属于真实服务，不是屏幕上的测验",
        law: "知道自己 HIV 状态的路只有一条：在真实世界做检测。",
        facts: [
          "这一页不是测验，不是诊断聊天，也不会从症状去猜。",
          "泰国公共卫生有检测、自检、匿名诊所 — 权利与地点看 HIV INFO HUB / 当前窗口。",
          "窗口期意味着过早的阴性还不能结束这件事。读结果属于服务提供者。",
          "阳性不是人生的终句。阴性也不是停止保护的许可证。",
        ],
        never: "不把表单答案存成暗藏诊断，也不制造“风险分数”。",
        next: "选择检测窗口。不要把血液结果或临床细节送给 AI。",
      },
      live: {
        kicker: "03 · 带着它生活",
        title: "继续生活",
        oneLine: "HIV 不是终句，也不是应用里的分数",
        law: "与 HIV 一起生活的人不是应用的病例，也不是惩罚。",
        facts: [
          "HIV 可用医生开的抗病毒药（ART）压住。这一页不把方案、剂量或 CD4 写成命令。",
          "U=U — 当血液中病毒按临床定义被压到检测不到，性传播不被传出是被接受的证据。确认该状态属于诊所，不属于这一页。",
          "艾滋病（AIDS）是免疫被破坏到出现机会性感染的状态 — 不是所有 HIV 的同义词。",
          "污名让人不去检测、不去治疗。羞耻不是医疗数据。",
        ],
        never: "不把病毒载量做成界面分数，也不假装随访诊所。",
        next: "治疗回到医生/诊所。若心撑不住，Healing Partner 和真人的门是分开的。",
      },
      prevent: {
        kicker: "04 · 预防",
        title: "降低下一次机会",
        oneLine: "PrEP / 安全套 / 真实系统里的权利 — 不是 AI 的处方",
        law: "有证据的预防在真实世界：安全套、PrEP、PEP、病毒被压住的伴侣的 ART — 不在模型里。",
        facts: [
          "安全套仍是可以拿在手里的工具，不必等应用开处方。",
          "PrEP 是暴露前的药，给还没有 HIV 的人。需要检测和真实窗口。这一页不选方案。",
          "PEP 是之后。PrEP 是之前。不要自己对调。",
          "性行为、物质使用、被强迫，不在这一页的道德轴上。",
        ],
        never: "不会因一次点击把人分成“高风险”，也不贩卖恐惧。",
        next: "若相关，向窗口询问 PrEP / 安全套 / 肝炎疫苗。不要向 AI 要药。",
      },
    },
  },
  patron: {
    kicker: "PATRON ART BOOK · SEVEN SEEINGS",
    h1: "Not a pitch deck.",
    em: "A room you can walk through.",
    lede: "Grok is Grok — 看一次，然后把笔还回去。",
    law: "这本书不是路演。它是一间你先走进去、再决定这件工作是否值得更长生命的房间。先证明，后场面。最后一票给现实。",
    last: "LAST WORD",
    morning: "Success is a morning that does not need the app.",
    morningBody: "人在屏幕上待得越久，Lunar Spark 就越输。里间的椅子空着，需要时坐，然后站起来把笔还回去。",
    seal: "PATRON FOLIO · NOT HEALTHCARE SOFTWARE",
    back: "回到 Healing Partner →",
    secret: "密室",
    inviteKicker: "画室",
    inviteH2a: "先走一遍",
    inviteH2b: "这座屋子",
    inviteLede: "Patron 是这座屋子的海报和画。还没有付款按钮。",
    inviteCta: "打开画室 →",
    caps: {
      harbor: "屋子的港口 — 月亮压在屋脊，门槛一盏灯",
      nave: "中厅 — 一道光，石头上的金痕",
      walks: "两条路 — 左是诊所，右是绯红的翼，火花在中间相遇",
      hands: "手里剩下的火星 — 金是修补，不是首饰",
      folio: "Compass 在温热的纸上，不是仪表盘，也没有分数",
      sanctum: "里间 — 空椅子，龛里的小月亮，地上的暖",
      door: "真人的门 — 产品不该为了留住你而换装",
    },
  },
  footer: {
    law: "不是诊所 · 没有分数",
    openManual: "打开手册",
    tag: "给疲惫那天的安静处",
    rooms: "Compass · 密室 · 真人",
    local: "数据只留在这台机器",
  },
};

const ko: Messages = {
  nav: { partner: "동반자", secret: "비밀 방", patron: "집의 그림", manual: "안내", lang: "언어" },
  door: { aria: "Lunar Spark 의 문", title: "문", lede: "지친 날을 위한 조용한 곳", enter: "ENTER SITE" },
  manual: {
    kicker: "짧은 안내 · 닫아도 됩니다",
    title: "Lunar Spark 란",
    p1: "지치고, 팽팽하고, 아직 누구에게도 말할 수 없는 날을 위한 조용한 웹입니다.",
    p2: "클리닉이 아닙니다. 점수 나는 시험도, 진단도 아닙니다.",
    can: "할 수 있는 일",
    partnerTitle: "Healing Partner 와 앉기",
    partnerBody: "몸과 마음을, 당신이 말한 만큼만 함께 앉습니다. 짧은 퀴즈가 아닙니다. 네 축 Compass 는 Claude 의 도구로 아래에 있습니다. 쓰지 않고도 말할 수 있습니다.",
    secretTitle: "비밀 방에 들어가기",
    secretBody: "아직 알리고 싶지 않은 일 — 우울, 마음, HIV — 을 위한 방입니다. 실시간 채팅이 아닙니다.",
    humanTitle: "사람을 찾기",
    humanBody: "질문에 답하지 않고도 핫라인에 걸 수 있습니다 · 태국 1669 / 1323 / 1413",
    patronTitle: "집을 보기",
    patronBody: "Patron 은 포스터와 그림입니다. 결제 버튼은 없습니다.",
    not: "이 사이트가 하지 않는 일",
    notBody: "의사인 척하지 않습니다. 건강 데이터를 서버로 보내지 않습니다. 낯선 사람과 매칭하지 않습니다.",
    close: "안내를 닫고 들어가기 →",
  },
  cover: {
    h1: "조용한 곳",
    em: "지친 날을 위해",
    lede: "클리닉이 아닙니다. 점수도 없습니다. 모든 것을 말할 필요도 없습니다.",
    sit: "동반자와 앉기 →",
    walk: "집 안을 더 걷기",
  },
  threshold: {
    law: "클리닉이 아닙니다",
    lawBody: "진단하지 않고, 채점하지 않고, 의사인 척하지 않습니다.",
    note: "왼쪽은 Healing Partner · 오른쪽은 비밀 방",
  },
  walks: {
    leftKicker: "왼쪽 · 기함",
    leftTitle: "Healing Partner",
    leftBody: "몸과 마음을, 당신이 말한 만큼. 점수 나는 시험이 아닙니다.",
    leftCta: "동반자와 앉기 →",
    rightKicker: "오른쪽 · 비밀 방",
    rightTitle: "이름을 말하지 않아도 되는 방",
    rightBody: "아직 알리고 싶지 않은 일을 위해. 실시간 채팅이 아닙니다.",
    rightCta: "방에 들어가기 →",
  },
  spark: {
    kicker: "작은 불이면 됩니다",
    h2a: "온전해진 다음에야",
    h2b: "살 필요는 없습니다",
    body: "Lunar Spark 는 화면에서 당신을 고치지 않습니다. 작은 한 걸음 뒤, 삶으로 돌아가게 할 뿐입니다.",
  },
  principles: [
    { title: "당신이 말한 것만", body: "말하지 않은 것을 추측하지 않고, 진단하지도 않습니다." },
    { title: "작은 걸음이지, 명령이 아닙니다", body: "시도해도, 건너뛰어도, 멈춰도 됩니다 — 좋고 나쁨의 점수는 없습니다." },
    { title: "사람은 다른 문", body: "의사나 핫라인이 필요하면 그대로 누르세요. 앱은 그 사람인 척하지 않습니다." },
  ],
  partner: {
    kicker: "HEALING PARTNER · 기함 · 사람 전체와 앉기",
    h2a: "동반자",
    h2b: "의사가 아닙니다",
    lede: "이곳이 Lunar Spark 의 심장입니다. 몸과 마음을, 당신이 이름 붙인 만큼 앉습니다. 짧은 채점 퀴즈가 아닙니다. 심리학은 모두 Claude 의 건축입니다. 네 축 Compass 는 아래에 있고, 당신이 직접 고르는 도구입니다. 동반자는 그것을 덮어쓰지 않습니다.",
    law: "몸은 셉니다. 피로는 셉니다. 잠은 셉니다. 마음은 셉니다. 아직 말할 수 없는 것도 셉니다. 말하지 않은 것은 추측되지 않고, 진단이 되지도 않습니다.",
    compassLink: "Claude 의 네 축 Compass 열기 →",
    sitLabel: "오늘은 무엇과 앉아 있나요 — 여러 개를 골라도, 안 골라도 됩니다. 시험이 아닙니다.",
    you: "당신",
    name: "동반자",
    welcome: "몸과 마음, 당신이 말한 만큼 함께 앉을 수 있습니다. 나는 의사가 아닙니다. 점수를 매기지 않습니다. 먼저 추측하지 않습니다. Claude 의 네 축 Compass 는 아래에 있습니다 — 말하기 전에 쓸 필요는 없습니다.",
    waiting: "함께 앉아 있습니다…",
    seedsLabel: "자유롭게 말해도 되고, 짧은 문장을 써도 됩니다 — 평가가 아닙니다",
    draftLabel: "동반자에게 보내는 말 · 280자 · 약 이름, 혈액 결과, 이 기기에 남기고 싶지 않은 것은 적지 마세요",
    placeholder: "오늘 몸이나 마음은 — 말하고 싶은 만큼만…",
    send: "동반자에게 말하기 →",
    sending: "함께 앉아 있습니다…",
    idle: "말하고 싶은 만큼만 — 완전하지 않아도, 진단이 아니어도 됩니다",
    done: "함께 앉았습니다 — 진단이 아닙니다",
    crisisStatus: "사람의 문은 아래에 있습니다 — 동반자는 핫라인이 아닙니다",
    timeout: "이번 라운드에는 닿지 않았습니다. 다시 시도해도 됩니다.",
    errorDown: "이번 라운드에는 동반자가 연결되지 않았습니다",
    errorSlow: "이번 라운드에는 답이 늦었습니다 — 다시 시도해도 됩니다",
    errorQuiet: "동반자가 잠시 조용해졌습니다",
    sit: {
      mind: "마음",
      body: "몸",
      sleep: "잠",
      energy: "힘 / 피로",
      pain: "아픔",
      people: "주변 사람",
      not_yet: "아직 말하기 어려움",
    },
    seeds: [
      { label: "몸이 지침", text: "오늘 몸이 지칩니다" },
      { label: "마음이 흔들림", text: "오늘 마음이 흔들립니다" },
      { label: "잠이 어려움", text: "요즘 잠이 어렵습니다" },
    ],
    crisis: "지금 위험하다면 이 앱과 혼자 있지 마세요 — 태국에서는 1669 / 1323 / 1413, 또는 지역 응급, 지금 곁에 있어 줄 사람에게.",
    vesselIdle: "sit with",
    vesselBusy: "sitting",
  },
  compass: {
    kicker: "동반자의 도구 · COMPASS",
    h2a: "네 개의 축",
    h2b: "당신이 직접 고릅니다",
    lede: "점수 나는 시험이 아닙니다. Claude 건축의 Healing Partner Compass 입니다 — Capacity / Direction / Friction / Support. 축마다 하나. 시스템이 답을 채워 넣지 않습니다.",
    folioA: "LUNAR SPARK · PRIVATE-BY-DEFAULT",
    folioB: "FOLIO 01 · HEALING PARTNER",
    introTitle: "오늘은 어떤가요 — 말하고 싶은 만큼만",
    introBody: "이 네 축은 Claude 의 canon 입니다. 숨은 점수도, 진단도 없습니다.",
    make: "MAKE ONE SMALL EXPERIMENT →",
    needFour: "네 축을 모두 고르세요 — 점수도 “정답”도 없습니다",
    ready: "당신이 고른 넷으로 reflection 을 만들 수 있습니다",
    restAsk: "trajectory 전에 하나만 더",
    restYes: "네 — 지금은 이 일에서 쉬고 싶습니다",
    restNo: "아니요 — Direction 을 다시 고를게요",
    restQuestion: "지금 정말 “이 일에서 먼저 쉬고” 싶은가요, 아니면 아직은 건드리고 싶지 않지만 다른 쪽으로는 움직이고 싶은가요?",
    told: "지금, 당신이 직접 말한 것",
    proTitle: "“전문가를 찾고 싶다”를 골랐습니다",
    proBody: "아래 Golden Path 는 선택적 experiment 일 뿐, 사람을 찾기 전에 통과해야 하는 문이 아닙니다.",
    proLink: "Human Care Door 로 →",
    path: "GOLDEN PATH · ONE BOUNDED EXPERIMENT",
    step: "SMALLEST STEP",
    stop: "STOP RULE",
    reality: "REALITY QUESTION",
    window: "RETURN WINDOW",
    noteLabel: "OPTIONAL LOCAL NOTE · 비밀 / 임상 세부사항은 적지 마세요",
    notePh: "실제 세계가 짧게 무엇이라 답했나요…",
    notePrivacy: "이 메모는 이 브라우저에만 남습니다. 비밀이나 임상 세부사항은 적지 마세요.",
    capacity: {
      title: "Capacity",
      hint: "오늘 가진 힘",
      options: { low: "힘이 매우 적다", limited: "조금씩 움직일 수 있다", steady: "해볼 공간이 있다" },
    },
    direction: {
      title: "Direction",
      hint: "어느 쪽으로 움직이고 싶은가",
      options: {
        rest: "쉬기 / 소리를 낮추기",
        clarify: "하나를 더 분명하게",
        reconnect: "사람 / 세계로 돌아가기",
        one_thing: "진짜 하나 하기",
      },
    },
    friction: {
      title: "Friction",
      hint: "붙잡고 있는 느낌",
      options: {
        noise: "noise 가 많다",
        body: "몸 / 피로",
        not_yet: "지금은 건드리고 싶지 않다",
        overload: "여러 일이 겹쳐 있다",
        unknown: "아직 모르겠다",
      },
    },
    support: {
      title: "Support",
      hint: "어떻게 걷고 싶은가",
      options: { solo: "먼저 혼자", someone: "누군가와", professional: "전문가를 찾고 싶다" },
    },
    reflection: {
      capacity: { low: "힘이 적다 — 아주 작게", limited: "조금씩 움직일 수 있다", steady: "진짜를 해볼 공간이 있다" },
      direction: {
        rest: "쉬기 / 소리를 낮추기",
        clarify: "하나를 더 분명하게",
        reconnect: "사람이나 세계로 돌아가기",
        one_thing: "진짜 하나 하기",
      },
      friction: {
        noise: "머리/주변의 소리가 많다",
        body: "몸이나 피로가 붙잡고 있다",
        not_yet: "지금은 건드리고 싶지 않다",
        overload: "여러 일이 겹쳐 있다",
        unknown: "어디에 걸리는지 아직 모른다",
      },
      support: {
        solo: "먼저 혼자",
        someone: "누군가와 걷고 싶다",
        professional: "전문가와 이야기하고 싶다",
      },
    },
    outcomes: {
      tried: { btn: "I TRIED IT", copy: "“시도했다”로 기록 — 다음은 세계가 무엇이라 답했는지 보는 것이지, 서둘러 좋고 나쁨을 정하는 것이 아닙니다." },
      not_for_me: { btn: "NOT FOR ME", copy: "“나에게는 아니다”는 실패가 아니라 쓸모 있는 evidence 입니다." },
      worse_for_me: { btn: "WORSE FOR ME", copy: "“나에게는 더 나빠졌다”로 받습니다 — 성공으로 되돌리지 않습니다." },
      stop_rule_used: { btn: "I USED THE STOP RULE", copy: "stop rule 을 썼다고 기록 — 규칙대로 멈추는 것은 데이터이지 실패가 아닙니다." },
      need_human: { btn: "I NEED A HUMAN", copy: "사람이 필요하다고 기록 — 시스템은 그 전문가인 척하지 않습니다." },
      skipped: { btn: "SKIP", copy: "건너뛰어도 됩니다. experiment 를 하지 않는 것도 데이터입니다." },
    },
  },
  ledger: {
    kicker: "REALITY LEDGER · LOCAL ONLY",
    h2a: "Reality,",
    h2b: "not a grade.",
    lede: "당신이 저장을 누른 것만입니다. “tried”는 “됐다”가 아니고, “skipped”는 실패가 아닙니다.",
    empty: "아직 실제 세계의 evidence 가 없습니다 — 빈칸을 채울 숫자를 만들지 않습니다.",
    export: "EXPORT LOCAL EVIDENCE · JSON",
    clear: "CLEAR LOCAL DATA",
    exported: "이 기기에 내보냈습니다. 이 버튼은 서버로 trace 를 보내지 않습니다.",
    cleared: "이 기기의 Lunar Spark 데이터를 지웠습니다.",
    confirm: "이 브라우저의 Compass 와 evidence 를 지울까요?",
    stay: "여기서 돌아보는 것만으로는 이 페이지에서 아무것도 나가지 않습니다.",
    total: "TOTAL",
  },
  human: {
    kicker: "PROFESSIONAL CARE · SEPARATE AUTHORITY",
    h2a: "Some doors",
    h2b: "should be human.",
    lede: "평가, 진단, 치료, 약 조절, 위험 돌봄이 필요하다면 — 그것은 자격 있는 전문가의 영역입니다. Lunar Spark 는 붙잡아 두려고 임상의가 되지 않습니다.",
    roster: "PROVIDER ROSTER · NOT CLAIMED IN v0",
    fit: "WHEN PROFESSIONAL SUPPORT MAY FIT",
    fitBody: "문제가 계속되고 삶을 더 흔들 때, 또는 당신 스스로 전문적 책임이 있는 사람에게 봐 주기를 원할 때.",
    collect: "WHAT THIS PROTOTYPE DOES NOT COLLECT",
    collectBody: "진단명, 약 목록, 트라우마 이력, HIV 상태, 임상 자유 텍스트를 AI / 서버로 보내는 칸이 없습니다. 비밀 방의 편지는 이 기기에만 있습니다.",
    danger: "IF THERE IS IMMEDIATE DANGER",
    dangerBody: "이 시제품을 주된 문으로 쓰지 마세요 — 태국에서는 1669 / 1323 / 1413, 또는 지역 응급, 지금 곁에 있어 줄 믿을 수 있는 사람에게.",
    lines: [
      { title: "1669", body: "응급 / 몸이 불안정 (태국)" },
      { title: "1323", body: "정신건강 핫라인 (태국)" },
      { title: "1413", body: "태국 사마리아회" },
    ],
  },
  secret: {
    kicker: "GEMINI SPARK · WING TWO · GROK",
    h1: "비밀 방",
    em: "No one has to know.",
    lede: "우울, 마음, HIV 를 안고 아직 알리고 싶지 않은 사람을 위한 조용한 결사입니다.",
    enterCircle: "이름 없는 원에 들어가기 →",
    back: "Healing Partner 로 돌아가기",
    law: "SECRET ROOM STAYS SECRET · NOT LIVE MATCHING",
    lawBody: "프로필도 이름도 없고, 병을 정체성으로 만들지 않으며, 이 버전의 서버에는 다른 회원이 없습니다.",
    chambersKicker: "THREE CHAMBERS · OPEN ONE",
    chambersH2a: "One door",
    chambersH2b: "at a time.",
    chambersLede: "모든 방을 한 번에 열지 마세요. 지금 맞는 방 하나. Healing Partner 의 Compass 는 여기로 옮기지 않았습니다 — 심리가 HIV 점수가 되지 않고, HIV 가 Compass 축이 되지 않습니다.",
    open: "OPEN",
    close: "CLOSE",
    circleMeta: "SECRET ROOM · UNNAMED CIRCLE",
    circleLive: "NOT LIVE CHAT",
    circleTitle: "자기소개가 없는 원",
    circleBody: "함께하는 방이라는 뜻의 결사입니다. 피드도, 친구도, 집단치료도 아닙니다. 아래 목소리는 composite 로, 방이 너무 비어 버려진 느낌이 나지 않게 합니다. 시스템의 실제 사람이 아닙니다.",
    circleLaw: "사람이 필요하면: Healing Partner 에는 당신이 고르는 reconnect 문이 있고, Human Care Door 는 이 방을 거치지 않아도 열립니다. 익명 매칭은 claim 하지 않았습니다 — 다음 AI 가 회원을 위조하지 마세요.",
    whisperMeta: "SECRET ROOM · SEALED LETTER",
    whisperLocal: "LOCAL ONLY",
    whisperTitle: "이름 불리지 않고 말하기",
    whisperBody: "이 편지에는 받는 사람이 없습니다. 실명, 번호, 약, 혈액 결과, 이 기기에 남기고 싶지 않은 것은 적지 마세요.",
    whisperLabel: "280자 · 이 브라우저에 봉인",
    whisperPh: "아직 누구에게도 말할 수 없는 것…",
    seal: "SEAL ON THIS DEVICE →",
    clear: "CLEAR LETTERS",
    sealed: "봉인했습니다. 이 편지는 이 기기에만 있습니다 — v0 에서는 다른 회원이 읽을 수 없습니다.",
    cleared: "기기의 편지를 지웠습니다.",
    confirmClear: "이 기기의 봉인된 편지를 지울까요?",
    emptyLetters: "이 기기에 아직 편지가 없습니다 — 대신 문장을 만들지 않습니다.",
    hivMeta: "SECRET ROOM · HIV LIFELINE",
    hivClinic: "NOT A CLINIC",
    hivTitle: "자신을 알리지 않고도, 길은 분명하게",
    hivBody: "HIV 가 비밀 방에 있는 것은, 낙인이 여전히 검사를 멀리하기 때문입니다. 이 페이지는 사람으로 가는 길을 가리킵니다 — 감염을 맞히지 않고, 약을 내지 않으며, HIV 를 심리 점수로 만들지 않습니다.",
    humanCta: "사람의 문으로 →",
    hub: "HIV INFO HUB",
    redcross: "태국 적십자 익명 클리닉",
    chambers: {
      circle: { kicker: "01 · 이름 없는 결사", title: "알리고 싶지 않은 원", oneLine: "우울이나 마음이 아직 말할 수 있는 이야기가 아닌 날을 위해" },
      whisper: { kicker: "02 · 봉인된 편지", title: "이름 불리지 않고 말하기", oneLine: "쓰면 이 기기에만 — 현실의 수신자는 없습니다" },
      hiv: { kicker: "03 · 몸과 비밀", title: "HIV", oneLine: "의료–사회의 길이지, Compass 의 점수가 아닙니다" },
    },
    voices: [
      { mark: "COMPOSITE 01", text: "나은 게 아닙니다. 아직 집 사람에게 말하고 싶지 않을 뿐입니다. 아무도 내 이름을 부르지 않는 방에 있으면, 한 번 숨을 쉴 수 있습니다." },
      { mark: "COMPOSITE 02", text: "사람들은 우울이 슬퍼 보여야 한다고 생각합니다. 나는 출근할 수 있고, 웃을 수 있고, 그래도 알리고 싶지 않습니다." },
      { mark: "COMPOSITE 03", text: "HIV 는 내 성격도, 앱의 점수도 아닙니다. 나를 설명하고 싶지 않아서 여기 있습니다." },
      { mark: "COMPOSITE 04", text: "오늘 힘이 문을 닫는 것뿐이라면, 그것으로 됩니다. 누군가의 영감이 될 필요는 없습니다." },
    ],
    hiv: {
      now: {
        kicker: "01 · 이 시간",
        title: "방금 노출됨",
        oneLine: "이 페이지가 진료실을 대신해 결정하게 두지 마세요",
        law: "PEP 는 실제 시간의 클리닉 판단이지, 웹의 버튼이 아닙니다.",
        facts: [
          "방금 보호 없는 성관계, 콘돔 파손, 사용된 바늘, 강제 — 이것은 시간의 문제이지 부끄러움의 문제가 아닙니다.",
          "국제와 태국 지침은 제한된 창 안에서 빨리 PEP 를 시작하라고 가리킵니다. 지금의 시간 숫자는 클리닉 지침의 것이며, 이 페이지에 잠그지 않습니다.",
          "AI 조언으로 약을 시작하지 마세요. 다른 사람의 약을 나누지 마세요. “감염된 게 확실해질” 때까지 기다리지 마세요.",
          "상처, 폭행, 몸이 불안정하면 병명보다 생리와 안전이 먼저입니다.",
        ],
        never: "감염 여부를 답하는 위험 평가도, 용량도 없습니다.",
        next: "오늘 실제 창구로 가세요. 그다음 다른 문을 읽어도 됩니다.",
      },
      status: {
        kicker: "02 · 사실",
        title: "상태를 알고 싶다",
        oneLine: "검사는 화면의 퀴즈가 아니라 실제 창구의 일입니다",
        law: "자신의 HIV 상태를 아는 길은 하나뿐입니다: 실제 세계에서의 검사.",
        facts: [
          "이 페이지는 시험이 아니고, 진단 챗봇도 아니며, 증상으로 맞히지 않습니다.",
          "태국 공중보건에는 검사, 자가검사, 익명 클리닉이 있습니다 — 권리와 장소는 HIV INFO HUB / 현재 창구에서.",
          "윈도우 기간 때문에 너무 이른 음성은 아직 닫히지 않습니다. 결과를 읽는 것은 제공자의 일입니다.",
          "양성은 삶의 끝 문장이 아닙니다. 음성은 예방을 그만둘 허가도 아닙니다.",
        ],
        never: "진단으로 위장한 답변을 저장하지 않고, “위험 점수”도 만들지 않습니다.",
        next: "검사 창구를 고르세요. 혈액 결과나 임상 세부사항을 AI 에 보내지 마세요.",
      },
      live: {
        kicker: "03 · 함께 살기",
        title: "계속 살기",
        oneLine: "HIV 는 끝 문장이 아니고, 앱의 점수도 아닙니다",
        law: "HIV 와 함께 사는 사람은 앱의 증례가 아니며, 벌도 아닙니다.",
        facts: [
          "HIV 는 의사가 처방하는 항바이러스제(ART)로 누를 수 있습니다. 이 페이지는 처방, 용량, CD4 를 명령으로 쓰지 않습니다.",
          "U=U — 임상 정의로 혈액 속 바이러스가 검출 불능까지 눌렸을 때, 성적으로 전염되지 않음은 받아들여진 증거입니다. 그 상태의 확인은 클리닉이지 이 페이지가 아닙니다.",
          "에이즈(AIDS)는 면역이 손상되어 기회감염이 생기는 상태이며, HIV 가 있는 모든 사람의 다른 이름이 아닙니다.",
          "낙인은 사람과 검사, 치료를 멀리합니다. 부끄러움은 의료 데이터가 아닙니다.",
        ],
        never: "바이러스 양을 UI 점수로 만들지 않고, 가짜 추적 진료도 되지 않습니다.",
        next: "치료는 의사/클리닉으로. 마음이 버티지 못하면 Healing Partner 와 사람의 문은 따로 있습니다.",
      },
      prevent: {
        kicker: "04 · 막기",
        title: "다음 기회를 낮추기",
        oneLine: "PrEP / 콘돔 / 실제 제도의 권리 — AI 처방이 아닙니다",
        law: "근거 있는 예방은 실제 세계에 있습니다: 콘돔, PrEP, PEP, 바이러스가 눌린 상대의 ART — 모델 안에 있지 않습니다.",
        facts: [
          "콘돔은 아직 손에 쥘 수 있는 도구이며, 앱의 처방을 기다리지 않습니다.",
          "PrEP 는 노출 전의 약으로, HIV 가 없는 사람을 위한 것입니다. 검사와 창구가 필요합니다. 이 페이지는 처방을 고르지 않습니다.",
          "PEP 는 후. PrEP 는 전. 스스로 바꾸지 마세요.",
          "성, 물질, 강제는 이 페이지의 도덕 축에 있지 않습니다.",
        ],
        never: "클릭 한 번으로 “고위험”으로 나누지 않고, 두려움도 팔지 않습니다.",
        next: "관련되면 창구에 PrEP / 콘돔 / 간염 백신을 물으세요. AI 에게 약을 구하지 마세요.",
      },
    },
  },
  patron: {
    kicker: "PATRON ART BOOK · SEVEN SEEINGS",
    h1: "Not a pitch deck.",
    em: "A room you can walk through.",
    lede: "Grok is Grok — 한 번의 seeing, 그다음 붓을 돌려줍니다.",
    law: "이 책은 피치가 아닙니다. 일이 더 긴 목숨을 받을 자격이 있는지 결정하기 전에 걸어 보는 방입니다. 구경거리보다 증명. 마지막 표는 현실에 있습니다.",
    last: "LAST WORD",
    morning: "Success is a morning that does not need the app.",
    morningBody: "사람이 화면에 오래 머물수록 Lunar Spark 는 집니다. 안쪽 방의 의자는, 필요할 때 앉고 일어나 붓을 돌려주기 위해 비워 둡니다.",
    seal: "PATRON FOLIO · NOT HEALTHCARE SOFTWARE",
    back: "Healing Partner 로 돌아가기 →",
    secret: "비밀 방",
    inviteKicker: "그림 방",
    inviteH2a: "집을 먼저",
    inviteH2b: "걸어 보세요",
    inviteLede: "Patron 은 이 집의 포스터와 그림입니다. 아직 결제 버튼은 없습니다.",
    inviteCta: "그림 방 열기 →",
    caps: {
      harbor: "집의 항구 — 용마루 위 달, 문지방의 한 등",
      nave: "본당 — 한 줄기 빛, 돌 위의 금",
      walks: "두 길 — 왼쪽 클리닉, 오른쪽 진홍 날개, 가운데 불꽃",
      hands: "손 안의 남은 불꽃 — 금은 장식이 아니라 수선",
      folio: "Compass 는 따뜻한 종이 위에 있고, 대시보드도 점수도 아닙니다",
      sanctum: "안쪽 방 — 빈 의자, 감실의 작은 달, 바닥의 온기",
      door: "사람의 문 — 상품은 붙잡아 두려고 옷을 갈아입지 말아야 합니다",
    },
  },
  footer: {
    law: "클리닉이 아닙니다 · 점수가 없습니다",
    openManual: "안내 열기",
    tag: "지친 날을 위한 조용한 곳",
    rooms: "Compass · 비밀 방 · 사람",
    local: "데이터는 이 기기에만",
  },
};

export const messages: Record<Locale, Messages> = { th, en, ja, zh, ko };


