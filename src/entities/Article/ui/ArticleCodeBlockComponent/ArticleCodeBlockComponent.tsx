import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Code as CodeDeprecated } from '@/shared/ui/deprecated/Code';
import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './ArticleCodeBlockComponent.module.scss';
import { ArticleCodeBlock } from '../../model/types/article';
import { ToggleFeatures } from '@/shared/lib/features';
import { Code } from '@/shared/ui/redesigned/Code';

interface ArticleCodeBlockComponentProps {
  className?: string;
  block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo(
  (props: ArticleCodeBlockComponentProps) => {
    const { className, block } = props;
    const { t } = useTranslation();

    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={(
          <Code text={block.code} />
        )}
        off={(
          <div
            className={classNames(cl.ArticleCodeBlockComponent, {}, [className])}
          >
            <CodeDeprecated text={block.code} />
          </div>
        )}
      />
    );
  },
);
