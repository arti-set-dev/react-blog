import { Profile } from 'entitie/Profile';

export interface ValidateFields {
    firstname?: string;
    lastname?: string;
    age?: string;
    currency?: string,
    country?: string;
    city?: string,
    username?: string;
    avatar?: string;
}

export enum ValidateProfileError {
    NO_DATA_USER_FIRSTNAME = 'EPMTY_USER_FIRSTNAME',
    NO_DATA_USER_LASTNAME = 'EPMTY_USER_LASTNAME',
    INCORRECT_AGE = 'INCORRECT_AGE',
    INCORRECT_COUNTRY = 'INCORRECT_COUNTRY',
    INCORRECT_CITY = 'INCORRECT_CITY',
    INCORRECT_CURRENCY = 'INCORRECT_CURRENCY',
    SERVER_ERROR = 'SERVER_ERROR',
    LONG_USERNAME = 'LONG_USERNAME',
    NO_DATA = 'NO_DATA',
}

export interface ProfileSchema {
    data?: Profile;
    form?: Profile;
    isLoading: boolean;
    error?: string;
    readonly: boolean;
    validateErrors?: ValidateProfileError[];
}
