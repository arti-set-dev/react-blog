import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { Rules } from '@/widgets/Rules';
import { AboutHero } from '@/widgets/Hero';
import cl from './AboutPage.module.scss';

const AboutPage = () => {
  const { t } = useTranslation('about');
  return (
    <Page data-testid="AboutPage" className={cl.AboutPage}>
      <AboutHero />
      <Rules />
    </Page>
  );
};

export default AboutPage;
