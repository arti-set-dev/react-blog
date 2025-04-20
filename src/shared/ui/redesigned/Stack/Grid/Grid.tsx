import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Grid.module.scss';

export type GridTagType =
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
  | 'form';

export type GridGap = '4' | '8' | '16' | '24' | '32';

type ElementType<T extends keyof JSX.IntrinsicElements> = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
> &
  JSX.IntrinsicElements[T];

export interface GridProps extends Omit<ElementType<GridTagType>, 'ref'> {
  className?: string;
  children: ReactNode;
  gap?: GridGap;
  fullWidth?: boolean;
  fullHeight?: boolean;
  tag?: GridTagType;
  minmax?: {
    min: number;
    max: string;
  };
}

const gapClasses: Record<GridGap, string> = {
  4: cls.gap4,
  8: cls.gap8,
  16: cls.gap16,
  24: cls.gap24,
  32: cls.gap32,
};

const tagClasses: Record<GridTagType, string> = {
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
};

export const Grid = (props: GridProps) => {
  const {
    className,
    children,
    gap,
    fullWidth,
    fullHeight,
    tag = 'div',
    minmax = { min: 270, max: 1 },
    ...otherProps
  } = props;

  const classes = [
    className,
    gap && gapClasses[gap],
    tagClasses[tag],
  ];

  const mods: Mods = {
    [cls.fullWidth]: fullWidth,
    [cls.fullHeight]: fullHeight,
  };

  const Tag = tag;

  return (
    <Tag
      style={{
        gridTemplateColumns: `repeat(auto-fill, minmax(${minmax.min}px, ${minmax.max}))`,
      }}
      className={classNames(cls.Grid, mods, classes)}
      {...otherProps}
    >
      {children}
    </Tag>
  );
};
