import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { ArticlesFilters } from '@/widgets/ArticlesFilters';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { SortOrder } from '@/shared/types/SortOrder';
import {
  articleListActions,
  ArticleSortField,
  ArticleType,
  fetchArticlesList,
  getArticlesListOrder,
  getArticlesListSearch,
  getArticlesListSort,
  getArticlesListType,
} from '@/entities/Article';

interface FiltersContainerProps {
  className?: string;
}

export const FiltersContainer = memo((props: FiltersContainerProps) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const sort = useSelector(getArticlesListSort);
  const order = useSelector(getArticlesListOrder);
  const search = useSelector(getArticlesListSearch);
  const type = useSelector(getArticlesListType);

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

  return (
    <ArticlesFilters
      sort={sort}
      order={order}
      search={search}
      type={type}
      onChangeOrder={onChangeOrder}
      onChangeSort={onChangeSort}
      onChangeSearch={onChangeSearch}
      onChangeType={onChangeType}
      className={className}
    />
  );
});
