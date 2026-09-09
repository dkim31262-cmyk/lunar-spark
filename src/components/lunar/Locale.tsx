import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  CJK_FONT,
  HTML_LANG,
  LOCALE_META,
  LOCALES,
  messages,
  type Locale,
  type Messages,
} from "@/lib/lunar/i18n";
import { load, LOCALE_KEY, save } from "@/lib/lunar/storage";

type Ctx = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  m: Messages;
};

const LocaleContext = createContext<Ctx | null>(null);

function readLocale(): Locale {
  const saved = load<string>(LOCALE_KEY, "");
  if ((LOCALES as readonly string[]).includes(saved)) return saved as Locale;
  return "th";
}

function applyLocale(next: Locale) {
  document.documentElement.lang = HTML_LANG[next];
  const id = "lunar-cjk-font";
  const href = CJK_FONT[next];
  const existing = document.getElementById(id) as HTMLLinkElement | null;
  if (!href) {
    existing?.remove();
    return;
  }
  if (existing) {
    existing.href = href;
    return;
  }
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("th");

  useEffect(() => {
    const next = readLocale();
    setLocaleState(next);
    applyLocale(next);
  }, []);

  const value = useMemo<Ctx>(() => {
    function setLocale(next: Locale) {
      setLocaleState(next);
      save(LOCALE_KEY, next);
      applyLocale(next);
    }
    return { locale, setLocale, m: messages[locale] };
  }, [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useI18n(): Ctx {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("LocaleProvider missing");
  return ctx;
}

export function LangSwitch({ placement }: { placement: "door" | "nav" }) {
  const { locale, setLocale, m } = useI18n();
  const [open, setOpen] = useState(false);

  if (placement === "door") {
    return (
      <div className="lang-row" role="radiogroup" aria-label={m.nav.lang}>
        {LOCALE_META.map((item) => (
          <button
            key={item.id}
            type="button"
            role="radio"
            aria-checked={locale === item.id}
            className={locale === item.id ? "lang-chip on" : "lang-chip"}
            onClick={() => setLocale(item.id)}
          >
            {item.native}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="lang-nav">
      <button
        type="button"
        className="lang-now"
        aria-label={m.nav.lang}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((v) => !v)}
      >
        {LOCALE_META.find((x) => x.id === locale)?.native}
      </button>
      {open ? (
        <div className="lang-menu" role="listbox">
          {LOCALE_META.map((item) => (
            <button
              key={item.id}
              type="button"
              role="option"
              aria-selected={locale === item.id}
              className={locale === item.id ? "on" : ""}
              onClick={() => {
                setLocale(item.id);
                setOpen(false);
              }}
            >
              {item.native}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
