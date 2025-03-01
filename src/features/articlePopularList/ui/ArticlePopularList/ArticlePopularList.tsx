import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import {
  Text,
} from '@/shared/ui/redesigned/Text';
import { ArticleList, ArticleListDisplay, ArticleSortField } from '@/entities/Article';
// eslint-disable-next-line import/no-duplicates
import cl from './ArticlePopularList.module.scss';
import { useArticlePopularList } from '../../api/ArticlePopularApi';

interface ArticlePopularListProps {
  className?: string;
  display?: ArticleListDisplay;
  totalPosts?: number;
}

export const ArticlePopularList = memo(
  (props: ArticlePopularListProps) => {
    const { className, display = ArticleListDisplay.FLEX, totalPosts = 7 } = props;
    const { t } = useTranslation('main');
    const {
      isLoading,
      data: articles,
      error,
    } = useArticlePopularList({
      sort: ArticleSortField.VIEWS,
      limit: totalPosts,
      order: 'desc',
    });

    if (isLoading) {
      return (
        <ArticleList
          isLoading={isLoading}
          className={cl.List}
          display={display}
        />
      );
    }

    if (!articles) {
      return <Text>{t('Not artilces found')}</Text>;
    }

    if (error) {
      return <Text>{t('Data boot error')}</Text>;
    }

    return (
      <ArticleList
        isLoading={isLoading}
        className={cl.List}
        display={display}
        articles={articles}
      />
    );
  },
);
