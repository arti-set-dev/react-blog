import { memo, ReactElement } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './SticlyContentLayout.module.scss';

interface StickyContentLayoutProps {
  className?: string;
  left?: ReactElement;
  content: ReactElement;
  right?: ReactElement;
}

export const StickyContentLayout = memo((props: StickyContentLayoutProps) => {
  const {
    className, content, left, right,
  } = props;

  return (
    <div className={classNames(cl.StickyContentLayout, {}, [className])}>
      {right && <div className={cl.left}>{left}</div>}
      <div className={cl.content}>{content}</div>
      {left && <div className={cl.right}>{right}</div>}
    </div>
  );
});
