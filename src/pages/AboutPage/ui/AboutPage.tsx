import { useTranslation } from 'react-i18next';
import { Listbox } from '@/shared/ui/Popups';
import { Page } from '@/widgets/Page';

const AboutPage = () => {
  const { t } = useTranslation('about');
  return (
    <Page>
      <h1>{t('About Page')}</h1>
    </Page>
  );
};

export default AboutPage;
