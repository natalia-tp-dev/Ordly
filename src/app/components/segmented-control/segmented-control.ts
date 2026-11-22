import { Component, input, model } from '@angular/core';

export interface SegmentedOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-segmented-control',
  templateUrl: './segmented-control.html',
  styleUrl: './segmented-control.css',
})
export class SegmentedControl {
  options = input.required<SegmentedOption[]>();
  value = model.required<string>();
}
