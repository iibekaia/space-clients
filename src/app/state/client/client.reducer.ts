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
  }),
  on(ACTIONS.ADD_CLIENT_SUCCESS, (state, payload) => {
    return {
      ...state,
      data: [...(state.data || []), payload.client],
      count: (state.count || 1) + 1,
    };
  }),
  on(ACTIONS.UPDATE_CLIENT_SUCCESS, (state, payload) => {
    const data = (state.data || []).map(client => {
      if (client.id === payload.client.id) {
        return payload.client
      }
      return client
    });
    return {
      ...state,
      data: [...data],
      count: (state.count || 1) + 1,
    };
  }),
  on(ACTIONS.DELETE_CLIENT_SUCCESS, (state, payload) => {
    return {...state, data: [...(state.data || []).filter((client: any) => client.id !== payload.id)]};
  }),
)
