import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ToggleFeatures } from '@/shared/lib/features';
import { Tabs } from '@/shared/ui/redesigned/Tabs/Tabs';
import { TabItem, Tabs as TabsDeprecated } from '@/shared/ui/deprecated/Tabs';
import { ArticleType } from '@/entities/Article';
import { FlexDirection } from '@/shared/ui/redesigned/Stack/Flex/Flex';

interface ArticleTypeTabsProps {
  className?: string;
  value: ArticleType;
  direction?: FlexDirection;
  onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
  const {
    className, value, direction = 'column', onChangeType,
  } = props;
  const { t } = useTranslation('article');

  const typeTabs = useMemo<TabItem[]>(
    () => [
      {
        value: ArticleType.ALL,
        content: t('All'),
      },
      {
        value: ArticleType.ECONOMICS,
        content: t('Economics'),
      },
      {
        value: ArticleType.IT,
        content: t('it'),
      },
      {
        value: ArticleType.SCIENCE,
        content: t('Science'),
      },
      {
        value: ArticleType.POLITICS,
        content: t('Politics'),
      },
    ],
    [t],
  );

  const onTabClick = useCallback(
    (tab: TabItem) => {
      onChangeType(tab.value as ArticleType);
    },
    [onChangeType],
  );

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={(
        <Tabs direction={direction} tabs={typeTabs} value={value} onTabClick={onTabClick} />
      )}
      off={(
        <TabsDeprecated tabs={typeTabs} value={value} onTabClick={onTabClick} />
      )}
    />
  );
});
