import { useTranslation } from 'react-i18next';
import { MobileView, BrowserView } from 'react-device-detect';
import { validateBlock } from '../../../../lib/validation/validateArticleBlocks';
import { Card } from '@/shared/ui/redesigned/Card';
import { getVstack } from '@/shared/lib/stack/getVstack/getVstack';
import { Input } from '@/shared/ui/redesigned/Input';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Button } from '@/shared/ui/redesigned/Button';
import { ArticleCodeBlock } from '../../../../model/types/article';
import { ToggleFeatures } from '@/shared/lib/features';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';

import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';

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
  const { t } = useTranslation('article-edit');
  const isValid = validateBlock(block);

  const handleCodeChange = (value: string) => {
    onChange?.({
      ...block,
      code: value,
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
                textarea
                value={block.code}
                onChange={handleCodeChange}
                placeholder={t('Insert a fragment of the code')}
                data-testid="BlockForm.Code"
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
                textarea
                value={block.code}
                onChange={handleCodeChange}
                placeholder={t('Insert a fragment of the code')}
                data-testid="BlockForm.Code"
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
              position="sticky"
              positionOffset={100}
              tag="div"
              max
              border="0"
              variant="outline-inverted-bg"
              offset="16"
              className={getVstack({ gap: 16 })}
            >
              <InputDeprecated
                textarea
                value={block.code}
                onChange={handleCodeChange}
                placeholder={t('Insert a fragment of the code')}
                data-testid="BlockForm.Code"
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
              position="sticky"
              positionOffset={150}
              tag="div"
              max
              border="0"
              variant="outline-inverted-bg"
              offset="16"
              className={getVstack({ gap: 16 })}
            >
              <InputDeprecated
                textarea
                value={block.code}
                onChange={handleCodeChange}
                placeholder={t('Insert a fragment of the code')}
                data-testid="BlockForm.Code"
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
