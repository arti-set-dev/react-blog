import { screen } from '@testing-library/react';
import { userEvent } from '@storybook/testing-library';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { AddCommentFormRedesigned } from './AddCommentFormRedesigned';
import { addNewCommentReducer } from '../../../model/slices/addNewCommentSlice';

describe('AddCommentFormRedesigned', () => {
  test('Рендер для неавторизованного пользователя', () => {
    componentRender(<AddCommentFormRedesigned onSendComment={() => {}} />);

    expect(screen.getByTestId('AddCommentForm')).toBeInTheDocument();
    expect(screen.getByText('Login to our platform and join in the lively discussions')).toBeInTheDocument();
    expect(screen.queryByTestId('AddCommentForm.Input')).not.toBeInTheDocument();
    expect(screen.queryByTestId('AddCommentForm.Button')).not.toBeInTheDocument();
  });

  test('Рендер для авторизованного пользователя', () => {
    componentRender(
      <AddCommentFormRedesigned onSendComment={() => {}} />,
      {
        initialState: {
          user: {
            authData: { id: '1', username: 'test' },
          },
        },
      },
    );

    expect(screen.getByTestId('AddCommentForm')).toBeInTheDocument();
    expect(screen.getByTestId('AddCommentForm.Input')).toBeInTheDocument();
    expect(screen.getByTestId('AddCommentForm.Button')).toBeInTheDocument();
  });

  test('Ввод текста в поле комментария', async () => {
    componentRender(
      <AddCommentFormRedesigned onSendComment={() => {}} />,
      {
        initialState: {
          user: {
            authData: { id: '1', username: 'test' },
          },
        },
        asyncReduces: {
          addNewComment: addNewCommentReducer,
        },
      },
    );

    const input = screen.getByTestId('AddCommentForm.Input');
    expect(input).toBeInTheDocument();

    await userEvent.type(input, 'test comment');
    expect(input).toHaveValue('test comment');
  });

  test('Отправка комментария', async () => {
    const onSendComment = jest.fn();
    componentRender(
      <AddCommentFormRedesigned onSendComment={onSendComment} />,
      {
        initialState: {
          user: {
            authData: { id: '1', username: 'test' },
          },
        },
        asyncReduces: {
          addNewComment: addNewCommentReducer,
        },
      },
    );

    const input = screen.getByTestId('AddCommentForm.Input');
    const sendButton = screen.getByTestId('AddCommentForm.Button');

    await userEvent.type(input, 'test comment');
    await userEvent.click(sendButton);

    expect(onSendComment).toHaveBeenCalledWith('test comment');
    expect(input).toHaveValue('');
  });

  test('Отображение ошибки', () => {
    componentRender(
      <AddCommentFormRedesigned onSendComment={() => {}} />,
      {
        initialState: {
          user: {
            authData: { id: '1', username: 'test' },
          },
          addNewComment: {
            error: 'error',
          },
        },
        asyncReduces: {
          addNewComment: addNewCommentReducer,
        },
      },
    );

    expect(screen.getByText(/There was an error when sending a message/i)).toBeInTheDocument();
  });

  test('Проверка наличия плейсхолдера в поле ввода', () => {
    componentRender(
      <AddCommentFormRedesigned onSendComment={() => {}} />,
      {
        initialState: {
          user: {
            authData: { id: '1', username: 'test' },
          },
        },
      },
    );

    expect(screen.getByText('Write your comment')).toBeInTheDocument();
  });

  test('Проверка наличия иконки отправки в кнопке', () => {
    componentRender(
      <AddCommentFormRedesigned onSendComment={() => {}} />,
      {
        initialState: {
          user: {
            authData: { id: '1', username: 'test' },
          },
        },
      },
    );

    const button = screen.getByTestId('AddCommentForm.Button');
    expect(button).toBeInTheDocument();
    expect(button.querySelector('div')).toBeInTheDocument();
  });
});
