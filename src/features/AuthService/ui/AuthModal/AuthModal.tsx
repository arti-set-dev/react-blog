import { memo, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Loader } from '@/shared/ui/redesigned/Loader';
import { AuthFormAsync } from '../AuthForm/AuthForm.async';

interface LoginModalProps {
  className?: string;
  isOpen?: boolean;
  onClose: () => void;
  redirectPath?: string;
}

export const AuthModal = memo((props: LoginModalProps) => {
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
      <Suspense fallback={<Loader />}>
        <AuthFormAsync onSuccess={handleSuccess} />
      </Suspense>
    </Modal>
  );
});
