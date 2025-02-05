import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getRouteProfile } from '@/shared/const/router';
import { getArticleDetailsData } from '@/entities/Article';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';

interface AdditionalInfoContainerProps {
  className?: string;
}

export const AdditionalInfoContainer = memo((props: AdditionalInfoContainerProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const article = useSelector(getArticleDetailsData);
  const navigate = useNavigate();
  const onEditArticle = useCallback(() => {
    if (article) {
      navigate(getRouteProfile(article.id));
    }
  }, [article, navigate]);

  if (!article) {
    return null;
  }

  return (
    <Card offset="16">
      <ArticleAdditionalInfo
        onEdit={onEditArticle}
        author={article?.user}
        createdAt={article?.createdAt}
        views={article?.views}
      />
    </Card>
  );
});
