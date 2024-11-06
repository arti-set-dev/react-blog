import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import cl from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string;
}

export const LoginForm: FC<LoginFormProps> = (props) => {
  const { children, className } = props;
  const { t } = useTranslation();
  return (
    <form className={classNames(cl.LoginForm, {}, [className])}>
      <h2 className={cl.LoginTitle}>{t('Login')}</h2>
      <div className={cl.LoginFields}>
        <Input autofocus placeholder={t('Your name')} />
        <Input placeholder={t('Your password')} />
      </div>
      <Button theme={ButtonTheme.PRIMARY} className={cl.LoginBtn}>{t('Login')}</Button>
    </form>
  );
};
