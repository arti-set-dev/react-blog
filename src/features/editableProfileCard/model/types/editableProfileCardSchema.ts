import { Profile } from 'entitie/Profile';
import { ValidateProfileError } from '../../model/consts/consts';

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

export interface ProfileSchema {
    data?: Profile;
    form?: Profile;
    isLoading: boolean;
    error?: string;
    readonly: boolean;
    validateErrors?: ValidateProfileError[];
}
