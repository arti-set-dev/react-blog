import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getRouteArticleCreate, getRouteArticles } from '@/shared/const/router';
import { getUserAuthData } from '@/entities/User';
import { ToggleFeatures } from '@/shared/lib/features';
import { MainHeroRedesigned } from './MainHeroRedesigned/MainHeroRedesigned';
import { MainHeroDeprecated } from './MainHeroDeprecated/MainHeroDeprecated';

interface MainHeroProps {
    className?: string;
}

export const MainHero = memo((props: MainHeroProps) => {
  const { className } = props;
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useSelector(getUserAuthData);
  const { t } = useTranslation('main');
  const navigate = useNavigate();

  const onOpenArticles = useCallback(() => {
    navigate(getRouteArticles());
  }, [navigate]);

  const onOpenCreateNewArticle = useCallback(() => {
    navigate(getRouteArticleCreate());
  }, [navigate]);

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={(
        <MainHeroRedesigned
          isAuthModal={isAuthModal}
          setIsAuthModal={setIsAuthModal}
          onCloseModal={onCloseModal}
          onOpenArticles={onOpenArticles}
          onOpenCreateNewArticle={onOpenCreateNewArticle}
          userId={authData?.id}
        />
      )}
      off={(
        <MainHeroDeprecated
          isAuthModal={isAuthModal}
          setIsAuthModal={setIsAuthModal}
          onCloseModal={onCloseModal}
          onOpenArticles={onOpenArticles}
          onOpenCreateNewArticle={onOpenCreateNewArticle}
          userId={authData?.id}
        />
      )}
    />
  );
});
