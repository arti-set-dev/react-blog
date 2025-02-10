import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import CloseIcon from '@/shared/assets/icons/close-icon.svg';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { Overlay } from '../Overlay/Overlay';
import { Button } from '../../redesigned/Button/Button';
import cl from './Modal.module.scss';
import { Portal } from '../Portal/Portal';
import { VStack } from '../Stack';
import { Icon } from '../Icon/Icon';

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
      <Overlay isOpen={isOpen} onClick={closing}>
        <VStack
          role="dialog"
          aria-modal={isOpen}
          aria-hidden={!isOpen}
          onClick={onWindowClick}
          className={classNames(cl.ModalWindow, mods, [className])}
        >
          <Button
            onClick={closing}
            variant="icon"
            className={cl.ModalBtn}
            aria-label={t('close modal')}
          >
            <Icon Svg={CloseIcon} />
          </Button>
          {children}
        </VStack>
      </Overlay>
    </Portal>
  );
};
