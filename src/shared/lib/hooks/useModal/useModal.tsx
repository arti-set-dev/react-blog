import React, { useState, useEffect, useCallback } from 'react';

interface UseModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const useModal = (props: UseModalProps) => {
  const { onClose, isOpen } = props;
  const [isMounted, setIsMounted] = useState(false);

  const close = () => {
    if (onClose) {
      onClose();
    }
  };

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      onClose?.();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  const onWindowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return {
    close, onWindowClick, isMounted,
  };
};
