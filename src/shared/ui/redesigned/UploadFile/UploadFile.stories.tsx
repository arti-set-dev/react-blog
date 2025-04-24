/* eslint-disable eol-last */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { UploadFile } from './UploadFile';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  title: 'shared/redesigned/UploadFile',
  component: UploadFile,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    NewDesignDecorator,
  ],
} as ComponentMeta<typeof UploadFile>;

const Template: ComponentStory<typeof UploadFile> = (args) => <UploadFile {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Загрузить файл',
};

export const WithAcceptImages = Template.bind({});
WithAcceptImages.args = {
  placeholder: 'Загрузить изображение',
  accept: 'image/*',
};

export const WithAcceptPDF = Template.bind({});
WithAcceptPDF.args = {
  placeholder: 'Загрузить PDF документ',
  accept: '.pdf',
};

export const WithPreview = Template.bind({});
WithPreview.args = {
  placeholder: 'Загрузить изображение с предпросмотром',
  accept: 'image/*',
  preview: true,
};

export const WithCirclePreview = Template.bind({});
WithCirclePreview.args = {
  placeholder: 'Загрузить аватар',
  accept: 'image/*',
  preview: true,
  previewCircle: true,
};

export const WithCustomPreviewSize = Template.bind({});
WithCustomPreviewSize.args = {
  placeholder: 'Загрузить изображение',
  accept: 'image/*',
  preview: true,
  previewSize: 150,
};

export const MultipleFiles = Template.bind({});
MultipleFiles.args = {
  placeholder: 'Загрузить несколько файлов',
  multiple: true,
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
  placeholder: 'Загрузить файл',
};
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)];
