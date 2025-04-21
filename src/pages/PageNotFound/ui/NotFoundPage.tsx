import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import cl from './NotFoundPage.module.scss';
import { Text } from '@/shared/ui/redesigned/Text';
import { getVstack } from '@/shared/lib/stack/getVstack/getVstack';
import { ToggleFeatures } from '@/shared/lib/features';

interface NotFoundPageProps {
  className?: string;
  children?: ReactNode;
}

export const NotFoundPage = (props: NotFoundPageProps) => {
  const { children, className } = props;
  const { t } = useTranslation();
  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={(
        <Page
          data-testid="NotFoundPage"
          className={classNames('', {}, [className, getVstack({ align: 'center', justify: 'center' })])}
        >
          <Text
            tag="h1"
            size="l"
            weight="bold"
          >
            {t('Page not found')}
          </Text>
        </Page>
      )}
      off={(
        <Page
          data-testid="NotFoundPage"
          className={classNames(cl.NotFoundPage, {}, [className, getVstack({ align: 'center', justify: 'center' })])}
        >
          <Text
            tag="h1"
            size="l"
            weight="bold"
          >
            {t('Page not found')}
          </Text>
        </Page>
      )}
    />
  );
};
