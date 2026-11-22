import { Component, input, model, output, signal } from '@angular/core';
import { Button } from 'app/components/button/button';
import { Chip } from 'app/components/chip/chip';
import { FormField, FormFieldOption } from 'app/components/form-field/form-field';
import { ModalBase } from 'app/components/modal-base/modal-base';
import { TaskFormValue, TaskPriority } from 'app/models/task';

@Component({
  selector: 'app-task-form',
  imports: [ModalBase, FormField, Button, Chip],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {
  open = model(false);
  lists = input<FormFieldOption[]>([
    { label: 'Personal', value: 'personal' },
    { label: 'Universidad', value: 'universidad' },
    { label: 'Citas médicas', value: 'citas-medicas' },
  ]);
  create = output<TaskFormValue>();

  priorities: { value: TaskPriority; label: string }[] = [
    { value: 'urgent', label: 'Urgente' },
    { value: 'important', label: 'Importante' },
    { value: 'normal', label: 'Normal' },
  ];

  title = signal('');
  list = signal('');
  date = signal('');
  time = signal('');
  priority = signal<TaskPriority>('normal');
  notes = signal('');

  save() {
    if (!this.title().trim()) {
      return;
    }
    this.create.emit({
      title: this.title().trim(),
      list: this.list(),
      date: this.date(),
      time: this.time(),
      priority: this.priority(),
      notes: this.notes().trim(),
    });
    this.close();
  }

  close() {
    this.open.set(false);
    this.title.set('');
    this.list.set('');
    this.date.set('');
    this.time.set('');
    this.priority.set('normal');
    this.notes.set('');
  }
}
