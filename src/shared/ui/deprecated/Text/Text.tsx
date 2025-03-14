import { memo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
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

export type TextCropped = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

type TagType = 'h1' | 'h2' | 'h3' | 'p' | 'strong' | 'b' | 'div';

interface TextProps {
  className?: string;
  size?: TextSize;
  theme?: TextTheme;
  weight?: TextWeight;
  align?: TextAlign;
  cropped?: TextCropped;
  children?: React.ReactNode;
  tag?: TagType;
  'data-testid'?: string;
}

const mapTextCropped: Record<TextCropped, string> = {
  1: 'cropped_1',
  2: 'cropped_2',
  3: 'cropped_3',
  4: 'cropped_4',
  5: 'cropped_5',
  6: 'cropped_6',
  7: 'cropped_7',
  8: 'cropped_8',
  9: 'cropped_9',
};

/**
 * Outdated, use the component from the Redesigned folder
 * @deprecated
 */
export const Text = memo((props: TextProps) => {
  const {
    className,
    size = TextSize.S,
    theme = TextTheme.PRIMARY,
    weight = TextWeight.REGULAR,
    align = TextAlign.LEFT,
    children,
    cropped,
    tag = 'div',
    'data-testid': dataTestId = 'Text',
  } = props;

  const Tag = tag;
  const textCroppedClass = cropped ? mapTextCropped[cropped] : '';

  const mods: Mods = {
    [cl.cropped]: Boolean(textCroppedClass),
  };

  return (
    <Tag
      data-testid={`${dataTestId}.Tag`}
      className={classNames(cl.Text, mods, [
        className,
        cl[weight],
        cl[size],
        cl[theme],
        cl[align],
        cl[textCroppedClass],
      ])}
    >
      {children}
    </Tag>
  );
});
