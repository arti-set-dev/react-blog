import { Flex, FlexProps } from '../Flex/Flex';

type HStackProps = Omit<FlexProps, 'direction'>;

/**
 * Outdated, use the component from the Redesigned folder
 * @deprecated
 */
export const HStack = (props: HStackProps) => {
  const { className } = props;
  return <Flex direction="row" {...props} />;
};
