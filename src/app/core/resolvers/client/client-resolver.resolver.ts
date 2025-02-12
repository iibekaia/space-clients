import {ResolveFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {ClientsService} from '../../services/clients.service';
import {catchError, map, of, switchMap, take} from 'rxjs';
import {IClient} from '../../models/clients.model';
import {Store} from '@ngrx/store';

export const clientResolverResolver: ResolveFn<any> = (route, state) => {
  const clientService = inject(ClientsService);
  const _store = inject(Store);
  const router = inject(Router);
  const id = route.paramMap.get('id');

  if (!id) {
    throw new Error('Client ID is missing in route parameters');
  }

  return _store.select('clients').pipe(
    take(1),
    map((response: any) => response?.data?.find((c: any) => c.id == id) || null),
    switchMap((client: IClient | null) => {
      if (client) {
        if (client.active === false) {
          router.navigate(['/not-define']);
          return of(null);
        }
        return of(client);
      }

      return clientService.getClientById(id).pipe(
        map((fetchedClients: IClient[]) => {
          const clientData: any = fetchedClients.find((c: any) => c.id == id);
          if (!clientData || clientData.active === false) {
            router.navigate(['/not-define']);
            return null;
          }
          return clientData;
        }),
        catchError(() => {
          router.navigate(['/not-define']);
          return of(null);
        })
      );
    })
  );
};
