import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('app/pages/summary/summary').then((m) => m.Summary) },
  { path: '**', redirectTo: '' },
];
