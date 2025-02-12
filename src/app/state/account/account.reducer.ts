import {createReducer, on} from "@ngrx/store";
import * as ACTIONS from '../account/account.actions';

export const initialState: any = [];
export const accountReducer = createReducer(
  initialState,
  on(ACTIONS.ADD_CLIENT_ACCOUNT_SUCCESS, (state, payload) => {
    return [...state, payload];
  }),
  on(ACTIONS.LOAD_CLIENT_ACCOUNTS_SUCCESS, (state, payload) => {
    return [...state, payload?.client];
  }),
)
