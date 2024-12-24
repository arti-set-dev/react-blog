import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './Text.module.scss';

export enum TextAlign {
  CENTER = 'center',
  LEFT = 'left',
  RIGHT = 'right',
}

export enum TextSize {
  S = 'size-s',
  XS = 'size-xs',
  M = 'size-m',
  L = 'size-l',
  XL = 'size-xl',
}

export enum TextTheme {
  ERROR = 'error',
  PRIMARY = 'primary',
  INVERTED = 'inverted',
}

export enum TextWeight {
  BOLD = 'bold',
  REGULAR = 'regular',
}

type TagType = 'h1' | 'h2' | 'h3' | 'p' | 'strong' | 'b' | 'div';

interface TextProps {
    className?: string;
    size?: TextSize;
    theme?: TextTheme;
    weight?: TextWeight;
    align?: TextAlign;
    children?: React.ReactNode;
    tag?: TagType;
    'data-testid'?: string;
}

export const Text = memo((props: TextProps) => {
  const {
    className,
    size = TextSize.S,
    theme = TextTheme.PRIMARY,
    weight = TextWeight.REGULAR, align = TextAlign.LEFT, children, tag = 'div', 'data-testid': dataTestId = 'Text',
  } = props;

  const Tag = tag;

  return (
    <Tag
      data-testid={`${dataTestId}.Tag`}
      className={classNames(cl.Text, {}, [className, cl[weight], cl[size], cl[theme], cl[align]])}
    >
      {children}
    </Tag>
  );
});
