import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs } from './Tabs';
import { ButtonTheme } from '../Button/Button';
import cl from '../Button/Button.module.scss';
import tabsCl from './Tabs.module.scss';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}));

const tabs = [
  { value: 'tab1', content: 'Tab 1' },
  { value: 'tab2', content: 'Tab 2' },
  { value: 'tab3', content: 'Tab 3' },
];

describe('Tabs', () => {
  test('Рендер компонента Tabs', () => {
    render(<Tabs tabs={tabs} value="tab1" />);

    tabs.forEach((tab) => {
      const tabElement = screen.getByText(tab.content);
      expect(tabElement).toBeInTheDocument();
    });
  });

  test('Применение дополнительного класса', () => {
    render(<Tabs tabs={tabs} value="tab1" className="custom-class" />);
    const container = screen.getByText('Tab 1').closest(`.${tabsCl.Tabs}`);
    expect(container).toHaveClass('custom-class');
  });

  test('Выбор активного таба', () => {
    render(<Tabs tabs={tabs} value="tab2" />);

    const activeTab = screen.getByText('Tab 2').closest('button');
    expect(activeTab).toHaveClass(cl[ButtonTheme.ACTIVE]);

    const inactiveTabs = [screen.getByText('Tab 1').closest('button'), screen.getByText('Tab 3').closest('button')];
    inactiveTabs.forEach((tab) => {
      expect(tab).toHaveClass(cl[ButtonTheme.OUTLINE]);
    });
  });

  test('Обработка клика по табу', () => {
    const onTabClick = jest.fn();
    render(<Tabs tabs={tabs} value="tab1" onTabClick={onTabClick} />);

    const secondTab = screen.getByText('Tab 2');
    fireEvent.click(secondTab);

    expect(onTabClick).toHaveBeenCalledWith(tabs[1]);
  });

  test('Режим fullWidth', () => {
    render(<Tabs tabs={tabs} value="tab1" fullWidth />);

    tabs.forEach((tab) => {
      const button = screen.getByText(tab.content).closest('button');
      expect(button).toHaveClass(cl.fullWidth);
    });
  });
});
