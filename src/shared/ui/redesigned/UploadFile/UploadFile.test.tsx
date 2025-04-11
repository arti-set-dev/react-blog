import { screen, fireEvent } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { UploadFile } from './UploadFile';

describe('UploadFile', () => {
  const mockFile = new File(['test'], 'test.png', { type: 'image/png' });

  beforeEach(() => {
    // @ts-ignore
    global.URL.createObjectURL = jest.fn(() => 'test-file-url');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Рендер с дефолтными значениями', () => {
    componentRender(<UploadFile />);

    expect(screen.getByText('Upload file')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('Рендер с кастомным плейсхолдером', () => {
    componentRender(<UploadFile placeholder="Загрузить файл" />);

    expect(screen.getByText('Загрузить файл')).toBeInTheDocument();
  });

  test('Загрузка файла', () => {
    const onFileSelect = jest.fn();
    componentRender(<UploadFile onFileSelect={onFileSelect} />);

    const input = screen.getByRole('button');
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;

    const file = new File(['test'], 'test.txt', { type: 'text/plain' });

    fireEvent.click(input);
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(onFileSelect).toHaveBeenCalledWith(file);
    expect(screen.getByText('test.txt')).toBeInTheDocument();
  });

  test('Предпросмотр изображения', () => {
    const onFileSelect = jest.fn();
    componentRender(<UploadFile preview onFileSelect={onFileSelect} />);

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;

    fireEvent.change(fileInput, { target: { files: [mockFile] } });

    expect(screen.getByAltText('test.png')).toBeInTheDocument();
    expect(screen.getByAltText('test.png')).toHaveAttribute('src', 'test-file-url');
  });

  test('Круглый предпросмотр', () => {
    componentRender(
      <UploadFile
        preview
        previewCircle
        previewSize={100}
      />,
    );

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;

    fireEvent.change(fileInput, { target: { files: [mockFile] } });

    const previewWrapper = document.querySelector('[class*="previewWrapper"]');
    expect(previewWrapper).toHaveClass('previewCircle');
  });

  test('Множественная загрузка файлов', () => {
    componentRender(<UploadFile multiple accept="image/*" />);

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    expect(fileInput).toHaveAttribute('multiple');
    expect(fileInput).toHaveAttribute('accept', 'image/*');
  });

  test('Клик по превью открывает диалог выбора файла', () => {
    componentRender(<UploadFile preview />);

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;

    fireEvent.change(fileInput, { target: { files: [mockFile] } });

    const preview = screen.getByAltText('test.png');
    const clickSpy = jest.spyOn(fileInput, 'click');

    fireEvent.click(preview);
    expect(clickSpy).toHaveBeenCalled();
  });
});
