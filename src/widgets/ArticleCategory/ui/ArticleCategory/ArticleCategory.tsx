import { memo } from 'react';
import { useTranslation } from 'react-i18next';

interface ArticleCategoryProps {
    className?: string;
}

export const ArticleCategory = memo((props: ArticleCategoryProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <div />
  );
});
