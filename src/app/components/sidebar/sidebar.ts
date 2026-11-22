import { Component, input, model, output } from '@angular/core';
import { Icon } from 'app/components/icon/icon';
import { Logo } from 'app/components/logo/logo';
import { NavItem } from 'app/components/nav-item/nav-item';
import { UserBadge } from 'app/components/user-badge/user-badge';
import { TaskList } from 'app/models/list';

@Component({
  selector: 'app-sidebar',
  imports: [Icon, Logo, NavItem, UserBadge],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  collapsed = model(false);
  userName = input('María Paz');
  loggedIn = input(true);
  agendaCount = input<number>(3);
  overdueCount = input<number>(2);
  lists = input<TaskList[]>([
    { name: 'Personal', color: 'var(--state-success, #10b981)' },
    { name: 'Universidad', color: 'var(--brand-primary, #3b82f6)' },
    { name: 'Citas médicas', color: 'var(--state-danger, #ef4444)' },
  ]);

  createClick = output<void>();
  voiceClick = output<void>();
  profileClick = output<void>();
  loginClick = output<void>();

  toggle() {
    this.collapsed.update((value) => !value);
  }
}
