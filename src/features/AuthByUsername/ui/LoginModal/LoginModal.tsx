import { FC, memo, Suspense } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Loader, LoaderOffset, LoaderTheme } from '@/shared/ui/Loader/Loader';
import { Modal } from '@/shared/ui/Modal/Modal';
import LoginForm from '../LoginForm/LoginForm';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';

interface LoginModalProps {
    className?: string;
    isOpen?: boolean;
    onClose: () => void;
}

export const LoginModal = memo((props: LoginModalProps) => {
  const {
    className, isOpen, onClose,
  } = props;
  return (
    <Modal lazy isOpen={isOpen} onClose={onClose}>
      <Suspense fallback={<Loader offset={LoaderOffset.L} />}>
        <LoginFormAsync onSucces={onClose} />
      </Suspense>
    </Modal>
  );
});
