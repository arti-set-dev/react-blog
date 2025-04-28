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

  const fallbackCopyTextToClipboard = useCallback((text: string) => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;

      // Avoid scrolling to bottom
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);

      if (successful) {
        setCopySuccess('success');
      } else {
        setCopySuccess('error');
      }

      setTimeout(() => setCopySuccess(undefined), 2000);
    } catch (err) {
      setCopySuccess('error');
      setTimeout(() => setCopySuccess(undefined), 2000);
    }
  }, []);

  const onCopy = useCallback(() => {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text);
      return;
    }

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopySuccess('success');
        setTimeout(() => setCopySuccess(undefined), 2000);
      })
      .catch((err) => {
        fallbackCopyTextToClipboard(text);
      });
  }, [text, fallbackCopyTextToClipboard]);

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
