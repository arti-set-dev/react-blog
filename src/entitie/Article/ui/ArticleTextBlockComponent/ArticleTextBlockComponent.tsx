import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import cl from './ArticleTextBlockComponent.module.scss';
import { ArticleTextBlock } from '../../model/types/article';

interface ArticleTextBlockComponentProps {
    className?: string;
    block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo((props: ArticleTextBlockComponentProps) => {
  const { className, block } = props;
  const { t } = useTranslation();

  return (
    <div className={classNames(cl.ArticleTextBlockComponent, {}, [className])}>
      {block.title && (
        <Text className={cl.Title} theme={TextTheme.PRIMARY} size={TextSize.L}>{block.title}</Text>
      )}
      {block.paragraphs.map((paragraph) => (
        <Text size={TextSize.M} className={cl.Paragraph} key={paragraph}>{paragraph}</Text>
      ))}
    </div>
  );
});
