import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getVstack } from '@/shared/lib/stack/getVstack/getVstack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Button } from '@/shared/ui/redesigned/Button';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { EditBlockSwitcher } from '../../EditBlockSwitcher/EditBlockSwitcher';
import { ArticleBlockType, ArticleType } from '../../../../../model/types/articleType';
import { Card } from '@/shared/ui/redesigned/Card';
import { Tabs } from '@/shared/ui/redesigned/Tabs/Tabs';
import { ArticleEditFormProps } from '../ArticleEditForm';
import { TabItem } from '@/shared/ui/deprecated/Tabs';
import { Icon } from '@/shared/ui/redesigned/Icon';
import TextIcon from '@/shared/assets/icons/text-icon.svg';
import ImageIcon from '@/shared/assets/icons/image-icon.svg';
import CodeIcon from '@/shared/assets/icons/code-icon.svg';
import { BlockPreview } from '../../BlockPreview/BlockPreview';

export const ArticleEditFormRedesigned = memo((props: ArticleEditFormProps) => {
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
    types,
    handleAddType,
  } = props;
  const { t } = useTranslation();

  const typeTabs = useMemo<TabItem[]>(() => {
    const tabTextContent = (
      <VStack gap="8" align="center">
        <Icon Svg={TextIcon} />
        {t('Create new text block')}
      </VStack>
    );

    const tabImageContent = (
      <VStack gap="8" align="center">
        <Icon Svg={ImageIcon} />
        {t('Create new image block')}
      </VStack>
    );

    const tabCodeContent = (
      <VStack gap="8" align="center">
        <Icon Svg={CodeIcon} />
        {t('Create new code block')}
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
          key={block.id}
          block={block}
          onEdit={handleEditBlock}
          onDelete={handleDeleteBlock}
        />
      ))}
    </VStack>
  ), [handleDeleteBlock, handleEditBlock, savedBlocks]);

  const articleTypes = useMemo(() => [
    { value: ArticleType.IT, content: ArticleType.IT },
    { value: ArticleType.ECONOMICS, content: ArticleType.ECONOMICS },
    { value: ArticleType.SCIENCE, content: ArticleType.SCIENCE },
    { value: ArticleType.POLITICS, content: ArticleType.POLITICS },
  ], []);

  return (
    <Card offset="24" className={getVstack({ gap: 24 })}>
      <Text tag="h1" size="xl" weight="bold">
        {t('Create new article')}
      </Text>

      <Input
        value={articlePreview}
        onChange={setArticlePreview}
        background="light"
        variant="outlined"
        placeholder={t('Enter the url for article preview')}
      />
      <Input
        value={articleTitle}
        onChange={setArticleTitle}
        background="light"
        variant="outlined"
        placeholder={t('Enter the heading of the article')}
      />

      <Input
        value={articleDescription}
        onChange={setArticleDescription}
        background="light"
        variant="outlined"
        placeholder={t('Enter the description of the article')}
      />
      <HStack gap="16">
        {articleTypes.map((type) => {
          const isActive = types?.includes(type.value);
          return (
            <Button
              key={type.value}
              onClick={() => handleAddType?.(type.value)}
              variant={isActive ? 'active' : 'outline'}
            >
              {type.content}
            </Button>
          );
        })}
      </HStack>

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
              variant="outline"
              disabled={!isArticleValid}
            >
              {t('Save article')}
            </Button>
          )}

        {error
          && (
            <>
              <Text>{t('An error arose when publishing an article')}</Text>
              <Button
                onClick={onSaveArticle}
                variant="outline"
                disabled={!isArticleValid}
              >
                {t('Repeat the attempt')}
              </Button>
            </>
          )}
      </HStack>

      {tabValue && (
        <EditBlockSwitcher
          type={tabValue as ArticleBlockType}
          block={currentBlock}
          onChange={handleBlockChange}
          onCancel={handleCancel}
          onSave={handleSaveBlock}
        />
      )}

      <Card max tag="div" position="sticky" positionCorner="bottom">
        <Tabs
          fullWidth
          tabs={typeTabs}
          value={tabValue ?? ''}
          onTabClick={handleTabChange}
        />
      </Card>
    </Card>
  );
});
