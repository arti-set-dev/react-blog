import { getLoginState } from 'entitie/User/model/selectors/getLoginState/getLoginState';
import { loginByUsername } from 'feauters/AuthByUsername/model/services/loginByUsername/loginByUsername';
import { loginActions } from 'feauters/AuthByUsername/model/slice/loginSlice';
import React, { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme, ButtonType } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import {
  Text, TextSize, TextTheme, TextWeight,
} from 'shared/ui/Text/Text';
import cl from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string;
}

export const LoginForm = memo((props: LoginFormProps) => {
  const { className } = props;
  const dispatch = useDispatch();
  const {
    username, password, error, isLoading,
  } = useSelector(getLoginState);

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
  );
});
