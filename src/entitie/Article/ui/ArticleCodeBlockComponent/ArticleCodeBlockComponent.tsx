import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cl from './ArticleImageCodeComponent.module.scss';

interface ArticleImageCodeComponentProps {
    className?: string;
}

export const ArticleImageCodeComponent = (props: ArticleImageCodeComponentProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <div className={classNames(cl.ArticleImageCodeComponent, {}, [className])}>
      ArticleImageCodeComponent
    </div>
  );
};
