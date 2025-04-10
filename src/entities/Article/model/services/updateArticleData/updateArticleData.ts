import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article } from '../../types/article';
import { getArticleDetailsForm } from '../../selectors/articleDetails/articleDetails';

export const updateArticleData = createAsyncThunk<
  Article,
  FormData,
  ThunkConfig<string>
>(
  'article/updateArticleData',
  async (formData, thunkAPI) => {
    const { extra, rejectWithValue, getState } = thunkAPI;

    const article = getArticleDetailsForm(getState());

    if (!article?.id) {
      return rejectWithValue('Failed to update article');
    }

    try {
      const response = await extra.api.patch<Article>(`/posts/${article.id}`, formData);

      if (!response.data) {
        throw new Error('No data returned');
      }

      console.log(response);

      return response.data;
    } catch (error) {
      console.error('Error updating article:', error);
      return rejectWithValue('Failed to update article');
    }
  },
);
