import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { getUserAuthData } from '@/entities/User';
import { useArticleRating, useRateArticle } from '@/features/articleRating/model/api/articleRatingApi';
import { RatingCard, Rating } from '@/entities/Rating';
import { classNames } from '@/shared/lib/classNames/classNames';

export interface ArticleRatingProps {
    className?: string;
    articleId?: string;
}

const ArticleRating = memo((props: ArticleRatingProps) => {
  const { className, articleId } = props;
  const { t } = useTranslation('article-details');
  const userData = useSelector(getUserAuthData);
  const { data, isLoading, error } = useArticleRating({
    articleId: articleId ?? '',
    userId: userData?.id ?? '',
  });
  const [rateArticleMutation] = useRateArticle();

  const handleRateArticle = useCallback((starsCount: number, feedback?: string) => {
    try {
      rateArticleMutation({
        userId: userData?.id ?? '',
        articleId: articleId ?? '',
        rate: starsCount,
        feedback,
      });
    } catch (e) {
      console.log(e);
    }
  }, [articleId, rateArticleMutation, userData?.id]);

  const onCancel = useCallback((starsCount: number) => {
    handleRateArticle(starsCount);
  }, [handleRateArticle]);

  const onAccept = useCallback((starsCount: number, feedback?: string) => {
    handleRateArticle(starsCount, feedback);
  }, [handleRateArticle]);

  if (isLoading) {
    return <Skeleton width="100%" height={120} />;
  }

  const rating = data?.[0];

  return (
    <RatingCard
      onAccept={onAccept}
      onCancel={onCancel}
      rate={rating?.rate}
      className={classNames('', {}, [className])}
      title={t('Rate this article')}
      feedbackTitle={t('Leave your feedback on the article, it helps improve the quality')}
      hasFeedback
    />
  );
});

export default ArticleRating;
