import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ProfileCardProps } from '../ProfileCard/ProfileCard';
import { useProfile } from '../../lib/hooks/useProfile';
import { CountrySelect } from '@/entities/Country';
import { CurrencySelect } from '@/entities/Currency';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Input } from '@/shared/ui/deprecated/Input';
import {
  Text, TextSize, TextTheme, TextWeight,
} from '@/shared/ui/deprecated/Text';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Loader, LoaderOffset } from '@/shared/ui/deprecated/Loader';
import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './ProfileCardDeprecated.module.scss';
import { Container } from '@/shared/ui/redesigned/Container';

export const ProfileCardLoaderDeprecated = () => (
  <div className={classNames(cl.ProfileCardDeprecated, {}, [])}>
    <div className={classNames(cl.data, {}, [cl.isLoading])}>
      <Loader offset={LoaderOffset.L} />
    </div>
  </div>
);

export const ProfileCardErrorDeprecated = () => {
  const { t } = useTranslation('profile');

  return (
    <div className={classNames(cl.ProfileCardDeprecated, {}, [])}>
      <HStack justify="between">
        <Text
          size={TextSize.XL}
          theme={TextTheme.PRIMARY}
          weight={TextWeight.BOLD}
        >
          {t('Profile')}
        </Text>
      </HStack>
      <div className={classNames(cl.data, {}, [cl.isError])}>
        <Text theme={TextTheme.ERROR} size={TextSize.L}>
          {t('Profile error')}
        </Text>
      </div>
    </div>
  );
};

export const ProfileCardDeprecated = memo((props: ProfileCardProps) => {
  const {
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
    className,
  } = props;
  const { t } = useTranslation();
  const { canEdit } = useProfile();

  return (
    <div className={classNames(cl.ProfileCardDeprecated, {}, [className])}>
      <Container>
        <HStack justify="between">
          <Text
            size={TextSize.XL}
            theme={TextTheme.PRIMARY}
            weight={TextWeight.BOLD}
          >
            {t('Profile')}
          </Text>
          {canEdit && (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <>
              {readonly ? (
                <Button
                  data-testid="ProfileCard.EditButton"
                  onClick={onEdit}
                  theme={ButtonTheme.PRIMARY}
                >
                  {t('Edit')}
                </Button>
              ) : (
                <HStack gap="16">
                  <Button
                    data-testid="ProfileCard.CancelButton"
                    onClick={onCancelEdit}
                    theme={ButtonTheme.OUTLINE_RED}
                  >
                    {t('Cancel')}
                  </Button>
                  <Button
                    data-testid="ProfileCard.SaveButton"
                    onClick={onSave}
                    theme={ButtonTheme.PRIMARY}
                  >
                    {t('Save')}
                  </Button>
                </HStack>
              )}
            </>
          )}
        </HStack>
        {data?.avatar && (
          <VStack align="center" className={cl.AvatarWrapper}>
            <Avatar size={180} src={data.avatar} alt={t('Profile avatar')} />
          </VStack>
        )}
        <div className={cl.data}>
          <Input
            onChange={onChangeFirstname}
            readonly={readonly}
            placeholder={t('Your name')}
            value={data?.firstname}
            error={fieldErrors?.firstname}
            data-testid="ProfileCard.firstname"
          />
          <Input
            onChange={onChangeLastname}
            readonly={readonly}
            placeholder={t('Your lastname')}
            value={data?.lastname}
            error={fieldErrors?.lastname}
            data-testid="ProfileCard.lastname"
          />
          <Input
            onChange={onChangeAge}
            readonly={readonly}
            placeholder={t('Your age')}
            value={data?.age?.toString()}
          />
          <Input
            onChange={onChangeCity}
            readonly={readonly}
            placeholder={t('Your city')}
            value={data?.city}
            error={fieldErrors?.city}
          />
          <CurrencySelect
            readonly={readonly}
            onChange={onChangeCurrency}
            currValue={data?.currency}
          />
          <CountrySelect
            readonly={readonly}
            onChange={onChangeCountry}
            currValue={data?.country}
          />
          <Input
            onChange={onChangeUsername}
            readonly={readonly}
            placeholder={t('Your username')}
            value={data?.username}
            error={fieldErrors?.username}
          />
          <Input
            onChange={onChangeAvatar}
            readonly={readonly}
            placeholder={t('Your avatar')}
            value={data?.avatar}
          />
        </div>
      </Container>
    </div>
  );
});
