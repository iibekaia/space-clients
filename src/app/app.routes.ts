import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/clients/clients.component').then(m => m.ClientsComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/clients/client-list/client-list.component').then(m => m.ClientListComponent),
      },
      {
        path: 'add',
        loadComponent: () => import('./features/clients/client-details/client-details.component').then(m => m.ClientDetailsComponent),
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./features/clients/client-details/client-details.component').then(m => m.ClientDetailsComponent),
      },
    ]
  },
  {
    path: 'not-found',
    loadComponent: () => import('./not-found/not-found.component').then(m => m.NotFoundComponent),
  },
  {
    path: '**',
    redirectTo: 'not-found',
  }
];
