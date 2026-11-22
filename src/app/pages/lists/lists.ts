import { Component, computed, inject, signal } from '@angular/core';
import { ListCard } from 'app/components/list-card/list-card';
import { PageHeader } from 'app/components/page-header/page-header';
import { SegmentedControl, SegmentedOption } from 'app/components/segmented-control/segmented-control';
import { Task } from 'app/models/task';
import { TaskService } from 'app/services/tasks';
import { colorVar } from 'app/utils/color';
import { dueLabel, sameDay } from 'app/utils/date';

type ListFilter = 'all' | 'urgent' | 'today' | 'done';

@Component({
  selector: 'app-lists',
  imports: [ListCard, PageHeader, SegmentedControl],
  templateUrl: './lists.html',
  styleUrl: './lists.css',
})
export class Lists {
  private readonly service = inject(TaskService);

  filters: SegmentedOption[] = [
    { label: 'Todas', value: 'all' },
    { label: 'Urgentes', value: 'urgent' },
    { label: 'Hoy', value: 'today' },
    { label: 'Completadas', value: 'done' },
  ];

  filter = signal<ListFilter>('all');

  groups = computed(() => {
    const filter = this.filter();
    const now = new Date();
    const matches = (task: Task) => {
      if (filter === 'urgent') {
        return task.priority === 'urgent' && !task.completed;
      }
      if (filter === 'today') {
        return !!task.due && sameDay(task.due, now);
      }
      if (filter === 'done') {
        return task.completed;
      }
      return true;
    };

    return this.service
      .lists()
      .map((list) => ({
        id: list.id,
        name: list.name,
        color: colorVar(list.color),
        tasks: this.service
          .tasks()
          .filter((task) => task.listId === list.id && matches(task))
          .map((task) => ({ ...task, meta: task.due ? dueLabel(task.due, now) : undefined })),
      }))
      .filter((group) => filter === 'all' || group.tasks.length > 0);
  });

  setFilter(value: string) {
    this.filter.set(value as ListFilter);
  }

  sync(tasks: Task[]) {
    for (const task of tasks) {
      this.service.setCompleted(task.id, task.completed);
    }
  }
}
