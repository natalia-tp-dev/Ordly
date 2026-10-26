import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.html',
  styleUrl: './icon.css',
  host: {
    '[style.width.px]': 'size()',
    '[style.height.px]': 'size()',
    '[style.color]': 'color()',
  },
})
export class Icon {
  name = input.required<string>();
  size = input(20);
  color = input<string>();

  href = computed(() => `icons/tabler-sprite-nostroke.svg#tabler-${this.name()}`);
}
