import { Component, DestroyRef, computed, inject, input, output, signal } from '@angular/core';
import { EventBlock } from 'app/components/event-block/event-block';
import { AgendaEvent } from 'app/models/agenda';
import { sameDay } from 'app/utils/date';

interface PlacedEvent {
  event: AgendaEvent;
  top: number;
  height: number;
  left: number;
  width: number;
}

interface DayColumn {
  date: Date;
  weekday: string;
  number: number;
  today: boolean;
  events: PlacedEvent[];
}

interface Slot {
  event: AgendaEvent;
  start: number;
  end: number;
  lane: number;
}

@Component({
  selector: 'app-time-grid',
  imports: [EventBlock],
  templateUrl: './time-grid.html',
  styleUrl: './time-grid.css',
})
export class TimeGrid {
  days = input.required<Date[]>();
  events = input<AgendaEvent[]>([]);
  startHour = input(7);
  endHour = input(20);
  eventClick = output<AgendaEvent>();

  now = signal(new Date());
  narrow = signal(false);

  constructor() {
    const timer = setInterval(() => this.now.set(new Date()), 60000);
    const query = window.matchMedia('(max-width: 640px)');
    const update = () => this.narrow.set(query.matches);
    update();
    query.addEventListener('change', update);
    inject(DestroyRef).onDestroy(() => {
      clearInterval(timer);
      query.removeEventListener('change', update);
    });
  }

  single = computed(() => this.days().length === 1);
  compact = computed(() => this.narrow() && !this.single());
  rowHeight = computed(() => (this.single() ? 40 : 34));
  inset = computed(() => (this.compact() ? 2 : 4));

  hours = computed(() => {
    const hours: { long: string; short: string }[] = [];
    for (let hour = this.startHour(); hour <= this.endHour(); hour++) {
      const value = hour % 12 === 0 ? 12 : hour % 12;
      const suffix = hour < 12 ? 'a' : 'p';
      hours.push({ long: `${value} ${suffix}.m.`, short: `${value}${suffix}` });
    }
    return hours;
  });

  gridHeight = computed(() => this.hours().length * this.rowHeight());

  columns = computed<DayColumn[]>(() => {
    const today = this.now();
    return this.days().map((date) => ({
      date,
      weekday: date.toLocaleDateString('es-ES', { weekday: 'short' }).replace('.', ''),
      number: date.getDate(),
      today: sameDay(date, today),
      events: this.place(this.events().filter((event) => sameDay(event.start, date))),
    }));
  });

  nowTop = computed(() => {
    const now = this.now();
    if (!this.single() || !sameDay(now, this.days()[0])) {
      return null;
    }
    const minutes = now.getHours() * 60 + now.getMinutes() - this.startHour() * 60;
    if (minutes < 0 || minutes > this.hours().length * 60) {
      return null;
    }
    return (minutes / 60) * this.rowHeight();
  });

  private place(events: AgendaEvent[]): PlacedEvent[] {
    const rangeStart = this.startHour() * 60;
    const rangeEnd = (this.endHour() + 1) * 60;
    const minutes = (date: Date) => date.getHours() * 60 + date.getMinutes();

    const slots: Slot[] = events
      .map((event) => ({
        event,
        start: Math.max(minutes(event.start), rangeStart),
        end: Math.min(Math.max(minutes(event.end), minutes(event.start) + 30), rangeEnd),
        lane: 0,
      }))
      .filter((slot) => slot.end > slot.start)
      .sort((a, b) => a.start - b.start || b.end - a.end);

    const placed: PlacedEvent[] = [];
    let group: Slot[] = [];
    let groupEnd = 0;

    const flush = () => {
      const lanes = Math.max(...group.map((slot) => slot.lane)) + 1;
      for (const slot of group) {
        placed.push({
          event: slot.event,
          top: ((slot.start - rangeStart) / 60) * this.rowHeight() + 2,
          height: ((slot.end - slot.start) / 60) * this.rowHeight() - 4,
          left: (slot.lane / lanes) * 100,
          width: 100 / lanes,
        });
      }
      group = [];
    };

    for (const slot of slots) {
      if (group.length && slot.start >= groupEnd) {
        flush();
      }
      const busy = new Set(group.filter((other) => other.end > slot.start).map((other) => other.lane));
      while (busy.has(slot.lane)) {
        slot.lane++;
      }
      groupEnd = group.length ? Math.max(groupEnd, slot.end) : slot.end;
      group.push(slot);
    }
    if (group.length) {
      flush();
    }
    return placed;
  }
}
