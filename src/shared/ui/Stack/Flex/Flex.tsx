import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { ReactNode } from 'react';
import cl from './Flex.module.scss';

export type FlexJustify = 'start' | 'center' | 'end' | 'between';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'column';
export type FlexGap = '4' | '8' | '16' | '32';

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
}

export const Flex = (props: FlexProps) => {
  const {
    className, children, justify = 'start', align = 'center', direction = 'row', gap = '16', max = false,
  } = props;
  const { t } = useTranslation();

  const classes = [
    className,
    justifyClasses[justify],
    alignClasses[align],
    directionClasses[direction],
    gapClasses[gap],
  ];

  const mods: Mods = {
    [cl.max]: max,
  };

  return (
    <div className={classNames(cl.Flex, mods, classes)}>
      {children}
    </div>
  );
};
