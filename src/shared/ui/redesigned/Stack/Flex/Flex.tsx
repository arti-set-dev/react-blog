import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Flex.module.scss';

export type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around';
export type FlexAlign = 'start' | 'center' | 'end' | 'stretch';
export type FlexDirection = 'row' | 'column';
export type FlexGap = '4' | '8' | '16' | '24' | '32';
export type FlexTagType =
  | 'section'
  | 'article'
  | 'aside'
  | 'footer'
  | 'header'
  | 'main'
  | 'nav'
  | 'div'
  | 'ul'
  | 'li'
  | 'figure';

export type FlexRole = 'dialog';
export type OverflowType = 'initial' | 'hidden' | 'scroll' | 'auto';

const overflowClasses: Record<OverflowType, string> = {
  initial: cls.overflowInitial,
  hidden: cls.overflowHidden,
  scroll: cls.overflowScroll,
  auto: cls.overflowAuto,
};

const justifyClasses: Record<FlexJustify, string> = {
  start: cls.justifyStart,
  center: cls.justifyCenter,
  end: cls.justifyEnd,
  between: cls.justifyBetween,
  around: cls.justifyAround,
};

const alignClasses: Record<FlexAlign, string> = {
  start: cls.alignStart,
  center: cls.alignCenter,
  end: cls.alignEnd,
  stretch: cls.alignStretch,
};

const directionClasses: Record<FlexDirection, string> = {
  row: cls.directionRow,
  column: cls.directionColumn,
};

const tagClasses: Record<FlexTagType, string> = {
  article: '',
  aside: '',
  div: '',
  footer: '',
  header: '',
  li: '',
  main: '',
  nav: '',
  section: '',
  ul: '',
  figure: '',
};

const gapClasses: Record<FlexGap, string> = {
  4: cls.gap4,
  8: cls.gap8,
  16: cls.gap16,
  24: cls.gap24,
  32: cls.gap32,
};

type ElementType<T extends keyof JSX.IntrinsicElements> = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
> &
  JSX.IntrinsicElements[T];

export interface FlexProps extends Omit<ElementType<FlexTagType>, 'ref'> {
  className?: string;
  children: ReactNode;
  justify?: FlexJustify;
  align?: FlexAlign;
  direction?: FlexDirection;
  gap?: FlexGap;
  fullWidth?: boolean;
  fullHeight?: boolean;
  tag?: FlexTagType;
  role?: string;
  overflow?: OverflowType;
  width?: string | number;
  flexBasis?: string;
}

export const Flex = (props: FlexProps) => {
  const {
    className,
    children,
    justify = 'start',
    align = 'center',
    direction = 'row',
    gap,
    fullWidth,
    fullHeight,
    tag = 'div',
    role,
    overflow = 'initial',
    width,
    flexBasis,
    ...otherProps
  } = props;

  const classes = [
    className,
    justifyClasses[justify],
    alignClasses[align],
    directionClasses[direction],
    gap && gapClasses[gap],
    tagClasses[tag],
    overflow && overflowClasses[overflow],
  ];

  const mods: Mods = {
    [cls.fullWidth]: fullWidth,
    [cls.fullHeight]: fullHeight,
  };

  const Tag = tag;

  return (
    <Tag
      style={{ maxWidth: width, flexBasis }}
      role={role}
      className={classNames(cls.Flex, mods, classes)}
      {...otherProps}
    >
      {children}
    </Tag>
  );
};
