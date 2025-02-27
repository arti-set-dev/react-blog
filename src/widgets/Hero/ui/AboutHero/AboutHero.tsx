import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './AboutHero.module.scss';

interface AboutHeroProps {
    className?: string;
}

export const AboutHero = memo((props: AboutHeroProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <div className={classNames(cl.AboutHero, {}, [className])} />
  );
});
