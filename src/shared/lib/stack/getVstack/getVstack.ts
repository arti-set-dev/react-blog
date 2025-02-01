export type Gap = 0 | 8 | 16 | 24;
export type Justify = 'space-between' | 'center' | 'end' | 'start';
export type Align = 'center' | 'start' | 'end';

interface VStackOptions {
  gap?: Gap;
  justify?: Justify;
  align?: Align;
}

export function getVstack({ gap, justify, align }: VStackOptions = {}): string {
  const classes: string[] = ['flex-column'];

  if (gap !== undefined) classes.push(`gap-${gap}`);
  if (justify) classes.push(`justify-${justify}`);
  if (align) classes.push(`align-${align}`);

  return classes.join(' ');
}
