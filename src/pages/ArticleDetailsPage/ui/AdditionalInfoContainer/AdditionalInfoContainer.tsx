import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { getRouteArticleEdit } from '@/shared/const/router';
import { getArticleDetailsData } from '@/entities/Article';
import { Card } from '@/shared/ui/redesigned/Card';
import { getCanEditArticle } from '../../model/selectors/article';

interface AdditionalInfoContainerProps {
  className?: string;
}

export const AdditionalInfoContainer = memo((props: AdditionalInfoContainerProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const article = useSelector(getArticleDetailsData);
  const navigate = useNavigate();
  const canEdit = useSelector(getCanEditArticle);
  const onEditArticle = useCallback(() => {
    if (article) {
      navigate(getRouteArticleEdit(article.id));
    }
  }, [article, navigate]);

  if (!article) {
    return (
      <Card offset="16">
        <VStack gap="32" fullWidth>
          <HStack gap="8" fullWidth>
            <Skeleton width={32} height={32} border="circle" />
            <Skeleton width={200} height={16} border="20" />
            <Skeleton width={200} height={16} border="20" />
          </HStack>
          <Skeleton width="100%" height={36} border="20" />
        </VStack>
      </Card>
    );
  }

  return (
    <Card offset="16">
      <ArticleAdditionalInfo
        canEdit={canEdit}
        onEdit={onEditArticle}
        author={article?.user}
        createdAt={article?.createdAt}
        views={article?.views}
      />
    </Card>
  );
});
