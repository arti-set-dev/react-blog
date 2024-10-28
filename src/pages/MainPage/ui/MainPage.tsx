import { useTranslation } from 'react-i18next';

const MainPage = () => {
  const { t } = useTranslation('main');
  return (
    <h1>{t('Main Page')}</h1>
  );
};

export default MainPage;
