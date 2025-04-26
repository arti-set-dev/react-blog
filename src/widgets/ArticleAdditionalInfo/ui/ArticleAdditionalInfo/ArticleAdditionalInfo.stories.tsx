import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticleAdditionalInfo } from './ArticleAdditionalInfo';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import avatar from './avatar.jpg';

export default {
  title: 'widgets/ArticleAdditionalInfo',
  component: ArticleAdditionalInfo,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleAdditionalInfo>;

const Template: ComponentStory<typeof ArticleAdditionalInfo> = (args) => (
  <ArticleAdditionalInfo {...args} />
);

const defaultArgs = {
  author: {
    id: '1',
    username: 'Админ',
    email: 'admin@test.com',
    avatar,
  },
  createdAt: '15.05.2022',
  views: 1022,
};

export const NoAvatar = Template.bind({});
NoAvatar.args = {
  ...defaultArgs,
  author: {
    id: '1',
    username: 'Пользователь',
    email: 'user@test.com',
  },
};
NoAvatar.decorators = [NewDesignDecorator, StoreDecorator({})];

export const LowViews = Template.bind({});
LowViews.args = {
  ...defaultArgs,
  views: 5,
};
LowViews.decorators = [NewDesignDecorator, StoreDecorator({})];
