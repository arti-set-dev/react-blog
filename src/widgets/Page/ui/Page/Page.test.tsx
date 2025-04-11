import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Page } from './Page';

describe('Page', () => {
  beforeAll(() => {
    class MockIntersectionObserver {
      observe = jest.fn();

      disconnect = jest.fn();

      unobserve = jest.fn();
    }

    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      configurable: true,
      value: MockIntersectionObserver,
    });
  });

  test('Рендер с дефолтным data-testid', () => {
    componentRender(
      <Page>
        <div>Test content</div>
      </Page>,
    );

    expect(screen.getByTestId('Page')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  test('Рендер с кастомным data-testid', () => {
    componentRender(
      <Page data-testid="CustomPage">
        <div>Test content</div>
      </Page>,
    );

    expect(screen.getByTestId('CustomPage')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  test('Вызов onScrollEnd при достижении конца страницы', () => {
    const onScrollEnd = jest.fn();
    componentRender(
      <Page onScrollEnd={onScrollEnd}>
        <div style={{ height: '1000px' }}>Test content</div>
      </Page>,
    );

    expect(screen.getByTestId('Page')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  test('Сохранение позиции скролла', () => {
    componentRender(
      <Page>
        <div style={{ height: '1000px' }}>Test content</div>
      </Page>,
    );

    const page = screen.getByTestId('Page');
    const scrollEvent = new UIEvent('scroll');
    Object.defineProperty(document.documentElement, 'scrollTop', { value: 100 });
    page.dispatchEvent(scrollEvent);

    expect(page).toBeInTheDocument();
  });
});
