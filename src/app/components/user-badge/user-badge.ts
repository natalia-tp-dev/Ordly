import { Component, computed, input, output } from '@angular/core';

/**
 * Insignia de usuario (#14).
 *  - Con sesión iniciada: avatar con iniciales, nombre y "Ver perfil".
 *  - Con sesión cerrada: botón "Iniciar sesión".
 *  - Colapsado: solo se muestra el avatar (o el icono de login si no hay sesión).
 *
 * Uso:
 *   <app-user-badge name="María Paz" (profileClick)="..." />
 *   <app-user-badge name="María Paz" [collapsed]="true" />
 *   <app-user-badge [loggedIn]="false" (loginClick)="..." />
 */
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
  /** false = sesión cerrada. */
  loggedIn = input(true);
  /** true = barra lateral colapsada: solo el avatar. */
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
