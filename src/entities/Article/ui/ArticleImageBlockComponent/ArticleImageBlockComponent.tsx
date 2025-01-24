import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextAlign, TextSize } from '@/shared/ui/Text';
import cl from './ArticleImageBlockComponent.module.scss';
import { ArticleImageBlock } from '../../model/types/article';

interface ArticleImageBlockComponentProps {
  className?: string;
  block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo(
  (props: ArticleImageBlockComponentProps) => {
    const { className, block } = props;
    const { t } = useTranslation();

    return (
      <figure
        className={classNames(cl.ArticleImageBlockComponent, {}, [className])}
      >
        <img className={cl.Image} src={block.src} alt={block.title} />
        {block.title && (
          <Text align={TextAlign.CENTER} size={TextSize.XS}>
            {block.title}
          </Text>
        )}
      </figure>
    );
  },
);
