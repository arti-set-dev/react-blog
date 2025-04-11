import { render, screen, fireEvent } from '@testing-library/react';
import { Popover } from './Popover';
import { DropdownDirection } from '@/shared/const/ui';
import cl from './Popover.module.scss';
import popupCl from '../../styles/Popups.module.scss';

describe('Popover', () => {
  const trigger = <button>Открыть</button>;
  const content = <div>Содержимое попапа</div>;

  test('Рендер компонента Popover', () => {
    render(
      <Popover trigger={trigger}>
        {content}
      </Popover>,
    );

    expect(screen.getByText('Открыть')).toBeInTheDocument();
  });

  test('Открытие попапа при клике на триггер', () => {
    render(
      <Popover trigger={trigger}>
        {content}
      </Popover>,
    );

    const triggerButton = screen.getByText('Открыть');
    expect(screen.queryByText('Содержимое попапа')).not.toBeInTheDocument();

    fireEvent.click(triggerButton);

    expect(screen.getByText('Содержимое попапа')).toBeInTheDocument();
  });

  test('Применение дополнительного класса', () => {
    const { container } = render(
      <Popover trigger={trigger} className="custom-class">
        {content}
      </Popover>,
    );

    const popover = container.querySelector(`.${cl.Popover}`);
    expect(popover).toBeInTheDocument();
  });

  test('Применение разных направлений попапа', () => {
    const directions: DropdownDirection[] = ['bottom left', 'bottom right', 'top left', 'top right'];

    directions.forEach((direction) => {
      const { container, unmount } = render(
        <Popover trigger={trigger} direction={direction}>
          {content}
        </Popover>,
      );

      const triggerButton = screen.getByText('Открыть');
      fireEvent.click(triggerButton);

      const panel = container.querySelector(`.${cl.Panel}`);
      expect(panel).toBeInTheDocument();

      unmount();
    });
  });

  test('Проверка наличия триггера с правильным классом', () => {
    const { container } = render(
      <Popover trigger={trigger}>
        {content}
      </Popover>,
    );

    const triggerElement = container.querySelector(`.${popupCl.Trigger}`);
    expect(triggerElement).toBeInTheDocument();
  });
});
