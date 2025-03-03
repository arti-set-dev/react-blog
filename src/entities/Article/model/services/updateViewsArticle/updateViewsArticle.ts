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
    const { data: article } = await extra.api.get<Article>(`/articles/${articleId}`);

    if (!article) {
      throw new Error('Article not found');
    }

    const updatedViews = article.views + 1;

    const response = await extra.api.patch<Article>(`/articles/${articleId}`, {
      views: updatedViews,
    });

    if (!response.data) {
      throw new Error();
    }

    return response.data.views;
  } catch (error) {
    console.log(error);
    return rejectWithValue('error');
  }
});
