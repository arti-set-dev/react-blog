import {
  memo, useCallback, useEffect, useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  fetchArticleById,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
  articleDetailsReducer,
  ArticleEditForm,
  ArticleBlockType,
  ArticleTextBlock,
  ArticleImageBlock,
  ArticleCodeBlock, validateBlock, createEmptyBlock, ArticleBlock, ArticleType,
  articleDetailsActions, getArticleDetailsForm, useUpdateArticleMutation,
} from '@/entities/Article';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { TabItem } from '@/shared/ui/deprecated/Tabs';
import { getUserAuthData } from '@/entities/User';
import { getRouteArticleDetails } from '@/shared/const/router';
import { formatDate } from '@/shared/lib/date/formatDate';

interface ArticleEditProps {
  className?: string;
  id?: string;
}

const reducers: ReducerList = {
  articleDetails: articleDetailsReducer,
};

export const ArticleEdit = memo((props: ArticleEditProps) => {
  const { className, id } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [updateArticle, { isLoading: isUpdating }] = useUpdateArticleMutation();
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const error = useSelector(getArticleDetailsError);
  const article = useSelector(getArticleDetailsForm);
  const navigate = useNavigate();
  const userData = useSelector(getUserAuthData);

  useEffect(() => {
    if (id) {
      dispatch(fetchArticleById(id));
    }
  }, [dispatch, id]);

  const handleChangeTitle = (value: string) => {
    dispatch(articleDetailsActions.updateArticleField({ title: value ?? '' }));
  };

  const handleChangeSubtitle = (value: string) => {
    dispatch(articleDetailsActions.updateArticleField({ subtitle: value ?? '' }));
  };

  const handleChangePreview = (value: File) => {
    dispatch(articleDetailsActions.updateArticleField({ img: value.name ?? '' }));
  };

  const isArticleValid = useMemo(() => article?.title?.trim() !== ''
    && article?.title.trim() !== ''
    && article?.img.trim() !== ''
    && article?.blocks && article?.blocks.length > 0
    && article?.blocks.every(validateBlock), [article?.blocks, article?.img, article?.title]);

  const handleTabChange = useCallback((tab: TabItem) => {
    const type = tab.value as ArticleBlockType;
    dispatch(articleDetailsActions.updateArticleField({ tabValue: type }));

    if (!article?.blocks.some((b) => b.type === type && b.id === article?.currentBlock?.id)) {
      dispatch(articleDetailsActions.updateArticleField({ currentBlock: createEmptyBlock(type) }));
    }
  }, [article?.blocks, article?.currentBlock?.id, dispatch]);

  const handleBlockChange = useCallback((updatedBlock: ArticleTextBlock | ArticleImageBlock | ArticleCodeBlock) => {
    dispatch(articleDetailsActions.updateArticleField({ currentBlock: updatedBlock }));
  }, [dispatch]);

  const handleSaveBlock = useCallback(() => {
    if (!article || !article.currentBlock) return;

    dispatch(articleDetailsActions.updateArticleField({
      // eslint-disable-next-line no-nested-ternary
      blocks: Array.isArray(article.blocks)
        ? article.blocks.some((b) => b.id === article.currentBlock!.id)
          ? article.blocks.map((b) => (b.id === article.currentBlock!.id ? article.currentBlock! : b))
          : [...article.blocks, article.currentBlock!]
        : [article.currentBlock!],
      tabValue: '',
    }));
  }, [article, dispatch]);

  const handleCancel = useCallback(() => {
    dispatch(articleDetailsActions.updateArticleField({ tabValue: '' }));
  }, [dispatch]);

  const handleDeleteBlock = useCallback((id: string) => {
    dispatch(articleDetailsActions.updateArticleField({
      blocks: article?.blocks?.filter((block) => block.id !== id),
    }));
  }, [article?.blocks, dispatch]);

  const handleEditBlock = useCallback((block: ArticleBlock) => {
    if (!article?.blocks) return;

    dispatch(articleDetailsActions.updateArticleField({
      blocks: article.blocks.filter((b) => (b.id === block.id ? block : b)),
      currentBlock: block,
    }));

    dispatch(articleDetailsActions.updateArticleField({
      currentBlock: block,
      tabValue: block.type,
    }));
  }, [article, dispatch]);

  const handleAddType = useCallback((value: ArticleType) => {
    if (!article?.type) return;

    dispatch(articleDetailsActions.updateArticleField({
      type: article.type.includes(value)
        ? article.type.filter((t) => t !== value)
        : [...article.type, value],
    }));
  }, [article?.type, dispatch]);

  const onUpdateArticle = async () => {
    if (!userData || !article?.id) return;

    const dataToSend = {
      title: article?.title ?? '',
      subtitle: article?.subtitle ?? '',
      userId: userData.id,
      views: 0,
      createdAt: formatDate(new Date()),
      type: article?.type ?? [],
      blocks: article?.blocks ?? [],
      img: article?.img ?? '',
      blockImgs: [],
    };

    try {
      await updateArticle({ id: article.id, data: dataToSend }).unwrap();
      navigate(getRouteArticleDetails(article.id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DynamicModuleLoader reducers={reducers}>
      <ArticleEditForm
        id={id}
        savedBlocks={article?.blocks}
        articleTitle={article?.title}
        articleDescription={article?.subtitle}
        articlePreview={article?.img}
        types={article?.type}
        isLoading={isLoading}
        error={error}
        isArticleValid={isArticleValid}
        handleTabChange={handleTabChange}
        handleBlockChange={handleBlockChange}
        handleSaveBlock={handleSaveBlock}
        handleCancel={handleCancel}
        handleDeleteBlock={handleDeleteBlock}
        handleEditBlock={handleEditBlock}
        handleAddType={handleAddType}
        onSaveArticle={onUpdateArticle}
        setArticlePreview={handleChangePreview}
        setArticleDescription={handleChangeSubtitle}
        setArticleTitle={handleChangeTitle}
        tabValue={article?.tabValue}
        currentBlock={article?.currentBlock}
      />
    </DynamicModuleLoader>
  );
});
