import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Theme } from '@/shared/const/theme';
import { RatingCard } from './RatingCard';

export default {
  title: 'entities/Rating/RatingCard',
  component: RatingCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof RatingCard>;

const Template: ComponentStory<typeof RatingCard> = (args) => (
  <RatingCard {...args} />
);

// Старый дизайн (deprecated)
export const Normal = Template.bind({});
Normal.args = {
  title: 'Как вам статья?',
  feedbackTitle: 'Оставьте отзыв о статье',
  hasFeedback: true,
  isAuth: true,
};
Normal.decorators = [StoreDecorator({})];

export const WithoutFeedback = Template.bind({});
WithoutFeedback.args = {
  title: 'Как вам статья?',
  hasFeedback: false,
  isAuth: true,
};
WithoutFeedback.decorators = [StoreDecorator({})];

export const WithRating = Template.bind({});
WithRating.args = {
  title: 'Как вам статья?',
  feedbackTitle: 'Оставьте отзыв о статье',
  hasFeedback: true,
  rate: 4,
  isAuth: true,
};
WithRating.decorators = [StoreDecorator({})];

export const NotAuth = Template.bind({});
NotAuth.args = {
  title: 'Пожайлуста залогиньтесь чтобы оценить статью',
  feedbackTitle: 'Оставьте отзыв о статье',
  hasFeedback: true,
  isAuth: false,
};
NotAuth.decorators = [StoreDecorator({})];

export const NormalDark = Template.bind({});
NormalDark.args = {
  title: 'Как вам статья?',
  feedbackTitle: 'Оставьте отзыв о статье',
  hasFeedback: true,
  isAuth: true,
};
NormalDark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];

// Новый дизайн (redesigned)
export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {
  title: 'Как вам статья?',
  feedbackTitle: 'Оставьте отзыв о статье',
  hasFeedback: true,
  isAuth: true,
};
NormalRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const WithoutFeedbackRedesigned = Template.bind({});
WithoutFeedbackRedesigned.args = {
  title: 'Как вам статья?',
  hasFeedback: false,
  isAuth: true,
};
WithoutFeedbackRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const WithRatingRedesigned = Template.bind({});
WithRatingRedesigned.args = {
  title: 'Как вам статья?',
  feedbackTitle: 'Оставьте отзыв о статье',
  hasFeedback: true,
  rate: 4,
  isAuth: true,
};
WithRatingRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const NotAuthRedesigned = Template.bind({});
NotAuthRedesigned.args = {
  title: 'Пожайлуста залогиньтесь чтобы оценить статью',
  feedbackTitle: 'Оставьте отзыв о статье',
  hasFeedback: true,
  isAuth: false,
};
NotAuthRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const NormalDarkRedesigned = Template.bind({});
NormalDarkRedesigned.args = {
  title: 'Как вам статья?',
  feedbackTitle: 'Оставьте отзыв о статье',
  hasFeedback: true,
  isAuth: true,
};
NormalDarkRedesigned.decorators = [NewDesignDecorator, ThemeDecorator(Theme.DARK), StoreDecorator({})];
