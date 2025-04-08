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
    const profileFormData = new FormData();

    profileFormData.append('username', formData?.username || '');
    profileFormData.append('firstname', formData?.firstname || '');
    profileFormData.append('lastname', formData?.lastname || '');
    profileFormData.append('age', formData?.age?.toString() || '');
    profileFormData.append('city', formData?.city || '');
    profileFormData.append('country', formData?.country || '');
    profileFormData.append('currency', formData?.currency || '');

    if (file) {
      profileFormData.append('avatar', file);
    }

    const response = await extra.api.patch<Profile>(
      `/profiles/${formData?.id}`,
      profileFormData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
