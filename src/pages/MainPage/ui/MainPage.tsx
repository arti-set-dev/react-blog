import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { MainHero } from '@/widgets/Hero';
import { PopularPosts } from '@/widgets/PopularPosts';
import { ArticleCategory } from '@/widgets/ArticleCategory';
import { Rules } from '@/widgets/Rules';

const MainPage = () => {
  const { t } = useTranslation('main');
  return (
    <Page data-testid="MainPage">
      <MainHero />
      <PopularPosts />
      <ArticleCategory />
      <Rules />
    </Page>
  );
};

export default MainPage;
