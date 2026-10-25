import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-attachment-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attachment-field.html',
  styleUrls: ['./attachment-field.css']
})

export class AttachmentFieldComponent {
  @Output() fileSelected = new EventEmitter<File | null>();
  selectedFile: File | null = null;

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.fileSelected.emit(this.selectedFile);
    }
  }

  removeFile() {
    this.selectedFile = null;
    this.fileSelected.emit(null);
  }
}