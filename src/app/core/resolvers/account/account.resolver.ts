import {ResolveFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {ClientsService} from '../../services/clients.service';
import {Store} from '@ngrx/store';
import {catchError, map, of, switchMap, take} from 'rxjs';
import {IAccount} from '../../models/accounts.model';
import {LOAD_CLIENT_ACCOUNTS_SUCCESS} from '../../../state/account/account.actions';

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
      const fetchedAccountsData: any = (accounts || []).find((a: any) => a.clientId == id);
      return fetchedAccountsData !== undefined ? fetchedAccountsData : null
    }),
    switchMap((data: any | null) => {
      if (data) {
        return of(data?.accounts);
      }

      return clientService.getAccountByClientId(id).pipe(
        map((fetchedAccounts: any) => {
          const fetchedAccountsData: any = fetchedAccounts.find((a: any) => a.clientId == id);
          if (fetchedAccountsData !== undefined) {
            _store.dispatch(LOAD_CLIENT_ACCOUNTS_SUCCESS({client: fetchedAccountsData}));
          }
          return fetchedAccountsData?.accounts;
        }),
        catchError(() => {
          router.navigate(['/not-define']);
          return of(null);
        })
      );
    })
  );
};
