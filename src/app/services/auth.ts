import { Injectable, computed, signal } from '@angular/core';
import { LoginValue, RegisterValue } from 'app/models/auth';
import { User } from 'app/models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly user = signal<User | null>({ name: 'María Paz', email: 'mariapaz@ejemplo.com' });
  readonly loggedIn = computed(() => this.user() !== null);

  login(value: LoginValue) {
    const name = value.email
      .split('@')[0]
      .split(/[._-]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
    this.user.set({ name, email: value.email });
  }

  register(value: RegisterValue) {
    this.user.set({ name: value.name, email: value.email });
  }

  logout() {
    this.user.set(null);
  }
}
