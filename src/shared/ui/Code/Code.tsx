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
        setCopySuccess(CopyStatus.SUCCESS);
        setTimeout(() => setCopySuccess(undefined), 2000);
      })
      .catch((err) => {
        setCopySuccess(CopyStatus.ERROR);
        console.error('Failed to copy: ', err);
      });
  }, [text]);

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
