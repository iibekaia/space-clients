export interface IAccount {
  id?: any;
  clientId: string;
  numberId?: string;
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

export const CURRENCIES = [
  {name: "GEL", value: ECurrencyType.GEL},
  {name: "USD", value: ECurrencyType.USD},
  {name: "EUR", value: ECurrencyType.EUR},
]

export const STATUSES = [
  {name: "აქტიური", value: EStatusType.ACTIVE},
  {name: "გახურული", value: EStatusType.CLOSED},
]

export const TYPES = [
  {name: "მიმდინარე", value: EType.ONGOING},
  {name: "შემნახველი", value: EType.SAVING},
  {name: "დაგროვებითი", value: EType.ACCUMULATIVE},
]
