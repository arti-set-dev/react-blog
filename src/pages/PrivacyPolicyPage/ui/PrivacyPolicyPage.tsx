import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { PrivacyPolicy, PrivacyPolicyContent } from '@/widgets/PrivacyPolicy';
import { ToggleFeatures } from '@/shared/lib/features';
import { StickyContentLayout } from '@/shared/layouts/SticlyContentLayout';

interface PrivacyPolicyPageProps {
  className?: string;
}

const PrivacyPolicyPage = memo((props: PrivacyPolicyPageProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={(
        <StickyContentLayout
          content={(
            <Page>
              <PrivacyPolicy />
            </Page>
          )}
          right={<PrivacyPolicyContent />}
        />
      )}
      off={(
        <Page>
          <PrivacyPolicy />
        </Page>
      )}
    />
  );
});

export default memo(PrivacyPolicyPage);
