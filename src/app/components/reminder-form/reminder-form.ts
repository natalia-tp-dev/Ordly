import { Component, input, model, output, signal } from '@angular/core';
import { Button } from 'app/components/button/button';
import { FormField, FormFieldOption } from 'app/components/form-field/form-field';
import { ModalBase } from 'app/components/modal-base/modal-base';

export interface ReminderFormValue {
  title: string;
  date: string;
  time: string;
  category: string;
  place: string;
  notes: string;
}

@Component({
  selector: 'app-reminder-form',
  imports: [ModalBase, FormField, Button],
  templateUrl: './reminder-form.html',
  styleUrl: './reminder-form.css',
})
export class ReminderForm {
  open = model(false);
  categories = input<FormFieldOption[]>([
    { label: 'Personal', value: 'personal' },
    { label: 'Universidad', value: 'universidad' },
    { label: 'Citas médicas', value: 'citas-medicas' },
  ]);
  create = output<ReminderFormValue>();

  title = signal('');
  date = signal('');
  time = signal('');
  category = signal('');
  place = signal('');
  notes = signal('');

  save() {
    if (!this.title().trim()) {
      return;
    }
    this.create.emit({
      title: this.title().trim(),
      date: this.date(),
      time: this.time(),
      category: this.category(),
      place: this.place().trim(),
      notes: this.notes().trim(),
    });
    this.close();
  }

  close() {
    this.open.set(false);
    this.title.set('');
    this.date.set('');
    this.time.set('');
    this.category.set('');
    this.place.set('');
    this.notes.set('');
  }
}
