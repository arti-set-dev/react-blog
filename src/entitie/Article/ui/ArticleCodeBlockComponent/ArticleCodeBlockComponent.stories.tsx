import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleImageCodeComponent } from './ArticleImageCodeComponent';

export default {
  title: 'entitie/ArticleImageCodeComponent',
  component: ArticleImageCodeComponent,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleImageCodeComponent>;

const Template: ComponentStory<typeof ArticleImageCodeComponent> = (args) => <ArticleImageCodeComponent {...args} />;

export const Default = Template.bind({});
Default.args = {};
