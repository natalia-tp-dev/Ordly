import { Component, computed, input, output } from '@angular/core';
import { EventBlock } from 'app/components/event-block/event-block';
import { AgendaEvent } from 'app/models/agenda';
import { sameDay, startOfWeek } from 'app/utils/date';

interface MonthCell {
  date: Date;
  inMonth: boolean;
  today: boolean;
  events: AgendaEvent[];
}

@Component({
  selector: 'app-month-calendar',
  imports: [EventBlock],
  templateUrl: './month-calendar.html',
  styleUrl: './month-calendar.css',
})
export class MonthCalendar {
  date = input.required<Date>();
  events = input<AgendaEvent[]>([]);
  selectedId = input<string | null>(null);
  eventClick = output<AgendaEvent>();
  dayClick = output<Date>();

  weekdays = ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'];

  weeks = computed<MonthCell[][]>(() => {
    const reference = this.date();
    const month = reference.getMonth();
    const first = new Date(reference.getFullYear(), month, 1);
    const last = new Date(reference.getFullYear(), month + 1, 0);
    const today = new Date();
    const events = [...this.events()].sort((a, b) => a.start.getTime() - b.start.getTime());

    const weeks: MonthCell[][] = [];
    const cursor = startOfWeek(first);
    while (cursor <= last) {
      const week: MonthCell[] = [];
      for (let day = 0; day < 7; day++) {
        const date = new Date(cursor);
        week.push({
          date,
          inMonth: date.getMonth() === month,
          today: sameDay(date, today),
          events: events.filter((event) => sameDay(event.start, date)),
        });
        cursor.setDate(cursor.getDate() + 1);
      }
      weeks.push(week);
    }
    return weeks;
  });
}
