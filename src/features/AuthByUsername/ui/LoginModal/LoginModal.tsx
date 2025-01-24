import { memo, Suspense } from 'react';
import { Loader, LoaderOffset } from '@/shared/ui/Loader';
import { Modal } from '@/shared/ui/Modal';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';

interface LoginModalProps {
  className?: string;
  isOpen?: boolean;
  onClose: () => void;
}

export const LoginModal = memo((props: LoginModalProps) => {
  const { className, isOpen, onClose } = props;
  return (
    <Modal lazy isOpen={isOpen} onClose={onClose}>
      <Suspense fallback={<Loader offset={LoaderOffset.L} />}>
        <LoginFormAsync onSucces={onClose} />
      </Suspense>
    </Modal>
  );
});
