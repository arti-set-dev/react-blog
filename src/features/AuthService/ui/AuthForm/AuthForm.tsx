import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import {
  Text,
} from '@/shared/ui/redesigned/Text';
import {
  DynamicModuleLoader,
  ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { VStack } from '@/shared/ui/redesigned/Stack';

export interface LoginFormProps {
  className?: string;
  onSucces: () => void;
}

const initialReducers: ReducerList = {
  loginForm: loginReducer,
};

const LoginForm = memo((props: LoginFormProps) => {
  const { className, onSucces } = props;
  const dispatch = useAppDispatch();
  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const isLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginError);

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(loginActions.setUsername(value));
    },
    [dispatch],
  );

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value));
    },
    [dispatch],
  );

  const onLoginClick = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      const result = await dispatch(loginByUsername({ username, password }));
      if (result.meta.requestStatus === 'fulfilled') {
        onSucces();
      }
    },
    [dispatch, onSucces, password, username],
  );

  const { t } = useTranslation();

  return (
    <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
      <VStack fullWidth align="center" gap="32" tag="form">
        <Text
          align="center"
          variant="primary"
          size="xl"
          weight="bold"
        >
          {t('Login')}
        </Text>
        <VStack fullWidth gap="16">
          <Input
            autofocus
            placeholder={t('Your username')}
            value={username}
            onChange={onChangeUsername}
          />
          <Input
            placeholder={t('Your password')}
            value={password}
            onChange={onChangePassword}
          />
        </VStack>
        <Button
          fullWidth
          type="submit"
          variant="primary"
          onClick={onLoginClick}
          disabled={isLoading}
        >
          {t('Login')}
        </Button>
        {error && <Text variant="error">{t('Error login')}</Text>}
      </VStack>
    </DynamicModuleLoader>
  );
});

export default LoginForm;
