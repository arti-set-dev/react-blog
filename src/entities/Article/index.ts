import { ArticleView } from './model/consts/consts';
import {
  ArticleType,
  ArticleSortField,
  ArticleBlockType,
} from './model/types/articleType';
import { ArticleDetails } from './ui/ArticleDetails/ArticleDetails';
import type {
  Article, ArticleBlock, ArticleCodeBlock, ArticleImageBlock, ArticleTextBlock,
} from './model/types/article';
import type { ArticleDetailsSchema } from './model/types/articleDetailsSchema';
import { ArticleList, ArticleListDisplay } from './ui/ArticleList/ArticleList';
import {
  getArticleDetailsData, getArticleDetailsError, getArticleDetailsForm, getArticleDetailsIsLoading, getCanEditArticle,
} from './model/selectors/articleDetails/articleDetails';
import {
  getArticlesListError,
  getArticlesListIsHasMore,
  getArticlesListIsInited,
  getArticlesListIsLoading,
  getArticlesListLimit,
  getArticlesListOrder,
  getArticlesListSearch,
  getArticlesListSort,
  getArticlesListType,
  getArticlesListView,
  getArticlesListNum,
} from './model/selectors/articleList/articleList';
import { fetchArticlesList } from './model/services/fetchArticlesList/fetchArticlesList';
import { articleListActions, articleListReducer, getArticles } from './model/slice/articleListSlice/articleListSlice';
import type { ArticleRecommendationsSchema, ArticleListSchema } from './model/types/articleListSchema';
import { updateViewsArticle } from './model/services/updateViewsArticle/updateViewsArticle';
import { ArticleEditForm } from './ui/ArticleEditForm/ui/ArticleEditForm/ArticleEditForm';
import { validateBlock } from './lib/validation/validateArticleBlocks';
import { createEmptyBlock, createTextBlock } from './lib/createArticle/createArticleBlocks';
import { useArticle } from './lib/hooks/useArticle';
import { fetchArticleById } from './model/services/fetchArticleById/fetchArticleById';
import { articleDetailsActions, articleDetailsReducer } from './model/slice/articleDetailsSlice/articleDetailsSlice';
import { updateArticleData } from './model/services/updateArticleData/updateArticleData';
import { useUpdateArticleMutation } from './model/api/updateArticleData';
import { useDeleteArticle } from './model/api/deleteArticleApi/articleDeleteApi';

export {
  ArticleListDisplay,
  ArticleBlockType,
  ArticleDetails,
  articleListActions,
  articleListReducer,
  Article,
  ArticleDetailsSchema,
  ArticleView,
  ArticleList,
  ArticleSortField,
  ArticleType,
  fetchArticlesList,
  ArticleListSchema,
  getArticleDetailsData,
  getArticlesListIsLoading,
  getArticlesListError,
  getArticlesListView,
  getArticlesListLimit,
  getArticlesListIsHasMore,
  getArticlesListIsInited,
  getArticlesListOrder,
  getArticlesListSort,
  getArticlesListSearch,
  getArticlesListType,
  getArticlesListNum,
  getArticles,
  getCanEditArticle,
  ArticleRecommendationsSchema,
  updateViewsArticle,
  ArticleEditForm,
  ArticleCodeBlock,
  ArticleTextBlock,
  ArticleImageBlock,
  ArticleBlock,
  validateBlock,
  createEmptyBlock,
  createTextBlock,
  useArticle,
  fetchArticleById,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
  articleDetailsReducer,
  articleDetailsActions,
  updateArticleData,
  useUpdateArticleMutation,
  getArticleDetailsForm,
  useDeleteArticle,
};
