import { Story } from '@storybook/react';
import { getAllFeatureFlags } from '@/shared/lib/features/lib/setGetFeatures';
import { setFeatureFlags } from '@/shared/lib/features/serGetFeatures';

export const NewDesignDecorator = (StoryComponent: Story) => {
  setFeatureFlags({ ...getAllFeatureFlags(), isAppRedesigned: true });
  return (
    <div className="app_redesigned">
      <StoryComponent />
    </div>
  );
};
