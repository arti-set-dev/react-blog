import { Story } from '@storybook/react';
// eslint-disable-next-line arti-set-fsd-checker-plugin/layer-imports
import '@/app/styles/index.scss';
import { Suspense } from 'react';

export const SuspenseDecorator = (StoryComponent: Story) => (
  <Suspense>
    <StoryComponent />
  </Suspense>
);
