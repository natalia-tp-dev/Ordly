import { Component, computed, model, output, signal } from '@angular/core';
import { Button } from 'app/components/button/button';
import { FormField } from 'app/components/form-field/form-field';
import { ModalBase } from 'app/components/modal-base/modal-base';
import { LoginValue } from 'app/models/auth';

@Component({
  selector: 'app-login',
  imports: [ModalBase, FormField, Button],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  open = model(false);
  login = output<LoginValue>();
  registerClick = output<void>();

  email = signal('');
  password = signal('');

  valid = computed(() => /^\S+@\S+\.\S+$/.test(this.email().trim()) && this.password().length > 0);

  submit() {
    if (!this.valid()) {
      return;
    }
    this.login.emit({ email: this.email().trim(), password: this.password() });
    this.close();
  }

  goToRegister() {
    this.close();
    this.registerClick.emit();
  }

  close() {
    this.open.set(false);
    this.email.set('');
    this.password.set('');
  }
}
