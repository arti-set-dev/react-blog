import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CopyIcon from '@/shared/assets/icons/copy-icon.svg';
import WarningIcon from '@/shared/assets/icons/warning-icon.svg';
import CheckIconSuccess from '@/shared/assets/icons/check-icon.svg';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { Card } from '../Card/Card';
import { VStack } from '../Stack';

interface CodeProps {
  className?: string;
  text: string;
}

type CopyStatus = 'success' | 'error';

export const Code = memo((props: CodeProps) => {
  const { className, text } = props;
  const { t } = useTranslation();
  const [copySuccess, setCopySuccess] = useState<CopyStatus | undefined>(
    undefined,
  );

  const onCopy = useCallback(() => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopySuccess('success');
        setTimeout(() => setCopySuccess(undefined), 2000);
      })
      .catch((err) => {
        setCopySuccess('error');
        console.error('Failed to copy: ', err);
      });
  }, [text]);

  return (
    <Card offset="24" max tag="pre" variant="outline-inverted">
      <Button
        onClick={onCopy}
        variant="icon"
        position="top-right"
        aria-label={t('Copy')}
      >
        {!copySuccess && <Icon Svg={CopyIcon} width="100%" height="100%" />}

        {copySuccess === 'success' && (
          <Icon Svg={CheckIconSuccess} width="100%" height="100%" />
        )}

        {copySuccess === 'error' && (
          <Icon
            Svg={WarningIcon}
            width="100%"
            height="100%"
          />
        )}
      </Button>
      <VStack overflow="auto">
        <code>{text}</code>
      </VStack>
    </Card>
  );
});
