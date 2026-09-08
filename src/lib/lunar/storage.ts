const STATE_KEY = "lunar_spark_compass_v0";
const TRACE_KEY = "lunar_spark_traces_v0";
const LETTER_KEY = "lunar_spark_secret_letters_v0";

function safeJson<T>(raw: string, fallback: T): T {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    const parsed = safeJson<T | null>(raw, fallback);
    return parsed === null ? fallback : parsed;
  } catch {
    return fallback;
  }
}

export function save(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export { STATE_KEY, TRACE_KEY, LETTER_KEY };
