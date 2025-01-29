import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Input } from '@/shared/ui/deprecated/Input';
import { HStack, VStack } from '@/shared/ui/deprecated/Stack';
import {
  Text, TextSize, TextTheme, TextWeight,
} from '@/shared/ui/deprecated/Text';
import { Loader, LoaderOffset } from '@/shared/ui/deprecated/Loader';
import { ValidateFields } from '@/shared/types/validation';
import { Country, CountrySelect } from '@/entities/Country';
import { Currency, CurrencySelect } from '@/entities/Currency';
import { getUserAuthData } from '@/entities/User';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Profile } from '../../model/types/profile';
import cl from './ProfileCard.module.scss';

interface ProfileCardProps {
  className?: string;
  data?: Profile;
  error?: string;
  isLoading?: boolean;
  readonly?: boolean;
  onEdit?: () => void;
  onCancelEdit?: () => void;
  onSave?: () => void;
  onChangeFirstname?: (value?: string) => void;
  onChangeLastname?: (value?: string) => void;
  onChangeCity?: (value?: string) => void;
  onChangeAge?: (value?: string) => void;
  onChangeCountry?: (country: Country) => void;
  onChangeCurrency?: (currency: Currency) => void;
  onChangeAvatar?: (value?: string) => void;
  onChangeUsername?: (value?: string) => void;
  fieldErrors?: ValidateFields;
}

export const ProfileCard = (props: ProfileCardProps) => {
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
  const { t } = useTranslation('profile');
  const authData = useSelector(getUserAuthData);
  const profileData = useSelector(getProfileData);
  const canEdit = authData?.id === profileData?.id;

  if (isLoading) {
    return (
      <div className={classNames(cl.ProfileCard, {}, [className])}>
        <div className={classNames(cl.data, {}, [cl.isLoading])}>
          <Loader offset={LoaderOffset.L} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={classNames(cl.ProfileCard, {}, [className])}>
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
  }

  return (
    <div className={classNames(cl.ProfileCard, {}, [className])}>
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
    </div>
  );
};
