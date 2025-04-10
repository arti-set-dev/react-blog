import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { getAllFeatureFlags } from '../lib/setGetFeatures';

interface UpdateFeatureFlagOptions {
    userId: string;
    newFeatures: Partial<FeatureFlags>;
}

export const updateFeatureFlag = createAsyncThunk<
    void,
    UpdateFeatureFlagOptions,
    ThunkConfig<string>
>('user/updateFeatureFlag', async ({ userId, newFeatures }, thunkApi) => {
  const { rejectWithValue, extra } = thunkApi;

  try {
    await extra.api.patch(`/users/${userId}`, {
      features: {
        ...getAllFeatureFlags(),
        ...newFeatures,
      },
    });

    window.location.reload();
    return undefined;
  } catch (e) {
    console.log(e);
    return rejectWithValue('');
  }
});
