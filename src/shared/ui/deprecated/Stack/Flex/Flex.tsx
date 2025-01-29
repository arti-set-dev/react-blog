import { useTranslation } from 'react-i18next';
import { ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cl from './Flex.module.scss';

export type FlexJustify = 'start' | 'center' | 'end' | 'between';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'column';
export type FlexGap = '4' | '8' | '16' | '32';
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
  | 'li';

const justifyClasses: Record<FlexJustify, string> = {
  start: cl.justifyStart,
  center: cl.justifyCenter,
  between: cl.justifyBetween,
  end: cl.justifyEnd,
};

const alignClasses: Record<FlexAlign, string> = {
  start: cl.alignStart,
  center: cl.alignCenter,
  end: cl.alignEnd,
};

const directionClasses: Record<FlexDirection, string> = {
  column: cl.directionColumn,
  row: cl.directionRow,
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
};

const gapClasses: Record<FlexGap, string> = {
  16: cl.gap16,
  32: cl.gap32,
  4: cl.gap4,
  8: cl.gap8,
};

export interface FlexProps {
  className?: string;
  children: ReactNode;
  justify?: FlexJustify;
  align?: FlexAlign;
  direction: FlexDirection;
  gap?: FlexGap;
  max?: boolean;
  tag?: FlexTagType;
}

/**
 * Outdated, use the component from the Redesigned folder
 * @deprecated
 */
export const Flex = (props: FlexProps) => {
  const {
    className,
    children,
    justify = 'start',
    align = 'center',
    direction = 'row',
    gap = '16',
    max = false,
    tag = 'div',
    ...otherProps
  } = props;
  const { t } = useTranslation();

  const classes = [
    className,
    justifyClasses[justify],
    alignClasses[align],
    directionClasses[direction],
    gapClasses[gap],
    tagClasses[tag],
  ];

  const mods: Mods = {
    [cl.max]: max,
  };

  const Tag = tag;

  return (
    <Tag className={classNames(cl.Flex, mods, classes)} {...otherProps}>
      {children}
    </Tag>
  );
};
