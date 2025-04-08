import { memo, ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cl from './Card.module.scss';

export type CardVariant =
  'primary' | 'outline' | 'outline-inverted' | 'outline-inverted-bg' | 'inverted' | 'active' | 'transparent' | 'accent';
export type CardPosition = 'absolute' | 'sticky' | 'fixed';
export type CardPositionCorner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'bottom';
export type CardOffset = '0' | '4' | '8' | '16' | '24';
type TagType = 'article' | 'aside' | 'h3' | 'main' | 'div' | 'form' | 'li' | 'pre' | 'header' | 'footer' | 'section';
export type BorderRadius = '0' | '4' | '8' | '10' | '12' | '20' | 'circle';
export type CardAnimation = 'show';

interface CardProps {
  className?: string;
  children: ReactNode;
  isHovered?: boolean;
  isOffset?: boolean;
  flexBasis?: string;
  offset?: CardOffset;
  variant?: CardVariant;
  tag?: TagType;
  max?: boolean;
  animation?: CardAnimation | string;
  isOverflow?: boolean;
  border?: BorderRadius;
  height?: number | string;
  width?: number | string;
  maxWidth?: number | string;
  position?: CardPosition;
  positionCorner?: CardPositionCorner;
  positionOffset?: number | string
  isHidden?: boolean;
}

const mapBorderRadius: Record<BorderRadius, string> = {
  0: 'radius_0',
  4: 'radius_4',
  8: 'radius_8',
  10: 'radius_10',
  12: 'radius_12',
  20: 'radius_20',
  circle: 'radius_circle',
};

const mapOffsetToClass: Record<CardOffset, string> = {
  0: 'offset_0',
  4: 'offset_4',
  8: 'offset_8',
  16: 'offset_16',
  24: 'offset_24',
};

export const Card = memo((props: CardProps) => {
  const {
    height,
    className,
    children,
    isHovered,
    isOffset,
    flexBasis,
    border = '20',
    variant = 'primary',
    offset = '8',
    tag = 'article',
    max,
    width,
    position = '',
    positionCorner = '',
    positionOffset,
    animation = '',
    maxWidth,
    isOverflow = false,
    isHidden,
    ...otherProps
  } = props;

  const offsetClass = mapOffsetToClass[offset];
  const borderClass = mapBorderRadius[border];
  const mods: Mods = {
    [cl.hovered]: isHovered,
    [cl.offset]: isOffset,
    [cl.max]: max,
    [cl.overflow]: isOverflow,
    [cl.isHidden]: isHidden,
  };

  const Tag = tag;

  return (
    <Tag
      {...otherProps}
      className={classNames(
        cl.Card,
        mods,
        [className, cl[variant], cl[offsetClass], cl[borderClass], cl[position], cl[positionCorner], cl[animation]],
      )}
      style={{
        height, width, flexBasis, bottom: positionOffset, maxWidth,
      }}
    >
      {children}
    </Tag>
  );
});
