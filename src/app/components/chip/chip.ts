
import { Component, input } from '@angular/core';

export type ChipVariant = 'urgent' | 'important' | 'normal' | 'category';

@Component({
  selector: 'app-chip',
  standalone: true,
  templateUrl: './chip.html',
  styleUrl: './chip.css',
})
export class Chip {
  label = input.required<string>();
  variant = input<ChipVariant>('category');
}
