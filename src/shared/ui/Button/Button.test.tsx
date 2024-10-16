import { render, screen } from '@testing-library/react';
import { Button, ThemeButton } from 'shared/ui/Button/Button';

describe('Button', () => {
    test('test render', () => {
        render(<Button>test</Button>);
        expect(screen.getByText('test')).toBeInTheDocument();
    });

    test('test render class', () => {
        render(<Button theme={ThemeButton.SIDE}>test</Button>);
        expect(screen.getByText('test')).toHaveClass('side');
        screen.debug();
    });
});
