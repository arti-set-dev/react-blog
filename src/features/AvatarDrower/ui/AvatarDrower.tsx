import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { MobileView } from 'react-device-detect';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { getUserAuthData } from '@/entities/User';
import { Drawer } from '@/shared/ui/deprecated/Drawer';
import { Button } from '@/shared/ui/redesigned/Button';

interface AvatarDrowerProps {
    className?: string;
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
}

export const AvatarDrower = memo((props: AvatarDrowerProps) => {
  const {
    className, children, isOpen, onClose, onOpen,
  } = props;
  const { t } = useTranslation();
  const authData = useSelector(getUserAuthData);

  const trigger = (
    <Button
      variant="icon"
      onClick={onOpen}
    >
      <Avatar size={25} src={authData?.avatar} alt={authData?.username} />
    </Button>
  );

  return (
    <MobileView>
      {trigger}
      <Drawer lazy isOpen={isOpen} onClose={onClose}>
        {children}
      </Drawer>
    </MobileView>
  );
});
