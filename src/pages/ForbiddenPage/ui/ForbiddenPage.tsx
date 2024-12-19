import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page';
import cl from './ForbiddenPage.module.scss';

interface ForbiddenPageProps {
  className?: string;
}

const ForbiddenPage = (props: ForbiddenPageProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <Page className={classNames('', {}, [className])}>
      {t('You do not have access to this page')}
    </Page>
  );
};

export default memo(ForbiddenPage);
