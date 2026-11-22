import { Component, input, output } from '@angular/core';
import { Icon } from 'app/components/icon/icon';

@Component({
  selector: 'app-modal-base',
  imports: [Icon],
  templateUrl: './modal-base.html',
  styleUrl: './modal-base.css',
  host: { '(document:keydown.escape)': 'onEscape()' },
})
export class ModalBase {
  open = input(false);
  title = input('');
  width = input(520);
  closed = output<void>();

  onEscape() {
    if (this.open()) {
      this.closed.emit();
    }
  }

  onScrimClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.closed.emit();
    }
  }
}
