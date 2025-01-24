import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSize, TextTheme } from '@/shared/ui/Text';
import cl from './ArticleTextBlockComponent.module.scss';
import { ArticleTextBlock } from '../../model/types/article';

interface ArticleTextBlockComponentProps {
  className?: string;
  block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo(
  (props: ArticleTextBlockComponentProps) => {
    const { className, block } = props;
    const { t } = useTranslation();

    return (
      <div
        className={classNames(cl.ArticleTextBlockComponent, {}, [className])}
      >
        {block.title && (
          <Text
            tag="h2"
            className={cl.Title}
            theme={TextTheme.PRIMARY}
            size={TextSize.L}
          >
            {block.title}
          </Text>
        )}
        {block.paragraphs.map((paragraph) => (
          <Text
            tag="p"
            size={TextSize.M}
            className={cl.Paragraph}
            key={paragraph}
          >
            {paragraph}
          </Text>
        ))}
      </div>
    );
  },
);
