import { getProfileData } from 'entitie/Profile/model/selectors/getProfileData/getProfileData';
import { getProfileError } from 'entitie/Profile/model/selectors/getProfileError/getProfileError';
import { getProfileIsLoading } from 'entitie/Profile/model/selectors/getProfileIsLoading/getProfileIsLoading';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import {
  Text, TextSize, TextTheme, TextWeight,
} from 'shared/ui/Text/Text';
import cl from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string;
}

export const ProfileCard = (props: ProfileCardProps) => {
  const { className } = props;
  const { t } = useTranslation('profile');
  const data = useSelector(getProfileData);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);

  return (
    <div className={classNames(cl.ProfileCard, {}, [className])}>
      <div className={cl.head}>
        <Text size={TextSize.XL} theme={TextTheme.PRIMARY} weight={TextWeight.BOLD} text={t('Profile')} />
        <Button theme={ButtonTheme.PRIMARY}>{t('Edit')}</Button>
      </div>
      <div className={cl.data}>
        <Input placeholder={t('Your name')} value={data?.firstname} />
        <Input placeholder={t('Your lastname')} value={data?.lastname} />
      </div>
    </div>
  );
};
