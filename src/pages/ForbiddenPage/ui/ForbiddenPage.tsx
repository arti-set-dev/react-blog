import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import { Text } from '@/shared/ui/redesigned/Text';
import { getVstack } from '@/shared/lib/stack/getVstack/getVstack';

interface ForbiddenPageProps {
  className?: string;
}

const ForbiddenPage = (props: ForbiddenPageProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <Page
      data-testid="ForbiddenPage"
      className={classNames('', {}, [className, getVstack({ align: 'center', justify: 'center' })])}
    >
      <Text
        tag="h1"
        size="l"
        weight="bold"
      >
        {t('You do not have access to this page')}
      </Text>
    </Page>
  );
};

export default memo(ForbiddenPage);
