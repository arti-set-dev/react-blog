import { screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import cl from './Modal.module.scss';

describe('Modal', () => {
  test('Рендер с дефолтными значениями', () => {
    componentRender(
      <Modal isOpen>
        <div data-testid="modal-content">Test content</div>
      </Modal>,
    );

    const dialog = screen.getByRole('dialog');
    const content = screen.getByTestId('modal-content');
    const closeButton = screen.getByLabelText('Закрыть модальное окно');

    expect(dialog).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveClass(cl.opened);
  });

  test('Рендер с дополнительным классом', () => {
    componentRender(
      <Modal isOpen className="test-class">
        <div>Test content</div>
      </Modal>,
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('test-class');
    expect(dialog).toHaveClass(cl.opened);
  });

  test('Не отображается когда isOpen=false', () => {
    componentRender(
      <Modal isOpen={false}>
        <div data-testid="modal-content">Test content</div>
      </Modal>,
    );

    const dialog = screen.queryByRole('dialog');
    const content = screen.queryByTestId('modal-content');

    expect(dialog).not.toBeInTheDocument();
    expect(content).not.toBeInTheDocument();
  });

  test('Не рендерится в lazy режиме когда не открыт', () => {
    componentRender(
      <Modal isOpen={false} lazy>
        <div data-testid="modal-content">Test content</div>
      </Modal>,
    );

    const dialog = screen.queryByRole('dialog');
    const content = screen.queryByTestId('modal-content');

    expect(dialog).toBeNull();
    expect(content).toBeNull();
  });

  test('Вызывает onClose при клике на кнопку закрытия', () => {
    const onClose = jest.fn();
    componentRender(
      <Modal isOpen onClose={onClose}>
        <div>Test content</div>
      </Modal>,
    );

    const closeButton = screen.getByLabelText('Закрыть модальное окно');
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('Вызывает onClose при клике на оверлей', () => {
    const onClose = jest.fn();
    componentRender(
      <Modal isOpen onClose={onClose}>
        <div>Test content</div>
      </Modal>,
    );

    const overlay = screen.getByTestId('overlay');
    fireEvent.click(overlay);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
