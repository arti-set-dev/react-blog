import { Story } from '@storybook/react';
// eslint-disable-next-line arti-set-fsd-checker-plugin/layer-imports
import '@/app/styles/index.scss';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { setFeatureFlags } from '@/shared/lib/features/serGetFeatures';

export const FeatureFlagsDecorator = (features: FeatureFlags) => (StoryComponent: Story) => {
  setFeatureFlags(features);
  return (
    <StoryComponent />
  );
};
