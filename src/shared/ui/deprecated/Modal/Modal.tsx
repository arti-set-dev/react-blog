import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import CloseIcon from '@/shared/assets/icons/close-icon.svg';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { Button, ButtonTheme } from '../Button/Button';
import cl from './Modal.module.scss';
import { Portal } from '../../redesigned/Portal';
import { Overlay } from '../../redesigned/Overlay';

interface ModalProps {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
  children: ReactNode;
  'data-testid'?: string;
}

export const Modal = (props: ModalProps) => {
  const {
    children, className, isOpen, onClose, lazy, 'data-testid': dataTestId,
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
      <Overlay isOpen={isOpen} onClick={closing}>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <div
          role="dialog"
          aria-modal={isOpen}
          aria-hidden={!isOpen}
          onClick={onWindowClick}
          className={classNames(cl.ModalWindow, mods, [className])}
          data-testid={dataTestId}
        >
          <Button
            onClick={closing}
            theme={ButtonTheme.ICON}
            className={cl.ModalBtn}
            aria-label={t('close modal')}
          >
            <CloseIcon className={cl.ModalBtnIcon} />
          </Button>
          {children}
        </div>
      </Overlay>
    </Portal>
  );
};
