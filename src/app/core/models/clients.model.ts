export interface IClient {
    id: any;
    active: boolean;
    accounts?: any;
    clientNumber: string;
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

export const Genders = [
    {value: EGender.MALE, name: 'კაცი'},
    {value: EGender.FEMALE, name: 'ქალი'},
]

export interface AppConfig {
    API_URL: string;
}
