import {
  ProfileCardLoaderDeprecated,
  ProfileCardErrorDeprecated, ProfileCardDeprecated,
} from '../ProfileCardDeprecated/ProfileCardDeprecated';
import {
  ProfileCardLoaderRedesigned,
  ProfileCardErrorRedesigned, ProfileCardRedesigned,
} from '../ProfileCardRedesigned/ProfileCardRedesigned';
import { ToggleFeatures } from '@/shared/lib/features';
import { ValidateFields } from '@/shared/types/validation';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { Profile } from '../../model/types/profile';

export interface ProfileCardProps {
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
    error,
    isLoading,
  } = props;

  if (isLoading) {
    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <ProfileCardLoaderRedesigned />
        }
        off={
          <ProfileCardLoaderDeprecated />
        }
      />
    );
  }

  if (error) {
    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <ProfileCardErrorRedesigned />
        }
        off={
          <ProfileCardErrorDeprecated />
        }
      />
    );
  }

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <ProfileCardRedesigned {...props} />
      }
      off={
        <ProfileCardDeprecated {...props} />
      }
    />
  );
};
