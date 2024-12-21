import { DropdownDirection } from 'app/types/ui';
import cl from './Popups.module.scss';

export const mapDirectionClass: Record<DropdownDirection, string> = {
  'bottom left': cl.dropdownBottomLeft,
  'bottom right': cl.dropdownBottomRight,
  'top left': cl.dropdownTopLeft,
  'top right': cl.dropdownTopRight,
};
