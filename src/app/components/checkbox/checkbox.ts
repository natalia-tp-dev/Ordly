import { Component, input, model } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.css',
})
export class Checkbox {
  checked = model(false);
  disabled = input(false);
  label = input.required<string>();
  showLabel = input(false);

  onChange(event: Event) {
    this.checked.set((event.target as HTMLInputElement).checked);
  }
}
