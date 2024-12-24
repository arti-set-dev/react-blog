import { useEffect, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Skeleton, SkeletonAlign } from '@/shared/ui/Skeleton/Skeleton';
import {
  Text, TextTheme, TextSize, TextWeight,
} from '@/shared/ui/Text/Text';
import ViewsIcon from '@/shared/assets/icons/eye-icon.svg';
import CalendarIcon from '@/shared/assets/icons/calendar-icon.svg';
import { HStack, VStack } from '@/shared/ui/Stack';
import { ArticleBlockType } from '../../model/types/articleType';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleBlock } from '../../model/types/article';
import {
  getArticleDetailsError,
  getArticleDetailsData,
  getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import cl from './ArticleDetails.module.scss';

interface ArticleDetailsProps {
    className?: string;
    id?: string;
}

const reducers: ReducerList = {
  articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const { className, id } = props;
  const { t } = useTranslation('article-details');
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const error = useSelector(getArticleDetailsError);
  const article = useSelector(getArticleDetailsData);

  const renderBlock = useCallback((block: ArticleBlock) => {
    switch (block.type) {
    case ArticleBlockType.CODE:
      return <ArticleCodeBlockComponent key={block.id} className={cl.Block} block={block} />;
    case ArticleBlockType.IMAGE:
      return <ArticleImageBlockComponent key={block.id} className={cl.Block} block={block} />;
    case ArticleBlockType.TEXT:
      return <ArticleTextBlockComponent key={block.id} className={cl.Block} block={block} />;
    default:
      return null;
    }
  }, []);

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchArticleById(id));
    }
  }, [dispatch, id]);

  let content;

  if (isLoading) {
    content = (
      <VStack gap="16" max>
        <Skeleton height={180} width={180} border="50%" />
        <Skeleton align={SkeletonAlign.LEFT} height={20} width="400px" />
        <Skeleton align={SkeletonAlign.LEFT} height={20} width="300px" />
        <Skeleton height={100} width="100%" />
        <Skeleton height={100} width="100%" />
        <Skeleton height={100} width="100%" />
        <Skeleton height={100} width="100%" />
      </VStack>
    );
  } else if (error) {
    content = (
      <HStack className={cl.Error}>
        <Text size={TextSize.L} theme={TextTheme.ERROR}>{t('There was an error loading the article')}</Text>
      </HStack>
    );
  } else {
    content = (
      <>
        <Avatar className={cl.Avatar} size={180} src={article?.img} alt={t('Article Details Page')} />
        <VStack max gap="16">
          <Text
            tag="h1"
            theme={TextTheme.PRIMARY}
            size={TextSize.XL}
            weight={TextWeight.BOLD}
          >
            {article?.title}
          </Text>
          <Text
            theme={TextTheme.PRIMARY}
            size={TextSize.XS}
            weight={TextWeight.REGULAR}
          >
            {article?.subtitle}
          </Text>
          <div className={cl.Meta}>
            <Text className={cl.MetaLink} size={TextSize.XS}>
              <ViewsIcon />
              {String(article?.views)}
            </Text>
            <Text className={cl.MetaLink} size={TextSize.XS}>
              <CalendarIcon />
              {article?.createdAt}
            </Text>
          </div>
        </VStack>
        {article?.blocks.map(renderBlock)}
      </>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cl.ArticleDetails, {}, [className])}>
        {content}
      </div>
    </DynamicModuleLoader>
  );
});
