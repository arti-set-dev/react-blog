import { useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import { Drawer } from '@/shared/ui/Drawer';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import { Modal } from '@/shared/ui/Modal';
import { VStack, HStack } from '@/shared/ui/Stack';
import { StarRating } from '@/shared/ui/StarRating';
import { Text, TextSize } from '@/shared/ui/Text';

interface RatingCardProps {
  className?: string;
  title?: string;
  feedbackTitle?: string;
  hasFeedback?: boolean;
  onCancel?: (starsCount: number) => void;
  onAccept?: (starsCount: number, feedback?: string) => void;
  rate?: number;
}

export const RatingCard = (props: RatingCardProps) => {
  const {
    className, onCancel, title, feedbackTitle, hasFeedback, onAccept, rate = 0,
  } = props;
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [starsCount, setStarsCount] = useState(rate);
  const [feedback, setFeedback] = useState('');

  const onSelectStars = useCallback((selectStarsCount: number) => {
    setStarsCount(selectStarsCount);
    if (hasFeedback) {
      setIsModalOpen(true);
    } else {
      onAccept?.(selectStarsCount);
    }
  }, [hasFeedback, onAccept]);

  const acceptHandle = useCallback(() => {
    setIsModalOpen(false);
    onAccept?.(starsCount, feedback);
  }, [feedback, onAccept, starsCount]);

  const cancelHandle = useCallback(() => {
    setIsModalOpen(false);
    onAccept?.(starsCount);
  }, [onAccept, starsCount]);

  const modalContent = (
    <VStack max gap="32">
      <Text size={TextSize.L}>{feedbackTitle}</Text>
      <Input value={feedback} onChange={setFeedback} placeholder={t('Your rating')} />
      <HStack gap="16" max justify="end">
        <Button onClick={cancelHandle} theme={ButtonTheme.OUTLINE_RED}>{t('Cancel')}</Button>
        <Button onClick={acceptHandle} theme={ButtonTheme.OUTLINE}>{t('Send')}</Button>
      </HStack>
    </VStack>
  );

  return (
    <Card isOffset className={classNames('', {}, [className])}>
      <VStack gap="16" align="center">
        <Text size={TextSize.L}>{starsCount ? t('Thanks for your rating') : title}</Text>
        <StarRating selectStars={starsCount} size={40} onSelect={onSelectStars} />
      </VStack>
      <BrowserView>
        <Modal isOpen={isModalOpen} lazy>
          {modalContent}
        </Modal>
      </BrowserView>
      <MobileView>
        <Drawer isOpen={isModalOpen} onClose={cancelHandle} lazy>
          {modalContent}
        </Drawer>
      </MobileView>
    </Card>
  );
};
