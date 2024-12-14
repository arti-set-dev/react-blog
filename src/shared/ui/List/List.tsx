import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cl from './List.module.scss';
import { VStack } from '../Stack';
import { FlexGap } from '../Stack/Flex/Flex';

interface ListProps {
    className?: string;
    gap?: FlexGap;
}

export const List: FC<ListProps> = (props) => {
  const { children, className, gap } = props;
  return (
    <VStack gap={gap} className={classNames(cl.List, {}, [className])}>
      {children}
    </VStack>
  );
};
