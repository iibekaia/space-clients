import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, EMPTY, map, mergeMap} from "rxjs";
import {ClientsService} from '../../core/services/clients.service';
import {
  ADD_CLIENT,
  ADD_CLIENT_SUCCESS,
  DEACTIVATE_CLIENT,
  DEACTIVATE_CLIENT_SUCCESS,
  LOAD_CLIENTS,
  LOAD_CLIENTS_SUCCESS
} from './client.actions';
import {NotificationService} from '../../core/services/notification.service';
import {Router} from '@angular/router';

@Injectable()
export class ClientEffects {
  private _router = inject(Router);
  private _notifier = inject(NotificationService);
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

  ADD_CLIENT$ = createEffect(() => this.actions$.pipe(
    ofType(ADD_CLIENT),
    mergeMap(({client}) => {
      return this.clientsService.addClient(client)
        .pipe(
          map((client: any) => {
            this._notifier.saySuccess('დაემატა წარმატებით');
            this._router.navigate(['/']);
            return ADD_CLIENT_SUCCESS({client})
          }),
          catchError(() => EMPTY)
        )
    })), {functional: true}
  )

  DEACTIVATE_CLIENT$ = createEffect(() => this.actions$.pipe(
    ofType(DEACTIVATE_CLIENT),
    mergeMap((data) => {
      const clientId = data.id
      return this.clientsService.updateClientDetails({active: false, id: clientId})
        .pipe(
          map((client: any) => {
            this._notifier.saySuccess('კლიენტი დეაქტივირდა წარმატებით');
            this._router.navigate(['/']);
            return DEACTIVATE_CLIENT_SUCCESS({client})
          }),
          catchError(() => EMPTY)
        )
    })), {functional: true}
  )

}
