import { useTranslation } from 'react-i18next';
import { ArticleImageBlock } from '../../../../model/types/article';
import { validateBlock } from '../../../../lib/validation/validateArticleBlocks';
import { Card } from '@/shared/ui/redesigned/Card';
import { getVstack } from '@/shared/lib/stack/getVstack/getVstack';
import { Input } from '@/shared/ui/redesigned/Input';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Button } from '@/shared/ui/redesigned/Button';
import { ToggleFeatures } from '@/shared/lib/features';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';

import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';

interface EditBlockImageProps {
  block: ArticleImageBlock;
  onChange?: (block: ArticleImageBlock) => void;
  onCancel?: () => void;
  onSave?: () => void;
}

export const EditBlockImage = ({
  block,
  onChange,
  onCancel,
  onSave,
}: EditBlockImageProps) => {
  const { t } = useTranslation();
  const isValid = validateBlock(block);

  const handleSrcChange = (value: string) => {
    onChange?.({
      ...block,
      src: value,
    });
  };

  const handleTitleChange = (value: string) => {
    onChange?.({
      ...block,
      title: value,
    });
  };

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={(
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
            value={block.src}
            onChange={handleSrcChange}
            variant="outlined"
            placeholder={t('Enter URL images')}
          />
          <Input
            value={block.title}
            onChange={handleTitleChange}
            placeholder={t('Enter the description of the image')}
          />
          <HStack gap="8">
            <Button variant="outline-red" onClick={onCancel}>{t('Cancel')}</Button>
            <Button variant="outline" onClick={onSave} disabled={!isValid}>{t('Save')}</Button>
          </HStack>
        </Card>
      )}
      off={(
        <Card
          position="sticky"
          positionOffset={75}
          tag="div"
          max
          border="0"
          variant="outline-inverted-bg"
          offset="16"
          className={getVstack({ gap: 16 })}
        >
          <InputDeprecated
            value={block.src}
            onChange={handleSrcChange}
            placeholder={t('Enter URL images')}
          />
          <InputDeprecated
            value={block.title}
            onChange={handleTitleChange}
            placeholder={t('Enter the description of the image')}
          />
          <HStack gap="8">
            <ButtonDeprecated
              theme={ButtonTheme.OUTLINE_RED}
              onClick={onCancel}
            >
              {t('Cancel')}
            </ButtonDeprecated>
            <ButtonDeprecated
              theme={ButtonTheme.OUTLINE}
              onClick={onSave}
              disabled={!isValid}
            >
              {t('Save')}
            </ButtonDeprecated>
          </HStack>
        </Card>
      )}
    />
  );
};
