import { Component, computed, input, model } from '@angular/core';
import { Checkbox } from 'app/components/checkbox/checkbox';
import { Chip, ChipVariant } from 'app/components/chip/chip';
import { TaskPriority } from 'app/components/task-form/task-form';

export interface Task {
  id: string;
  title: string;
  meta?: string;
  priority: TaskPriority;
  completed: boolean;
}

const PRIORITY_LABELS: Record<TaskPriority, string> = {
  urgent: 'Urgente',
  important: 'Importante',
  normal: 'Normal',
};

@Component({
  selector: 'app-task-item',
  imports: [Checkbox, Chip],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
})
export class TaskItem {
  title = input.required<string>();
  meta = input<string>();
  priority = input<TaskPriority>('normal');
  completed = model(false);

  chipLabel = computed(() => (this.completed() ? 'Hecha' : PRIORITY_LABELS[this.priority()]));
  chipVariant = computed<ChipVariant>(() => (this.completed() ? 'done' : this.priority()));
}
