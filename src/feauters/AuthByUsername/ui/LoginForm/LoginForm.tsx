import { useEffect } from '@storybook/addons';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider/config/StateSchema';
import { getLoginState } from 'entitie/User/model/selectors/getLoginState/getLoginState';
import { getLoginError } from 'feauters/AuthByUsername/model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from 'feauters/AuthByUsername/model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginPassword } from 'feauters/AuthByUsername/model/selectors/getLoginPassword/getLoginPassword';
import { getLoginUsername } from 'feauters/AuthByUsername/model/selectors/getLoginUsername/getLoginUsername';
import { loginByUsername } from 'feauters/AuthByUsername/model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from 'feauters/AuthByUsername/model/slice/loginSlice';
import React, { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Button, ButtonTheme, ButtonType } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import {
  Text, TextSize, TextTheme, TextWeight,
} from 'shared/ui/Text/Text';
import cl from './LoginForm.module.scss';

export interface LoginFormProps {
    className?: string;
}

const initialReducers: ReducerList = {
  loginForm: loginReducer,
};

const LoginForm = memo((props: LoginFormProps) => {
  const { className } = props;
  const dispatch = useDispatch();
  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const isLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginError);

  const onChangeUsername = useCallback((value: string) => {
    dispatch(loginActions.setUsername(value));
  }, [dispatch]);

  const onChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value));
  }, [dispatch]);

  const onLoginClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(loginByUsername({ username, password }));
  }, [dispatch, password, username]);

  const { t } = useTranslation();

  return (
    <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
      <form className={classNames(cl.LoginForm, {}, [className])}>
        <Text theme={TextTheme.INVERTED} size={TextSize.XL} weight={TextWeight.BOLD} text={t('Login')} />
        <div className={cl.LoginFields}>
          <Input autofocus placeholder={t('Your name')} value={username} onChange={onChangeUsername} />
          <Input placeholder={t('Your password')} value={password} onChange={onChangePassword} />
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
        {error
        && <Text theme={TextTheme.ERROR} text={t('Error login')} />}
      </form>
    </DynamicModuleLoader>
  );
});

export default LoginForm;
