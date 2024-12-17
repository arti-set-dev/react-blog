import { Country } from 'entitie/Country';
import { Currency } from 'entitie/Currency';

export interface Profile {
    id?: string;
    firstname?: string;
    lastname?: string;
    age?: number;
    currency?: Currency,
    country?: Country;
    city?: string,
    username?: string;
    avatar?: string;
}
