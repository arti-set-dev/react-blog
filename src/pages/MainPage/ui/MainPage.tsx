import { Counter } from 'entities/Counter';
import { useTranslation } from 'react-i18next';

const MainPage = () => {
  const { t } = useTranslation('main');
  return (
    <div>
      <Counter />
      <h1>{t('Main Page')}</h1>
    </div>
  );
};

export default MainPage;
