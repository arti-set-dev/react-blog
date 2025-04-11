import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Avatar } from './Avatar';
import cl from './Avatar.module.scss';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}));

jest.mock('../Icon/Icon', () => ({
  Icon: ({ width, height, Svg }: { width: number; height: number; Svg: React.FC }) => (
    <div data-testid="icon" style={{ width, height }}>
      <Svg />
    </div>
  ),
}));

jest.mock('../Skeleton', () => ({
  Skeleton: ({ width, height }: { width: number; height: number }) => (
    <div data-testid="skeleton" style={{ width, height }} />
  ),
}));

jest.mock('../../redesigned/LazyImage', () => ({
  LazyImage: ({
    src,
    alt,
    width,
    height,
    className,
    fallback,
    errorFallback,
  }: {
    src?: string;
    alt?: string;
    width: number;
    height: number;
    className?: string;
    fallback: React.ReactNode;
    errorFallback: React.ReactNode;
  }) => {
    if (!src) {
      return fallback;
    }

    if (src === 'error.jpg') {
      return errorFallback;
    }

    return (
      <img
        data-testid="lazy-image"
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    );
  },
}));

jest.mock('../UploadFile', () => ({
  UploadFile: ({ onFileSelect }: { onFileSelect: (file: File) => void }) => (
    <div data-testid="upload-file">
      <input
        type="file"
        data-testid="file-input"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            onFileSelect(e.target.files[0]);
          }
        }}
      />
    </div>
  ),
}));

jest.mock('../Card', () => ({
  Card: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card">
      {children}
    </div>
  ),
}));

describe('Avatar', () => {
  test('Рендер с изображением в режиме readonly', () => {
    const src = 'test-image.jpg';
    const alt = 'Test Avatar';
    render(
      <Avatar
        src={src}
        alt={alt}
        size={100}
        readonly
      />,
    );

    const image = screen.getByTestId('lazy-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', src);
    expect(image).toHaveAttribute('alt', alt);
    expect(image).toHaveAttribute('width', '100');
    expect(image).toHaveAttribute('height', '100');
    expect(image).toHaveClass(cl.Avatar);
  });

  test('Рендер с загрузчиком при отсутствии изображения', () => {
    render(
      <Avatar
        size={100}
        readonly
        src={undefined}
      />,
    );

    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveStyle({ width: '100px', height: '100px' });
  });

  test('Рендер с иконкой при ошибке загрузки', () => {
    render(
      <Avatar
        size={100}
        readonly
        src="error.jpg"
      />,
    );

    const icon = screen.getByTestId('icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveStyle({ width: '100px', height: '100px' });
  });

  test('Рендер в режиме редактирования', () => {
    const onChangeAvatar = jest.fn();
    render(
      <Avatar
        size={100}
        readonly={false}
        onChangeAvatar={onChangeAvatar}
      />,
    );

    const card = screen.getByTestId('card');
    expect(card).toBeInTheDocument();

    const uploadFile = screen.getByTestId('upload-file');
    expect(uploadFile).toBeInTheDocument();
  });

  test('Применение дополнительного класса', () => {
    render(
      <Avatar
        size={100}
        className="custom-class"
        readonly
        src="test-image.jpg"
      />,
    );

    const image = screen.getByTestId('lazy-image');
    expect(image).toHaveClass('custom-class');
  });

  test('Значения по умолчанию', () => {
    render(<Avatar src="test-image.jpg" />);

    const image = screen.getByTestId('lazy-image');
    expect(image).toHaveAttribute('width', '100'); // size по умолчанию
    expect(image).toHaveAttribute('height', '100');
  });

  test('Обработка загрузки файла', async () => {
    const onChangeAvatar = jest.fn();
    render(
      <Avatar
        size={100}
        readonly={false}
        onChangeAvatar={onChangeAvatar}
      />,
    );

    const fileInput = screen.getByTestId('file-input');
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });

    await act(async () => {
      await userEvent.upload(fileInput, file);
    });

    expect(onChangeAvatar).toHaveBeenCalledWith(file);
  });
});
