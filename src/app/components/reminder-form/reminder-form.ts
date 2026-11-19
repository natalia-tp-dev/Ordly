
import { Component, signal } from '@angular/core';
import { ModalBaseComponent } from '../modal-base/modal-base';
import { FormField } from '../form-field/form-field';
import { Button } from '../button/button';

@Component({
  selector: 'app-reminder-form',
  standalone: true,
  imports: [ModalBaseComponent, FormField, Button],
  templateUrl: './reminder-form.html',
  styleUrl: './reminder-form.css',
})
export class ReminderForm {
  isOpen = signal(true);

  title = signal('');
  date = signal('');
  time = signal('');
  place = signal('');
  category = signal('');
  notes = signal('');

  categories = [
    { label: 'Trabajo', value: 'work' },
    { label: 'Personal', value: 'personal' },
    { label: 'Estudio', value: 'study' },
    { label: 'Otros', value: 'other' },
  ];

  saveReminder() {
    const reminder = {
      title: this.title(),
      date: this.date(),
      time: this.time(),
      place: this.place(),
      category: this.category(),
      notes: this.notes(),
    };

    console.log('Recordatorio creado:', reminder);
    this.isOpen.set(false);
  }

  cancel() {
    this.isOpen.set(false);
  }
}
