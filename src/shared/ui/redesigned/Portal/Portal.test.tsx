import { render, screen } from '@testing-library/react';
import { Portal } from './Portal';

describe('Portal', () => {
  beforeEach(() => {
    const appElement = document.createElement('div');
    appElement.id = 'app';
    document.body.appendChild(appElement);
  });

  afterEach(() => {
    const appElement = document.getElementById('app');
    if (appElement) {
      document.body.removeChild(appElement);
    }
  });

  it('рендерит контент в портал', () => {
    render(
      <Portal>
        <div data-testid="test-content">Test content</div>
      </Portal>,
    );

    const content = screen.getByTestId('test-content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent('Test content');
  });

  it('рендерит контент в портал с кастомным id', () => {
    const customId = 'custom-portal';
    const customElement = document.createElement('div');
    customElement.id = customId;
    document.body.appendChild(customElement);

    render(
      <Portal id={customId}>
        <div data-testid="test-content">Custom portal content</div>
      </Portal>,
    );

    const content = screen.getByTestId('test-content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent('Custom portal content');

    document.body.removeChild(customElement);
  });

  it('возвращает null, если целевой элемент не найден', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <Portal id="non-existent-id">
        <div data-testid="test-content">Should not render</div>
      </Portal>,
    );

    expect(screen.queryByTestId('test-content')).not.toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalledWith('Target element for Portal not found: non-existent-id');

    consoleSpy.mockRestore();
  });
});
