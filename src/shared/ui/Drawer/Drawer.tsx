import React, { memo } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';
import cl from './Drawer.module.scss';

interface DrawerProps {
  className?: string;
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Drawer = memo((props: DrawerProps) => {
  const {
    className, children, isOpen, onClose,
  } = props;
  const { t } = useTranslation();

  const mods: Mods = {
    [cl.opened]: isOpen,
  };

  const onWindowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Portal>
      <Overlay onClick={onClose} isOpen={isOpen}>
        <div onClick={onWindowClick} className={classNames(cl.Drawer, mods, [className])}>
          {children}
        </div>
      </Overlay>
    </Portal>
  );
});
