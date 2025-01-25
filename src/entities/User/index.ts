import { initAuthData } from './model/services/initAuthData';
import { saveJsonSettings } from './model/services/saveJsonSettings';
import { useJsonSettings } from './model/selectors/jsonSettings';
import { UserRole } from './model/consts/consts';
import {
  isUserAdmin,
  isUserManager,
  getUserRoles,
} from './model/selectors/roleSelectors';
import { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';
import { getUserInited } from './model/selectors/getUserInited/getUserInited';
import { userReducer, userActions } from './model/slice/userSlice';
import type { UserSchema, User } from './model/types/user';

export {
  userReducer,
  userActions,
  UserSchema,
  User,
  getUserAuthData,
  getUserInited,
  UserRole,
  isUserAdmin,
  isUserManager,
  getUserRoles,
  useJsonSettings,
  saveJsonSettings,
  initAuthData,
};
