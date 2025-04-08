import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article } from '../../types/article';

export const updateViewsArticle = createAsyncThunk<
  number,
  string,
  ThunkConfig<string>
>('article/updateViewsArticle', async (articleId, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;

  try {
    const response = await extra.api.get<Article>(`/posts/${articleId}`);

    if (!response.data || Object.keys(response.data).length === 0) {
      throw new Error('Article not found or empty');
    }

    const article = response.data;

    const updatedViews = article.views + 1;

    const patchResponse = await extra.api.patch<{ views: number }>(
      `/posts/${articleId}`,
      { views: updatedViews },
    );

    if (!patchResponse.data) {
      throw new Error();
    }

    return patchResponse.data.views;
  } catch (error) {
    console.log(error);
    return rejectWithValue('error');
  }
});
