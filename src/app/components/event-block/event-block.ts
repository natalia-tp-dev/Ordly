import { Component, input } from '@angular/core';

export type EventCategory = 'work' | 'personal' | 'meeting' | 'other';

@Component({
  selector: 'app-event-block',
  standalone: true,
  templateUrl: './event-block.html',
  styleUrl: './event-block.css',
})
export class EventBlock {
  title = input.required<string>();
  time = input.required<string>();
  category = input<EventCategory>('other');
}
