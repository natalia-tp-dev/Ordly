import { Component, computed, model, output, signal } from '@angular/core';
import { Button } from 'app/components/button/button';
import { FormField } from 'app/components/form-field/form-field';
import { ModalBase } from 'app/components/modal-base/modal-base';
import { RegisterValue } from 'app/models/auth';

@Component({
  selector: 'app-register',
  imports: [ModalBase, FormField, Button],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  open = model(false);
  register = output<RegisterValue>();
  loginClick = output<void>();

  name = signal('');
  email = signal('');
  password = signal('');

  passwordError = computed(() =>
    this.password().length > 0 && this.password().length < 8 ? 'La contraseña debe tener al menos 8 caracteres' : '',
  );

  valid = computed(
    () =>
      this.name().trim().length > 0 &&
      /^\S+@\S+\.\S+$/.test(this.email().trim()) &&
      this.password().length >= 8,
  );

  submit() {
    if (!this.valid()) {
      return;
    }
    this.register.emit({ name: this.name().trim(), email: this.email().trim(), password: this.password() });
    this.close();
  }

  goToLogin() {
    this.close();
    this.loginClick.emit();
  }

  close() {
    this.open.set(false);
    this.name.set('');
    this.email.set('');
    this.password.set('');
  }
}
