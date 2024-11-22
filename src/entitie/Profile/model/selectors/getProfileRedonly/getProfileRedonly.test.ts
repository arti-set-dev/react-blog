import { StateSchema } from 'app/providers/StoreProvider';
import { Country } from 'entitie/Country';
import { Currency } from 'entitie/Currency';
import { getProfileRedonly } from './getProfileRedonly';

describe('getProfileRedonly.test', () => {
  test('should return profile readonly', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        readonly: true,
      },
    };
    expect(getProfileRedonly(state as StateSchema)).toEqual(true);
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileRedonly(state as StateSchema)).toEqual(undefined);
  });
});
