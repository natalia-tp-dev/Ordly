import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AgendaToolbar } from 'app/components/agenda-toolbar/agenda-toolbar';
import { EventDetail } from 'app/components/event-detail/event-detail';
import { PageHeader } from 'app/components/page-header/page-header';
import { TimeGrid } from 'app/components/time-grid/time-grid';
import { AGENDA_PATHS, AgendaView } from 'app/models/agenda';
import { AgendaService } from 'app/services/agenda';
import { agendaPeriodLabel } from 'app/utils/date';

@Component({
  selector: 'app-agenda-day',
  imports: [AgendaToolbar, EventDetail, PageHeader, TimeGrid],
  templateUrl: './agenda-day.html',
  styleUrl: './agenda-day.css',
})
export class AgendaDay {
  private readonly router = inject(Router);
  readonly agenda = inject(AgendaService);

  title = computed(() => agendaPeriodLabel(this.agenda.date(), 'day'));
  days = computed(() => [this.agenda.date()]);

  changeView(view: AgendaView) {
    this.router.navigateByUrl(AGENDA_PATHS[view]);
  }
}
