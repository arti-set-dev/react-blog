import { Flex, FlexProps } from '../Flex/Flex';

type VStackProps = Omit<FlexProps, 'direction'>;

/**
 * Outdated, use the component from the Redesigned folder
 * @deprecated
 */
export const VStack = (props: VStackProps) => {
  const { align = 'start' } = props;
  return <Flex direction="column" {...props} align={align} />;
};
