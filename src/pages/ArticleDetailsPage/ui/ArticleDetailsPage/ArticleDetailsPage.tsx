import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ArticleDetails } from 'entitie/Article';
import cl from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const { className } = props;
  const { t } = useTranslation('article-details');
  const { id } = useParams<{id: string}>();

  if (!id) {
    return (
      <div className={classNames(cl.ArticleDetailsPage, {}, [className])}>
        {t('Article not found')}
      </div>
    );
  }

  return (
    <div className={classNames(cl.ArticleDetailsPage, {}, [className])}>
      <ArticleDetails id={id} />
    </div>
  );
};

export default memo(ArticleDetailsPage);
