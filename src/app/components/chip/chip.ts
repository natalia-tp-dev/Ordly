import { Component, input } from '@angular/core';

export type ChipVariant = 'urgent' | 'important' | 'normal' | 'done' | 'blue' | 'green' | 'red';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.html',
  styleUrl: './chip.css',
})
export class Chip {
  label = input.required<string>();
  variant = input<ChipVariant>('normal');
}
