import { useTranslation } from 'react-i18next';
import { validateBlock } from '../../../../lib/validation/validateArticleBlocks';
import { Card } from '@/shared/ui/redesigned/Card';
import { getVstack } from '@/shared/lib/stack/getVstack/getVstack';
import { Input } from '@/shared/ui/redesigned/Input';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Button } from '@/shared/ui/redesigned/Button';
import { ArticleCodeBlock } from '../../../../model/types/article';

interface EditBlockCodeProps {
  block: ArticleCodeBlock;
  onChange?: (block: ArticleCodeBlock) => void;
  onCancel?: () => void;
  onSave?: () => void;
}

export const EditBlockCode = ({
  block,
  onChange,
  onCancel,
  onSave,
}: EditBlockCodeProps) => {
  const { t } = useTranslation();
  const isValid = validateBlock(block);

  const handleCodeChange = (value: string) => {
    onChange?.({
      ...block,
      code: value,
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
        textarea
        value={block.code}
        onChange={handleCodeChange}
        placeholder={t('Insert a fragment of the code')}
      />
      <HStack gap="8">
        <Button variant="outline-red" onClick={onCancel}>{t('Cancel')}</Button>
        <Button variant="outline" onClick={onSave} disabled={!isValid}>{t('Save')}</Button>
      </HStack>
    </Card>
  );
};
