import { Component, model } from '@angular/core';
import { Button } from 'app/components/button/button';
import { Icon } from 'app/components/icon/icon';
import { SegmentedControl, SegmentedOption } from 'app/components/segmented-control/segmented-control';

export type AgendaView = 'month' | 'week' | 'day';

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

@Component({
  selector: 'app-agenda-toolbar',
  imports: [Button, Icon, SegmentedControl],
  templateUrl: './agenda-toolbar.html',
  styleUrl: './agenda-toolbar.css',
})
export class AgendaToolbar {
  view = model<AgendaView>('month');
  date = model(new Date());

  views: SegmentedOption[] = [
    { label: 'Mes', value: 'month' },
    { label: 'Semana', value: 'week' },
    { label: 'Día', value: 'day' },
  ];

  setView(value: string) {
    this.view.set(value as AgendaView);
  }

  today() {
    this.date.set(new Date());
  }

  move(direction: number) {
    const date = new Date(this.date());
    if (this.view() === 'month') {
      date.setDate(1);
      date.setMonth(date.getMonth() + direction);
    } else {
      date.setDate(date.getDate() + direction * (this.view() === 'week' ? 7 : 1));
    }
    this.date.set(date);
  }
}
