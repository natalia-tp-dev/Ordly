import { Injectable, signal } from '@angular/core';
import { Note, NoteFormValue } from 'app/models/note';
import { atTime } from 'app/utils/date';

const today = new Date();

@Injectable({ providedIn: 'root' })
export class NoteService {
  readonly notes = signal<Note[]>([
    { id: 'n1', title: 'Ideas para el proyecto de interfaces', content: 'Revisar el mapa de navegación y validar los átomos con el profesor. Falta definir los estados vacíos de cada sección.', listId: 'universidad', date: atTime(today, 0, 9) },
    { id: 'n2', title: 'Resumen clase de estadística', content: 'Unidad estadística es cada elemento del que se toman los datos. La variable es la característica; el dato es el valor concreto.', listId: 'universidad', date: atTime(today, -1, 18) },
    { id: 'n3', title: 'Lista de mercado', content: 'Café, avena, frutas para la semana. Revisar si queda arroz.', listId: 'personal', date: atTime(today, -2, 12) },
    { id: 'n4', title: 'Preguntas para odontología', content: 'Consultar por el tratamiento y cuántas sesiones faltan.', listId: 'citas-medicas', date: atTime(today, -3, 10) },
    { id: 'n5', title: 'Recordatorio cumpleaños', content: 'Comprar regalo antes del viernes.', listId: 'personal', date: atTime(today, -5, 20) },
    { id: 'n6', title: 'Notas de la reunión', content: 'Acordamos dividir el documento en tres partes y entregar el lunes.', listId: 'universidad', date: atTime(today, -7, 16) },
  ]);

  add(value: NoteFormValue) {
    const note: Note = {
      id: crypto.randomUUID(),
      title: value.title,
      content: value.content,
      listId: value.category || undefined,
      date: new Date(),
      attachment: value.attachment ?? undefined,
    };
    this.notes.update((notes) => [note, ...notes]);
  }
}
