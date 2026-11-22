import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AiInsightCard } from 'app/components/ai-insight-card/ai-insight-card';
import { Chip } from 'app/components/chip/chip';
import { PageHeader } from 'app/components/page-header/page-header';
import { TaskItem } from 'app/components/task-item/task-item';
import { TaskPriority } from 'app/models/task';
import { AgendaService } from 'app/services/agenda';
import { AuthService } from 'app/services/auth';
import { TaskService } from 'app/services/tasks';
import { colorVar } from 'app/utils/color';
import { formatTime, sameDay } from 'app/utils/date';

const PRIORITY_ORDER: Record<TaskPriority, number> = { urgent: 0, important: 1, normal: 2 };

@Component({
  selector: 'app-summary',
  imports: [RouterLink, AiInsightCard, Chip, PageHeader, TaskItem],
  templateUrl: './summary.html',
  styleUrl: './summary.css',
})
export class Summary {
  private readonly auth = inject(AuthService);
  private readonly agenda = inject(AgendaService);
  readonly tasks = inject(TaskService);

  today = new Date();
  insightVisible = signal(true);

  greeting = computed(() => {
    const hour = this.today.getHours();
    const base = hour < 12 ? 'Buenos días' : hour < 19 ? 'Buenas tardes' : 'Buenas noches';
    const name = this.auth.user()?.name;
    return name ? `${base}, ${name}` : base;
  });

  completed = computed(() => this.tasks.todayTasks().filter((task) => task.completed).length);
  total = computed(() => this.tasks.todayTasks().length);
  progress = computed(() => (this.total() ? (this.completed() / this.total()) * 100 : 0));
  overdueCount = computed(() => this.tasks.overdue().length);

  freeTime = computed(() => {
    const busy = this.agenda
      .todayEvents()
      .reduce((total, event) => total + (event.end.getTime() - event.start.getTime()) / 60000, 0);
    const free = Math.max(0, 12 * 60 - busy);
    const hours = Math.floor(free / 60);
    const minutes = Math.round(free % 60);
    return minutes ? `${hours} h ${minutes} m libres` : `${hours} h libres`;
  });

  upcoming = computed(() =>
    this.agenda
      .upcoming()
      .slice(0, 3)
      .map((event) => ({
        ...event,
        time: sameDay(event.start, this.today)
          ? formatTime(event.start)
          : `${event.start.toLocaleDateString('es-ES', { weekday: 'short' }).replace('.', '')} ${formatTime(event.start)}`,
        bar: colorVar(event.color),
      })),
  );

  priorities = computed(() =>
    [...this.tasks.todayTasks()]
      .sort(
        (a, b) =>
          Number(a.completed) - Number(b.completed) || PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority],
      )
      .slice(0, 5),
  );
}
