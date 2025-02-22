import {Routes} from '@angular/router';
import {clientResolverResolver} from './core/resolvers/client/client-resolver.resolver';
import {accountResolver} from './core/resolvers/account/account.resolver';

export const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {
    path: 'client',
    children: [
      {
        path: 'add',
        loadComponent: () => import('./features/clients/client-details/client-details.component').then(m => m.ClientDetailsComponent),
      },
      {
        path: 'edit/:id',
        resolve: {client: clientResolverResolver, accounts: accountResolver},
        loadComponent: () => import('./features/clients/client-details/client-details.component').then(m => m.ClientDetailsComponent),
      }
    ]
  },
  {
    path: 'account',
    children: [
      {
        path: 'add',
        loadComponent: () => import('./features/account/account-details/account-details.component').then(m => m.AccountDetailsComponent),
      },
      {
        path: 'add/:clientId',
        loadComponent: () => import('./features/account/account-details/account-details.component').then(m => m.AccountDetailsComponent),
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./features/account/account-details/account-details.component').then(m => m.AccountDetailsComponent),
      }
    ]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/clients/clients.component').then(m => m.ClientsComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/clients/client-list/client-list.component').then(m => m.ClientListComponent),
      }
    ]
  },
  {
    path: 'not-found',
    loadComponent: () => import('./layouts/not-found/not-found.component').then(m => m.NotFoundComponent),
  },
  {
    path: '**',
    redirectTo: 'not-found',
  }
];
