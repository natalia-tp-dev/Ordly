import { Component, computed, input, output, signal } from '@angular/core';
import { Icon } from 'app/components/icon/icon';

@Component({
  selector: 'app-attachment-field',
  imports: [Icon],
  templateUrl: './attachment-field.html',
  styleUrl: './attachment-field.css',
})
export class AttachmentField {
  label = input('Adjuntar archivo');
  fileChange = output<File | null>();

  file = signal<File | null>(null);

  fileSize = computed(() => {
    const file = this.file();
    if (!file) {
      return '';
    }
    if (file.size < 1024 * 1024) {
      return `${Math.max(1, Math.round(file.size / 1024))} KB`;
    }
    return `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
  });

  select(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    input.value = '';
    if (file) {
      this.file.set(file);
      this.fileChange.emit(file);
    }
  }

  remove() {
    this.file.set(null);
    this.fileChange.emit(null);
  }
}
