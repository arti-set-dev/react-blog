import {
  FlexAlign,
  FlexDirection,
  FlexJustify,
  OverflowType,
  Breakpoint,
} from '@/shared/ui/redesigned/Stack/Flex/Flex';
import cls from './getFlex.module.scss';

export type Gap = 0 | 4 | 8 | 16 | 24 | 32;

  interface FlexOptions {
    justify?: FlexJustify;
    align?: FlexAlign;
    direction?: FlexDirection;
    gap?: Gap;
    fullWidth?: boolean;
    fullHeight?: boolean;
    overflow?: OverflowType;
    responsive?: {
      [key in Breakpoint]?: {
        justify?: FlexJustify;
        align?: FlexAlign;
        direction?: FlexDirection;
        gap?: Gap;
      };
    };
  }

const breakpointClasses: Record<Breakpoint, string> = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  xxl: 'xxl',
};

export function getFlex(options: FlexOptions = {}): string {
  const {
    justify = 'start',
    align = 'center',
    direction = 'row',
    gap,
    fullWidth,
    fullHeight,
    overflow = 'initial',
    responsive,
  } = options;

  const classes: string[] = [cls.Flex];

  // Базовые классы
  if (justify) classes.push(cls[`justify${justify.charAt(0).toUpperCase() + justify.slice(1)}`]);
  if (align) classes.push(cls[`align${align.charAt(0).toUpperCase() + align.slice(1)}`]);
  if (direction) classes.push(cls[`direction${direction.charAt(0).toUpperCase() + direction.slice(1)}`]);
  if (gap !== undefined) classes.push(cls[`gap${gap}`]);
  if (overflow) classes.push(cls[`overflow${overflow.charAt(0).toUpperCase() + overflow.slice(1)}`]);
  if (fullWidth) classes.push(cls.fullWidth);
  if (fullHeight) classes.push(cls.fullHeight);

  // Адаптивные классы
  if (responsive) {
    Object.entries(responsive).forEach(([breakpoint, values]) => {
      const breakpointClass = breakpointClasses[breakpoint as Breakpoint];

      if (values.direction) {
        classes.push(cls[`${breakpointClass}_direction_${values.direction}`]);
      }
      if (values.justify) {
        classes.push(cls[`${breakpointClass}_justify_${values.justify}`]);
      }
      if (values.align) {
        classes.push(cls[`${breakpointClass}_align_${values.align}`]);
      }
      if (values.gap !== undefined) {
        classes.push(cls[`${breakpointClass}_gap_${values.gap}`]);
      }
    });
  }

  return classes.join(' ');
}
