import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import cl from './ArticleEditPage.module.scss';
import { ArticleCreate } from '@/features/articleCreate';
import { ArticleEdit } from '@/features/articleEdit';

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage = memo((props: ArticleEditPageProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  return (
    <Page className={classNames(cl.ArticleEditPage, {}, [className])}>
      {isEdit ? (
        <ArticleEdit id={id} />
      ) : (
        <ArticleCreate />
      )}
    </Page>
  );
});

export default ArticleEditPage;
