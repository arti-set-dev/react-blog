import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
  id?: string;
}

/**
 * Outdated, use the component from the Redesigned folder
 * @deprecated
 */
export const Portal: FC<PortalProps> = (props) => {
  const { children, id = 'app' } = props;

  const element = document.getElementById(id);

  if (!element) {
    console.error(`Target element for Portal not found: ${id}`);
    return null;
  }

  return createPortal(children, element);
};
