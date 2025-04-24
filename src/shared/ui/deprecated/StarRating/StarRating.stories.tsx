import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StarRating } from './StarRating';

export default {
  title: 'shared/deprecated/StarRating',
  component: StarRating,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof StarRating>;

const Template: ComponentStory<typeof StarRating> = (args) => (
  <StarRating {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const Size50 = Template.bind({});
Size50.args = {
  size: 50,
};

export const Size20 = Template.bind({});
Size20.args = {
  size: 20,
};

export const WithPreselectedRating = Template.bind({});
WithPreselectedRating.args = {
  selectStars: 3,
};

export const PreselectedFiveStars = Template.bind({});
PreselectedFiveStars.args = {
  selectStars: 5,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const DisabledWithPreselectedRating = Template.bind({});
DisabledWithPreselectedRating.args = {
  disabled: true,
  selectStars: 3,
};

export const WithCallback: ComponentStory<typeof StarRating> = (args) => {
  const [rating, setRating] = useState(0);

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <b>Текущий рейтинг:</b>
        {' '}
        {rating}
      </div>
      <StarRating {...args} onSelect={setRating} />
    </div>
  );
};

export const WithCustomWidth = Template.bind({});
WithCustomWidth.args = {
  className: 'custom-width',
};
WithCustomWidth.decorators = [
  (Story) => (
    <div style={{ width: '400px' }}>
      <style>
        {`
          .custom-width {
            width: 100%;
            justify-content: space-between;
          }
        `}
      </style>
      <Story />
    </div>
  ),
];
