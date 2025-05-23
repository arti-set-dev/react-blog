import {
  memo, useCallback, useEffect, useMemo, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  ArticleBlockType, ArticleEditForm,
  ArticleBlock,
  ArticleCodeBlock,
  ArticleImageBlock,
  ArticleTextBlock,
  createEmptyBlock,
  createTextBlock,
  validateBlock, ArticleType, articleListActions,
} from '@/entities/Article';
import { TabItem } from '@/shared/ui/deprecated/Tabs';
import { getUserAuthData } from '@/entities/User';
import { useCreateArticle } from '../../api/articleCreateApi';
import { getRouteArticleDetails } from '@/shared/const/router';
import { LOCAL_STORAGE_ARTICLE_DATA } from '@/shared/const/localstorage';
import { formatDate } from '@/shared/lib/date/formatDate';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

interface ArticleCreateProps {
  className?: string;
}

export const ArticleCreate = memo((props: ArticleCreateProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userData = useSelector(getUserAuthData);
  const [createArticle, { isLoading, error }] = useCreateArticle();
  const [tabValue, setTabValue] = useState<ArticleBlockType | string>('');
  const [currentBlock, setCurrentBlock] = useState<
    ArticleTextBlock | ArticleImageBlock | ArticleCodeBlock
  >(createTextBlock());
  const [savedBlocks, setSavedBlocks] = useState<
    Array<ArticleTextBlock | ArticleImageBlock | ArticleCodeBlock>
  >([]);

  const [articleTitle, setArticleTitle] = useState('');
  const [articleDescription, setArticleDescription] = useState('');
  const [articlePreview, setArticlePreview] = useState<File | null>(null);

  const [blockImageFiles, setBlockImageFiles] = useState<Record<string, File | null>>({});

  const isArticleValid = useMemo(() => articleTitle.trim() !== ''
    && articleDescription.trim() !== ''
    && articlePreview !== null
    && savedBlocks.length > 0
    && savedBlocks.every(validateBlock), [articleTitle, articleDescription, articlePreview, savedBlocks]);

  const handleTabChange = useCallback((tab: TabItem) => {
    const type = tab.value as ArticleBlockType;
    setTabValue(type);

    if (!savedBlocks.some((b) => b.type === type && b.id === currentBlock.id)) {
      setCurrentBlock(createEmptyBlock(type));
    }
  }, [savedBlocks, currentBlock.id]);

  const handleBlockChange = useCallback((updatedBlock: typeof currentBlock) => {
    setCurrentBlock(updatedBlock);
  }, []);

  const handleSaveBlock = useCallback(() => {
    setSavedBlocks((prev) => {
      if (prev.some((b) => b.id === currentBlock.id)) {
        return prev.map((b) => (b.id === currentBlock.id ? currentBlock : b));
      }
      return [...prev, currentBlock];
    });

    setTabValue('');
    setCurrentBlock(createEmptyBlock(currentBlock.type));
  }, [currentBlock]);

  const handleCancel = useCallback(() => {
    setTabValue('');
    if (Object.values(ArticleBlockType).includes(tabValue as ArticleBlockType)) {
      setCurrentBlock(createEmptyBlock(tabValue as ArticleBlockType));
    }
  }, [tabValue]);

  const handleDeleteBlock = useCallback((id: string) => {
    setSavedBlocks((prev) => prev.filter((block) => block.id !== id));
  }, []);

  const handleEditBlock = useCallback((block: ArticleBlock) => {
    setCurrentBlock(block);
    setTabValue(block.type);
  }, []);

  const [types, setTypes] = useState<ArticleType[]>([]);

  const handleAddType = useCallback((value: ArticleType) => {
    setTypes((prev) => (prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value]));
  }, []);

  const handleBlockFileChange = useCallback((file: File | null) => {
    if (currentBlock && currentBlock.type === 'IMAGE') {
      setBlockImageFiles((prev) => ({
        ...prev,
        [currentBlock.id]: file,
      }));
    }
  }, [currentBlock]);

  const onSaveArticle = async () => {
    if (!userData) return;

    const formData = new FormData();

    formData.append('title', articleTitle);
    formData.append('subtitle', articleDescription);
    formData.append('userId', userData.id);
    formData.append('views', '0');
    formData.append('createdAt', formatDate(new Date()));

    formData.append('type', JSON.stringify(types));

    formData.append('blocks', JSON.stringify(savedBlocks));

    if (articlePreview) {
      formData.append('img', articlePreview);
    }

    const imageBlocks = savedBlocks.filter((block) => block.type === 'IMAGE') as ArticleImageBlock[];
    imageBlocks.forEach((block) => {
      const blockImageFile = blockImageFiles[block.id];
      if (blockImageFile) {
        formData.append('blockImgs', blockImageFile);
      }
    });

    try {
      const response = await createArticle(formData).unwrap();
      dispatch(articleListActions.addArticle(response));
      localStorage.removeItem(LOCAL_STORAGE_ARTICLE_DATA);
      navigate(getRouteArticleDetails(response.id ?? ''));
    } catch (err) {
      console.error('Error creating article:', err);
    }
  };

  useEffect(() => {
    const savedDraft = localStorage.getItem(LOCAL_STORAGE_ARTICLE_DATA);
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setArticleTitle(draft.articleTitle || '');
        setArticleDescription(draft.articleDescription || '');
        setArticlePreview(draft.articlePreview || null);
        setSavedBlocks(draft.savedBlocks || []);
        setTypes(draft.types || []);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  useEffect(() => {
    const draft = JSON.stringify({
      articleTitle,
      articleDescription,
      articlePreview: articlePreview?.name ?? '',
      savedBlocks,
      types,
    });
    localStorage.setItem(LOCAL_STORAGE_ARTICLE_DATA, draft);
  }, [articleTitle, articleDescription, articlePreview, savedBlocks, types]);

  return (
    <ArticleEditForm
      savedBlocks={savedBlocks}
      handleEditBlock={handleEditBlock}
      handleDeleteBlock={handleDeleteBlock}
      articleTitle={articleTitle}
      setArticleTitle={setArticleTitle}
      articleDescription={articleDescription}
      setArticleDescription={setArticleDescription}
      tabValue={tabValue}
      currentBlock={currentBlock}
      handleBlockChange={handleBlockChange}
      handleCancel={handleCancel}
      handleSaveBlock={handleSaveBlock}
      isArticleValid={isArticleValid}
      handleTabChange={handleTabChange}
      articlePreview={articlePreview?.name ?? ''}
      setArticlePreview={setArticlePreview}
      types={types}
      onSaveArticle={onSaveArticle}
      handleAddType={handleAddType}
      isLoading={isLoading}
      error={error}
      onBlockFileChange={handleBlockFileChange}
    />
  );
});
