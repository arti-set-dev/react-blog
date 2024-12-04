import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cl from './Skeleton.module.scss';

interface SkeletonProps {
    className?: string;
}

export const Skeleton = (props: SkeletonProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <div className={classNames(cl.Skeleton, {}, [className])}>
      
    </div>
  );
};
