import {ResolveFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {ClientsService} from '../../services/clients.service';
import {catchError, map, of} from 'rxjs';
import {IClient} from '../../models/clients.model';

export const accountResolverResolver: ResolveFn<boolean> = (route, state) => {
  const clientService = inject(ClientsService);
  const router = inject(Router);

  return clientService.getClients({}).pipe(
    map(({data}: any) => {
      return (data || []).map((client: IClient) => ({...client, fullName: `${client.name} ${client.lastName}`}));
    }),
    catchError(() => {
      router.navigate(['/not-define']);
      return of(null);
    })
  );
};
