import { FeatureFlags } from '@/shared/types/featureFlags';
import { UserRole } from '../../model/consts/consts';
import { JsonSettings } from './jsonSettings';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  isEmailVerified?: boolean;
  activationLink?: string;
  roles?: UserRole[];
  features?: FeatureFlags;
  jsonSettings?: JsonSettings;
  accessToken?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface AuthData {
  user: User;
  accessToken?: string;
}

export interface UserSchema {
  authData?: User;
  _inited?: boolean;
}
