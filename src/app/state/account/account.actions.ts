import {createAction, props} from '@ngrx/store';
import {EEffect} from '../../core/models/clients.model';

export const ADD_CLIENT_ACCOUNT = createAction(
  EEffect.ADD_CLIENT_ACCOUNT,
  props<{ account: any }>() // payload
);
export const ADD_CLIENT_ACCOUNT_SUCCESS = createAction(
  EEffect.ADD_CLIENT_ACCOUNT_SUCCESS,
  props<{ account: any }>()
);
export const LOAD_CLIENT_ACCOUNTS_SUCCESS = createAction(
  EEffect.LOAD_CLIENT_ACCOUNTS_SUCCESS,
  props<{ client: any }>()
);
