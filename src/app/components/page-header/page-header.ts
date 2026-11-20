import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.html',
  styleUrl: './page-header.css',
})
export class PageHeader {
  title = input.required<string>();
  date = input<Date>();

  formattedDate = computed(() => {
    const date = this.date();
    if (!date) {
      return '';
    }
    const text = date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
    return text.charAt(0).toUpperCase() + text.slice(1);
  });
}
