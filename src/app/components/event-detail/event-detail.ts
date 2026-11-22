import { Component, computed, input, output } from '@angular/core';
import { Button } from 'app/components/button/button';
import { Chip } from 'app/components/chip/chip';
import { AgendaEvent, EventColor } from 'app/models/agenda';
import { formatTime } from 'app/utils/date';
import { formatFileSize } from 'app/utils/file';

const AVATAR_COLORS: EventColor[] = ['blue', 'green', 'red', 'amber', 'purple'];

@Component({
  selector: 'app-event-detail',
  imports: [Button, Chip],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.css',
})
export class EventDetail {
  event = input<AgendaEvent | null>(null);
  category = input<string>();
  edit = output<void>();
  attach = output<File>();

  when = computed(() => {
    const event = this.event();
    if (!event) {
      return '';
    }
    const day = event.start.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric' });
    return `${day.charAt(0).toUpperCase() + day.slice(1)} · ${formatTime(event.start)} a ${formatTime(event.end)}`;
  });

  participants = computed(() =>
    (this.event()?.participants ?? []).map((name, index) => ({
      name,
      initials: name
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join(''),
      color: AVATAR_COLORS[index % AVATAR_COLORS.length],
    })),
  );

  attachments = computed(() =>
    (this.event()?.attachments ?? []).map((file) => ({ name: file.name, size: formatFileSize(file.size) })),
  );

  select(input: HTMLInputElement) {
    const file = input.files?.[0];
    input.value = '';
    if (file) {
      this.attach.emit(file);
    }
  }
}
