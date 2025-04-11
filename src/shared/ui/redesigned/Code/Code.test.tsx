import { screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Code } from './Code';

const mockClipboard = {
  writeText: jest.fn(() => Promise.resolve()),
};

const originalClipboard = navigator.clipboard;

describe('Code (Redesigned)', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: mockClipboard,
      writable: true,
    });

    jest.clearAllMocks();

    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: originalClipboard,
      writable: true,
    });

    jest.restoreAllMocks();
  });

  test('Рендер с заданным текстом', () => {
    const testCode = 'const example = "test";';
    componentRender(<Code text={testCode} />);

    expect(screen.getByText(testCode)).toBeInTheDocument();
  });

  test('Рендер с дополнительным классом', () => {
    const testCode = 'const example = "test";';
    componentRender(<Code text={testCode} className="custom-class" />);

    expect(screen.getByText(testCode)).toBeInTheDocument();
  });

  test('Копирование текста при нажатии на кнопку', async () => {
    const testCode = 'const example = "test";';
    componentRender(<Code text={testCode} />);

    const copyButton = screen.getByLabelText('Copy');

    await act(async () => {
      fireEvent.click(copyButton);
    });

    expect(mockClipboard.writeText).toHaveBeenCalledWith(testCode);
  });

  test('Обработка ошибки при копировании', async () => {
    const testCode = 'const example = "test";';
    const errorMessage = 'Failed to copy!';

    mockClipboard.writeText.mockRejectedValueOnce(new Error(errorMessage));

    componentRender(<Code text={testCode} />);

    const copyButton = screen.getByLabelText('Copy');
    await act(async () => {
      fireEvent.click(copyButton);
    });

    expect(console.error).toHaveBeenCalled();
  });

  test('Проверка структуры компонента', () => {
    const testCode = 'const example = "test";';
    componentRender(<Code text={testCode} />);

    expect(screen.getByText(testCode)).toBeInTheDocument();
    expect(screen.getByLabelText('Copy')).toBeInTheDocument();

    const codeElement = screen.getByText(testCode);
    expect(codeElement.tagName).toBe('CODE');
  });
});
