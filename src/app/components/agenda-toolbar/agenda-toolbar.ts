
import { Component, computed, signal } from '@angular/core';
import { Button } from '../button/button';
import { Icon } from '../icon/icon';

type CalendarView = 'month' | 'week' | 'day';

@Component({
  selector: 'app-agenda-toolbar',
  imports: [Button, Icon],
  templateUrl: './agenda-toolbar.html',
  styleUrl: './agenda-toolbar.css',
})
export class AgendaToolbar {
  // Vista seleccionada actualmente
  readonly view = signal<CalendarView>('week');

  // Fecha que utiliza la agenda como referencia
  readonly currentDate = signal(new Date());

  // Texto del rango de fechas
  readonly dateRangeLabel = computed(() => {
    const date = this.currentDate();
    const view = this.view();

    if (view === 'day') {
      return this.formatDate(date, true);
    }

    if (view === 'month') {
      const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      return this.formatRange(firstDay, lastDay);
    }

    const firstDay = this.getWeekStart(date);
    const lastDay = new Date(firstDay);
    lastDay.setDate(firstDay.getDate() + 6);

    return this.formatRange(firstDay, lastDay);
  });

  // Cambiar entre mes, semana y día
  setView(view: CalendarView): void {
    this.view.set(view);
  }

  // Ir al periodo anterior
  previous(): void {
    this.movePeriod(-1);
  }

  // Ir al periodo siguiente
  next(): void {
    this.movePeriod(1);
  }

  // Volver a la fecha actual
  goToToday(): void {
    this.currentDate.set(new Date());
  }

  private movePeriod(direction: number): void {
    const date = new Date(this.currentDate());
    const view = this.view();

    if (view === 'month') {
      date.setDate(1);
      date.setMonth(date.getMonth() + direction);
    } else if (view === 'week') {
      date.setDate(date.getDate() + direction * 7);
    } else {
      date.setDate(date.getDate() + direction);
    }

    this.currentDate.set(date);
  }

  // Obtener el lunes de la semana
  private getWeekStart(date: Date): Date {
    const result = new Date(date);
    const day = result.getDay();
    const difference = day === 0 ? -6 : 1 - day;

    result.setDate(result.getDate() + difference);
    return result;
  }

  // Formatear una fecha
  private formatDate(date: Date, includeYear = false): string {
    return new Intl.DateTimeFormat('es-CO', {
      day: 'numeric',
      month: 'short',
      ...(includeYear ? { year: 'numeric' } : {}),
    }).format(date).replace('.', '');
  }

  // Formatear un rango de fechas
  private formatRange(start: Date, end: Date): string {
    const sameMonth =
      start.getMonth() === end.getMonth() &&
      start.getFullYear() === end.getFullYear();

    const sameYear = start.getFullYear() === end.getFullYear();

    if (sameMonth) {
      const month = new Intl.DateTimeFormat('es-CO', {
        month: 'short',
      }).format(start).replace('.', '');

      return `${start.getDate()} – ${end.getDate()} ${month} ${end.getFullYear()}`;
    }

    if (sameYear) {
      return `${this.formatDate(start)} – ${this.formatDate(end)} ${end.getFullYear()}`;
    }

    return `${this.formatDate(start, true)} – ${this.formatDate(end, true)}`;
  }
}
