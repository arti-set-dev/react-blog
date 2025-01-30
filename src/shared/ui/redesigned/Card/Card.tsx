import { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cl from './Card.module.scss';

export type CardVariant = 'primary' | 'outline';
export type CardOffset = '0' | '8' | '16' | '24';

interface CardProps {
  className?: string;
  children: ReactNode;
  isHovered?: boolean;
  isOffset?: boolean;
  offset?: CardOffset;
  variant?: CardVariant;
}

const mapOffsetToClass: Record<CardOffset, string> = {
  0: 'offset_0',
  8: 'offset_8',
  16: 'offset_16',
  24: 'offset_24',
};

export const Card = memo((props: CardProps) => {
  const {
    className, children, isHovered, isOffset, variant = 'primary', offset = '8', ...otherProps
  } = props;
  const { t } = useTranslation();

  const offsetClass = mapOffsetToClass[offset];

  const mods: Mods = {
    [cl.hovered]: isHovered,
    [cl.offset]: isOffset,
  };

  return (
    <article {...otherProps} className={classNames(cl.Card, mods, [className, cl[variant], offsetClass])}>
      {children}
    </article>
  );
});
