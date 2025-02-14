import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cl from './{{name}}.module.scss';

interface {{name}}Props {
    className?: string;
}

export const {{name}} = memo((props: {{name}}Props) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <div className={classNames(cl.{{name}}, {}, [className])}>
      
    </div>
  );
});
