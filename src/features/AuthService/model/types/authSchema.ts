import { UserSchema } from '@/entities/User';

export interface AuthSchema extends UserSchema {
  username: string;
  password: string;
  email?: string;
  isLoading: boolean;
  error?: string;
}
