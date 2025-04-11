import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cl from './Overlay.module.scss';

interface OverlayProps {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  isOpen?: boolean;
  overflowOff?: boolean;
  'data-testid'?: string;
}

export const Overlay = (props: OverlayProps) => {
  const {
    className, onClick, children, isOpen, overflowOff = false,
    'data-testid': dataTestId = 'overlay',
  } = props;

  const mods: Mods = {
    [cl.opened]: isOpen,
    [cl.OverflowOff]: overflowOff,
  };

  return (
    <div
      data-testid={dataTestId}
      onClick={onClick}
      className={classNames(cl.Overlay, mods, [className])}
    >
      {children}
    </div>
  );
};
