import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';
import { ArticleTextBlock } from '../../../../model/types/article';
import { validateBlock } from '../../../../lib/validation/validateArticleBlocks';
import { Card } from '@/shared/ui/redesigned/Card';
import { getVstack } from '@/shared/lib/stack/getVstack/getVstack';
import { Input } from '@/shared/ui/redesigned/Input';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Button } from '@/shared/ui/redesigned/Button';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { ToggleFeatures } from '@/shared/lib/features';

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
  const { t } = useTranslation('article-edit');
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
    <ToggleFeatures
      feature="isAppRedesigned"
      on={(
        <>
          <BrowserView renderWithFragment>
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
                data-testid="BlockForm.Title"
              />
              <Input
                textarea
                value={block.paragraphs.join('\n')}
                onChange={handleParagraphsChange}
                placeholder={t('Enter the heading text')}
                data-testid="BlockForm.Text"
              />
              <HStack gap="8">
                <Button variant="outline-red" onClick={onCancel}>{t('Cancel')}</Button>
                <Button variant="outline" onClick={onSave} disabled={!isValid}>{t('Save')}</Button>
              </HStack>
            </Card>
          </BrowserView>
          <MobileView renderWithFragment>
            <Card
              position="sticky"
              positionOffset={200}
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
                data-testid="BlockForm.Title"
              />
              <Input
                textarea
                value={block.paragraphs.join('\n')}
                onChange={handleParagraphsChange}
                placeholder={t('Enter the heading text')}
                data-testid="BlockForm.Text"
              />
              <HStack gap="8">
                <Button variant="outline-red" onClick={onCancel}>{t('Cancel')}</Button>
                <Button variant="outline" onClick={onSave} disabled={!isValid}>{t('Save')}</Button>
              </HStack>
            </Card>
          </MobileView>
        </>
      )}
      off={(
        <>
          <BrowserView renderWithFragment>
            <Card
              border="0"
              position="sticky"
              positionOffset={75}
              tag="div"
              max
              variant="outline-inverted-bg"
              offset="16"
              className={getVstack({ gap: 16 })}
            >
              <InputDeprecated
                value={block.title}
                onChange={handleTitleChange}
                placeholder={t('Enter the heading of the block')}
                data-testid="BlockForm.Title"
              />
              <InputDeprecated
                textarea
                value={block.paragraphs.join('\n')}
                onChange={handleParagraphsChange}
                placeholder={t('Enter the heading text')}
                data-testid="BlockForm.Text"
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
          </BrowserView>
          <MobileView renderWithFragment>
            <Card
              border="0"
              position="sticky"
              positionOffset={150}
              tag="div"
              max
              variant="outline-inverted-bg"
              offset="16"
              className={getVstack({ gap: 16 })}
            >
              <InputDeprecated
                value={block.title}
                onChange={handleTitleChange}
                placeholder={t('Enter the heading of the block')}
                data-testid="BlockForm.Title"
              />
              <InputDeprecated
                textarea
                value={block.paragraphs.join('\n')}
                onChange={handleParagraphsChange}
                placeholder={t('Enter the heading text')}
                data-testid="BlockForm.Text"
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
          </MobileView>
        </>
      )}
    />
  );
};
