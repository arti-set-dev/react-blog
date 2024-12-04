import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleImageTextComponent } from './ArticleImageTextComponent';

export default {
  title: 'entitie/ArticleImageTextComponent',
  component: ArticleImageTextComponent,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleImageTextComponent>;

const Template: ComponentStory<typeof ArticleImageTextComponent> = (args) => <ArticleImageTextComponent {...args} />;

export const Default = Template.bind({});
Default.args = {};
