/* eslint-disable eol-last */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { UploadFile } from './UploadFile';

export default {
  title: 'shared/UploadFile',
  component: UploadFile,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof UploadFile>;

const Template: ComponentStory<typeof UploadFile> = (args) => <UploadFile {...args} />;

export const Default = Template.bind({});
Default.args = {};
