// /* eslint-disable max-len */
// import React from 'react';
// import { ComponentStory, ComponentMeta } from '@storybook/react';
// import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
// import { ArticleDetailsCommentsSchema } from 'pages/ArticleDetailsPage';
// import { Comments } from './Comments';

// export default {
//   title: 'entitie/Comments',
//   component: Comments,
//   argTypes: {
//     backgroundColor: { control: 'color' },
//   },
// } as ComponentMeta<typeof Comments>;

// const Template: ComponentStory<typeof Comments> = (args) => <Comments {...args} />;

// const comments: ArticleDetailsCommentsSchema = {
//   isLoading: false,
//   error: undefined,
//   ids: ['1', '2'],
//   entities: {
//     1: {
//       id: '1',
//       text: 'Some comment',
//       user: {
//         id: '1',
//         username: 'Some username',
//         avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//       },
//     },
//     2: {
//       id: '2',
//       text: 'Some comment 2',
//       user: {
//         id: '2',
//         username: 'Some username 2',
//       },
//     },
//   },
// };

// export const Default = Template.bind({});
// Default.decorators = [StoreDecorator({
//   articleDetailsComments: comments,
// })];
