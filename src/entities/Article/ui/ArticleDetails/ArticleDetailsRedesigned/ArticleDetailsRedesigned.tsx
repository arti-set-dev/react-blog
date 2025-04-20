import {
  memo, useCallback, useMemo, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { MobileView } from 'react-device-detect';
import { useSelector } from 'react-redux';
import { getHstack } from '@/shared/lib/stack/getHstack/getHstack';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';
import { LazyImage } from '@/shared/ui/redesigned/LazyImage';
import { ArticleBlockType } from '../../../model/types/articleType';
import { ArticleBlock, Article } from '../../../model/types/article';
import { ArticleCodeBlockComponent } from '../../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleDetailsProps } from '../ArticleDetails';
import {
  ArticleImageBlockComponent,
} from '../../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../../ArticleTextBlockComponent/ArticleTextBlockComponent';
import CalendarIcon from '@/shared/assets/icons/calendar-icon.svg';
import ViewsIcon from '@/shared/assets/icons/eye-icon.svg';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import {
  Text,
} from '@/shared/ui/redesigned/Text';
import { VStack, HStack } from '@/shared/ui/redesigned/Stack';
import { Card } from '@/shared/ui/redesigned/Card';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { getRouteArticleEdit, getRouteArticles, getRouteProfile } from '@/shared/const/router';
import { getCanEditArticle } from '../../../model/selectors/articleDetails/articleDetails';
import { Button } from '@/shared/ui/redesigned/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { articleListActions } from '../../../model/slice/articleListSlice/articleListSlice';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { useDeleteArticle } from '../../../model/api/deleteArticleApi/articleDeleteApi';

interface ArticleDetailsRedesignedProps extends ArticleDetailsProps {
  className?: string;
  isLoading?: boolean;
  error?: string;
  article?: Article;
}

export const ArticleDetailsRedesigned = memo((props: ArticleDetailsRedesignedProps) => {
  const {
    className, error, isLoading, article,
  } = props;
  const { t } = useTranslation('article');
  const canEdit = useSelector(getCanEditArticle);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [deleteArticle] = useDeleteArticle();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const onEditArticle = useCallback(() => {
    if (article) {
      navigate(getRouteArticleEdit(article.id ?? ''));
    }
  }, [article, navigate]);

  const onDeleteArticle = useCallback(async () => {
    if (article) {
      await deleteArticle(article.id ?? '').unwrap();
      dispatch(articleListActions.removeArticle(article.id ?? ''));
      navigate(getRouteArticles());
    }
  }, [article, deleteArticle, dispatch, navigate]);

  const onOpenModal = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  const onCloseModal = () => {
    setIsOpenModal(false);
  };

  const articleTypes = useMemo(
    () => (
      <HStack gap="4" width="60%" overflow="auto">
        {article?.type.map((type, index) => (
          <Card offset="4" variant="active" tag="div" key={`${type}-${index}`}>
            {type}
          </Card>
        ))}
      </HStack>
    ),
    [article?.type],
  );

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

  const renderBlock = useCallback((block: ArticleBlock) => {
    const blockId = block.id || crypto.randomUUID();

    switch (block.type) {
    case ArticleBlockType.CODE:
      return (
        <ArticleCodeBlockComponent
          key={blockId}
          block={{ ...block, id: blockId }}
        />
      );
    case ArticleBlockType.IMAGE:
      return (
        <ArticleImageBlockComponent
          key={blockId}
          block={{ ...block, id: blockId }}
        />
      );
    case ArticleBlockType.TEXT:
      return (
        <ArticleTextBlockComponent
          key={blockId}
          block={{ ...block, id: blockId }}
        />
      );
    default:
      return null;
    }
  }, []);

  let content;

  if (isLoading) {
    content = (
      <VStack gap="16" fullWidth>
        <Skeleton height={300} width="180%" border="20" />
        <Skeleton height={20} width="400px" border="20" />
        <Skeleton height={20} width="300px" border="20" />
        <Skeleton height={100} width="100%" border="20" />
        <Skeleton height={100} width="100%" border="20" />
        <Skeleton height={100} width="100%" border="20" />
        <Skeleton height={100} width="100%" border="20" />
        <Skeleton height={100} width="100%" border="20" />
        <Skeleton height={100} width="100%" border="20" />
        <Skeleton height={100} width="100%" border="20" />
        <Skeleton height={100} width="100%" border="20" />
        <Skeleton height={100} width="100%" border="20" />
      </VStack>
    );
  } else if (error) {
    content = (
      <HStack justify="center">
        <Text size="l" variant="error">
          {t('There was an error loading the article')}
        </Text>
      </HStack>
    );
  } else {
    content = (
      <>
        {canEdit && (
          <MobileView renderWithFragment>
            <Card
              tag="div"
              position="absolute"
              positionCorner="top-right"
              offset="16"
              className={getHstack({ gap: 8, justify: 'end' })}
            >
              <Button onClick={onEditArticle} variant="outline">{t('Edit')}</Button>
              <Button onClick={onOpenModal} variant="outline-red">{t('Delete')}</Button>
              {modalContent}
            </Card>
          </MobileView>
        )}
        <HStack justify="center">
          <LazyImage
            border="radius_l"
            width="100%"
            height="300px"
            src={article?.img}
            alt={article?.title}
          />
        </HStack>
        {articleTypes}
        <VStack data-testid="ArticleDetails.Info" fullWidth gap="16">
          <Text
            tag="h1"
            variant="primary"
            size="xl"
            weight="bold"
          >
            {article?.title}
          </Text>
          <Text
            variant="primary"
            size="xs"
            weight="normal"
          >
            {article?.subtitle}
          </Text>
          <VStack gap="8">
            <MobileView renderWithFragment>
              <AppLink
                to={getRouteProfile(article?.author?.id || '')}
                className={getHstack({ align: 'center', gap: 8 })}
              >
                <Avatar size={32} src={article?.author?.avatar} />
                <Text>{article?.author?.username}</Text>
              </AppLink>
            </MobileView>
            <Text size="xs" className={getHstack({ align: 'center', gap: 8 })}>
              <Icon Svg={ViewsIcon} />
              {String(article?.views)}
            </Text>
            <Text size="xs" className={getHstack({ align: 'center', gap: 8 })}>
              <Icon Svg={CalendarIcon} />
              {article?.createdAt}
            </Text>
          </VStack>
        </VStack>
        {article?.blocks.map(renderBlock)}
      </>
    );
  }

  return content;
});
