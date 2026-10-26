import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-user-badge',
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
      .map((parte) => parte[0].toUpperCase())
      .join(''),
  );
}
