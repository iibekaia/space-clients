import {ResolveFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {ClientsService} from '../../services/clients.service';
import {Store} from '@ngrx/store';
import {catchError, map, of, switchMap, take} from 'rxjs';
import {IAccount} from '../../models/accounts.model';

export const accountResolver: ResolveFn<boolean> = (route, state) => {
  const clientService = inject(ClientsService);
  const _store = inject(Store);
  const router = inject(Router);
  const id = route.paramMap.get('id');

  if (!id) {
    throw new Error('Client ID is missing in route parameters');
  }

  return _store.select('accounts').pipe(
    take(1),
    map((accounts: IAccount[]) => {
      return (accounts || []).length ? accounts : null
    }),
    switchMap((account: IAccount[] | null) => {
      if (account) {
        return of(account);
      }

      return clientService.getAccountByClientId(id).pipe(
        map((fetchedAccounts: any) => {
          return (fetchedAccounts || []).find((a: any) => a.clientId == id)?.accounts;
        }),
        catchError(() => {
          router.navigate(['/not-define']);
          return of(null);
        })
      );
    })
  );
};
