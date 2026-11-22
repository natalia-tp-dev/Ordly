import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('app/pages/summary/summary').then((m) => m.Summary) },
  { path: 'notas', loadComponent: () => import('app/pages/notes/notes').then((m) => m.Notes) },
  { path: '**', redirectTo: '' },
];
