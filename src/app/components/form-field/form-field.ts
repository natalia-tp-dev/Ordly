import { Component, input, model } from '@angular/core';
import { Icon } from 'app/components/icon/icon';

export type FormFieldType = 'input' | 'select' | 'textarea';

export interface FormFieldOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-form-field',
  imports: [Icon],
  templateUrl: './form-field.html',
  styleUrl: './form-field.css',
})
export class FormField {
  type = input<FormFieldType>('input');
  label = input('');
  placeholder = input('');
  helpText = input('');
  errorText = input('');
  inputType = input<'text' | 'email' | 'password' | 'number' | 'date' | 'time'>('text');
  options = input<FormFieldOption[]>([]);
  fieldId = input('form-field');
  disabled = input(false);
  required = input(false);

  value = model('');
}
