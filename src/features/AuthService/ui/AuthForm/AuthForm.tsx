import React, { memo, useCallback, useState } from 'react';
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
import { authActions, authReducer } from '../../model/slice/authSlice';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { UploadFile } from '@/shared/ui/redesigned/UploadFile';
import { getLoginEmail } from '../../model/selectors/getLoginEmail/getLoginEmail';
import { registration } from '../../model/services/registration/registration';
import { getLoginIsActive } from '../../model/selectors/getLoginIsActive/getLoginIsActive';

export interface AuthFormProps {
  className?: string;
  onSuccess: () => void;
}

const initialReducers: ReducerList = {
  loginForm: authReducer,
};

const AuthForm = memo((props: AuthFormProps) => {
  const { className, onSuccess } = props;
  const dispatch = useAppDispatch();
  const username = useSelector(getLoginUsername);
  const email = useSelector(getLoginEmail);
  const emailIsVerify = useSelector(getLoginIsActive);
  const password = useSelector(getLoginPassword);
  const isLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginError);

  const [registrationForm, setRegistrationForm] = useState(false);
  const [verifyNotification, setVerifyNotification] = useState(emailIsVerify);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(authActions.setUsername(value));
    },
    [dispatch],
  );

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(authActions.setPassword(value));
    },
    [dispatch],
  );

  const onChangeEmail = useCallback(
    (value: string) => {
      dispatch(authActions.setEmail(value));
    },
    [dispatch],
  );

  const onChangeFile = useCallback(
    (file: File) => {
      setSelectedFile(file);
    },
    [],
  );

  const onLoginClick = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      const result = await dispatch(loginByUsername({ username, password }));
      if (result.meta.requestStatus === 'fulfilled') {
        onSuccess();
      }
    },
    [dispatch, onSuccess, password, username],
  );

  const onRegistrationClick = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      const result = await dispatch(registration({
        username, password, email, file: selectedFile,
      }));
      if (result.meta.requestStatus === 'fulfilled') {
        setVerifyNotification(true);
      }
    },
    [dispatch, email, selectedFile, password, username],
  );

  const { t } = useTranslation();

  const VerifyNotification = (
    <Text
      align="center"
      variant="primary"
      size="l"
      weight="bold"
    >
      {t('Please confirm your account by email.')}
    </Text>
  );

  const RegistrationForm = (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      <Text
        align="center"
        variant="primary"
        size="xl"
        weight="bold"
      >
        {t('Registration')}
      </Text>
      <VStack fullWidth gap="16">
        <Input
          autofocus
          placeholder={t('Your username')}
          value={username}
          onChange={onChangeUsername}
        />
        <Input
          placeholder={t('Your email')}
          value={email}
          onChange={onChangeEmail}
        />
        <Input
          placeholder={t('Your password')}
          value={password}
          onChange={onChangePassword}
        />
        <UploadFile
          accept="image/*"
          onFileSelect={onChangeFile}
          placeholder={t('Upload avatar')}
          preview
        />
      </VStack>
      <VStack fullWidth gap="8">
        <Button
          fullWidth
          type="submit"
          variant="primary"
          onClick={onRegistrationClick}
          disabled={isLoading}
        >
          {t('Register')}
        </Button>
        <HStack gap="4" align="center">
          <Text size="m">{t('Have an account?')}</Text>
          <Button onClick={() => setRegistrationForm(false)} variant="text-light">{t('Sign in')}</Button>
        </HStack>
      </VStack>
    </>
  );

  const LoginForm = (
    <>
      <Text
        align="center"
        variant="primary"
        size="xl"
        weight="bold"
      >
        {t('Sign in')}
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
      <VStack fullWidth gap="8">
        <Button
          fullWidth
          type="submit"
          variant="primary"
          onClick={onLoginClick}
          disabled={isLoading}
        >
          {t('Sign in')}
        </Button>
        <HStack gap="4" align="center">
          <Text size="m">{t('No account yet?')}</Text>
          <Button onClick={() => setRegistrationForm(true)} variant="text-light">{t('Sign up')}</Button>
        </HStack>
      </VStack>
    </>
  );

  return (
    <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
      <VStack fullWidth align="center" gap="32" tag="form">
        {registrationForm ? RegistrationForm : LoginForm}
        {verifyNotification ? VerifyNotification : null}
        {error && <Text variant="error">{t('Error login')}</Text>}
      </VStack>
    </DynamicModuleLoader>
  );
});

export default AuthForm;
