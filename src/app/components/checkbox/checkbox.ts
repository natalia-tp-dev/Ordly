import { Component, input, model } from '@angular/core';

/**
 * Casilla de verificación (#13).
 * Estados: marcada / no marcada (+ deshabilitada).
 * Accesibilidad: siempre tiene una etiqueta (aria-label o texto visible).
 *
 * Uso:
 *   <app-checkbox [(checked)]="hecho" label="Marcar tarea como completada" />
 *   <app-checkbox [(checked)]="acepto" label="Acepto los términos" [showLabel]="true" />
 */
@Component({
  selector: 'app-checkbox',
  template: `
    <label class="inline-flex items-center gap-2 cursor-pointer select-none"
           [class.opacity-50]="disabled()"
           [class.cursor-not-allowed]="disabled()">
      <input
        type="checkbox"
        class="w-5 h-5 rounded accent-brand-500 cursor-pointer disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
        [checked]="checked()"
        [disabled]="disabled()"
        [attr.aria-label]="showLabel() ? null : label()"
        (change)="onChange($event)"
      />
      @if (showLabel()) {
        <span class="text-sm text-slate-700">{{ label() }}</span>
      }
    </label>
  `,
})
export class Checkbox {
  /** Estado marcado. Se usa con [(checked)]. */
  checked = model(false);
  disabled = input(false);
  /** Texto accesible (y visible si showLabel = true). */
  label = input.required<string>();
  showLabel = input(false);

  onChange(event: Event) {
    this.checked.set((event.target as HTMLInputElement).checked);
  }
}
