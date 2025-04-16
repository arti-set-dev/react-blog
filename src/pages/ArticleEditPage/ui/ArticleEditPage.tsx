import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import cl from './ArticleEditPage.module.scss';
import { ArticleCreate } from '@/features/articleCreate';
import { ArticleEdit } from '@/features/articleEdit';
import { ToggleFeatures } from '@/shared/lib/features';
import { StickyContentLayout } from '@/shared/layouts/SticlyContentLayout';
import { Button } from '@/shared/ui/redesigned/Button';
import { getRouteArticleDetails } from '@/shared/const/router';
import { Container } from '@/shared/ui/redesigned/Container';

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage = memo((props: ArticleEditPageProps) => {
  const { className } = props;
  const { t } = useTranslation('article-edit');
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const onBackToArticle = () => {
    navigate(getRouteArticleDetails(id ?? ''));
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isEdit ? (
        <ToggleFeatures
          feature="isAppRedesigned"
          on={(
            <StickyContentLayout
              left={<Button variant="outline" onClick={onBackToArticle}>{t('Back')}</Button>}
              content={(
                <Page className={classNames(cl.ArticleEditPage, {}, [className])}>
                  <ArticleEdit id={id} />
                </Page>
              )}
            />
          )}
          off={(
            <Page className={classNames(cl.ArticleEditPage, {}, [className])}>
              <Container max>
                <ArticleEdit id={id} />
              </Container>
            </Page>
          )}
        />
      ) : (
        <ToggleFeatures
          feature="isAppRedesigned"
          on={(
            <StickyContentLayout
              left={<Button variant="outline" onClick={onBackToArticle}>{t('Back')}</Button>}
              content={(
                <Page className={classNames(cl.ArticleEditPage, {}, [className])}>
                  <ArticleCreate />
                </Page>
              )}
            />
          )}
          off={(
            <Page className={classNames(cl.ArticleEditPage, {}, [className])}>
              <Container max>
                <ArticleCreate />
              </Container>
            </Page>
          )}
        />
      )}
    </>
  );
});

export default ArticleEditPage;
