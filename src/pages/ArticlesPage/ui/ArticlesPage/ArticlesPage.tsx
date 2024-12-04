import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cl from './ArticlesPage.module.scss';

interface ArticlesPageProps {
    className?: string;
}

export const ArticlesPage = (props: ArticlesPageProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <div className={classNames(cl.ArticlesPage, {}, [className])}>
      
    </div>
  );
};
