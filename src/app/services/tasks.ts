import { Injectable, computed, signal } from '@angular/core';
import { ListFormValue, TaskList } from 'app/models/list';
import { Task, TaskFormValue } from 'app/models/task';
import { atTime, parseDateTime, sameDay } from 'app/utils/date';

const today = new Date();

@Injectable({ providedIn: 'root' })
export class TaskService {
  readonly lists = signal<TaskList[]>([
    { id: 'personal', name: 'Personal', color: 'green' },
    { id: 'universidad', name: 'Universidad', color: 'blue' },
    { id: 'citas-medicas', name: 'Citas médicas', color: 'red' },
  ]);

  readonly tasks = signal<Task[]>([
    { id: 't1', title: 'Entregar informe de estadística', meta: 'Vence hoy y bloquea la nota del corte', priority: 'urgent', completed: false, listId: 'universidad', due: atTime(today, 0, 18) },
    { id: 't2', title: 'Revisar presupuesto trimestral', meta: 'Tu mejor franja de foco es antes de las 2', priority: 'important', completed: false, listId: 'personal', due: atTime(today, 0, 14) },
    { id: 't3', title: 'Confirmar cita odontología', meta: 'Toma menos de 5 minutos', priority: 'normal', completed: true, listId: 'citas-medicas', due: atTime(today, 0, 9) },
    { id: 't4', title: 'Leer capítulo 4 de sistemas operativos', meta: 'Puedes hacerlo en el bloque libre de la tarde', priority: 'normal', completed: false, listId: 'universidad', due: atTime(today, 0, 20) },
    { id: 't5', title: 'Subir taller de interfaces', meta: 'Ya está listo, solo falta subirlo', priority: 'urgent', completed: true, listId: 'universidad', due: atTime(today, 0, 11) },
    { id: 't6', title: 'Pagar el arriendo', meta: 'Vence hoy', priority: 'important', completed: true, listId: 'personal', due: atTime(today, 0, 10) },
    { id: 't7', title: 'Comprar mercado', meta: 'Café, avena y frutas', priority: 'normal', completed: false, listId: 'personal', due: atTime(today, 0, 19) },
    { id: 't8', title: 'Pedir la orden en la EPS', meta: 'Necesaria para la cita del jueves', priority: 'important', completed: false, listId: 'citas-medicas', due: atTime(today, 0, 16) },
    { id: 't9', title: 'Enviar correo al profesor', meta: 'Venció ayer', priority: 'important', completed: false, listId: 'universidad', due: atTime(today, -1, 17) },
    { id: 't10', title: 'Renovar la fórmula médica', meta: 'Venció ayer', priority: 'urgent', completed: false, listId: 'citas-medicas', due: atTime(today, -1, 12) },
    { id: 't11', title: 'Preparar exposición de bases de datos', meta: 'Para el viernes', priority: 'important', completed: false, listId: 'universidad', due: atTime(today, 2, 10) },
  ]);

  readonly todayTasks = computed(() => {
    const now = new Date();
    return this.tasks().filter((task) => task.due && sameDay(task.due, now));
  });

  readonly overdue = computed(() => {
    const start = atTime(new Date(), 0, 0);
    return this.tasks().filter((task) => !task.completed && task.due && task.due < start);
  });

  add(value: TaskFormValue) {
    const task: Task = {
      id: crypto.randomUUID(),
      title: value.title,
      meta: value.notes || undefined,
      priority: value.priority,
      completed: false,
      listId: value.list || undefined,
      due: parseDateTime(value.date, value.time),
    };
    this.tasks.update((tasks) => [...tasks, task]);
  }

  setCompleted(id: string, completed: boolean) {
    this.tasks.update((tasks) => tasks.map((task) => (task.id === id ? { ...task, completed } : task)));
  }

  addList(value: ListFormValue) {
    const id = crypto.randomUUID();
    this.lists.update((lists) => [...lists, { id, name: value.name, color: value.color }]);
  }
}
