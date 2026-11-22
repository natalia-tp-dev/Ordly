import { Component, input, model, output, signal } from '@angular/core';
import { FormFieldOption } from 'app/components/form-field/form-field';
import { Icon } from 'app/components/icon/icon';
import { ListForm } from 'app/components/list-form/list-form';
import { ModalBase } from 'app/components/modal-base/modal-base';
import { NoteForm } from 'app/components/note-form/note-form';
import { ReminderForm } from 'app/components/reminder-form/reminder-form';
import { TaskForm } from 'app/components/task-form/task-form';
import { ListFormValue } from 'app/models/list';
import { NoteFormValue } from 'app/models/note';
import { ReminderFormValue } from 'app/models/reminder';
import { TaskFormValue } from 'app/models/task';

type CreateOption = 'reminder' | 'task' | 'list' | 'note';

@Component({
  selector: 'app-create-menu',
  imports: [Icon, ListForm, ModalBase, NoteForm, ReminderForm, TaskForm],
  templateUrl: './create-menu.html',
  styleUrl: './create-menu.css',
})
export class CreateMenu {
  open = model(false);
  lists = input<FormFieldOption[]>([]);
  quickCreate = output<string>();
  voiceClick = output<void>();
  reminderCreate = output<ReminderFormValue>();
  taskCreate = output<TaskFormValue>();
  listCreate = output<ListFormValue>();
  noteCreate = output<NoteFormValue>();

  options: { value: CreateOption; label: string; description: string; icon: string }[] = [
    { value: 'reminder', label: 'Recordatorio', description: 'Un aviso puntual: cita, entrega, evento', icon: 'clock' },
    { value: 'task', label: 'Tarea', description: 'Un pendiente dentro de una lista', icon: 'check' },
    { value: 'list', label: 'Lista', description: 'Un contenedor nuevo para agrupar tareas', icon: 'folder' },
    { value: 'note', label: 'Nota', description: 'Texto libre para guardar ideas', icon: 'pencil' },
  ];

  text = signal('');
  reminderOpen = signal(false);
  taskOpen = signal(false);
  listOpen = signal(false);
  noteOpen = signal(false);

  choose(option: CreateOption) {
    this.open.set(false);
    if (option === 'reminder') {
      this.reminderOpen.set(true);
    } else if (option === 'task') {
      this.taskOpen.set(true);
    } else if (option === 'list') {
      this.listOpen.set(true);
    } else {
      this.noteOpen.set(true);
    }
  }

  submit() {
    const text = this.text().trim();
    if (text) {
      this.quickCreate.emit(text);
      this.text.set('');
      this.open.set(false);
    }
  }
}
