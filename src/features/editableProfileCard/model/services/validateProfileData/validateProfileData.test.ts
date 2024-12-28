import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { ValidateProfileError } from '../../consts/consts';
import { validateProfileData } from './validateProfileData';

const data = {
  username: 'admin',
  age: 22,
  country: Country.Germany,
  city: 'New York',
  currency: Currency.EUR,
  firstname: 'Firstname',
  lastname: 'Lastname',
};

describe('validateProfileData.test', () => {
  test('succes', async () => {
    const result = validateProfileData(data);

    expect(result).toEqual([]);
  });

  test('without required fields', async () => {
    const result = validateProfileData({
      ...data, firstname: '', lastname: '', city: '',
    });

    expect(result).toEqual([
      ValidateProfileError.NO_DATA_USER_FIRSTNAME,
      ValidateProfileError.NO_DATA_USER_LASTNAME,
      ValidateProfileError.INCORRECT_CITY,
    ]);
  });

  test('username too long', async () => {
    const result = validateProfileData({ ...data, username: 'qwertyuiopa' });

    expect(result).toEqual([
      ValidateProfileError.LONG_USERNAME,
    ]);
  });

  test('incorrect country', async () => {
    const result = validateProfileData({ ...data, country: undefined });

    expect(result).toEqual([
      ValidateProfileError.INCORRECT_COUNTRY,
    ]);
  });
});
