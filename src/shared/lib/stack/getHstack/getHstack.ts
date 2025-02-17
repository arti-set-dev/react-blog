export type Gap = 0 | 4 | 8 | 16 | 24;
export type Justify = 'between' | 'center' | 'end' | 'start';
export type Align = 'center' | 'start' | 'end';

interface HStackOptions {
  gap?: Gap;
  justify?: Justify;
  align?: Align;
}

export function getHstack({ gap, justify, align }: HStackOptions = {}): string {
  const classes: string[] = ['flex-row'];

  if (gap !== undefined) classes.push(`gap-${gap}`);
  if (justify) classes.push(`justify-${justify}`);
  if (align) classes.push(`align-${align}`);

  return classes.join(' ');
}
