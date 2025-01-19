import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';

const AdminPanelPage = () => {
  const { t } = useTranslation('about');
  return (
    <Page data-testid="AdminPanelPage">
      <h1>{t('Admin Panel Page')}</h1>
    </Page>
  );
};

export default AdminPanelPage;
