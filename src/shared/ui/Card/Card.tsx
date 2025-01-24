import { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cl from './Card.module.scss';

interface CardProps {
  className?: string;
  children: ReactNode;
  isHovered?: boolean;
  isOffset?: boolean;
}

export const Card = memo((props: CardProps) => {
  const {
    className, children, isHovered, isOffset, ...otherProps
  } = props;
  const { t } = useTranslation();

  const mods: Mods = {
    [cl.hovered]: isHovered,
    [cl.offset]: isOffset,
  };

  return (
    <article {...otherProps} className={classNames(cl.Card, mods, [className])}>
      {children}
    </article>
  );
});
