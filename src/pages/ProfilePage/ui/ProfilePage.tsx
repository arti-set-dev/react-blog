import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Page } from '@/widgets/Page';
import { EditableProfileCard } from '@/features/editableProfileCard';
import cl from './ProfilePage.module.scss';
import { ProfileRating } from '@/features/profileRating';
import { Container } from '@/shared/ui/redesigned/Container';
import { getVstack } from '@/shared/lib/stack/getVstack/getVstack';

const ProfilePage = () => {
  const { t } = useTranslation('profile');
  const { id } = useParams<{ id: string }>();

  return (
    <Page data-testid="ProfilePage" className={cl.ProfilePage}>
      <Container max className={getVstack({ gap: 24 })}>
        <EditableProfileCard id={id} />
        <ProfileRating profileId={id} />
      </Container>
    </Page>
  );
};

export default ProfilePage;
