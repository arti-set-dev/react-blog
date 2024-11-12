import { CounterSchema } from 'entitie/Counter';
import { UserSchema } from 'entitie/User';
import { LoginSchema } from 'feauters/AuthByUsername';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    loginForm?: LoginSchema;
}
