import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';

const AboutPage = () => {
  const { t } = useTranslation('about');
  return (
    <Page data-testid="AboutPage">
      <h1>{t('About Page')}</h1>
    </Page>
  );
};

export default AboutPage;
