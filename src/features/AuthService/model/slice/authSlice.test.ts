import { AuthSchema } from '../types/authSchema';
import { authActions, authReducer } from './authSlice';

describe('authSlice.test', () => {
  test('test set username', () => {
    const state: DeepPartial<AuthSchema> = { username: '123' };
    expect(
      authReducer(state as AuthSchema, authActions.setUsername('123123')),
    ).toEqual({ username: '123123' });
  });

  test('test set password', () => {
    const state: DeepPartial<AuthSchema> = { password: '123' };
    expect(
      authReducer(state as AuthSchema, authActions.setPassword('123123')),
    ).toEqual({ password: '123123' });
  });
});
