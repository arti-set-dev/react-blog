import { fireEvent, render, screen } from '@testing-library/react';
import { withTranslation } from 'react-i18next';
import { renderWithTranslation } from 'shared/lib/tests/renderWithTranslation/renderWithTranslation';
import { Sidebar } from 'widgets/Sidebar/ui/Sidebar/Sidebar';

describe('Sidebar', () => {
    test('with only first param', () => {
        renderWithTranslation(<Sidebar />);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    test('test toggle', () => {
        renderWithTranslation(<Sidebar />);
        const collapseBtn = screen.getByTestId('sidebar-collapse');
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        fireEvent.click(collapseBtn);
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    });
});
