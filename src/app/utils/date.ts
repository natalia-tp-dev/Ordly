import { AgendaView } from 'app/models/agenda';

export function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
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
