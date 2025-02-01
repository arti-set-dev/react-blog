import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';
import { Input } from '@/shared/ui/redesigned/Input/Input';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types/SortOrder';
import { getVstack } from '@/shared/lib/stack/getVstack/getVstack';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import SearchIcon from '@/shared/assets/icons/search-icon.svg';
import { Card } from '@/shared/ui/redesigned/Card/Card';
import { classNames } from '@/shared/lib/classNames/classNames';

interface ArticlesFiltersProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  search: string;
  onChangeSearch: (value: string) => void;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
  type: ArticleType;
  onChangeType: (type: ArticleType) => void;
}

export const ArticlesFilters = memo((props: ArticlesFiltersProps) => {
  const {
    className, sort, onChangeSort, onChangeSearch, onChangeType, search, onChangeOrder, order, type,
  } = props;
  const { t } = useTranslation();

  return (
    <Card isOffset className={classNames('', {}, [className, getVstack({ gap: 24 })])}>
      <Input
        value={search}
        variant="outlined"
        onChange={onChangeSearch}
        placeholder={t('Search')}
        addon={<Icon width={20} height={20} Svg={SearchIcon} />}
      />
      <ArticleTypeTabs value={type} onChangeType={onChangeType} />
      <ArticleSortSelector
        onChangeOrder={onChangeOrder}
        onChangeSort={onChangeSort}
        order={order}
        sort={sort}
      />
    </Card>
  );
});
