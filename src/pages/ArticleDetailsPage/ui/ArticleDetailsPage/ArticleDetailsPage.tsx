import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { AdditionalInfoContainer } from '../AdditionalInfoContainer/AdditionalInfoContainer';
import { DetailsContainer } from '../DetailsContainer/DetailsContainer';
import { StickyContentLayout } from '@/shared/layouts/SticlyContentLayout';
import { ArticleRating } from '@/features/articleRating';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';
import { ArticleDetails } from '@/entities/Article';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from '@/widgets/Page';
import { articleDetailsPageReducer } from '../../model/slices';
import { ArticleDetailsPageComments } from '../ArticleDetailsPageComments/ArticleDetailsPageComments';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import cl from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducerList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const { className } = props;
  const { t } = useTranslation('article-details');
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <Text size={TextSize.L}>{t('article id is not defined')}</Text>;
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <ToggleFeatures
        feature="isAppRedesigned"
        on={(
          <StickyContentLayout
            content={(
              <Page className={classNames(cl.ArticleDetailsPage, {}, [className])}>
                <DetailsContainer />
                <ArticleRating articleId={id} />
                <ArticleRecommendationsList />
                <ArticleDetailsPageComments id={id} />
              </Page>
            )}
            right={<AdditionalInfoContainer />}
          />
        )}
        off={(
          <Page className={classNames(cl.ArticleDetailsPage, {}, [className])}>
            <ArticleDetailsPageHeader />
            <ArticleDetails id={id} />
            <ArticleRating articleId={id} />
            <ArticleRecommendationsList />
            <ArticleDetailsPageComments id={id} />
          </Page>
        )}
      />
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
