import { Injectable, computed, inject, signal } from '@angular/core';
import { AgendaEvent } from 'app/models/agenda';
import { ReminderFormValue } from 'app/models/reminder';
import { TaskService } from 'app/services/tasks';
import { atTime, parseDateTime, sameDay } from 'app/utils/date';

const today = new Date();

@Injectable({ providedIn: 'root' })
export class AgendaService {
  private readonly tasks = inject(TaskService);

  readonly events = signal<AgendaEvent[]>([
    { id: 'e1', title: 'Clase de Estadística', detail: 'Bloque C · Salón 302', color: 'blue', start: atTime(today, 0, 11), end: atTime(today, 0, 12) },
    { id: 'e2', title: 'Entrega presupuesto', detail: 'Trabajo', color: 'red', start: atTime(today, 0, 14), end: atTime(today, 0, 15) },
    { id: 'e3', title: 'Cita odontología', detail: 'Clínica Norte', color: 'red', start: atTime(today, 0, 18, 30), end: atTime(today, 0, 19, 30) },
    { id: 'e4', title: 'Gimnasio', detail: 'Bodytech Calle 85', color: 'green', start: atTime(today, 1, 7), end: atTime(today, 1, 8) },
    { id: 'e5', title: 'Sistemas operativos', detail: 'Bloque B · Salón 105', color: 'blue', start: atTime(today, 1, 9), end: atTime(today, 1, 11) },
    { id: 'e6', title: 'Exposición de bases de datos', detail: 'Bloque C · Salón 210', color: 'blue', start: atTime(today, 2, 10), end: atTime(today, 2, 11, 30) },
    { id: 'e7', title: 'Cumpleaños de Ana', detail: 'Casa de Ana', color: 'purple', start: atTime(today, 3, 19), end: atTime(today, 3, 22) },
    { id: 'e8', title: 'Reunión de proyecto', detail: 'Biblioteca', color: 'amber', start: atTime(today, -1, 15), end: atTime(today, -1, 16) },
  ]);

  readonly todayEvents = computed(() => {
    const now = new Date();
    return this.events()
      .filter((event) => sameDay(event.start, now))
      .sort((a, b) => a.start.getTime() - b.start.getTime());
  });

  readonly upcoming = computed(() => {
    const now = new Date();
    return this.events()
      .filter((event) => event.end > now)
      .sort((a, b) => a.start.getTime() - b.start.getTime());
  });

  add(value: ReminderFormValue) {
    const start = parseDateTime(value.date, value.time || '09:00');
    if (!start) {
      return;
    }
    const list = this.tasks.lists().find((item) => item.id === value.category);
    const event: AgendaEvent = {
      id: crypto.randomUUID(),
      title: value.title,
      detail: value.place || list?.name,
      color: list?.color ?? 'blue',
      start,
      end: new Date(start.getTime() + 60 * 60 * 1000),
    };
    this.events.update((events) => [...events, event]);
  }
}
