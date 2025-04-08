/* eslint-disable max-len */
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { FiltersContainer } from '../FiltersContainer/FiltersContainer';
import { ViewSwitcherContainer } from '../ViewSwitherContainer/ViewSwitcherContainer';
import { StickyContentLayout } from '@/shared/layouts/SticlyContentLayout';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/deprecated/Text';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Page } from '@/widgets/Page';
import cl from './ArticlesPage.module.scss';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import { ArticleListContainer } from '../ArticleListContainer/ArticleListContainer';
import { articleListReducer, getArticlesListError } from '@/entities/Article';
import { fetchNextArticlesPage } from '@/features/fetchNextArticlePage';

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducerList = {
  articlesList: articleListReducer,
};

const ArticlesPage = (props: ArticlesPageProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const error = useSelector(getArticlesListError);

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
              <ArticleListContainer />
              {error && <Text>{t('Data boot error')}</Text>}
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
          <ArticleListContainer />
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
