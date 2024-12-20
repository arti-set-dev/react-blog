import { Profile } from 'entitie/Profile';
import { ValidateProfileError } from '../../consts/consts';

export const validateProfileData = (profile?: Profile) => {
  if (!profile) {
    return [ValidateProfileError.NO_DATA];
  }

  const {
    age, avatar, city, country, currency, firstname, lastname, username,
  } = profile;

  const errors: ValidateProfileError[] = [];

  if (!firstname) {
    errors.push(ValidateProfileError.NO_DATA_USER_FIRSTNAME);
  }

  if (!lastname) {
    errors.push(ValidateProfileError.NO_DATA_USER_LASTNAME);
  }

  if (age === 0) {
    errors.push(ValidateProfileError.INCORRECT_AGE);
  }

  if (!currency) {
    errors.push(ValidateProfileError.INCORRECT_CURRENCY);
  }

  if (!country) {
    errors.push(ValidateProfileError.INCORRECT_COUNTRY);
  }

  if (!city) {
    errors.push(ValidateProfileError.INCORRECT_CITY);
  }

  if (username && username?.length > 10) {
    errors.push(ValidateProfileError.LONG_USERNAME);
  }

  return errors;
};
