import { Component, model, output, signal } from '@angular/core';
import { Button } from 'app/components/button/button';
import { FormField } from 'app/components/form-field/form-field';
import { ModalBase } from 'app/components/modal-base/modal-base';
import { EventColor } from 'app/models/agenda';
import { ListFormValue } from 'app/models/list';

@Component({
  selector: 'app-list-form',
  imports: [ModalBase, FormField, Button],
  templateUrl: './list-form.html',
  styleUrl: './list-form.css',
})
export class ListForm {
  open = model(false);
  create = output<ListFormValue>();

  colors: EventColor[] = ['blue', 'green', 'red', 'amber', 'purple'];

  name = signal('');
  color = signal<EventColor>('blue');

  save() {
    if (!this.name().trim()) {
      return;
    }
    this.create.emit({ name: this.name().trim(), color: this.color() });
    this.close();
  }

  close() {
    this.open.set(false);
    this.name.set('');
    this.color.set('blue');
  }
}
