import { Component, input, output } from '@angular/core';
import { Chip, ChipVariant } from 'app/components/chip/chip';

@Component({
  selector: 'app-note-card',
  imports: [Chip],
  templateUrl: './note-card.html',
  styleUrl: './note-card.css',
})
export class NoteCard {
  title = input.required<string>();
  excerpt = input('');
  category = input<string>();
  categoryColor = input<ChipVariant>('blue');
  date = input('');
  open = output<void>();
}
