import { useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  ArticleDetailsRedesigned,
} from './ArticleDetailsRedesigned/ArticleDetailsRedesigned';
import { ToggleFeatures } from '@/shared/lib/features';
import {
  ArticleDetailsDeprecated,
} from './ArticleDetailsDeprecated/ArticleDetailsDeprecated';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice/articleDetailsSlice';
import {
  DynamicModuleLoader,
  ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import {
  getArticleDetailsError,
  getArticleDetailsData,
  getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails/articleDetails';

export interface ArticleDetailsProps {
  className?: string;
  id?: string;
}

const reducers: ReducerList = {
  articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const { className, id } = props;
  const { t } = useTranslation('article-details');
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const error = useSelector(getArticleDetailsError);
  const article = useSelector(getArticleDetailsData);

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchArticleById(id));
    }
  }, [dispatch, id]);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <ToggleFeatures
        feature="isAppRedesigned"
        on={(
          <ArticleDetailsRedesigned article={article} id={id} error={error} isLoading={isLoading} />
        )}
        off={
          <ArticleDetailsDeprecated article={article} id={id} error={error} isLoading={isLoading} />
        }
      />
    </DynamicModuleLoader>
  );
});
