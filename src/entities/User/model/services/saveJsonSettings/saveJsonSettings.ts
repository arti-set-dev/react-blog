import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { JsonSettings } from '../../types/jsonSettings';
import { getUserAuthData } from '../../selectors/getUserAuthData/getUserAuthData';
import { getJsonSettings } from '../../selectors/jsonSettings';

export const saveJsonSettings = createAsyncThunk<
  JsonSettings,
  JsonSettings,
  ThunkConfig<string>
>('user/saveJsonSettings', async (newJsonSettings, thunkAPI) => {
  const {
    rejectWithValue, getState, extra,
  } = thunkAPI;
  const userData = getUserAuthData(getState());
  const currentSettings = getJsonSettings(getState());

  if (!userData) {
    return rejectWithValue('');
  }

  try {
    const response = await extra.api.patch(`/users/${userData.id}`, {
      jsonSettings: {
        ...currentSettings,
        ...newJsonSettings,
      },
    });

    if (!response.data.jsonSettings) {
      return rejectWithValue('Error while saving json settings');
    }

    return response.data.jsonSettings;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Error while saving json settings');
  }
});
