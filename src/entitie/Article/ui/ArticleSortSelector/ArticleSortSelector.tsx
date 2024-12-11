import { memo, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Select, SelectOptions } from 'shared/ui/Select/Select';
import { ArticleSortField } from 'entitie/Article/model/types/article';
import { SortOrder } from 'shared/types';
import cl from './ArticleSortSelector.module.scss';

interface ArticleSortSelectorProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortField) => void;

}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
  const {
    className, sort, order, onChangeOrder, onChangeSort,
  } = props;
  const { t } = useTranslation();

  const orderOptions = useMemo<SelectOptions<SortOrder>[]>(() => [
    {
      value: 'asc',
      content: t('revival'),
    },
    {
      value: 'desc',
      content: t('descending'),
    },
  ], [t]);

  const sortFieldOptions = useMemo<SelectOptions<ArticleSortField>[]>(() => [
    {
      value: ArticleSortField.CREATED,
      content: t('The date of creation'),
    },
    {
      value: ArticleSortField.TITLE,
      content: t('name'),
    },
    {
      value: ArticleSortField.CREATED,
      content: t('Views'),
    },
  ], [t]);

  return (
    <div className={classNames(cl.ArticleSortSelector, {}, [className])}>
      <Select currValue={sort} onChange={onChangeSort} options={sortFieldOptions} label={t('Sort by')} />
      <Select currValue={order} onChange={onChangeOrder} options={orderOptions} label={t('by')} />
    </div>
  );
});
