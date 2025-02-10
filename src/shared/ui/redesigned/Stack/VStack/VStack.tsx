import { HTMLAttributes } from 'react';
import { Flex, FlexProps } from '../Flex/Flex';

type VStackProps = Omit<FlexProps, 'direction'> & HTMLAttributes<HTMLDivElement>;

export const VStack = (props: VStackProps) => {
  const { align = 'start' } = props;
  return <Flex direction="column" {...props} align={align} />;
};
