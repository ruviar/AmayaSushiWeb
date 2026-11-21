export type Interval = { from: string; to: string };

/**
 * Horario de Google Maps: martes a domingo, almuerzo y cena. Lunes cerrado.
 * Unica fuente para la tabla de Visita, el estado aberto/fechado y el JSON-LD.
 * Indice de Date.getDay(): 0 domingo … 6 sabado.
 */
const SERVICE: Interval[] = [
  { from: "12:00", to: "15:00" },
  { from: "19:00", to: "22:30" },
];

export const schedule: Record<number, Interval[]> = {
  0: SERVICE,
  1: [],
  2: SERVICE,
  3: SERVICE,
  4: SERVICE,
  5: SERVICE,
  6: SERVICE,
};

export const SCHEMA_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const TZ = "Europe/Lisbon";
const WEEKDAY: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** Hora de Guarda, sea cual sea la zona del visitante. */
export function guardaNow(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const get = (t: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === t)?.value ?? "";
  const hour = Number(get("hour")) % 24;
  const minute = Number(get("minute"));
  return {
    day: WEEKDAY[get("weekday")] ?? 0,
    minutes: hour * 60 + minute,
    label: `${String(hour).padStart(2, "0")}:${get("minute")}`,
  };
}

export type OpenState =
  | { open: true; closesAt: string }
  | { open: false; opensAt: string; when: "today" | "tomorrow" | number };

export function getOpenState(now = new Date()): OpenState {
  const { day, minutes } = guardaNow(now);
  const today = schedule[day];

  for (const iv of today) {
    if (minutes >= toMin(iv.from) && minutes < toMin(iv.to)) return { open: true, closesAt: iv.to };
  }
  const later = today.find((iv) => minutes < toMin(iv.from));
  if (later) return { open: false, opensAt: later.from, when: "today" };

  for (let o = 1; o <= 7; o++) {
    const d = (day + o) % 7;
    if (schedule[d].length) {
      return { open: false, opensAt: schedule[d][0].from, when: o === 1 ? "tomorrow" : d };
    }
  }
  return { open: false, opensAt: "12:00", when: "tomorrow" };
}
