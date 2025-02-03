import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRouteArticleDetails } from '@/shared/const/router';

export function useArticle(articleId: string) {
  const navigate = useNavigate();

  const onOpenArticle = useCallback(() => {
    navigate(getRouteArticleDetails(articleId));
  }, [articleId, navigate]);

  return { onOpenArticle };
}
