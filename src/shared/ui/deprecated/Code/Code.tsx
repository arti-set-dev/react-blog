import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '../Icon';
import { classNames } from '@/shared/lib/classNames/classNames';
import CopyIcon from '@/shared/assets/icons/copy-icon.svg';
import WarningIcon from '@/shared/assets/icons/warning-icon.svg';
import CheckIconSuccess from '@/shared/assets/icons/check-icon.svg';
import { Button, ButtonTheme } from '../Button/Button';
import cl from './Code.module.scss';

interface CodeProps {
  className?: string;
  text: string;
}

enum CopyStatus {
  SUCCESS = 'success',
  ERROR = 'error',
}

/**
 * Outdated, use the component from the Redesigned folder
 * @deprecated
 */
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
        setCopySuccess(CopyStatus.SUCCESS);
      } else {
        setCopySuccess(CopyStatus.ERROR);
      }

      setTimeout(() => setCopySuccess(undefined), 2000);
    } catch (err) {
      setCopySuccess(CopyStatus.ERROR);
      console.error('Ошибка при запасном копировании:', err);
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
        setCopySuccess(CopyStatus.SUCCESS);
        setTimeout(() => setCopySuccess(undefined), 2000);
      })
      .catch((err) => {
        console.error('Ошибка при копировании:', err);
        fallbackCopyTextToClipboard(text);
      });
  }, [text, fallbackCopyTextToClipboard]);

  return (
    <pre className={classNames(cl.Code, {}, [className])}>
      <Button
        onClick={onCopy}
        theme={ButtonTheme.ICON}
        className={cl.CopyBtn}
        aria-label={t('Copy')}
      >
        {!copySuccess && <Icon Svg={CopyIcon} width="100%" height="100%" />}

        {copySuccess === CopyStatus.SUCCESS && (
          <Icon className={cl.CheckIconSuccess} Svg={CheckIconSuccess} width="100%" height="100%" />
        )}

        {copySuccess === CopyStatus.ERROR && (
          <Icon
            className={cl.WarningIcon}
            Svg={WarningIcon}
            width="100%"
            height="100%"
          />
        )}
      </Button>
      <div className={cl.Overlay}>
        <code>{text}</code>
      </div>
    </pre>
  );
});
