import { useTranslation } from 'react-i18next';
import { ArticleTextBlock } from '../../../../model/types/article';
import { validateBlock } from '../../../../lib/validation/validateArticleBlocks';
import { Card } from '@/shared/ui/redesigned/Card';
import { getVstack } from '@/shared/lib/stack/getVstack/getVstack';
import { Input } from '@/shared/ui/redesigned/Input';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Button } from '@/shared/ui/redesigned/Button';

interface EditBlockTextProps {
  block: ArticleTextBlock;
  onChange?: (block: ArticleTextBlock) => void;
  onCancel?: () => void;
  onSave?: () => void;
}

export const EditBlockText = ({
  block,
  onChange,
  onCancel,
  onSave,
}: EditBlockTextProps) => {
  const { t } = useTranslation();
  const isValid = validateBlock(block);

  const handleTitleChange = (value: string) => {
    onChange?.({
      ...block,
      title: value,
    });
  };

  const handleParagraphsChange = (value: string) => {
    onChange?.({
      ...block,
      paragraphs: value.split('\n'),
    });
  };

  return (
    <Card
      position="sticky"
      positionOffset={100}
      tag="div"
      max
      variant="outline-inverted-bg"
      offset="16"
      className={getVstack({ gap: 16 })}
    >
      <Input
        value={block.title}
        onChange={handleTitleChange}
        variant="outlined"
        placeholder={t('Enter the heading of the block')}
      />
      <Input
        textarea
        value={block.paragraphs.join('\n')}
        onChange={handleParagraphsChange}
        placeholder={t('Enter the heading text')}
      />
      <HStack gap="8">
        <Button variant="outline-red" onClick={onCancel}>{t('Cancel')}</Button>
        <Button variant="outline" onClick={onSave} disabled={!isValid}>{t('Save')}</Button>
      </HStack>
    </Card>
  );
};
