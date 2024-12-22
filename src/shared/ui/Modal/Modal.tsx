import React, {
  FC, useCallback, useEffect, useState, ReactNode,
} from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import CloseIcon from 'shared/assets/icons/close-icon.svg';
import { useTranslation } from 'react-i18next';
import { Overlay } from '../Overlay/Overlay';
import { Button, ButtonTheme } from '../Button/Button';
import cl from './Modal.module.scss';
import { Portal } from '../Portal/Portal';

interface ModalProps {
    className?: string;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
    children: ReactNode;
}

export const Modal = (props: ModalProps) => {
  const {
    children, className, isOpen, onClose, lazy,
  } = props;

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);

  const mods: Mods = {
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
      onClose?.();
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
      <Overlay
        isOpen={isOpen}
        onClick={closeHandler}
      >
        <div onClick={onWindowClick} className={classNames(cl.ModalWindow, mods, [className])}>
          <Button onClick={closeHandler} theme={ButtonTheme.ICON} className={cl.ModalBtn} aria-label={t('close modal')}>
            <CloseIcon />
          </Button>
          {children}
        </div>
      </Overlay>
    </Portal>
  );
};
