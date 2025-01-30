import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './Text.module.scss';

export type TextAlign = 'left' | 'center' | 'right';

export type TextSize = 's' | 'xs' | 'm' | 'l' | 'xl';

export type TextVariant = 'error' | 'primary' | 'inverted';

export type TextWeight = 'normal' | 'bold';

type TagType = 'h1' | 'h2' | 'h3' | 'p' | 'strong' | 'b' | 'div';

interface TextProps {
  className?: string;
  size?: TextSize;
  variant?: TextVariant;
  weight?: TextWeight;
  align?: TextAlign;
  children?: React.ReactNode;
  tag?: TagType;
  'data-testid'?: string;
}

export const Text = memo((props: TextProps) => {
  const {
    className,
    size = 's',
    variant = 'primary',
    weight = 'normal',
    align = 'left',
    children,
    tag = 'div',
    'data-testid': dataTestId = 'Text',
  } = props;

  const Tag = tag;

  return (
    <Tag
      data-testid={`${dataTestId}.Tag`}
      className={classNames(cl.Text, {}, [
        className,
        cl[weight],
        cl[size],
        cl[variant],
        cl[align],
      ])}
    >
      {children}
    </Tag>
  );
});
