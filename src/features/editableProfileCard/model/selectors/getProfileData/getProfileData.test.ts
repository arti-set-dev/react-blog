import { StateSchema } from 'app/providers/StoreProvider';
import { Country } from 'entitie/Country';
import { Currency } from 'entitie/Currency';
import { getProfileData } from './getProfileData';

describe('getProfileData.test', () => {
  test('should return filled fields', () => {
    const data = {
      username: 'admin',
      age: 22,
      country: Country.Germany,
      city: 'New York',
      currency: Currency.EUR,
      firstname: 'Firstname',
      lastname: 'Lastname',
    };
    const state: DeepPartial<StateSchema> = {
      profile: {
        data,
      },
    };
    expect(getProfileData(state as StateSchema)).toEqual(data);
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileData(state as StateSchema)).toEqual(undefined);
  });
});
