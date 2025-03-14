import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';

import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { SortOrder } from '@/shared/types/SortOrder';
import { Article } from '../../types/article';
import { ArticleView } from '../../consts/consts';
import { ArticleSortField, ArticleType } from '../../types/articleType';
import { fetchArticlesList } from '../../services/fetchArticlesList/fetchArticlesList';
import { ArticleListSchema } from '../../types/articleListSchema';

const articlesAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
});

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
  (state) => state.articlesList || articlesAdapter.getInitialState(),
);

const articleListSlice = createSlice({
  name: 'articleListSlice',
  initialState: articlesAdapter.getInitialState<ArticleListSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    view: ArticleView.GRID,
    entities: {},
    page: 1,
    hasMore: true,
    limit: 15,
    _inited: false,
    sort: ArticleSortField.CREATED,
    order: 'asc',
    search: '',
    types: ArticleType.ALL,
  }),
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload;
      localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, action.payload);
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setOrder: (state, action: PayloadAction<SortOrder>) => {
      state.order = action.payload;
    },
    setSort: (state, action: PayloadAction<ArticleSortField>) => {
      state.sort = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setType: (state, action: PayloadAction<ArticleType>) => {
      state.types = action.payload;
    },
    initState: (state) => {
      const view = localStorage.getItem(
        ARTICLE_VIEW_LOCALSTORAGE_KEY,
      ) as ArticleView;
      state.view = view;
      state.limit = view === ArticleView.COLUMN ? 4 : 15;
      state._inited = true;
    },
    removeArticle: (state, action: PayloadAction<string>) => {
      articlesAdapter.removeOne(state, action.payload);
    },
    addArticle: (state, action: PayloadAction<Article>) => {
      articlesAdapter.addOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticlesList.pending, (state, action) => {
      state.error = undefined;
      state.isLoading = true;

      if (action.meta.arg.replace) {
        articlesAdapter.removeAll(state);
      }
    });
    builder.addCase(fetchArticlesList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchArticlesList.fulfilled, (state, action) => {
      state.isLoading = false;
      articlesAdapter.addMany(state, action.payload);
      state.hasMore = action.payload.length >= state.limit;

      if (action.meta.arg.replace) {
        articlesAdapter.setAll(state, action.payload);
      } else {
        articlesAdapter.addMany(state, action.payload);
      }
    });
  },
});

export const { reducer: articleListReducer, actions: articleListActions } = articleListSlice;
