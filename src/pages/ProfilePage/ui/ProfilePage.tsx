/* eslint-disable i18next/no-literal-string */
import { data } from '@remix-run/router';
import { Country } from 'entitie/Country';
import { Currency } from 'entitie/Currency';
import {
  getProfileData,
  getProfileError,
  getProfileForm,
  getProfileIsLoading,
  getProfileRedonly,
  getProfileValidateErrors, profileActions, ProfileCard, profileReducer, updateProfileData, ValidateProfileError,
} from 'entitie/Profile';
import { fetchProfileData } from 'entitie/Profile/model/services/fetchProfileData/fetchProfileData';
import { ValidateFields } from 'entitie/Profile/model/types/profile';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Page } from 'shared/ui/Page/Page';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import cl from './ProfilePage.module.scss';

const reducers: ReducerList = {
  profile: profileReducer,
};

const ProfilePage = () => {
  const { t } = useTranslation('profile');
  const dispatch = useAppDispatch();
  const formData = useSelector(getProfileForm);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);
  const readonly = useSelector(getProfileRedonly);
  const validateErrors = useSelector(getProfileValidateErrors);
  const { id } = useParams<{id: string}>();
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
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={cl.ProfilePage}>
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
      </Page>
    </DynamicModuleLoader>
  );
};

export default ProfilePage;
