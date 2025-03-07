import { ArticleView } from './model/consts/consts';
import {
  ArticleType,
  ArticleSortField,
  ArticleBlockType,
} from './model/types/articleType';
import { ArticleDetails } from './ui/ArticleDetails/ArticleDetails';
import type { Article } from './model/types/article';
import type { ArticleDetailsSchema } from './model/types/articleDetailsSchema';
import { ArticleList, ArticleListDisplay } from './ui/ArticleList/ArticleList';
import { getArticleDetailsData, getCanEditArticle } from './model/selectors/articleDetails/articleDetails';
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
import { articleDetailsRecommendationsReducer } from './model/slice/articleListSlice/ArticleRecommendationsSlice';
import { updateViewsArticle } from './model/services/updateViewsArticle/updateViewsArticle';

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
  articleDetailsRecommendationsReducer,
  updateViewsArticle,
};
