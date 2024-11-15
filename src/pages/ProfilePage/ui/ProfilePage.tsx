/* eslint-disable i18next/no-literal-string */
import { profileReducer } from 'entitie/Profile';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
// import cl from './ProfilePage.module.scss';

const reducers: ReducerList = {
  profile: profileReducer,
};

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = (props: ProfilePageProps) => {
  const { className } = props;
  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames('', {}, [className])}>
        <h1>ProfilePageProps</h1>
      </div>
    </DynamicModuleLoader>
  );
};

export default ProfilePage;
