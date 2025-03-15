import { memo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cl from './Text.module.scss';

export type TextAlign = 'left' | 'center' | 'right';

export type TextSize = 'xxs' | 's' | 'xs' | 'm' | 'l' | 'xl' | 'xxl';

export type TextVariant = 'error' | 'primary' | 'inverted' | 'primary-light' | 'primary-accent';

export type TextWeight = 'normal' | 'bold';

export type TextCropped = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

type TagType = 'h1' | 'h2' | 'h3' | 'p' | 'strong' | 'b' | 'div' | 'span';

interface TextProps {
  className?: string;
  size?: TextSize;
  variant?: TextVariant;
  weight?: TextWeight;
  align?: TextAlign;
  children?: React.ReactNode;
  cropped?: TextCropped;
  tag?: TagType;
  'data-testid'?: string;
  isHovered?: boolean;
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

export const Text = memo((props: TextProps) => {
  const {
    className,
    size = 's',
    variant = 'primary',
    weight = 'normal',
    align = 'left',
    children,
    cropped,
    tag = 'div',
    'data-testid': dataTestId = 'Text',
    isHovered = false,
    ...otherProps
  } = props;

  const Tag = tag;
  const textCroppedClass = cropped ? mapTextCropped[cropped] : '';

  const mods: Mods = {
    [cl.isHovered]: isHovered,
    [cl.cropped]: Boolean(textCroppedClass),
  };

  return (
    <Tag
      {...otherProps}
      data-testid={`${dataTestId}.Tag`}
      className={classNames(cl.Text, mods, [
        className,
        cl[weight],
        cl[size],
        cl[variant],
        cl[align],
        cl[textCroppedClass],
      ])}
    >
      {children}
    </Tag>
  );
});
