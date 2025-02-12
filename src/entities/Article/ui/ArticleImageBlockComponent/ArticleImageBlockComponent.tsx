import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TextAlign, TextSize } from '@/shared/ui/deprecated/Text';
import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './ArticleImageBlockComponent.module.scss';
import { ArticleImageBlock } from '../../model/types/article';

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
      <figure
        className={classNames(cl.ArticleImageBlockComponent, {}, [className])}
      >
        <img height={height} width="100%" className={cl.Image} src={block.src} alt={block.title} />
        {block.title && (
          <Text align={TextAlign.CENTER} size={TextSize.XS}>
            {block.title}
          </Text>
        )}
      </figure>
    );
  },
);
