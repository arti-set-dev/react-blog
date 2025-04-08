import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { getUserAuthData } from '@/entities/User';
import {
  useArticleRating,
  useRateArticle,
} from '../../model/api/articleRatingApi';
import { RatingCard } from '@/entities/Rating';
import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

export interface ArticleRatingProps {
  className?: string;
  articleId: number;
}

const ArticleRating = memo((props: ArticleRatingProps) => {
  const { className, articleId } = props;
  const { t } = useTranslation('article-details');
  const userData = useSelector(getUserAuthData);
  const { data, isLoading, error } = useArticleRating({
    articleId,
    userId: Number(userData?.id),
  });
  const [rateArticleMutation] = useRateArticle();

  const handleRateArticle = useCallback(
    (starsCount: number, feedback?: string) => {
      try {
        rateArticleMutation({
          userId: Number(userData?.id),
          articleId,
          rate: starsCount,
          feedback,
        });
      } catch (e) {
        console.log(e);
      }
    },
    [articleId, rateArticleMutation, userData?.id],
  );

  const onCancel = useCallback(
    (starsCount: number) => {
      handleRateArticle(starsCount);
    },
    [handleRateArticle],
  );

  const onAccept = useCallback(
    (starsCount: number, feedback?: string) => {
      handleRateArticle(starsCount, feedback);
    },
    [handleRateArticle],
  );

  if (isLoading) {
    return toggleFeatures({
      name: 'isAppRedesigned',
      on: () => <Skeleton width="100%" border="20" height={120} />,
      off: () => <SkeletonDeprecated width="100%" height={120} />,
    });
  }

  const rating = data?.[0];

  const ratingTitle = userData ? t('Rate this article') : t('Please login in to leave a review');

  return (
    <RatingCard
      isAuth={Boolean(userData?.id)}
      onAccept={onAccept}
      onCancel={onCancel}
      rate={rating?.rate}
      className={classNames('', {}, [className])}
      title={ratingTitle}
      feedbackTitle={t(
        'Leave your feedback on the article, it helps improve the quality',
      )}
      hasFeedback
    />
  );
});

export default ArticleRating;
