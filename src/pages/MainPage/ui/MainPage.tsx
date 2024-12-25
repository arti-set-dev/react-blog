import { useTranslation } from 'react-i18next';
import { RatingCard } from '@/entities/Rating';
import { StarRating } from '@/shared/ui/StarRating/StarRating';
import { Page } from '@/widgets/Page/ui/Page';

const MainPage = () => {
  const { t } = useTranslation('main');
  return (
    <Page>
      <h1>{t('Main Page')}</h1>
      <RatingCard title={t('Your rating')} feedbackTitle={t('Leave a review about the article')} hasFeedback />
    </Page>
  );
};

export default MainPage;
