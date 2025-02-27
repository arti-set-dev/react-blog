import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { MainHero } from '@/widgets/Hero';
import { PopularPosts } from '@/widgets/PopularPosts';

const MainPage = () => {
  const { t } = useTranslation('main');
  return (
    <Page data-testid="MainPage">
      <MainHero />
      <PopularPosts />
    </Page>
  );
};

export default MainPage;
