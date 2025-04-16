import { memo, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Loader } from '@/shared/ui/redesigned/Loader';
import { AuthFormAsync } from '../AuthForm/AuthForm.async';
import { ToggleFeatures } from '@/shared/lib/features';
import { Modal as ModalDeprecated } from '@/shared/ui/deprecated/Modal/Modal';

interface LoginModalProps {
  className?: string;
  isOpen?: boolean;
  onClose: () => void;
  redirectPath?: string;
  'data-testid'?: string;
}

export const AuthModal = memo((props: LoginModalProps) => {
  const {
    className, isOpen, onClose, redirectPath, 'data-testid': dataTestId,
  } = props;
  const navigate = useNavigate();

  const handleSuccess = () => {
    onClose();
    if (redirectPath) {
      navigate(redirectPath);
    }
  };

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={(
        <Modal lazy isOpen={isOpen} onClose={onClose} data-testid={dataTestId}>
          <Suspense fallback={<Loader />}>
            <AuthFormAsync onSuccess={handleSuccess} />
          </Suspense>
        </Modal>
      )}
      off={(
        <ModalDeprecated lazy isOpen={isOpen} onClose={onClose} data-testid={dataTestId}>
          <Suspense fallback={<Loader />}>
            <AuthFormAsync onSuccess={handleSuccess} />
          </Suspense>
        </ModalDeprecated>
      )}
    />
  );
});
