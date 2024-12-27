import { data } from '@remix-run/router';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Page } from '@/widgets/Page';
import { Text, TextTheme } from '@/shared/ui/Text/Text';
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
