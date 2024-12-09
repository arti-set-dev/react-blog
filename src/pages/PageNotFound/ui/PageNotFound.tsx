import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
import cl from './PageNotFound.module.scss';

interface PageNotFoundProps {
    className?: string;
}

export const PageNotFound: FC<PageNotFoundProps> = (props) => {
  const { children, className } = props;
  const { t } = useTranslation();
  return (
    <Page className={classNames(cl.PageNotFound, {}, [className])}>
      <h1>{t('Page not found')}</h1>
    </Page>
  );
};
