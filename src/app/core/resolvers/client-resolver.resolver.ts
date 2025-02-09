import { ResolveFn } from '@angular/router';
import {inject} from '@angular/core';
import {ClientsService} from '../services/clients.service';

export const clientResolverResolver: ResolveFn<any> = (route, state) => {
  const clientService = inject(ClientsService);
  const id = route.paramMap.get('id');

  if (!id) {
    throw new Error('Client ID is missing in route parameters');
  }
  return clientService.getClientById(id);
};
