import { Component, model, output, signal } from '@angular/core';
import { Icon } from 'app/components/icon/icon';
import { ModalBase } from 'app/components/modal-base/modal-base';
import { ReminderForm } from 'app/components/reminder-form/reminder-form';
import { TaskForm } from 'app/components/task-form/task-form';
import { ReminderFormValue } from 'app/models/reminder';
import { TaskFormValue } from 'app/models/task';

type CreateOption = 'reminder' | 'task' | 'list' | 'note';

@Component({
  selector: 'app-create-menu',
  imports: [Icon, ModalBase, ReminderForm, TaskForm],
  templateUrl: './create-menu.html',
  styleUrl: './create-menu.css',
})
export class CreateMenu {
  open = model(false);
  quickCreate = output<string>();
  voiceClick = output<void>();
  reminderCreate = output<ReminderFormValue>();
  taskCreate = output<TaskFormValue>();

  options: { value: CreateOption; label: string; description: string; icon: string }[] = [
    { value: 'reminder', label: 'Recordatorio', description: 'Un aviso puntual: cita, entrega, evento', icon: 'clock' },
    { value: 'task', label: 'Tarea', description: 'Un pendiente dentro de una lista', icon: 'check' },
    { value: 'list', label: 'Lista', description: 'Un contenedor nuevo para agrupar tareas', icon: 'folder' },
    { value: 'note', label: 'Nota', description: 'Texto libre para guardar ideas', icon: 'pencil' },
  ];

  text = signal('');
  reminderOpen = signal(false);
  taskOpen = signal(false);

  choose(option: CreateOption) {
    this.open.set(false);
    if (option === 'reminder') {
      this.reminderOpen.set(true);
    } else if (option === 'task') {
      this.taskOpen.set(true);
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
