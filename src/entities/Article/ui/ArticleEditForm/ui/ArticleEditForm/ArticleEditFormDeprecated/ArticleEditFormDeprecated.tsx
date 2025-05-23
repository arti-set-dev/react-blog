import {
  memo, useMemo, useState, useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';
import { ArticleEditFormProps } from '../ArticleEditForm';
import { TabItem } from '@/shared/ui/deprecated/Tabs';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Icon } from '@/shared/ui/redesigned/Icon';
import TextIcon from '@/shared/assets/icons/text-icon.svg';
import ImageIcon from '@/shared/assets/icons/image-icon.svg';
import CodeIcon from '@/shared/assets/icons/code-icon.svg';
import { BlockPreview } from '../../BlockPreview/BlockPreview';
import { getVstack } from '@/shared/lib/stack/getVstack/getVstack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/deprecated/Input';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { EditBlockSwitcher } from '../../EditBlockSwitcher/EditBlockSwitcher';
import { Card } from '@/shared/ui/redesigned/Card';
import { Tabs } from '@/shared/ui/deprecated/Tabs/Tabs';
import { ArticleBlockType, ArticleType } from '../../../../../model/types/articleType';
import { UploadFile } from '@/shared/ui/redesigned/UploadFile';
import { Flex } from '@/shared/ui/redesigned/Stack/Flex/Flex';

export const ArticleEditFormDeprecated = memo((props: ArticleEditFormProps) => {
  const {
    className,
    savedBlocks,
    handleEditBlock,
    handleDeleteBlock,
    handleBlockChange,
    handleCancel,
    handleSaveBlock,
    isArticleValid,
    handleTabChange,
    articlePreview,
    setArticlePreview,
    articleDescription,
    setArticleDescription,
    tabValue,
    currentBlock,
    setArticleTitle,
    articleTitle,
    onSaveArticle,
    isLoading,
    error,
    id,
    types,
    handleAddType,
    onBlockFileChange,
  } = props;
  const { t } = useTranslation('article-edit');
  const [blockImageFiles, setBlockImageFiles] = useState<Record<string, File | null>>({});

  const handleBlockFileChange = useCallback((file: File | null) => {
    if (currentBlock && currentBlock.type === 'IMAGE') {
      setBlockImageFiles((prev) => ({
        ...prev,
        [currentBlock.id]: file,
      }));
      onBlockFileChange?.(file);
    }
  }, [currentBlock, onBlockFileChange]);

  const typeTabs = useMemo<TabItem[]>(() => {
    const tabTextContent = (
      <VStack gap="8" align="center">
        <Icon Svg={TextIcon} />
        <BrowserView renderWithFragment>
          {t('Create new text block')}
        </BrowserView>
      </VStack>
    );

    const tabImageContent = (
      <VStack gap="8" align="center">
        <Icon Svg={ImageIcon} />
        <BrowserView renderWithFragment>
          {t('Create new image block')}
        </BrowserView>
      </VStack>
    );

    const tabCodeContent = (
      <VStack gap="8" align="center">
        <Icon Svg={CodeIcon} />
        <BrowserView renderWithFragment>
          {t('Create new code block')}
        </BrowserView>
      </VStack>
    );

    return [
      { value: ArticleBlockType.TEXT, content: tabTextContent },
      { value: ArticleBlockType.IMAGE, content: tabImageContent },
      { value: ArticleBlockType.CODE, content: tabCodeContent },
    ];
  }, [t]);

  const BlocksList = useMemo(() => (
    <VStack gap="16" fullWidth>
      {savedBlocks?.map((block) => (
        <BlockPreview
          key={`${block.id}-${Math.random().toString(36).substring(2, 9)}`}
          block={block}
          onEdit={handleEditBlock}
          onDelete={handleDeleteBlock}
        />
      ))}
    </VStack>
  ), [handleDeleteBlock, handleEditBlock, savedBlocks]);

  const articleTypes = useMemo(() => [
    { value: ArticleType.IT, content: t('IT') },
    { value: ArticleType.ECONOMICS, content: t('Economics') },
    { value: ArticleType.SCIENCE, content: t('Science') },
    { value: ArticleType.POLITICS, content: t('Politics') },
  ], [t]);

  return (
    <Card border="0" offset="24" className={getVstack({ gap: 24 })}>
      <Text tag="h1" size="xl" weight="bold">
        {id ? t('Edit article') : t('Create new article')}
      </Text>

      <UploadFile
        accept="image/*"
        onFileSelect={setArticlePreview}
        placeholder={t('Upload article preview')}
      />
      <Input
        value={articleTitle}
        onChange={setArticleTitle}
        placeholder={t('Enter the heading of the article')}
      />

      <Input
        value={articleDescription}
        onChange={setArticleDescription}
        placeholder={t('Enter the description of the article')}
      />
      <Flex gap="16" flexWrap="wrap" direction="initial">
        {articleTypes.map((type) => {
          const isActive = types?.includes(type.value);
          return (
            <Button
              key={type.value}
              onClick={() => handleAddType?.(type.value)}
              theme={isActive ? ButtonTheme.ACTIVE : ButtonTheme.OUTLINE}
            >
              {type.content}
            </Button>
          );
        })}
      </Flex>

      {savedBlocks && savedBlocks.length > 0 && (
        <>
          <Text tag="h2" size="l">{t('Saved blocks')}</Text>
          {BlocksList}
        </>
      )}

      <HStack width={200}>
        {isLoading
          ? <Skeleton border="8" width={200} height={30} />
          : (
            <Button
              onClick={onSaveArticle}
              theme={ButtonTheme.OUTLINE}
              disabled={!isArticleValid}
            >
              {t('Save article')}
            </Button>
          )}
      </HStack>
      <VStack gap="16" align="center">
        {error
          && (
            <>
              <Text variant="error">{t('An error arose when publishing an article')}</Text>
              <Button
                onClick={onSaveArticle}
                theme={ButtonTheme.OUTLINE}
                disabled={!isArticleValid}
              >
                {t('Repeat the attempt')}
              </Button>
            </>
          )}
      </VStack>

      {tabValue && currentBlock && (
        <EditBlockSwitcher
          type={tabValue as ArticleBlockType}
          block={currentBlock}
          onChange={handleBlockChange}
          onFileChange={handleBlockFileChange}
          onCancel={handleCancel}
          onSave={handleSaveBlock}
        />
      )}

      <BrowserView renderWithFragment>
        <Card border="0" max tag="div" position="sticky" positionCorner="bottom">
          <Tabs
            fullWidth
            tabs={typeTabs}
            value={tabValue ?? ''}
            onTabClick={handleTabChange}
          />
        </Card>
      </BrowserView>

      <MobileView renderWithFragment>
        <Card border="0" max tag="div" position="sticky" positionOffset={77}>
          <Tabs
            fullWidth
            tabs={typeTabs}
            value={tabValue ?? ''}
            onTabClick={handleTabChange}
          />
        </Card>
      </MobileView>
    </Card>
  );
});
