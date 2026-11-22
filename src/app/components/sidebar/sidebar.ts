import { Component, input, model, output } from '@angular/core';
import { Icon } from 'app/components/icon/icon';
import { Logo } from 'app/components/logo/logo';
import { NavItem } from 'app/components/nav-item/nav-item';
import { UserBadge } from 'app/components/user-badge/user-badge';
import { TaskList } from 'app/models/list';
import { colorVar } from 'app/utils/color';

@Component({
  selector: 'app-sidebar',
  imports: [Icon, Logo, NavItem, UserBadge],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  collapsed = model(false);
  userName = input('');
  loggedIn = input(true);
  agendaCount = input(0);
  overdueCount = input(0);
  lists = input<TaskList[]>([]);

  colorVar = colorVar;

  createClick = output<void>();
  voiceClick = output<void>();
  profileClick = output<void>();
  loginClick = output<void>();

  toggle() {
    this.collapsed.update((value) => !value);
  }
}
