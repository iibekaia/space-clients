import {createAction, props} from "@ngrx/store";
import {EEffect, IClient} from '../../core/models/clients.model';

export const LOAD_CLIENTS = createAction(EEffect.LOAD_CLIENTS, props<{ page: any; limit: any }>());
export const LOAD_CLIENTS_SUCCESS = createAction('' +
  EEffect.LOAD_CLIENTS_SUCCESS,
  props<{ data: any[], count: number }>()
);
export const ADD_CLIENT = createAction(
  EEffect.ADD_CLIENT,
  props<{ client: IClient }>() // payload
);
export const ADD_CLIENT_SUCCESS = createAction(
  EEffect.ADD_CLIENT_SUCCESS,
  props<{ client: any }>()
);

export const DEACTIVATE_CLIENT = createAction(
  EEffect.DEACTIVATE_CLIENT,
  props<{ id: any }>() // payload
);
export const DEACTIVATE_CLIENT_SUCCESS = createAction(
  EEffect.DEACTIVATE_CLIENT_SUCCESS,
  props<{ client: any }>()
);

export const DELETE_CLIENT = createAction(
  EEffect.DELETE_CLIENT,
  props<{ id: any }>() // payload
);
export const DELETE_CLIENT_SUCCESS = createAction(
  EEffect.DELETE_CLIENT_SUCCESS,
  props<{ id: any }>()
);
