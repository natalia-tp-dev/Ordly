import { Component, input, model, output, signal } from '@angular/core';
import { AttachmentField } from 'app/components/attachment-field/attachment-field';
import { Button } from 'app/components/button/button';
import { FormField, FormFieldOption } from 'app/components/form-field/form-field';
import { ModalBase } from 'app/components/modal-base/modal-base';
import { NoteFormValue } from 'app/models/note';

@Component({
  selector: 'app-note-form',
  imports: [ModalBase, FormField, AttachmentField, Button],
  templateUrl: './note-form.html',
  styleUrl: './note-form.css',
})
export class NoteForm {
  open = model(false);
  categories = input<FormFieldOption[]>([
    { label: 'Personal', value: 'personal' },
    { label: 'Universidad', value: 'universidad' },
    { label: 'Citas médicas', value: 'citas-medicas' },
  ]);
  create = output<NoteFormValue>();

  title = signal('');
  category = signal('');
  content = signal('');
  attachment = signal<File | null>(null);

  save() {
    if (!this.title().trim()) {
      return;
    }
    this.create.emit({
      title: this.title().trim(),
      category: this.category(),
      content: this.content().trim(),
      attachment: this.attachment(),
    });
    this.close();
  }

  close() {
    this.open.set(false);
    this.title.set('');
    this.category.set('');
    this.content.set('');
    this.attachment.set(null);
  }
}
