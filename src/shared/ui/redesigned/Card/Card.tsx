import { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cl from './Card.module.scss';

export type CardVariant = 'primary' | 'outline' | 'inverted' | 'active';
export type CardOffset = '0' | '4' | '8' | '16' | '24';
type TagType = 'h1' | 'h2' | 'h3' | 'p' | 'strong' | 'b' | 'div';

interface CardProps {
  className?: string;
  children: ReactNode;
  isHovered?: boolean;
  isOffset?: boolean;
  offset?: CardOffset;
  variant?: CardVariant;
  tag?: TagType;
  max?: boolean;
  isOverflow?: boolean;
}

const mapOffsetToClass: Record<CardOffset, string> = {
  0: 'offset_0',
  4: 'offset_4',
  8: 'offset_8',
  16: 'offset_16',
  24: 'offset_24',
};

export const Card = memo((props: CardProps) => {
  const {
    className,
    children,
    isHovered, isOffset, variant = 'primary', offset = '8', tag = 'article', max, isOverflow = false, ...otherProps
  } = props;
  const { t } = useTranslation();

  const offsetClass = mapOffsetToClass[offset];

  const mods: Mods = {
    [cl.hovered]: isHovered,
    [cl.offset]: isOffset,
    [cl.max]: max,
    [cl.overflow]: isOverflow,
  };

  const Tag = tag;

  return (
    <Tag {...otherProps} className={classNames(cl.Card, mods, [className, cl[variant], cl[offsetClass]])}>
      {children}
    </Tag>
  );
});
