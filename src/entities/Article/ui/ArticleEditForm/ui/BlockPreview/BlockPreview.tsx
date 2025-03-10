import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleCodeBlock, ArticleImageBlock, ArticleTextBlock } from '../../../../model/types/article';
import { Text } from '@/shared/ui/redesigned/Text';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { LazyImage } from '@/shared/ui/redesigned/LazyImage';
import { Code } from '@/shared/ui/redesigned/Code';
import { Card } from '@/shared/ui/redesigned/Card';
import { getVstack } from '@/shared/lib/stack/getVstack/getVstack';
import { Button } from '@/shared/ui/redesigned/Button';

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
      );

    case 'IMAGE':
      return (
        <>
          <LazyImage
            height={350}
            src={block.src}
            alt={block.title}
          />
          {block.title && (
            <Text size="m" align="center">{block.title}</Text>
          )}
        </>
      );

    case 'CODE':
      return (
        <HStack>
          <Code text={block.code} />
        </HStack>
      );

    default:
      return null;
    }
  };

  return (
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
  );
});
