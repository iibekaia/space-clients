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
