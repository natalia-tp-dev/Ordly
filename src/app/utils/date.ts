import { AgendaView } from 'app/models/agenda';

export function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function atTime(base: Date, dayOffset: number, hour: number, minute = 0): Date {
  return new Date(base.getFullYear(), base.getMonth(), base.getDate() + dayOffset, hour, minute);
}

export function parseDateTime(date: string, time: string): Date | undefined {
  if (!date) {
    return undefined;
  }
  const [year, month, day] = date.split('-').map(Number);
  const [hour, minute] = time ? time.split(':').map(Number) : [0, 0];
  return new Date(year, month - 1, day, hour, minute);
}

export function formatTime(date: Date): string {
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

export function relativeDayLabel(date: Date, now = new Date()): string {
  if (sameDay(date, now)) {
    return 'Hoy';
  }
  if (sameDay(date, atTime(now, -1, 0))) {
    return 'Ayer';
  }
  if (sameDay(date, atTime(now, 1, 0))) {
    return 'Mañana';
  }
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }).replace('.', '');
}

export function dueLabel(date: Date, now = new Date()): string {
  const day = relativeDayLabel(date, now);
  const label = day.charAt(0).toUpperCase() + day.slice(1);
  if (date.getHours() === 0 && date.getMinutes() === 0) {
    return label;
  }
  const hour = date.getHours() % 12 === 0 ? 12 : date.getHours() % 12;
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${label} · ${hour}:${minutes} ${date.getHours() < 12 ? 'a.m.' : 'p.m.'}`;
}

export function startOfWeek(date: Date): Date {
  const result = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = result.getDay();
  result.setDate(result.getDate() + (day === 0 ? -6 : 1 - day));
  return result;
}

export function agendaPeriodLabel(date: Date, view: AgendaView): string {
  const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

  if (view === 'month') {
    return capitalize(date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }).replace(' de ', ' '));
  }

  if (view === 'day') {
    return capitalize(date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }));
  }

  const start = startOfWeek(date);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  const month = (value: Date) => value.toLocaleDateString('es-ES', { month: 'short' }).replace('.', '');

  if (start.getMonth() === end.getMonth()) {
    return `${start.getDate()} – ${end.getDate()} ${month(end)} ${end.getFullYear()}`;
  }
  return `${start.getDate()} ${month(start)} – ${end.getDate()} ${month(end)} ${end.getFullYear()}`;
}
