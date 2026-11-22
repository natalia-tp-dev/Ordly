import { Component, computed, input, output } from '@angular/core';
import { Icon } from 'app/components/icon/icon';

@Component({
  selector: 'app-user-badge',
  imports: [Icon],
  templateUrl: './user-badge.html',
  styleUrl: './user-badge.css',
})
export class UserBadge {
  name = input('');
  loggedIn = input(true);
  collapsed = input(false);

  profileClick = output<void>();
  loginClick = output<void>();

  initials = computed(() =>
    this.name()
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join(''),
  );

  onClick() {
    if (this.loggedIn()) {
      this.profileClick.emit();
    } else {
      this.loginClick.emit();
    }
  }
}
