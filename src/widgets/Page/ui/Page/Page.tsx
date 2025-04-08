import {
  memo, MutableRefObject, ReactNode, useRef, UIEvent, useEffect,
} from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { TestsProps } from '@/shared/types/tests';
import { StateSchema } from '@/app/providers/StoreProvider';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';
import cl from './Page.module.scss';
import { toggleFeatures } from '@/shared/lib/features';
import { Footer } from '../../../Footer';
import { getScrollByPath, ScrollSaveActions } from '@/features/scrollSave';

interface PageProps extends TestsProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}

export const Page = memo((props: PageProps) => {
  const { className, children, onScrollEnd } = props;
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const scrollPosition = useSelector((state: StateSchema) => getScrollByPath(state, pathname));

  const pageClass = toggleFeatures({
    name: 'isAppRedesigned',
    off: () => cl.Page,
    on: () => cl.PageRedesigned,
  });

  const footer = toggleFeatures({
    name: 'isAppRedesigned',
    off: () => <Footer />,
    on: () => null,
  });

  useInfiniteScroll({
    triggerRef,
    wrapperRef: undefined,
    callback: onScrollEnd,
  });

  useInitialEffect(() => {
    document.documentElement.scrollTop = scrollPosition;
  });

  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, [pathname]);

  const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
    dispatch(
      ScrollSaveActions.setScrollPosition({
        position: document.documentElement.scrollTop,
        path: pathname,
      }),
    );
  }, 1000);

  return (
    <main
      data-testid={props['data-testid'] ?? 'Page'}
      onScroll={onScroll}
      ref={wrapperRef}
      className={classNames(pageClass, {}, [className])}
    >
      {children}
      {onScrollEnd && <div className={cl.TriggerElem} ref={triggerRef} />}
      {footer}
    </main>
  );
});
