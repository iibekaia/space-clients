import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, EMPTY, map, mergeMap} from "rxjs";
import {ClientsService} from '../../core/services/clients.service';
import {LOAD_CLIENTS, LOAD_CLIENTS_SUCCESS} from './client.actions';

@Injectable()
export class ClientEffects {
  private actions$ = inject(Actions);
  private clientsService = inject(ClientsService);

  LOAD_CLIENTS$ = createEffect(() => this.actions$.pipe(
    ofType(LOAD_CLIENTS),
    mergeMap((payload: { page: any, limit: any }) => {
      const hasPagination = payload?.page || payload?.limit;
      return this.clientsService.getClients(hasPagination ? {
        _page: payload.page,
        _limit: payload.limit
      } : {})
        .pipe(
          map((payload: { data: any[], count: number }) => LOAD_CLIENTS_SUCCESS(payload)),
          catchError(() => EMPTY)
        )
    })), {functional: true}
  )

}
