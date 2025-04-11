import { screen, fireEvent } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Tabs, TabItem } from './Tabs';

describe('Tabs', () => {
  const tabs: TabItem[] = [
    {
      value: 'tab1',
      content: 'Таб 1',
    },
    {
      value: 'tab2',
      content: 'Таб 2',
    },
    {
      value: 'tab3',
      content: 'Таб 3',
    },
  ];

  test('Рендер с дефолтными значениями', () => {
    componentRender(
      <Tabs
        tabs={tabs}
        value="tab1"
        onTabClick={jest.fn()}
      />,
    );

    const tabButtons = screen.getAllByRole('button');
    expect(tabButtons).toHaveLength(3);
    expect(tabButtons[0]).toHaveTextContent('Таб 1');
    expect(tabButtons[1]).toHaveTextContent('Таб 2');
    expect(tabButtons[2]).toHaveTextContent('Таб 3');
  });

  test('Активный таб', () => {
    componentRender(
      <Tabs
        tabs={tabs}
        value="tab2"
        onTabClick={jest.fn()}
      />,
    );

    const tabButtons = screen.getAllByRole('button');
    expect(tabButtons[1]).toHaveClass('active');
  });

  test('Клик по табу', () => {
    const onTabClick = jest.fn();
    componentRender(
      <Tabs
        tabs={tabs}
        value="tab1"
        onTabClick={onTabClick}
      />,
    );

    const tabButtons = screen.getAllByRole('button');
    fireEvent.click(tabButtons[1]);
    expect(onTabClick).toHaveBeenCalledWith(tabs[1]);
  });

  test('Рендер с вертикальным направлением', () => {
    componentRender(
      <Tabs
        tabs={tabs}
        value="tab1"
        onTabClick={jest.fn()}
        direction="column"
      />,
    );

    const tabsContainer = screen.getByTestId('Tabs');
    expect(tabsContainer).toHaveClass('directionColumn');
  });

  test('Рендер с fullWidth', () => {
    componentRender(
      <Tabs
        tabs={tabs}
        value="tab1"
        onTabClick={jest.fn()}
        fullWidth
      />,
    );

    const tabButtons = screen.getAllByRole('button');
    tabButtons.forEach((button) => {
      expect(button).toHaveClass('fullWidth');
    });
  });

  test('Рендер с дополнительным классом', () => {
    componentRender(
      <Tabs
        tabs={tabs}
        value="tab1"
        onTabClick={jest.fn()}
        className="custom-class"
      />,
    );

    const tabsContainer = screen.getByTestId('Tabs');
    expect(tabsContainer).toHaveClass('custom-class');
  });
});
