import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import CloseIcon from '@/shared/assets/icons/close-icon.svg';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
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

  const { closing, onWindowClick, isMounted } = useModal({
    isOpen,
    onClose,
  });

  const { t } = useTranslation();

  if (lazy && !isMounted) {
    return null;
  }

  const mods: Mods = {
    [cl.opened]: isOpen,
  };

  return (
    <Portal>
      <Overlay
        isOpen={isOpen}
        onClick={closing}
      >
        <div onClick={onWindowClick} className={classNames(cl.ModalWindow, mods, [className])}>
          <Button onClick={closing} theme={ButtonTheme.ICON} className={cl.ModalBtn} aria-label={t('close modal')}>
            <CloseIcon />
          </Button>
          {children}
        </div>
      </Overlay>
    </Portal>
  );
};
