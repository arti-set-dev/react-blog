import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { ToggleFeatures } from '@/shared/lib/features';
import { Rules } from '@/widgets/Rules';

interface ServiceRulesPageProps {
  className?: string;
}

const ServiceRulesPage = memo((props: ServiceRulesPageProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={(
        <Page>
          <Rules isHead />
        </Page>
      )}
      off={(
        <Page>
          <Rules isHead />
        </Page>
      )}
    />
  );
});

export default memo(ServiceRulesPage);
