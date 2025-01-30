import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { VStack } from '@/shared/ui/redesigned/Stack';
import {
  TextSize, TextTheme, TextWeight, Text,
} from '@/shared/ui/deprecated/Text';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleList, ArticleListDisplay } from '@/entities/Article';
// eslint-disable-next-line import/no-duplicates
import { useArticleRecommendationsList } from '../../api/ArticleRecommendationsApi';
import cl from './ArticleRecommendationsList.module.scss';

interface ArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList = memo(
  (props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const {
      isLoading,
      data: articles,
      error,
    } = useArticleRecommendationsList(7);

    if (isLoading || error || !articles) {
      return null;
    }

    if (isLoading) {
      return <Loader />;
    }

    if (error) {
      return <Text>{t('Data boot error')}</Text>;
    }

    return (
      <VStack
        data-testid="ArticleRecommendationsList"
        tag="section"
        gap="16"
        className={classNames('', {}, [className])}
      >
        <Text
          tag="h2"
          theme={TextTheme.PRIMARY}
          weight={TextWeight.BOLD}
          size={TextSize.XL}
        >
          {t('We recommend reading')}
        </Text>
        <ArticleList
          className={cl.List}
          display={ArticleListDisplay.FLEX}
          articles={articles}
          blank
        />
      </VStack>
    );
  },
);
