import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Icon } from 'app/components/icon/icon';

@Component({
  selector: 'app-nav-item',
  imports: [RouterLink, RouterLinkActive, Icon],
  templateUrl: './nav-item.html',
  styleUrl: './nav-item.css',
})
export class NavItem {
  label = input.required<string>();
  icon = input.required<string>();
  link = input<string>();
  exact = input(false);
  collapsed = input(false);
  badge = input<number>();
}
