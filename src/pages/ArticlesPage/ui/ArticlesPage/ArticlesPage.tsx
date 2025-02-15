/* eslint-disable max-len */
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { FiltersContainer } from '../FiltersContainer/FiltersContainer';
import { ViewSwitcherContainer } from '../ViewSwitherContainer/ViewSwitcherContainer';
import { StickyContentLayout } from '@/shared/layouts/SticlyContentLayout';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/deprecated/Text';
import { ArticlePageGreeting } from '@/features/articlePageGreeting';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Page } from '@/widgets/Page';
import { getArticlesPageIsError } from '../../model/selectors/articlesPageSelectors';
import { articlesPageReducer } from '../../model/slices/articlesPageSlice';
import cl from './ArticlesPage.module.scss';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlePage/fetchNextArticlePage';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducerList = {
  articlesPage: articlesPageReducer,
};

const ArticlesPage = (props: ArticlesPageProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const error = useSelector(getArticlesPageIsError);
  const [searchParams] = useSearchParams();

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  const content = (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={(
        <StickyContentLayout
          left={<ViewSwitcherContainer />}
          right={<FiltersContainer />}
          content={(
            <Page
              data-testid="ArticlesPage"
              onScrollEnd={onLoadNextPart}
            >
              <ArticleInfiniteList />
              {error && <Text>{t('Data boot error')}</Text>}
              <ArticlePageGreeting />
            </Page>
          )}
        />
      )}
      off={(
        <Page
          data-testid="ArticlesPage"
          onScrollEnd={onLoadNextPart}
          className={classNames(cl.ArticlesPage, {}, [className])}
        >
          <ArticlesPageFilters />
          <ArticleInfiniteList />
          {error && <Text>{t('Data boot error')}</Text>}
        </Page>
      )}
    />
  );

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      {content}
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
