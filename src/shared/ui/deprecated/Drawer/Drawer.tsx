import React, { memo, useCallback, useEffect } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import {
  useAnimationLibs,
  AnimationProvider,
} from '@/shared/lib/components/AnimationProvider';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { Portal } from '../../redesigned/Portal/Portal';
import { Overlay } from '../../redesigned/Overlay/Overlay';
import cl from './Drawer.module.scss';

interface DrawerProps {
  className?: string;
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

const height = window.innerHeight - 0;

/**
 * Outdated, use the component from the Redesigned folder
 * @deprecated
 */
const DrawerContent = memo((props: DrawerProps) => {
  const { Spring, Gesture } = useAnimationLibs();
  const [{ y }, api] = Spring.useSpring(() => ({ y: height }));
  const {
    className, children, isOpen, onClose, lazy,
  } = props;

  const openDrawer = useCallback(() => {
    api.start({ y: 0, immediate: false });
  }, [api]);

  useEffect(() => {
    if (isOpen) {
      openDrawer();
    }
  }, [isOpen, openDrawer]);

  const close = (velocity = 0) => {
    api.start({
      y: height,
      immediate: false,
      config: { ...Spring.config.stiff, velocity },
      onResolve: onClose,
    });
  };

  const bind = Gesture.useDrag(
    ({
      last,
      velocity: [, vy],
      direction: [, dy],
      movement: [, my],
      cancel,
    }) => {
      if (my < -70) cancel();

      if (last) {
        if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
          close();
        } else {
          openDrawer();
        }
      } else {
        api.start({ y: my, immediate: true });
      }
    },
    {
      from: () => [0, y.get()],
      filterTaps: true,
      bounds: { top: 0 },
      rubberband: true,
    },
  );

  const { closing, onWindowClick, isMounted } = useModal({
    isOpen,
    onClose,
  });

  if (lazy && !isMounted) {
    return null;
  }

  const mods: Mods = {
    [cl.opened]: isOpen,
  };

  const display = y.to((py) => (py < height ? 'block' : 'none'));

  return (
    <Portal>
      <Overlay onClick={closing} isOpen={isOpen} overflowOff>
        <Spring.a.div
          style={{ display, translateY: '0%', y }}
          {...bind()}
          onClick={onWindowClick}
          className={classNames(cl.Drawer, mods, [className, cl.sheet])}
        >
          {children}
        </Spring.a.div>
      </Overlay>
    </Portal>
  );
});

const DrawerAsync = (props: DrawerProps) => {
  const { isLoaded } = useAnimationLibs();

  if (!isLoaded) {
    return null;
  }

  return <DrawerContent {...props} />;
};

export const Drawer = (props: DrawerProps) => (
  <AnimationProvider>
    <DrawerAsync {...props} />
  </AnimationProvider>
);
