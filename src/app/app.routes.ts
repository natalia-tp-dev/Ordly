import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('app/pages/summary/summary').then((m) => m.Summary) },
  { path: 'agenda', redirectTo: 'agenda/mes', pathMatch: 'full' },
  { path: 'agenda/mes', loadComponent: () => import('app/pages/agenda-month/agenda-month').then((m) => m.AgendaMonth) },
  { path: 'agenda/semana', loadComponent: () => import('app/pages/agenda-week/agenda-week').then((m) => m.AgendaWeek) },
  { path: 'agenda/dia', loadComponent: () => import('app/pages/agenda-day/agenda-day').then((m) => m.AgendaDay) },
  { path: 'listas', loadComponent: () => import('app/pages/lists/lists').then((m) => m.Lists) },
  { path: 'notas', loadComponent: () => import('app/pages/notes/notes').then((m) => m.Notes) },
  { path: '**', redirectTo: '' },
];
