import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AgendaToolbar } from 'app/components/agenda-toolbar/agenda-toolbar';
import { EventDetail } from 'app/components/event-detail/event-detail';
import { MonthCalendar } from 'app/components/month-calendar/month-calendar';
import { PageHeader } from 'app/components/page-header/page-header';
import { AGENDA_PATHS, AgendaView } from 'app/models/agenda';
import { AgendaService } from 'app/services/agenda';
import { colorVar } from 'app/utils/color';
import { agendaPeriodLabel, formatTime, sameDay } from 'app/utils/date';

@Component({
  selector: 'app-agenda-month',
  imports: [AgendaToolbar, EventDetail, MonthCalendar, PageHeader],
  templateUrl: './agenda-month.html',
  styleUrl: './agenda-month.css',
})
export class AgendaMonth {
  private readonly router = inject(Router);
  readonly agenda = inject(AgendaService);

  title = computed(() => agendaPeriodLabel(this.agenda.date(), 'month'));

  dayTitle = computed(
    () => `Eventos del ${this.agenda.date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}`,
  );

  dayEvents = computed(() =>
    this.agenda
      .events()
      .filter((event) => sameDay(event.start, this.agenda.date()))
      .sort((a, b) => a.start.getTime() - b.start.getTime())
      .map((event) => ({ ...event, time: formatTime(event.start), bar: colorVar(event.color) })),
  );

  changeView(view: AgendaView) {
    this.router.navigateByUrl(AGENDA_PATHS[view]);
  }
}
