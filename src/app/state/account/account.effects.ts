import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ClientsService} from '../../core/services/clients.service';
import {NotificationService} from '../../core/services/notification.service';
import {Router} from '@angular/router';
import {catchError, EMPTY, map, mergeMap} from 'rxjs';
import {ADD_CLIENT_ACCOUNT, ADD_CLIENT_ACCOUNT_SUCCESS} from './account.actions';
import {UPDATE_CLIENT} from '../client/client.actions';

@Injectable()
export class AccountEffects {
  private _router = inject(Router);
  private _notifier = inject(NotificationService);
  private actions$ = inject(Actions);
  private clientsService = inject(ClientsService);

  ADD_CLIENT_ACCOUNT$ = createEffect(() => this.actions$.pipe(
    ofType(ADD_CLIENT_ACCOUNT),
    mergeMap((params: any) => {
      return this.clientsService.addClientAccount({clientId: params.clientId, accounts: params.accounts})
        .pipe(
          map((account: any) => {
            this._notifier.saySuccess('კლიენტის ანგარიში დაემატა წარმატებით');
            this._router.navigate(['/'])
            UPDATE_CLIENT({client: params});
            return ADD_CLIENT_ACCOUNT_SUCCESS(account)
          }),
          catchError(() => EMPTY)
        )
    })), {functional: true}
  )
}
