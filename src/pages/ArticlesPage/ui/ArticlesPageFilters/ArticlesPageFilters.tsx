import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';
import { Input } from '@/shared/ui/deprecated/Input';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticleViewSwitcher } from '@/features/ArticleViewSwitcher';
import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './ArticlesPageFilters.module.scss';
import {
  getArticlesPageIsView,
} from '../../model/selectors/articlesPageSelectors';

interface ArticlesPageFiltersProps {
  className?: string;
}

export const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const view = useSelector(getArticlesPageIsView);
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
