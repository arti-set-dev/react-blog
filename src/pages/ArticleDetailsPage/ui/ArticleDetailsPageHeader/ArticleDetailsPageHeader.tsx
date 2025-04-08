import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { getRouteArticleEdit, getRouteArticles } from '@/shared/const/router';
import { articleListActions, getArticleDetailsData, getCanEditArticle } from '@/entities/Article';
import { useDeleteArticle } from '@/features/articleDelete';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Text } from '@/shared/ui/redesigned/Text';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader = memo(
  (props: ArticleDetailsPageHeaderProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const canEdit = useSelector(getCanEditArticle);
    const article = useSelector(getArticleDetailsData);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const navigate = useNavigate();
    const [deleteArticle, { isLoading, error }] = useDeleteArticle();
    const onDeleteArticle = useCallback(async () => {
      if (article) {
        try {
          await deleteArticle(article.id ?? '').unwrap();
          dispatch(articleListActions.removeArticle(article.id ?? ''));
          navigate(getRouteArticles());
        } catch (e) {
          console.error(e);
        }
      }
    }, [article, deleteArticle, dispatch, navigate]);

    const onOpenModal = useCallback(() => {
      setIsOpenModal(true);
    }, []);

    const onCloseModal = () => {
      setIsOpenModal(false);
    };

    const onBackToList = useCallback(() => {
      navigate(getRouteArticles());
    }, [navigate]);

    const onEditArticle = useCallback(() => {
      if (article) {
        navigate(getRouteArticleEdit(article.id ?? ''));
      }
    }, [article, navigate]);

    const modalContent = (
      <Modal lazy isOpen={isOpenModal} onClose={onCloseModal}>
        <VStack gap="32">
          <Text weight="bold" size="xl">{t('You want to delete the article?')}</Text>
          <HStack gap="8" justify="center" fullWidth>
            <Button onClick={onCloseModal} theme={ButtonTheme.OUTLINE}>{t('Cancel')}</Button>
            {isLoading
              ? <Skeleton width={130} height={46} border="8" />
              : <Button onClick={onDeleteArticle} theme={ButtonTheme.OUTLINE_RED}>{t('Delete')}</Button>}
          </HStack>
          {error && <Text variant="error">{t('An error occurred')}</Text>}
        </VStack>
      </Modal>
    );

    return (
      <HStack justify="between">
        <Button onClick={onBackToList} theme={ButtonTheme.OUTLINE}>
          {t('Back')}
        </Button>
        {canEdit && (
          <HStack gap="8">
            <Button onClick={onEditArticle} theme={ButtonTheme.OUTLINE}>
              {t('Edit')}
            </Button>
            <Button onClick={onOpenModal} theme={ButtonTheme.OUTLINE_RED}>
              {t('Delete')}
            </Button>
            {modalContent}
          </HStack>
        )}
      </HStack>
    );
  },
);
