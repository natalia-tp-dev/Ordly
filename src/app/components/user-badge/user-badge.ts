import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-user-badge',
  template: `
    @if (loggedIn()) {
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="w-9 h-9 rounded-full bg-brand-500 text-white text-xs font-bold flex items-center justify-center shrink-0 hover:bg-brand-600 transition-colors"
          [attr.aria-label]="'Ver perfil de ' + name()"
          (click)="profileClick.emit()"
        >
          {{ initials() }}
        </button>

        @if (!collapsed()) {
          <div class="min-w-0">
            <p class="text-sm font-semibold text-slate-800 truncate">{{ name() }}</p>
            <button
              type="button"
              class="text-xs text-brand-500 hover:text-brand-600 font-medium"
              (click)="profileClick.emit()"
            >
              Ver perfil
            </button>
          </div>
        }
      </div>
    } @else {
      @if (collapsed()) {
        <button
          type="button"
          class="w-9 h-9 rounded-full bg-brand-500 text-white flex items-center justify-center hover:bg-brand-600 transition-colors"
          aria-label="Iniciar sesión"
          (click)="loginClick.emit()"
        >
          <i class="fa-solid fa-right-to-bracket text-xs"></i>
        </button>
      } @else {
        <button
          type="button"
          class="w-full bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium py-2.5 px-4 rounded-xl transition-colors"
          (click)="loginClick.emit()"
        >
          Iniciar sesión
        </button>
      }
    }
  `,
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
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase() ?? '')
      .join(''),
  );
}
