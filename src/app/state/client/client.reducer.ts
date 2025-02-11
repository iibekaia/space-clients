import {createReducer, on} from "@ngrx/store";
import * as ACTIONS from "./client.actions";

export const initialState: any = [];
export const clientReducer = createReducer(
  initialState,
  on(ACTIONS.LOAD_CLIENTS, (state, payload) => {
    return state;
  }),
  on(ACTIONS.LOAD_CLIENTS_SUCCESS, (state, payload) => {
    return payload;
  })
)
