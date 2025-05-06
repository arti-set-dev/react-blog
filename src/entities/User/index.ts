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
import type { UserSchema, User, AuthResponse } from './model/types/user';
import { logout } from './model/services/logout/logout';
import { saveJsonSettings } from './model/services/saveJsonSettings/saveJsonSettings';
import { getUserDataByIdQuery, useGetUserDataById } from './api/userApi';
import { initAuthData } from './model/services/initAuthData/initAuthData';
import { checkAuth } from './model/services/checkAuth/checkAuth';

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
  AuthResponse,
  logout,
  getUserDataByIdQuery,
  checkAuth,
  initAuthData,
  useGetUserDataById,
};
