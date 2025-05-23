import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { getRouteArticleEdit, getRouteArticles } from '@/shared/const/router';
import {
  articleListActions, getArticleDetailsData, getCanEditArticle, useDeleteArticle,
} from '@/entities/Article';
import { Card } from '@/shared/ui/redesigned/Card';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useGetUserDataById } from '@/entities/User';

interface AdditionalInfoContainerProps {
  className?: string;
}

export const AdditionalInfoContainer = memo((props: AdditionalInfoContainerProps) => {
  const { className } = props;
  const { t } = useTranslation('article');
  const dispatch = useAppDispatch();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const article = useSelector(getArticleDetailsData);
  const navigate = useNavigate();
  const canEdit = useSelector(getCanEditArticle);
  const [deleteArticle, { isLoading, error }] = useDeleteArticle();
  const { data: userData, isLoading: isUserDataLoading } = useGetUserDataById(article?.userId ?? '');

  const onEditArticle = useCallback(() => {
    if (article) {
      navigate(getRouteArticleEdit(article.id ?? ''));
    }
  }, [article, navigate]);
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

  const modalContent = (
    <Modal lazy isOpen={isOpenModal} onClose={onCloseModal}>
      <VStack gap="32">
        <Text weight="bold" size="xl">{t('You want to delete the article?')}</Text>
        <HStack gap="8" justify="center" fullWidth>
          <Button onClick={onCloseModal} variant="outline">{t('Cancel')}</Button>
          {isLoading
            ? <Skeleton width={130} height={46} border="8" />
            : <Button onClick={onDeleteArticle} variant="outline-red">{t('Delete')}</Button>}
        </HStack>
        {error && <Text variant="error">{t('An error occurred')}</Text>}
      </VStack>
    </Modal>
  );

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
    <ArticleAdditionalInfo
      isLoading={isUserDataLoading}
      canEdit={canEdit}
      onEdit={onEditArticle}
      onDelete={onOpenModal}
      author={userData}
      createdAt={article?.createdAt}
      views={article?.views}
      modalContent={modalContent}
    />
  );
});
