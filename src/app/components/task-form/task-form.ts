
import { Component, signal } from '@angular/core';
import { ModalBaseComponent } from '../modal-base/modal-base';
import { FormField } from '../form-field/form-field';
import { Button } from '../button/button';
import { Chip } from '../chip/chip';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ModalBaseComponent, FormField, Button, Chip],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {
  isOpen = signal(true);

  title = signal('');
  list = signal('');
  date = signal('');
  notes = signal('');

  priority = signal<'urgent' | 'important' | 'normal'>('normal');

  lists = [
    { label: 'Universidad', value: 'universidad' },
    { label: 'Personal', value: 'personal' },
    { label: 'Citas Médicas', value: 'citas-medicas' },
  ];

  selectPriority(priority: 'urgent' | 'important' | 'normal') {
    this.priority.set(priority);
  }

  saveTask() {
    const task = {
      title: this.title(),
      list: this.list(),
      date: this.date(),
      priority: this.priority(),
      notes: this.notes(),
    };

    console.log('Tarea creada:', task);
    this.isOpen.set(false);
  }

  cancel() {
    this.isOpen.set(false);
  }
}
