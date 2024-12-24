import { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './Card.module.scss';

interface CardProps {
    className?: string;
    children: ReactNode;
}

export const Card = memo((props: CardProps) => {
  const { className, children, ...otherProps } = props;
  const { t } = useTranslation();

  return (
    <article {...otherProps} className={classNames(cl.Card, {}, [className])}>
      {children}
    </article>
  );
});
