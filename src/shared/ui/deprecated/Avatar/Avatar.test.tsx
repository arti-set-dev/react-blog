import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Avatar, AvatarLoading } from './Avatar';

describe('Avatar', () => {
  const mockFile = new File(['test'], 'test.png', { type: 'image/png' });

  beforeEach(() => {
    // @ts-ignore
    global.URL.createObjectURL = jest.fn(() => 'test-file-url');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Рендер компонента с изображением в режиме readonly', () => {
    componentRender(
      <Avatar
        src="test-avatar.png"
        readonly
      />,
    );

    const avatar = screen.getByRole('img');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'test-avatar.png');
  });

  test('Рендер компонента в режиме редактирования', () => {
    componentRender(
      <Avatar
        readonly={false}
      />,
    );

    const uploadButton = screen.getByRole('button', { name: 'Upload avatar' });
    expect(uploadButton).toBeInTheDocument();
  });

  test('Обработка выбора файла', async () => {
    componentRender(
      <Avatar
        readonly={false}
      />,
    );

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'file');
    expect(input).toHaveAttribute('accept', 'image/*');

    await userEvent.upload(input, mockFile);

    const preview = screen.getByRole('img');
    expect(preview).toHaveAttribute('src', 'test-file-url');
  });

  test('Рендер с кастомным размером', () => {
    componentRender(
      <Avatar
        size={150}
        readonly
      />,
    );

    const avatar = screen.getByRole('img');
    expect(avatar).toHaveAttribute('width', '150');
    expect(avatar).toHaveAttribute('height', '150');
  });

  test('Рендер с кастомным классом', () => {
    componentRender(
      <Avatar
        className="test-class"
        readonly
      />,
    );

    const avatar = screen.getByRole('img');
    expect(avatar).toHaveClass('test-class');
  });

  test('Рендер с ленивой загрузкой', () => {
    componentRender(
      <Avatar
        loading={AvatarLoading.LAZY}
        readonly
      />,
    );

    const lazyImage = screen.getByRole('img');
    expect(lazyImage).toHaveAttribute('loading', 'lazy');
  });

  test('Рендер с eager загрузкой', () => {
    componentRender(
      <Avatar
        loading={AvatarLoading.EAGER}
        readonly
      />,
    );

    const lazyImage = screen.getByRole('img');
    expect(lazyImage).toHaveAttribute('loading', 'eager');
  });
});
