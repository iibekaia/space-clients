import {createAction, props} from "@ngrx/store";

export const LOAD_CLIENTS = createAction('[CLIENTS] Load Clients', props<{ page: any; limit: any }>());
export const LOAD_CLIENTS_SUCCESS = createAction('[CLIENTS] Load Clients Success', props<{
  data: any[],
  count: number
}>());
