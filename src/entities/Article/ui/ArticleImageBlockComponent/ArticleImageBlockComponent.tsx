import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text as TextDeprecated, TextAlign, TextSize } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './ArticleImageBlockComponent.module.scss';
import { ArticleImageBlock } from '../../model/types/article';
import { ToggleFeatures } from '@/shared/lib/features';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { LazyImage } from '@/shared/ui/redesigned/LazyImage';

interface ArticleImageBlockComponentProps {
  className?: string;
  block: ArticleImageBlock;
  height?: number;
}

export const ArticleImageBlockComponent = memo(
  (props: ArticleImageBlockComponentProps) => {
    const { className, block, height = 500 } = props;
    const { t } = useTranslation();

    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={(
          <VStack tag="figure" gap="16" align="center" max>
            <LazyImage src={block.src} alt={block.title} height={height} width="100%" />
            {block.title && (
              <Text align="center" size="xs">
                {block.title}
              </Text>
            )}
          </VStack>
        )}
        off={(
          <figure
            className={classNames(cl.ArticleImageBlockComponent, {}, [className])}
          >
            <img height={height} width="100%" className={cl.Image} src={block.src} alt={block.title} />
            {block.title && (
              <TextDeprecated align={TextAlign.CENTER} size={TextSize.XS}>
                {block.title}
              </TextDeprecated>
            )}
          </figure>
        )}
      />
    );
  },
);
