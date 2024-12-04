import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cl from './ArticleDetails.module.scss';

interface ArticleDetailsProps {
    className?: string;
}

export const ArticleDetails = (props: ArticleDetailsProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <div className={classNames(cl.ArticleDetails, {}, [className])}>
      
    </div>
  );
};
