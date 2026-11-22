import { Component, input, model } from '@angular/core';
import { Task, TaskItem } from 'app/components/task-item/task-item';

@Component({
  selector: 'app-list-card',
  imports: [TaskItem],
  templateUrl: './list-card.html',
  styleUrl: './list-card.css',
})
export class ListCard {
  name = input.required<string>();
  color = input('var(--brand-primary, #3b82f6)');
  tasks = model<Task[]>([]);

  setCompleted(id: string, completed: boolean) {
    this.tasks.update((tasks) => tasks.map((task) => (task.id === id ? { ...task, completed } : task)));
  }
}
