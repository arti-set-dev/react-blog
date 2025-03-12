import {
  memo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { TabItem } from '@/shared/ui/deprecated/Tabs';
import { ArticleType } from '../../../../model/types/articleType';
import {
  ArticleBlock, ArticleCodeBlock, ArticleImageBlock, ArticleTextBlock,
} from '../../../../model/types/article';
import {
  ArticleEditFormSkeleton,
} from './ArticleEditFormSkeleton';
import {
  ArticleEditFormDeprecated,
} from './ArticleEditFormDeprecated/ArticleEditFormDeprecated';
import { ToggleFeatures } from '@/shared/lib/features';
import {
  ArticleEditFormRedesigned,
} from './ArticleEditFormRedesigned/ArticleEditFormRedesigned';

export interface ArticleEditFormProps {
  className?: string;
  savedBlocks?: ArticleBlock[];
  handleEditBlock?: (block: ArticleBlock) => void;
  handleDeleteBlock?: (id: string) => void;
  articleTitle?: string;
  setArticleTitle?: (value: string) => void;
  articleDescription?: string;
  setArticleDescription?: (value: string) => void;
  setArticlePreview?: (value: string) => void;
  tabValue?: string;
  currentBlock?: ArticleTextBlock | ArticleImageBlock | ArticleCodeBlock;
  handleBlockChange?: (block: ArticleCodeBlock | ArticleTextBlock | ArticleImageBlock) => void;
  handleCancel?: () => void;
  handleSaveBlock?: () => void;
  isArticleValid?: boolean;
  handleTabChange?: (tab: TabItem) => void;
  articlePreview?: string;
  types?: ArticleType[];
  handleAddType?: (value: ArticleType) => void;
  onSaveArticle?: () => void;
  isLoading?: boolean;
  error?: FetchBaseQueryError | SerializedError | undefined | string;
}

export const ArticleEditForm = memo((props: ArticleEditFormProps) => {
  const {
    isLoading,
  } = props;
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <ArticleEditFormSkeleton />
    );
  }

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={(
        <ArticleEditFormRedesigned {...props} />
      )}
      off={(
        <ArticleEditFormDeprecated {...props} />
      )}
    />
  );
});
