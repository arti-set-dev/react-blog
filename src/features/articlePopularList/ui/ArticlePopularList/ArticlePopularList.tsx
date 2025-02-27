import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import {
  TextSize, TextTheme, TextWeight, Text,
} from '@/shared/ui/deprecated/Text';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { ArticleList, ArticleListDisplay } from '@/entities/Article';
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
    } = useArticlePopularList(totalPosts);

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
      <>
        <Text
          tag="h2"
          theme={TextTheme.PRIMARY}
          weight={TextWeight.BOLD}
          size={TextSize.XL}
        >
          {t('Posts of the week')}
        </Text>
        <ArticleList
          className={cl.List}
          display={display}
          articles={articles}
          blank
        />
      </>
    );
  },
);
