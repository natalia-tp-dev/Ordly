import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-base',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-base.html',
  styleUrls: ['./modal-base.css']
})
export class ModalBaseComponent {
  @Input() isOpen = false;
  @Input() title = '';
  @Output() close = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onKeydownHandler() {
    if (this.isOpen) {
      this.closeModal();
    }
  }
  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }
  closeModal() {
    this.close.emit();
  }
}