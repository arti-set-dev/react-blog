import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text as TextDeprecated, TextSize, TextTheme } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './ArticleTextBlockComponent.module.scss';
import { ArticleTextBlock } from '../../model/types/article';
import { ToggleFeatures } from '@/shared/lib/features';
import { VStack } from '@/shared/ui/redesigned/Stack';

interface ArticleTextBlockComponentProps {
  className?: string;
  block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo(
  (props: ArticleTextBlockComponentProps) => {
    const { className, block } = props;
    const { t } = useTranslation();

    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={(
          <VStack gap="24" fullWidth>
            {block.title && (
              <Text
                tag="h2"
                className={cl.Title}
                variant="primary"
                size="l"
              >
                {block.title}
              </Text>
            )}
            {block.paragraphs.map((paragraph) => (
              <Text
                tag="p"
                size="m"
                className={cl.Paragraph}
                key={paragraph}
              >
                {paragraph}
              </Text>
            ))}
          </VStack>
        )}
        off={(
          <div
            className={classNames(cl.ArticleTextBlockComponent, {}, [className])}
          >
            {block.title && (
              <TextDeprecated
                tag="h2"
                className={cl.Title}
                theme={TextTheme.PRIMARY}
                size={TextSize.L}
              >
                {block.title}
              </TextDeprecated>
            )}
            {block.paragraphs.map((paragraph) => (
              <TextDeprecated
                tag="p"
                size={TextSize.M}
                className={cl.Paragraph}
                key={paragraph}
              >
                {paragraph}
              </TextDeprecated>
            ))}
          </div>
        )}
      />
    );
  },
);
