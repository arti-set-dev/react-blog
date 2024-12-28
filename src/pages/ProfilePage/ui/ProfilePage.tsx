import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Page } from '@/widgets/Page';
import { EditableProfileCard } from '@/features/editableProfileCard';
import cl from './ProfilePage.module.scss';

const ProfilePage = () => {
  const { t } = useTranslation('profile');
  const { id } = useParams<{ id: string }>();

  return (
    <Page className={cl.ProfilePage}>
      <EditableProfileCard id={id} />
    </Page>
  );
};

export default ProfilePage;
