import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './ArticleSortSelector.module.scss';

interface ArticleSortSelectorProps {
    className?: string;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <div className={classNames(cl.ArticleSortSelector, {}, [className])} />
  );
});
