import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import { memo, useState, useEffect } from 'react';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Text } from '@/shared/ui/deprecated/Text';
import { Drawer } from '@/shared/ui/deprecated/Drawer';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useJsonSettings, saveJsonSettings } from '@/entities/User';

export const ArticlePageGreeting = memo(() => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { isArticlePageWasOpened } = useJsonSettings();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isArticlePageWasOpened) {
      setIsOpen(true);
      dispatch(saveJsonSettings({ isArticlePageWasOpened: true }));
    }
  }, [dispatch, isArticlePageWasOpened]);

  const onClose = () => setIsOpen(false);

  const text = (
    <>
      <Text tag="h1">{t('Welcome to the news page!')}</Text>
      <Text>{t('Here you can view posts on various topics')}</Text>
    </>
  );

  if (isMobile) {
    return (
      <Drawer lazy isOpen={isOpen} onClose={onClose}>
        {text}
      </Drawer>
    );
  }

  return (
    <Modal lazy isOpen={isOpen} onClose={onClose}>
      {text}
    </Modal>
  );
});
