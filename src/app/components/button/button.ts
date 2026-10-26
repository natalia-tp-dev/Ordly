import { Component, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'text';

@Component({
  selector: 'app-button',
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  variant = input<ButtonVariant>('primary');
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input(false);
  iconOnly = input(false);
  ariaLabel = input<string>();
}
