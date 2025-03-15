import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { PrivacyPolicy } from '@/widgets/PrivacyPolicy';

interface PrivacyPolicyPageProps {
  className?: string;
}

const PrivacyPolicyPage = memo((props: PrivacyPolicyPageProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <Page>
      <PrivacyPolicy />
    </Page>
  );
});

export default memo(PrivacyPolicyPage);
