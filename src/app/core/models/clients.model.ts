import {DELETE_CLIENT} from '../../state/client/client.actions';

export interface IClient {
  id: any;
  accountsId?: any;
  active: boolean;
  accounts?: any;
  name: number;
  lastName: string;
  fullName?: string;
  gender: number;
  personalNumber: string;
  mobile: string;
  legalAddress: {
    country: string,
    city: string,
    address: string
  };
  actualAddress: {
    country: string,
    city: string,
    address: string
  };
}

export enum EGender {
  MALE = 1,
  FEMALE = 2
}

export const GENDERS_MAP = {
  [EGender.MALE]: 'კაცი',
  [EGender.FEMALE]: 'ქალი'
}

export const Genders = [
  {value: EGender.MALE, name: GENDERS_MAP[EGender.MALE]},
  {value: EGender.FEMALE, name: GENDERS_MAP[EGender.FEMALE]},
]

export interface AppConfig {
  API_URL: string;
}

export enum EEffect {
  LOAD_CLIENTS = 'LOAD_CLIENTS',
  LOAD_CLIENTS_SUCCESS = 'LOAD_CLIENTS_SUCCESS',
  ADD_CLIENT = 'ADD_CLIENT',
  ADD_CLIENT_SUCCESS = 'ADD_CLIENT_SUCCESS',
  UPDATE_CLIENT = 'UPDATE_CLIENT',
  UPDATE_CLIENT_SUCCESS = 'UPDATE_CLIENT_SUCCESS',
  DEACTIVATE_CLIENT = 'DEACTIVATE_CLIENT',
  DEACTIVATE_CLIENT_SUCCESS = 'DEACTIVATE_CLIENT_SUCCESS',
  DELETE_CLIENT = 'DELETE_CLIENT',
  DELETE_CLIENT_SUCCESS = 'DELETE_CLIENT_SUCCESS',

}
