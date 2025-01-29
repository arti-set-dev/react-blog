import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Input } from '@/shared/ui/deprecated/Input';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticleViewSwitcher } from '@/features/ArticleViewSwitcher';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleView, ArticleSortField, ArticleType } from '@/entities/Article';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { SortOrder } from '@/shared/types/SortOrder';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import cl from './ArticlesPageFilters.module.scss';
import { articlesPageActions } from '../../model/slices/articlesPageSlice';
import {
  getArticlesPageIsOrder,
  getArticlesPageIsSearch,
  getArticlesPageIsSort,
  getArticlesPageIsType,
  getArticlesPageIsView,
} from '../../model/selectors/articlesPageSelectors';

interface ArticlesPageFiltersProps {
  className?: string;
}

export const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const view = useSelector(getArticlesPageIsView);
  const dispatch = useAppDispatch();
  const sort = useSelector(getArticlesPageIsSort);
  const order = useSelector(getArticlesPageIsOrder);
  const search = useSelector(getArticlesPageIsSearch);
  const type = useSelector(getArticlesPageIsType);

  const fetchData = useCallback(() => {
    dispatch(fetchArticlesList({ replace: true }));
  }, [dispatch]);

  const debouncedFetchData = useDebounce(fetchData, 500);

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlesPageActions.setView(view));
    },
    [dispatch],
  );

  const onChangeOrder = useCallback(
    (newOrder: SortOrder) => {
      dispatch(articlesPageActions.setOrder(newOrder));
      dispatch(articlesPageActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData],
  );

  const onChangeSort = useCallback(
    (newSort: ArticleSortField) => {
      dispatch(articlesPageActions.setSort(newSort));
      dispatch(articlesPageActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData],
  );

  const onChangeSearch = useCallback(
    (search: string) => {
      dispatch(articlesPageActions.setSearch(search));
      dispatch(articlesPageActions.setPage(1));
      debouncedFetchData();
    },
    [debouncedFetchData, dispatch],
  );

  const onChangeType = useCallback(
    (value: ArticleType) => {
      dispatch(articlesPageActions.setType(value));
      dispatch(articlesPageActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData],
  );

  return (
    <div className={classNames(cl.ArticlesPageFilters, {}, [className])}>
      <div className={cl.Wrapper}>
        <ArticleSortSelector
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
          order={order}
          sort={sort}
        />
        <ArticleViewSwitcher view={view} onViewClick={onChangeView} />
      </div>
      <ArticleTypeTabs value={type} onChangeType={onChangeType} />
      <Input
        value={search}
        onChange={onChangeSearch}
        className={cl.Search}
        placeholder={t('Search')}
      />
    </div>
  );
});
