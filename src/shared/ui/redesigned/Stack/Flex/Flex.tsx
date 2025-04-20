import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Flex.module.scss';

export type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around';
export type FlexAlign = 'start' | 'center' | 'end' | 'stretch';
export type FlexDirection = 'row' | 'column' | 'initial';
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
  | 'figure'
  | 'form'
  | 'span';

export type FlexRole = 'dialog';
export type OverflowType = 'initial' | 'hidden' | 'scroll' | 'auto';
export type ListVariant = 'number' | 'marker';
export type FlexWrap = 'wrap' | 'nowrap' | 'wrap-reverse';
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

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
  initial: cls.directionInitial,
};

const flexWrapClasses: Record<FlexWrap, string> = {
  wrap: cls.flexWrapWrap,
  nowrap: cls.flexWrapNowrap,
  'wrap-reverse': cls.flexWrapWrapReverse,
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
  form: '',
  span: '',
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

type ResponsiveProps = {
  justify?: FlexJustify;
  align?: FlexAlign;
  direction?: FlexDirection;
  gap?: FlexGap;
  flexWrap?: FlexWrap;
};

export interface FlexProps extends Omit<ElementType<FlexTagType>, 'ref'> {
  className?: string;
  children: ReactNode;
  justify?: FlexJustify;
  align?: FlexAlign;
  direction?: FlexDirection;
  flexWrap?: FlexWrap;
  gap?: FlexGap;
  fullWidth?: boolean;
  fullHeight?: boolean;
  tag?: FlexTagType;
  role?: string;
  overflow?: OverflowType;
  width?: string | number;
  height?: string | number;
  flexBasis?: string;
  listVariant?: ListVariant;
  responsive?: {
    [key in Breakpoint]?: ResponsiveProps;
  };
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
    height,
    flexBasis,
    listVariant,
    responsive,
    flexWrap,
    ...otherProps
  } = props;

  const classes = [
    className,
    justifyClasses[justify],
    alignClasses[align],
    directionClasses[direction],
    flexWrap && flexWrapClasses[flexWrap],
    gap && gapClasses[gap],
    tagClasses[tag],
    overflow && overflowClasses[overflow],
    listVariant && cls[listVariant],
  ];

  if (responsive) {
    Object.entries(responsive).forEach(([breakpoint, values]) => {
      if (values.direction) {
        classes.push(cls[`${breakpoint}_direction_${values.direction}`]);
      }
      if (values.justify) {
        classes.push(cls[`${breakpoint}_justify_${values.justify}`]);
      }
      if (values.align) {
        classes.push(cls[`${breakpoint}_align_${values.align}`]);
      }
      if (values.gap) {
        classes.push(cls[`${breakpoint}_gap_${values.gap}`]);
      }
      if (values.flexWrap) {
        classes.push(cls[`${breakpoint}_flexWrap_${values.flexWrap}`]);
      }
    });
  }

  const mods: Mods = {
    [cls.fullWidth]: fullWidth,
    [cls.fullHeight]: fullHeight,
  };

  const Tag = tag;

  return (
    <Tag
      style={{ maxWidth: width, flexBasis, height }}
      role={role}
      className={classNames(cls.Flex, mods, classes)}
      {...otherProps}
    >
      {children}
    </Tag>
  );
};
