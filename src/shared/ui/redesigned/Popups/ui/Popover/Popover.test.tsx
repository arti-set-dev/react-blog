import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Popover } from './Popover';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import cl from './Popover.module.scss';

describe('Popover', () => {
  const trigger = <button type="button">Открыть попап</button>;
  const content = <div>Содержимое попапа</div>;

  test('Рендер с дефолтными значениями', () => {
    componentRender(
      <Popover trigger={trigger}>
        {content}
      </Popover>,
    );

    expect(screen.getByText('Открыть попап')).toBeInTheDocument();
  });

  test('Открытие и закрытие попапа', async () => {
    const user = userEvent.setup();
    componentRender(
      <Popover trigger={trigger}>
        {content}
      </Popover>,
    );

    const triggerButton = screen.getByText('Открыть попап');
    await user.click(triggerButton);

    expect(screen.getByText('Содержимое попапа')).toBeInTheDocument();

    await user.click(triggerButton);
    expect(screen.queryByText('Содержимое попапа')).not.toBeInTheDocument();
  });

  test('Рендер с кастомным направлением', async () => {
    const user = userEvent.setup();
    componentRender(
      <Popover
        trigger={trigger}
        direction="top right"
      >
        {content}
      </Popover>,
    );

    const triggerButton = screen.getByText('Открыть попап');
    await user.click(triggerButton);

    const panel = screen.getByText('Содержимое попапа').closest(`.${cl.Panel}`);
    expect(panel).toHaveClass('dropdownTopRight');
  });

  test('Рендер с дополнительным классом', () => {
    componentRender(
      <Popover
        trigger={trigger}
        className="custom-class"
      >
        {content}
      </Popover>,
    );

    const popover = screen.getByRole('button').closest(`.${cl.Popover}`);
    expect(popover).toHaveClass('custom-class');
  });

  test('Клик вне попапа закрывает его', async () => {
    const user = userEvent.setup();
    componentRender(
      <Popover trigger={trigger}>
        {content}
      </Popover>,
    );

    const triggerButton = screen.getByText('Открыть попап');
    await user.click(triggerButton);

    expect(screen.getByText('Содержимое попапа')).toBeInTheDocument();

    await user.click(document.body);

    expect(screen.queryByText('Содержимое попапа')).not.toBeInTheDocument();
  });
});
