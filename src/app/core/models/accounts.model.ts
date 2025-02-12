export interface IAccount {
  id?: any;
  clientId: string;
  type?: any;
  typeId?: string;
  currency?: any;
  currencyId?: string;
  status?: any;
  statusId?: string;
}

export enum ECurrencyType {
  GEL = 1,
  USD = 2,
  EUR = 3
}

export enum EStatusType {
  ACTIVE = 1,
  CLOSED = 2,
}

export enum EType {
  ONGOING = 1,
  SAVING = 2,
  ACCUMULATIVE = 3
}

export const CURRENCIES_MAP = {
  [ECurrencyType.GEL]: 'GEL',
  [ECurrencyType.USD]: 'USD',
  [ECurrencyType.EUR]: 'EUR',
}
export const CURRENCIES = [
  {name: CURRENCIES_MAP[ECurrencyType.GEL], value: ECurrencyType.GEL},
  {name: CURRENCIES_MAP[ECurrencyType.USD], value: ECurrencyType.USD},
  {name: CURRENCIES_MAP[ECurrencyType.EUR], value: ECurrencyType.EUR},
]

export const STATUSES_MAP = {
  [EType.ONGOING]: 'აქტიური',
  [EType.SAVING]: 'გახურული',
}

export const STATUSES = [
  {name: STATUSES_MAP[EStatusType.ACTIVE], value: EStatusType.ACTIVE},
  {name: STATUSES_MAP[EStatusType.CLOSED], value: EStatusType.CLOSED},
]

export const TYPES_MAP = {
  [EType.ONGOING]: 'მიმდინარე',
  [EType.SAVING]: 'შემნახველი',
  [EType.ACCUMULATIVE]: 'დაგროვებითი',
}

export const TYPES = [
  {name: TYPES_MAP[EType.ONGOING], value: EType.ONGOING},
  {name: TYPES_MAP[EType.SAVING], value: EType.SAVING},
  {name: TYPES_MAP[EType.ACCUMULATIVE], value: EType.ACCUMULATIVE},
]
