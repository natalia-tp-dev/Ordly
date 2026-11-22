import { Component, input } from '@angular/core';

export type EventColor = 'blue' | 'green' | 'red' | 'amber' | 'purple';

@Component({
  selector: 'app-event-block',
  templateUrl: './event-block.html',
  styleUrl: './event-block.css',
})
export class EventBlock {
  title = input.required<string>();
  detail = input<string>();
  color = input<EventColor>('blue');
}
