import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';

const MainPage = () => {
  const { t } = useTranslation('main');
  return (
    <Page>
      <h1>{t('Main Page')}</h1>
    </Page>
  );
};

export default MainPage;
