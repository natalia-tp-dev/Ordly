import { Component, DestroyRef, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CreateMenu } from 'app/components/create-menu/create-menu';
import { Icon } from 'app/components/icon/icon';
import { Login } from 'app/components/login/login';
import { Logo } from 'app/components/logo/logo';
import { Register } from 'app/components/register/register';
import { Sidebar } from 'app/components/sidebar/sidebar';
import { AgendaService } from 'app/services/agenda';
import { AuthService } from 'app/services/auth';
import { NoteService } from 'app/services/notes';
import { TaskService } from 'app/services/tasks';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CreateMenu, Icon, Login, Logo, Register, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly auth = inject(AuthService);
  readonly tasks = inject(TaskService);
  readonly agenda = inject(AgendaService);
  readonly notes = inject(NoteService);

  narrow = signal(false);
  menuOpen = signal(false);
  collapsed = signal(false);
  createOpen = signal(false);
  loginOpen = signal(false);
  registerOpen = signal(false);

  constructor() {
    const query = window.matchMedia('(max-width: 900px)');
    const update = () => {
      this.narrow.set(query.matches);
      this.menuOpen.set(false);
      if (query.matches) {
        this.collapsed.set(false);
      }
    };
    update();
    query.addEventListener('change', update);

    const navigation = inject(Router).events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.menuOpen.set(false);
      }
    });

    inject(DestroyRef).onDestroy(() => {
      query.removeEventListener('change', update);
      navigation.unsubscribe();
    });
  }

  setCollapsed(value: boolean) {
    if (this.narrow()) {
      this.menuOpen.set(false);
      return;
    }
    this.collapsed.set(value);
  }

  openCreate() {
    this.menuOpen.set(false);
    this.createOpen.set(true);
  }

  openLogin() {
    this.menuOpen.set(false);
    this.loginOpen.set(true);
  }
}
