import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Page } from '@/widgets/Page';
import { EditableProfileCard } from '@/features/editableProfileCard';
import cl from './ProfilePage.module.scss';
import { ProfileRating } from '@/features/profileRating';
import { ToggleFeatures } from '@/shared/lib/features';
import { Container } from '@/shared/ui/redesigned/Container';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getVstack } from '@/shared/lib/stack/getVstack/getVstack';

const ProfilePage = () => {
  const { t } = useTranslation('profile');
  const { id } = useParams<{ id: string }>();

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={(
        <Page data-testid="ProfilePage" className={cl.ProfilePage}>
          <EditableProfileCard id={id} />
          <ProfileRating profileId={Number(id)} />
        </Page>
      )}
      off={(
        <Page data-testid="ProfilePage" className={cl.ProfilePage}>
          <Container max className={classNames(cl.ProfilePage, {}, [getVstack({ gap: 24 })])}>
            <EditableProfileCard id={id} />
            <ProfileRating profileId={Number(id)} />
          </Container>
        </Page>
      )}
    />
  );
};

export default ProfilePage;
