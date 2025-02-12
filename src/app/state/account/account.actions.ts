import {createAction, props} from '@ngrx/store';
import {EEffect} from '../../core/models/clients.model';

// export const LOAD_CLIENT_ACCOUNTS = createAction(EEffect.LOAD_CLIENT_ACCOUNTS, props<{ page: any; limit: any }>());
// export const LOAD_CLIENT_ACCOUNTS_SUCCESS = createAction('' +
//   EEffect.LOAD_CLIENT_ACCOUNTS_SUCCESS,
//   props<{ data: any[], count: number }>()
// );

export const ADD_CLIENT_ACCOUNT = createAction(
  EEffect.ADD_CLIENT_ACCOUNT,
  props<{ account: any }>() // payload
);
export const ADD_CLIENT_ACCOUNT_SUCCESS = createAction(
  EEffect.ADD_CLIENT_ACCOUNT_SUCCESS,
  props<{ account: any }>()
);
