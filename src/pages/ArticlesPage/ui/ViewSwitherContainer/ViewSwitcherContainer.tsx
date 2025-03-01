import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ArticleViewSwitcher } from '@/features/ArticleViewSwitcher';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { articleListActions, ArticleView, getArticlesListView } from '@/entities/Article';

interface ViewSwitcherContainerProps {
  className?: string;
}

export const ViewSwitcherContainer = memo((props: ViewSwitcherContainerProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const view = useSelector(getArticlesListView);

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articleListActions.setView(view));
    },
    [dispatch],
  );

  return (
    <ArticleViewSwitcher className={className} view={view} onViewClick={onChangeView} />
  );
});
