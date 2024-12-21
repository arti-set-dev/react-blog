import { NotificationList } from 'entitie/Notification';
import NotificationIcon from 'shared/assets/icons/notification-icon.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import { Popover } from 'shared/ui/Popups';
import cl from './NotificationButton.module.scss';

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = (props: NotificationButtonProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <Popover
      direction="bottom left"
      trigger={(
        <Button theme={ButtonTheme.ICON} aria-label={t('Toggle notification')}>
          <Icon Svg={NotificationIcon} />
        </Button>
      )}
    >
      <NotificationList />
    </Popover>
  );
};
