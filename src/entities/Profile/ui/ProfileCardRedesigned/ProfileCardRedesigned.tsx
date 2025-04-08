import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input/Input';
import { useProfile } from '../../lib/hooks/useProfile';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { Avatar } from '@/shared/ui/redesigned/Avatar/Avatar';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { CountrySelect } from '@/entities/Country';
import { CurrencySelect } from '@/entities/Currency';
import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './ProfileCardRedesigned.module.scss';
import { ProfileCardProps } from '../ProfileCard/ProfileCard';
import { getVstack } from '@/shared/lib/stack/getVstack/getVstack';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

export const ProfileCardLoaderRedesigned = () => (
  <Card offset="24" className={classNames('', {}, [getVstack({ gap: 24, align: 'center' })])}>
    <Skeleton border="circle" width={100} height={100} />
    <HStack gap="16">
      <Skeleton width={80} height={30} />
      <Skeleton width={80} height={30} />
    </HStack>
    <div className={cl.data}>
      <Skeleton width="100%" border="10" height={40} />
      <Skeleton width="100%" border="10" height={40} />
      <Skeleton width="100%" border="10" height={40} />
      <Skeleton width="100%" border="10" height={40} />
      <Skeleton width="100%" border="10" height={40} />
      <Skeleton width="100%" border="10" height={40} />
      <Skeleton width="100%" border="10" height={40} />
      <Skeleton width="100%" border="10" height={40} />
    </div>
  </Card>
);

export const ProfileCardErrorRedesigned = () => {
  const { t } = useTranslation('profile');

  return (
    <VStack gap="16">
      <Text variant="error" size="l">
        {t('Profile error')}
      </Text>
    </VStack>
  );
};

export const ProfileCardRedesigned = memo((props: ProfileCardProps) => {
  const {
    className,
    data,
    error,
    isLoading,
    readonly,
    onEdit,
    onSave,
    onCancelEdit,
    onChangeFirstname,
    onChangeLastname,
    onChangeCity,
    onChangeAge,
    onChangeCountry,
    onChangeAvatar,
    onChangeUsername,
    onChangeCurrency,
    fieldErrors,
  } = props;
  const { t } = useTranslation();
  const { canEdit } = useProfile();

  return (
    <Card offset="24" className={classNames('', {}, [className, getVstack({ gap: 24, align: 'center' })])}>
      <Avatar
        size={100}
        readonly={canEdit ? readonly : true}
        src={data?.avatar}
        alt={t('Profile avatar')}
        onChangeAvatar={onChangeAvatar}
      />
      <HStack gap="16">
        {canEdit && (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>
            {readonly ? (
              <Button
                data-testid="ProfileCard.EditButton"
                onClick={onEdit}
                variant="primary"
              >
                {t('Edit')}
              </Button>
            ) : (
              <>
                <Button
                  data-testid="ProfileCard.CancelButton"
                  onClick={onCancelEdit}
                  variant="outline-red"
                >
                  {t('Cancel')}
                </Button>
                <Button
                  data-testid="ProfileCard.SaveButton"
                  onClick={onSave}
                  variant="primary"
                >
                  {t('Save')}
                </Button>
              </>
            )}
          </>
        )}
      </HStack>
      <div className={cl.data}>
        <Input
          background="light"
          variant="outlined"
          onChange={onChangeFirstname}
          readonly={canEdit ? readonly : true}
          placeholder={t('Your name')}
          value={data?.firstname}
          error={fieldErrors?.firstname}
          data-testid="ProfileCard.firstname"
        />
        <Input
          background="light"
          variant="outlined"
          onChange={onChangeLastname}
          readonly={canEdit ? readonly : true}
          placeholder={t('Your lastname')}
          value={data?.lastname}
          error={fieldErrors?.lastname}
          data-testid="ProfileCard.lastname"
        />
        <Input
          background="light"
          variant="outlined"
          onChange={onChangeAge}
          readonly={canEdit ? readonly : true}
          placeholder={t('Your age')}
          value={data?.age?.toString()}
        />
        <Input
          background="light"
          variant="outlined"
          onChange={onChangeCity}
          readonly={canEdit ? readonly : true}
          placeholder={t('Your city')}
          value={data?.city}
          error={fieldErrors?.city}
        />
        <CurrencySelect
          background="light"
          readonly={canEdit ? readonly : true}
          onChange={onChangeCurrency}
          currValue={data?.currency}
        />
        <CountrySelect
          background="light"
          readonly={canEdit ? readonly : true}
          onChange={onChangeCountry}
          currValue={data?.country}
        />
        <Input
          background="light"
          variant="outlined"
          onChange={onChangeUsername}
          readonly={canEdit ? readonly : true}
          placeholder={t('Your username')}
          value={data?.username}
          error={fieldErrors?.username}
        />
      </div>
    </Card>
  );
});
