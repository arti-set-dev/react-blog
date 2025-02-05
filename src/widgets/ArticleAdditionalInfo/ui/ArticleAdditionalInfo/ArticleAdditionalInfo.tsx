import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { Text } from '@/shared/ui/redesigned/Text';
import { Avatar } from '@/shared/ui/redesigned/Avatar/Avatar';
import { VStack, HStack } from '@/shared/ui/redesigned/Stack';
import { User } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';

interface ArticleAdditionalInfoProps {
  className?: string;
  author?: User;
  createdAt?: string;
  views?: number;
  onEdit?: () => void;
}

export const ArticleAdditionalInfo = memo((props: ArticleAdditionalInfoProps) => {
  const {
    className,
    author,
    createdAt,
    views,
    onEdit,
  } = props;
  const { t } = useTranslation();

  return (
    <VStack gap="32" className={classNames('', {}, [className])}>
      <HStack gap="8">
        <Avatar size={32} src={author?.avatar} />
        <Text weight="bold">{author?.username}</Text>
        <Text>{createdAt}</Text>
      </HStack>
      <Button onClick={onEdit} variant="outline">{t('Edit')}</Button>
      <Text>{t('{{count}} views', { count: views })}</Text>
    </VStack>
  );
});
