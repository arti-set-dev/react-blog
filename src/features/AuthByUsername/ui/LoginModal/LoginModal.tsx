import { memo, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Loader, LoaderOffset } from '@/shared/ui/deprecated/Loader';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';

interface LoginModalProps {
  className?: string;
  isOpen?: boolean;
  onClose: () => void;
  redirectPath?: string;
}

export const LoginModal = memo((props: LoginModalProps) => {
  const {
    className, isOpen, onClose, redirectPath,
  } = props;
  const navigate = useNavigate();

  const handleSuccess = () => {
    onClose();
    if (redirectPath) {
      navigate(redirectPath);
    }
  };

  return (
    <Modal lazy isOpen={isOpen} onClose={onClose}>
      <Suspense fallback={<Loader offset={LoaderOffset.L} />}>
        <LoginFormAsync onSucces={handleSuccess} />
      </Suspense>
    </Modal>
  );
});
