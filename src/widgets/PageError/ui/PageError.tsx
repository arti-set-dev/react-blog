import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/deprecated/Button';
import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './PageError.module.scss';

interface PageErrorProps {
  className?: string;
  children?: ReactNode;
}

export const PageError = (props: PageErrorProps) => {
  const { children, className } = props;
  const { t } = useTranslation();

  const reloadPage = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  return (
    <div className={classNames(cl.PageError, {}, [className])}>
      <h1>{t('Something went wrong')}</h1>
      <Button className={cl.BtnReload} onClick={reloadPage}>
        {t('Reload page')}
      </Button>
    </div>
  );
};
