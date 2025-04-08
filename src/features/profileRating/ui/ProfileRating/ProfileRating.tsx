import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { getUserAuthData } from '@/entities/User';
import {
  useProfileRating,
  useRateProfile,
} from '../../model/api/profileRatingApi';
import { RatingCard } from '@/entities/Rating';
import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

export interface ProfileRatingProps {
  className?: string;
  profileId: number;
}

const ProfileRating = memo((props: ProfileRatingProps) => {
  const { className, profileId } = props;
  const { t } = useTranslation('profile');
  const userData = useSelector(getUserAuthData);
  const { data, isLoading, error } = useProfileRating({
    profileId,
    userId: Number(userData?.id) || 0,
  });
  const [rateArticleMutation] = useRateProfile();

  const handleRateArticle = useCallback(
    (starsCount: number, feedback?: string) => {
      try {
        rateArticleMutation({
          userId: Number(userData?.id) || 0,
          profileId,
          rate: starsCount,
          feedback,
        });
      } catch (e) {
        console.log(e);
      }
    },
    [profileId, rateArticleMutation, userData?.id],
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

  const ratingTitle = userData ? t('Rate this Profile') : t('Please login in to leave a review');

  return (
    <RatingCard
      isAuth={Boolean(userData?.id)}
      onAccept={onAccept}
      onCancel={onCancel}
      rate={rating?.rate}
      className={classNames('', {}, [className])}
      title={ratingTitle}
      feedbackTitle={t(
        'Leave your feedback on the profile, it helps improve the quality',
      )}
      hasFeedback
    />
  );
});

export default ProfileRating;
