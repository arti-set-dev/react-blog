/* eslint-disable max-len */
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import {
  Article, ArticleList, ArticleView, ArticleViewSwither,
} from 'entitie/Article';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useSelector } from 'react-redux';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { getArticlesPageIsError, getArticlesPageIsLoading, getArticlesPageIsView } from '../../model/selectors/articlesPageSelectors';
import { articlesPageActions, articlesPageReducer, getArticles } from '../../model/slices/articlesPageSlice';
import cl from './ArticlesPage.module.scss';

interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducerList = {
  articlesPage: articlesPageReducer,
};

const ArticlesPage = (props: ArticlesPageProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const error = useSelector(getArticlesPageIsError);
  const view = useSelector(getArticlesPageIsView);

  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(articlesPageActions.setView(view));
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(fetchArticlesList());
    dispatch(articlesPageActions.initState());
  });

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(cl.ArticlesPage, {}, [className])}>
        <ArticleViewSwither view={view} onViewClick={onChangeView} />
        <ArticleList view={view} isLoading={isLoading} articles={articles} />
      </div>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
