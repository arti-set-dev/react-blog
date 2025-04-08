import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article } from '../../types/article';

export const fetchArticleById = createAsyncThunk<
  Article,
  string | undefined,
  ThunkConfig<string>
>('article/fetchArticleById', async (articleId, thunkAPI) => {
  const { extra, dispatch, rejectWithValue } = thunkAPI;

  if (!articleId) {
    return rejectWithValue('Invalid article ID');
  }

  try {
    const response = await extra.api.get<Article>(`/posts/${articleId}`, {
      params: {
        _expand: 'user',
      },
    });

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('error');
  }
});
