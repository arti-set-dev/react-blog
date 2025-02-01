import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';
import { ArticleViewSwitcher } from '@/features/ArticleViewSwitcher';

interface ViewSwitcherContainerProps {
  className?: string;
}

export const ViewSwitcherContainer = memo((props: ViewSwitcherContainerProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const { view, onChangeView } = useArticleFilters();

  return (
    <ArticleViewSwitcher className={className} view={view} onViewClick={onChangeView} />
  );
});
