import { useTranslation } from 'react-i18next';
import { Counter } from '@/entities/Counter';
import { Page } from '@/widgets/Page';

const MainPage = () => {
  const { t } = useTranslation('main');
  return (
    <Page>
      <Counter />
      <h1>{t('Main Page')}</h1>
    </Page>
  );
};

export default MainPage;
