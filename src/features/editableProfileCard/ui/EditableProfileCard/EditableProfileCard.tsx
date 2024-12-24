import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ProfileCard } from '@/entities/Profile';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ValidateProfileError } from '../../model/consts/consts';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import cl from './EditableProfileCard.module.scss';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { ValidateFields } from '../../model/types/editableProfileCardSchema';

interface EditableProfileCardProps {
    className?: string;
    id?: string;
}

const reducers: ReducerList = {
  profile: profileReducer,
};

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
  const { className, id } = props;
  const { t } = useTranslation('profile');
  const dispatch = useAppDispatch();
  const formData = useSelector(getProfileForm);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);
  const readonly = useSelector(getProfileReadonly);
  const validateErrors = useSelector(getProfileValidateErrors);
  const validateErrorTranslates = {
    [ValidateProfileError.NO_DATA_USER_FIRSTNAME]: t('The firstname field is required'),
    [ValidateProfileError.NO_DATA_USER_LASTNAME]: t('The lastname field is required'),
    [ValidateProfileError.INCORRECT_COUNTRY]: t('No country selected'),
    [ValidateProfileError.INCORRECT_CITY]: t('No city selected'),
    [ValidateProfileError.INCORRECT_CURRENCY]: t('No currency selected'),
    [ValidateProfileError.SERVER_ERROR]: t('Server error'),
    [ValidateProfileError.LONG_USERNAME]: t('Username too long'),
    [ValidateProfileError.NO_DATA]: t('Not enough data'),
  };

  const fieldErrors: ValidateFields = {
    firstname: validateErrors?.includes(ValidateProfileError.NO_DATA_USER_FIRSTNAME)
      ? validateErrorTranslates[ValidateProfileError.NO_DATA_USER_FIRSTNAME]
      : '',

    lastname: validateErrors?.includes(ValidateProfileError.NO_DATA_USER_LASTNAME)
      ? validateErrorTranslates[ValidateProfileError.NO_DATA_USER_LASTNAME]
      : '',

    city: validateErrors?.includes(ValidateProfileError.INCORRECT_CITY)
      ? validateErrorTranslates[ValidateProfileError.INCORRECT_CITY]
      : '',

    country: validateErrors?.includes(ValidateProfileError.INCORRECT_COUNTRY)
      ? validateErrorTranslates[ValidateProfileError.INCORRECT_COUNTRY]
      : '',

    currency: validateErrors?.includes(ValidateProfileError.INCORRECT_CURRENCY)
      ? validateErrorTranslates[ValidateProfileError.INCORRECT_CURRENCY]
      : '',
    username: validateErrors?.includes(ValidateProfileError.LONG_USERNAME)
      ? validateErrorTranslates[ValidateProfileError.LONG_USERNAME]
      : '',
  };

  useInitialEffect(() => {
    if (id) {
      dispatch(fetchProfileData(id));
    }
  });

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  const onSave = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  const onChangeFirstname = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ firstname: value || '' }));
  }, [dispatch]);

  const onChangeLastname = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ lastname: value || '' }));
  }, [dispatch]);

  const onChangeCity = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ city: value || '' }));
  }, [dispatch]);

  const onChangeAge = useCallback((value?: string) => {
    const onlyNumberValue = /^\d+$/;

    if (onlyNumberValue.test(value || '')) {
      dispatch(profileActions.updateProfile({ age: Number(value) }));
    }

    if (!value?.length) {
      dispatch(profileActions.updateProfile({ age: Number(0) }));
    }
  }, [dispatch]);

  const onChangeCountry = useCallback((country: Country) => {
    dispatch(profileActions.updateProfile({ country }));
  }, [dispatch]);

  const onChangeCurrency = useCallback((currency: Currency) => {
    dispatch(profileActions.updateProfile({ currency }));
  }, [dispatch]);

  const onChangeAvatar = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ avatar: value || '' }));
  }, [dispatch]);

  const onChangeUsername = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ username: value || '' }));
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames('', {}, [className])}>
        <ProfileCard
          data={formData}
          error={error}
          isLoading={isLoading}
          onCancelEdit={onCancelEdit}
          onChangeAge={onChangeAge}
          onChangeCity={onChangeCity}
          onChangeCountry={onChangeCountry}
          onChangeFirstname={onChangeFirstname}
          onChangeLastname={onChangeLastname}
          onChangeAvatar={onChangeAvatar}
          onChangeUsername={onChangeUsername}
          onChangeCurrency={onChangeCurrency}
          onEdit={onEdit}
          onSave={onSave}
          readonly={readonly}
          fieldErrors={fieldErrors}
        />
      </div>
    </DynamicModuleLoader>
  );
});
