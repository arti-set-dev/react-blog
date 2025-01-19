import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import cl from './NotFoundPage.module.scss';

interface NotFoundPageProps {
  className?: string;
  children?: ReactNode;
}

export const NotFoundPage = (props: NotFoundPageProps) => {
  const { children, className } = props;
  const { t } = useTranslation();
  return (
    <Page data-testid="NotFoundPage" className={classNames(cl.NotFoundPage, {}, [className])}>
      <h1>{t('Page not found')}</h1>
    </Page>
  );
};
