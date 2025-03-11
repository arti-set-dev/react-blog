import { memo, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { Text } from '@/shared/ui/redesigned/Text';
import { Avatar } from '@/shared/ui/redesigned/Avatar/Avatar';
import { VStack, HStack } from '@/shared/ui/redesigned/Stack';
import { User } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { getRouteProfile } from '@/shared/const/router';
import { getHstack } from '@/shared/lib/stack/getHstack/getHstack';

interface ArticleAdditionalInfoProps {
  className?: string;
  author?: User;
  createdAt?: string;
  views?: number;
  onEdit?: () => void;
  onDelete?: () => void;
  canEdit?: boolean;
  modalContent?: ReactElement;
}

export const ArticleAdditionalInfo = memo((props: ArticleAdditionalInfoProps) => {
  const {
    className,
    author,
    createdAt,
    views,
    onEdit,
    onDelete,
    canEdit,
    modalContent,
  } = props;
  const { t } = useTranslation();

  return (
    <VStack gap="32" className={classNames('', {}, [className])}>
      <HStack gap="8">
        <AppLink to={getRouteProfile(author?.id ?? '')} className={getHstack({ gap: 8, align: 'center' })}>
          <Avatar size={32} src={author?.avatar} />
          <Text weight="bold">{author?.username}</Text>
          <Text>{createdAt}</Text>
        </AppLink>
      </HStack>
      {canEdit && (
        <HStack gap="8">
          <Button onClick={onEdit} variant="outline">{t('Edit')}</Button>
          <Button onClick={onDelete} variant="outline-red">{t('Delete')}</Button>
          {modalContent && modalContent}
        </HStack>
      )}
      <Text>{t('{{count}} views', { count: views })}</Text>
    </VStack>
  );
});
