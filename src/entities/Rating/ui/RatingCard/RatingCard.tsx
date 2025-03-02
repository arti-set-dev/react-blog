import { useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { VStack, HStack } from '@/shared/ui/redesigned/Stack';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Card } from '@/shared/ui/redesigned/Card';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { StarRating } from '@/shared/ui/deprecated/StarRating';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { Drawer } from '@/shared/ui/deprecated/Drawer';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Text } from '@/shared/ui/redesigned/Text';

interface RatingCardProps {
  className?: string;
  title?: string;
  feedbackTitle?: string;
  hasFeedback?: boolean;
  onCancel?: (starsCount: number) => void;
  onAccept?: (starsCount: number, feedback?: string) => void;
  rate?: number;
  isAuth?: boolean;
}

export const RatingCard = (props: RatingCardProps) => {
  const {
    className,
    onCancel,
    title,
    feedbackTitle,
    hasFeedback,
    onAccept,
    isAuth,
    rate = 0,
  } = props;
  const { t } = useTranslation('article-details');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [starsCount, setStarsCount] = useState(rate);
  const [feedback, setFeedback] = useState('');

  const onSelectStars = useCallback(
    (selectStarsCount: number) => {
      setStarsCount(selectStarsCount);
      if (hasFeedback) {
        setIsModalOpen(true);
      } else {
        onAccept?.(selectStarsCount);
      }
    },
    [hasFeedback, onAccept],
  );

  const acceptHandle = useCallback(() => {
    setIsModalOpen(false);
    onAccept?.(starsCount, feedback);
  }, [feedback, onAccept, starsCount]);

  const cancelHandle = useCallback(() => {
    setIsModalOpen(false);
    onAccept?.(starsCount);
  }, [onAccept, starsCount]);

  const modalContent = (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={(
        <VStack fullWidth gap="32">
          <Text size="l">{feedbackTitle}</Text>
          <Input
            data-testid="RatingCard.Input"
            value={feedback}
            onChange={setFeedback}
            placeholder={t('Your rating')}
          />
          <HStack gap="16" fullWidth justify="end">
            <Button
              data-testid="RatingCard.Cancel"
              onClick={cancelHandle}
              variant="outline-red"
            >
              {t('Cancel')}
            </Button>
            <Button
              data-testid="RatingCard.Send"
              onClick={acceptHandle}
              variant="outline"
            >
              {t('Send')}
            </Button>
          </HStack>
        </VStack>
      )}
      off={(
        <VStack fullWidth gap="32">
          <TextDeprecated size={TextSize.L}>{feedbackTitle}</TextDeprecated>
          <InputDeprecated
            data-testid="RatingCard.Input"
            value={feedback}
            onChange={setFeedback}
            placeholder={t('Your rating')}
          />
          <HStack gap="16" fullWidth justify="end">
            <ButtonDeprecated
              data-testid="RatingCard.Cancel"
              onClick={cancelHandle}
              theme={ButtonTheme.OUTLINE_RED}
            >
              {t('Cancel')}
            </ButtonDeprecated>
            <ButtonDeprecated
              data-testid="RatingCard.Send"
              onClick={acceptHandle}
              theme={ButtonTheme.OUTLINE}
            >
              {t('Send')}
            </ButtonDeprecated>
          </HStack>
        </VStack>
      )}
    />
  );

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={(
        <Card
          tag="div"
          data-testid="RatingCard"
          isOffset
          className={classNames('', {}, [className])}
        >
          <VStack gap="16" align="center">
            <Text size="l">
              {starsCount ? t('Thanks for your rating') : title}
            </Text>
            <StarRating
              disabled={!isAuth}
              selectStars={starsCount}
              size={40}
              onSelect={onSelectStars}
            />
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
      )}
      off={(
        <CardDeprecated
          data-testid="RatingCard"
          isOffset
          className={classNames('', {}, [className])}
        >
          <VStack gap="16" align="center">
            <Text size="l">
              {starsCount ? t('Thanks for your rating') : title}
            </Text>
            <StarRating
              disabled={!isAuth}
              selectStars={starsCount}
              size={40}
              onSelect={onSelectStars}
            />
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
        </CardDeprecated>
      )}
    />
  );
};
