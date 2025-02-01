import { memo } from 'react';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';
import { ArticlesFilters } from '@/widgets/ArticlesFilters';

interface FiltersContainerProps {
  className?: string;
}

export const FiltersContainer = memo((props: FiltersContainerProps) => {
  const { className } = props;
  const {
    sort,
    order,
    search,
    type,
    onChangeView,
    onChangeOrder,
    onChangeSort,
    onChangeSearch,
    onChangeType,
  } = useArticleFilters();

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
