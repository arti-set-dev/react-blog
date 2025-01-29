import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Text } from '@/shared/ui/deprecated/Text';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import cl from './ArticleEditPage.module.scss';

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
        <Text>{t('Editing an article with ID -') + id}</Text>
      ) : (
        <Text>{t('Creating a new article')}</Text>
      )}
    </Page>
  );
});

export default ArticleEditPage;
