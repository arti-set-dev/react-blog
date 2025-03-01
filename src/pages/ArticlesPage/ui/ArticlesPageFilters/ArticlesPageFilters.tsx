import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Input } from '@/shared/ui/deprecated/Input';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticleViewSwitcher } from '@/features/ArticleViewSwitcher';
import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './ArticlesPageFilters.module.scss';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  articleListActions,
  ArticleSortField,
  ArticleType,
  ArticleView,
  fetchArticlesList,
  getArticlesListOrder,
  getArticlesListSearch,
  getArticlesListSort,
  getArticlesListType,
  getArticlesListView,
} from '@/entities/Article';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { SortOrder } from '@/shared/types/SortOrder';

interface ArticlesPageFiltersProps {
  className?: string;
}

export const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const sort = useSelector(getArticlesListSort);
  const order = useSelector(getArticlesListOrder);
  const search = useSelector(getArticlesListSearch);
  const type = useSelector(getArticlesListType);
  const view = useSelector(getArticlesListView);

  const fetchData = useCallback(() => {
    dispatch(fetchArticlesList({ replace: true }));
  }, [dispatch]);

  const debouncedFetchData = useDebounce(fetchData, 500);

  const onChangeOrder = useCallback(
    (newOrder: SortOrder) => {
      dispatch(articleListActions.setOrder(newOrder));
      dispatch(articleListActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData],
  );

  const onChangeSort = useCallback(
    (newSort: ArticleSortField) => {
      dispatch(articleListActions.setSort(newSort));
      dispatch(articleListActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData],
  );

  const onChangeSearch = useCallback(
    (search: string) => {
      dispatch(articleListActions.setSearch(search));
      dispatch(articleListActions.setPage(1));
      debouncedFetchData();
    },
    [debouncedFetchData, dispatch],
  );

  const onChangeType = useCallback(
    (value: ArticleType) => {
      dispatch(articleListActions.setType(value));
      dispatch(articleListActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData],
  );

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articleListActions.setView(view));
    },
    [dispatch],
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
