import { Routes } from '@angular/router';

// Rotte principali dell'applicazione, tutte lazy-loaded
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Cultura Agrosostenibile - Home'
  },
  {
    path: 'companies',
    loadComponent: () => import('./features/companies/company-list.component').then(m => m.CompanyListComponent),
    title: 'Aziende - Cultura Agrosostenibile'
  },
  {
    path: 'companies/:id',
    loadComponent: () => import('./features/companies/company-detail.component').then(m => m.CompanyDetailComponent),
    title: 'Dettaglio Azienda - Cultura Agrosostenibile'
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: '404 - Cultura Agrosostenibile'
  }
];
