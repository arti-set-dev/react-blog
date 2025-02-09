import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Listbox } from '@/shared/ui/redesigned/Popups';
import { Text } from '@/shared/ui/redesigned/Text';
import { ToggleFeatures } from '@/shared/lib/features';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Select, SelectOptions } from '@/shared/ui/deprecated/Select';
import { ArticleSortField } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SortOrder } from '@/shared/types/SortOrder';
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

  const orderOptions = useMemo<SelectOptions<SortOrder>[]>(
    () => [
      {
        value: 'asc',
        content: t('revival'),
      },
      {
        value: 'desc',
        content: t('descending'),
      },
    ],
    [t],
  );

  const sortFieldOptions = useMemo<SelectOptions<ArticleSortField>[]>(
    () => [
      {
        value: ArticleSortField.CREATED,
        content: t('The date of creation'),
      },
      {
        value: ArticleSortField.TITLE,
        content: t('name'),
      },
      {
        value: ArticleSortField.VIEWS,
        content: t('Views'),
      },
    ],
    [t],
  );

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={(
        <VStack gap="4" className={classNames(cl.ArticleSortSelector, {}, [className])}>
          <Text size="m">{t('Sort by')}</Text>
          <Listbox
            value={sort}
            onChange={onChangeSort}
            items={sortFieldOptions}
          />
          <Listbox
            value={order}
            onChange={onChangeOrder}
            items={orderOptions}
          />
        </VStack>
      )}
      off={(
        <div className={classNames(cl.ArticleSortSelector, {}, [className])}>
          <Select
            currValue={sort}
            onChange={onChangeSort}
            options={sortFieldOptions}
            label={t('Sort by')}
          />
          <Select
            currValue={order}
            onChange={onChangeOrder}
            options={orderOptions}
            label={t('by')}
          />
        </div>
      )}
    />
  );
});
