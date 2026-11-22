import { Component, input, model } from '@angular/core';
import { Icon } from 'app/components/icon/icon';

@Component({
  selector: 'app-checkbox',
  imports: [Icon],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.css',
})
export class Checkbox {
  checked = model(false);
  disabled = input(false);
  label = input<string>();

  toggle() {
    if (!this.disabled()) {
      this.checked.update((value) => !value);
    }
  }
}
