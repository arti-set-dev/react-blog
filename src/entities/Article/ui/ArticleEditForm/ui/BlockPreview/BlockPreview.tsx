import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleCodeBlock, ArticleImageBlock, ArticleTextBlock } from '../../../../model/types/article';
import { Text } from '@/shared/ui/redesigned/Text';
import {
  Text as TextDeprecated, TextAlign, TextSize, TextWeight,
} from '@/shared/ui/deprecated/Text';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { LazyImage } from '@/shared/ui/redesigned/LazyImage';
import { Code } from '@/shared/ui/redesigned/Code';
import { Code as CodeDeprecated } from '@/shared/ui/deprecated/Code';
import { Card } from '@/shared/ui/redesigned/Card';
import { getVstack } from '@/shared/lib/stack/getVstack/getVstack';
import { Button } from '@/shared/ui/redesigned/Button';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { ToggleFeatures } from '@/shared/lib/features';

interface BlockPreviewProps {
  block: ArticleTextBlock | ArticleImageBlock | ArticleCodeBlock;
  onEdit?: (block: ArticleTextBlock | ArticleImageBlock | ArticleCodeBlock) => void;
  onDelete?: (id: string) => void;
}

export const BlockPreview = memo(({
  block,
  onEdit,
  onDelete,
}: BlockPreviewProps) => {
  const handleEdit = () => onEdit?.(block);
  const handleDelete = () => onDelete?.(block.id);
  const { t } = useTranslation();

  const renderPreviewContent = () => {
    switch (block.type) {
    case 'TEXT':
      return (
        <ToggleFeatures
          feature="isAppRedesigned"
          on={(
            <>
              {block.title && (
                <Text size="l" weight="bold">{block.title}</Text>
              )}
              <VStack gap="8">
                {block.paragraphs.map((paragraph, index) => (
                  !paragraph ? (
                    <br key={`br-${index}`} />
                  ) : (
                    <Text key={`text-${index}`} size="m">
                      {paragraph}
                    </Text>
                  )
                ))}
              </VStack>
            </>
          )}
          off={(
            <>
              {block.title && (
                <TextDeprecated size={TextSize.L} weight={TextWeight.BOLD}>{block.title}</TextDeprecated>
              )}
              <VStack gap="8">
                {block.paragraphs.map((paragraph, index) => (
                  !paragraph ? (
                    <br key={`br-${index}`} />
                  ) : (
                    <TextDeprecated key={`text-${index}`} size={TextSize.M}>
                      {paragraph}
                    </TextDeprecated>
                  )
                ))}
              </VStack>
            </>
          )}
        />
      );

    case 'IMAGE':
      return (
        <ToggleFeatures
          feature="isAppRedesigned"
          on={(
            <>
              <LazyImage
                aspectRatio="16/9"
                src={block.src}
                alt={block.title}
              />
              {block.title && (
                <Text size="m" align="center">{block.title}</Text>
              )}
            </>
          )}
          off={(
            <>
              <LazyImage
                aspectRatio="16/9"
                src={block.src}
                alt={block.title}
              />
              {block.title && (
                <TextDeprecated size={TextSize.M} align={TextAlign.CENTER}>{block.title}</TextDeprecated>
              )}
            </>
          )}
        />
      );

    case 'CODE':
      return (
        <ToggleFeatures
          feature="isAppRedesigned"
          on={(
            <HStack>
              <Code text={block.code} />
            </HStack>
          )}
          off={(
            <HStack>
              <CodeDeprecated text={block.code} />
            </HStack>
          )}
        />
      );

    default:
      return null;
    }
  };

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={(
        <Card
          tag="div"
          max
          variant="active"
          offset="16"
          className={getVstack({ gap: 8 })}
        >
          {renderPreviewContent()}

          <HStack gap="8">
            <Button
              variant="outline"
              onClick={handleEdit}
            >
              {t('Edit')}
            </Button>
            <Button
              variant="outline-red"
              onClick={handleDelete}
            >
              {t('Delete')}
            </Button>
          </HStack>
        </Card>
      )}
      off={(
        <Card
          tag="div"
          max
          border="0"
          variant="active"
          offset="16"
          className={getVstack({ gap: 8 })}
        >
          {renderPreviewContent()}

          <HStack gap="8">
            <ButtonDeprecated
              theme={ButtonTheme.OUTLINE}
              onClick={handleEdit}
            >
              {t('Edit')}
            </ButtonDeprecated>
            <ButtonDeprecated
              theme={ButtonTheme.OUTLINE_RED}
              onClick={handleDelete}
            >
              {t('Delete')}
            </ButtonDeprecated>
          </HStack>
        </Card>
      )}
    />
  );
});
