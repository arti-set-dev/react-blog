import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button, ButtonTheme, ButtonType } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import {
  Text, TextSize, TextTheme, TextWeight,
} from '@/shared/ui/Text';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import cl from './LoginForm.module.scss';

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
      <form className={classNames(cl.LoginForm, {}, [className])}>
        <Text
          theme={TextTheme.PRIMARY}
          size={TextSize.XL}
          weight={TextWeight.BOLD}
        >
          {t('Login')}
        </Text>
        <div className={cl.LoginFields}>
          <Input
            autofocus
            placeholder={t('Your name')}
            value={username}
            onChange={onChangeUsername}
          />
          <Input
            placeholder={t('Your password')}
            value={password}
            onChange={onChangePassword}
          />
        </div>
        <Button
          type={ButtonType.SUBMIT}
          theme={ButtonTheme.PRIMARY}
          className={cl.LoginBtn}
          onClick={onLoginClick}
          disabled={isLoading}
        >
          {t('Login')}
        </Button>
        {error && <Text theme={TextTheme.ERROR}>{t('Error login')}</Text>}
      </form>
    </DynamicModuleLoader>
  );
});

export default LoginForm;
