import { useTranslation } from 'react-i18next';
import { Listbox } from '@/shared/ui/Popups/ui/ListBox/ListBox';
import { Page } from '@/widgets/Page/ui/Page';

const AdminPanelPage = () => {
  const { t } = useTranslation('about');
  return (
    <Page>
      <h1>{t('Admin Panel Page')}</h1>
    </Page>
  );
};

export default AdminPanelPage;
