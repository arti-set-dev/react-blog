import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article } from '../../types/article';
import { getArticleDetailsForm } from '../../selectors/articleDetails/articleDetails';

export const updateArticleData = createAsyncThunk<
  Article,
  void,
  ThunkConfig<string>
>(
  'article/updateArticleData',
  async (_, thunkAPI) => {
    const { extra, rejectWithValue, getState } = thunkAPI;

    const formData = getArticleDetailsForm(getState());

    try {
      const response = await extra.api.put<Article>(`/articles/${formData?.id}`, formData);

      if (!response.data) {
        throw new Error('No data returned');
      }

      return response.data;
    } catch (error) {
      console.error('Error updating article:', error);
      return rejectWithValue('Failed to update article');
    }
  },
);
