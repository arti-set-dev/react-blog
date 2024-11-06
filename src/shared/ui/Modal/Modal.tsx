import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import CloseIcon from 'shared/assets/icons/close-icon.svg';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from '../Button/Button';
import cl from './Modal.module.scss';
import { Portal } from '../Portal/Portal';

interface ModalProps {
    className?: string;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

export const Modal: FC<ModalProps> = (props) => {
  const {
    children, className, isOpen, onClose, lazy,
  } = props;

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);

  const mods: Record<string, boolean> = {
    [cl.opened]: isOpen,
  };

  const { t } = useTranslation();

  const closeHandler = () => {
    if (onClose) {
      onClose();
    }
  };

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  const onWindowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div
        onClick={closeHandler}
        className={classNames(cl.ModalOverlay, mods, [className])}
      >
        <div onClick={onWindowClick} className={classNames(cl.ModalWindow, mods, [className])}>
          <Button onClick={closeHandler} theme={ButtonTheme.ICON} className={cl.ModalBtn} aria-label={t('close modal')}>
            <CloseIcon />
          </Button>
          {children}
        </div>
      </div>
    </Portal>
  );
};
