export interface IClient {
  name: number;
  lastName: string;
  gender: string;
  identificationNumber: string;
  mobile: string;
  legalAddress: string;
  actualAddress: string;
}

export enum EGender {
  MALE = 1,
  FEMALE = 2
}

export const Genders = [
  {value: EGender.MALE, name: 'კაცი'},
  {value: EGender.FEMALE, name: 'ქალი'},
]
