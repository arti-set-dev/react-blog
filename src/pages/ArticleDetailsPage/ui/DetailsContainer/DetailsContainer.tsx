import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleDetails } from '@/entities/Article';
import { getVstack } from '@/shared/lib/stack/getVstack/getVstack';

interface DetailsContainerProps {
  className?: string;
}

export const DetailsContainer = memo((props: DetailsContainerProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  return (
    <Card offset="16" className={getVstack({ gap: 16 })}>
      <ArticleDetails id={id} />
    </Card>
  );
});
