import { Component, computed, input, output, signal } from '@angular/core';
import { Icon } from 'app/components/icon/icon';
import { formatFileSize } from 'app/utils/file';

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
    return file ? formatFileSize(file.size) : '';
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
