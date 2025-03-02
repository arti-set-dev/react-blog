import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getArticleDetailsData } from '@/entities/Article';
import { Comment } from '../../..';
import { getUserAuthData } from '@/entities/User';
import { fetchComments } from '../fetchComments/fetchComments';

export const addComment = createAsyncThunk<
  Comment,
  string,
  ThunkConfig<string>
>('articleDetails/addComment', async (text, thunkAPI) => {
  const {
    extra, dispatch, rejectWithValue, getState,
  } = thunkAPI;

  const userData = getUserAuthData(getState());
  const article = getArticleDetailsData(getState());

  if (!userData || !text || !article?.id) {
    return rejectWithValue('no data');
  }

  try {
    const response = await extra.api.post<Comment>('comments', {
      articleId: article?.id,
      userId: userData.id,
      text,
    });

    if (!response.data) {
      throw new Error();
    }

    dispatch(fetchComments(article.id));

    return response.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('error');
  }
});
