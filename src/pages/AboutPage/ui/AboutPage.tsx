import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

const AboutPage = () => {
  const { t } = useTranslation('about');
  return (
    <h1>{t('About Page')}</h1>
  );
};

export default AboutPage;
