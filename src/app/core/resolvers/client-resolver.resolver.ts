import {ResolveFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {ClientsService} from '../services/clients.service';
import {catchError, map, of} from 'rxjs';
import {IClient} from '../models/clients.model';

export const clientResolverResolver: ResolveFn<any> = (route, state) => {
  const clientService = inject(ClientsService);
  const router = inject(Router);
  const id = route.paramMap.get('id');

  if (!id) {
    throw new Error('Client ID is missing in route parameters');
  }
  return clientService.getClientById(id).pipe(
    map((data: any) => {
      if (data.some((client: IClient) => client.active === false)) {
        router.navigate(['/not-define']);
        return null;
      }
      return data;
    }),
    catchError(() => {
      router.navigate(['/not-define']);
      return of(null);
    })
  );
};
