import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { AdditionalInfoContainer } from '../AdditionalInfoContainer/AdditionalInfoContainer';
import { DetailsContainer } from '../DetailsContainer/DetailsContainer';
import { StickyContentLayout } from '@/shared/layouts/SticlyContentLayout';
import { ArticleRating } from '@/features/articleRating';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';
import {
  ArticleDetails,
  articleDetailsRecommendationsReducer,
} from '@/entities/Article';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from '@/widgets/Page';
import { ArticleDetailsPageComments } from '../ArticleDetailsPageComments/ArticleDetailsPageComments';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import cl from './ArticleDetailsPage.module.scss';
import { Button } from '@/shared/ui/redesigned/Button';
import { getRouteArticles } from '@/shared/const/router';
import { commentsReducer } from '@/entities/Comment';
import { Container } from '@/shared/ui/redesigned/Container';
import { getVstack } from '@/shared/lib/stack/getVstack/getVstack';

interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducerList = {
  comments: commentsReducer,
  recommendations: articleDetailsRecommendationsReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const { className } = props;
  const { t } = useTranslation('article-details');
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  if (!id) {
    return <Text size={TextSize.L}>{t('article id is not defined')}</Text>;
  }

  const onBackToList = () => {
    navigate(getRouteArticles());
  };

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <ToggleFeatures
        feature="isAppRedesigned"
        on={(
          <StickyContentLayout
            left={<Button onClick={onBackToList} variant="outline">{t('Back')}</Button>}
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
            <Container max className={getVstack({ gap: 16 })}>
              <ArticleDetailsPageHeader />
              <ArticleDetails id={id} />
              <ArticleRating articleId={id} />
              <ArticleRecommendationsList />
              <ArticleDetailsPageComments id={id} />
            </Container>
          </Page>
        )}
      />
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
