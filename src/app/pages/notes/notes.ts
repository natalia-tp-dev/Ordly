import { Component, computed, inject, signal } from '@angular/core';
import { Button } from 'app/components/button/button';
import { NoteCard } from 'app/components/note-card/note-card';
import { NoteForm } from 'app/components/note-form/note-form';
import { PageHeader } from 'app/components/page-header/page-header';
import { NoteService } from 'app/services/notes';
import { TaskService } from 'app/services/tasks';
import { relativeDayLabel } from 'app/utils/date';

@Component({
  selector: 'app-notes',
  imports: [Button, NoteCard, NoteForm, PageHeader],
  templateUrl: './notes.html',
  styleUrl: './notes.css',
})
export class Notes {
  readonly notes = inject(NoteService);
  readonly tasks = inject(TaskService);

  formOpen = signal(false);

  cards = computed(() => {
    const lists = this.tasks.lists();
    return this.notes.notes().map((note) => {
      const list = lists.find((item) => item.id === note.listId);
      return {
        id: note.id,
        title: note.title,
        excerpt: note.content,
        category: list?.name,
        color: list?.color ?? 'blue',
        date: relativeDayLabel(note.date),
      };
    });
  });
}
