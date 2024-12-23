import React, { memo } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { useModal } from 'shared/lib/hooks/useModal/useModal';
import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';
import cl from './Drawer.module.scss';

interface DrawerProps {
  className?: string;
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

export const Drawer = memo((props: DrawerProps) => {
  const {
    className, children, isOpen, onClose, lazy,
  } = props;

  const { close, onWindowClick, isMounted } = useModal({
    isOpen,
    onClose,
  });

  if (lazy && !isMounted) {
    return null;
  }

  const mods: Mods = {
    [cl.opened]: isOpen,
  };

  return (
    <Portal>
      <Overlay onClick={close} isOpen={isOpen}>
        <div onClick={onWindowClick} className={classNames(cl.Drawer, mods, [className])}>
          {children}
        </div>
      </Overlay>
    </Portal>
  );
});
