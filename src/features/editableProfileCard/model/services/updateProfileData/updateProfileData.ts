import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Profile } from '@/entities/Profile';
import { ValidateProfileError } from '../../consts/consts';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { validateProfileData } from '../validateProfileData/validateProfileData';

export const updateProfileData = createAsyncThunk<
  Profile,
  File | undefined,
  ThunkConfig<ValidateProfileError[]>
>('profile/updateProfileData', async (file, thunkAPI) => {
  const {
    extra, rejectWithValue, getState,
  } = thunkAPI;

  const formData = getProfileForm(getState());

  const errors = validateProfileData(formData);

  if (errors.length) {
    return rejectWithValue(errors);
  }

  try {
    const response = await extra.api.patch<Profile>(
      `/profile/${formData?.id}`,
      {
        username: formData?.username || '',
        firstname: formData?.firstname || '',
        lastname: formData?.lastname || '',
        age: formData?.age || 0,
        city: formData?.city || '',
        country: formData?.country || '',
        currency: formData?.currency || '',
        avatar: formData?.avatar || '',
      },
    );

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
  }
});
