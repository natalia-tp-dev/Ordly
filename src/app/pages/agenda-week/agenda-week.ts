import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AgendaToolbar } from 'app/components/agenda-toolbar/agenda-toolbar';
import { EventDetail } from 'app/components/event-detail/event-detail';
import { PageHeader } from 'app/components/page-header/page-header';
import { TimeGrid } from 'app/components/time-grid/time-grid';
import { AGENDA_PATHS, AgendaView } from 'app/models/agenda';
import { AgendaService } from 'app/services/agenda';
import { agendaPeriodLabel, startOfWeek } from 'app/utils/date';

@Component({
  selector: 'app-agenda-week',
  imports: [AgendaToolbar, EventDetail, PageHeader, TimeGrid],
  templateUrl: './agenda-week.html',
  styleUrl: './agenda-week.css',
})
export class AgendaWeek {
  private readonly router = inject(Router);
  readonly agenda = inject(AgendaService);

  title = computed(() => agendaPeriodLabel(this.agenda.date(), 'week'));

  days = computed(() => {
    const start = startOfWeek(this.agenda.date());
    return Array.from({ length: 7 }, (_, index) => {
      const day = new Date(start);
      day.setDate(start.getDate() + index);
      return day;
    });
  });

  changeView(view: AgendaView) {
    this.router.navigateByUrl(AGENDA_PATHS[view]);
  }
}
