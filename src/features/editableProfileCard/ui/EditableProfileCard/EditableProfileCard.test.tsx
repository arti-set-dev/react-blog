import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { Profile } from '@/entities/Profile';
import { $api } from '@/shared/api/api';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { profileReducer } from '../../model/slice/profileSlice';
import { EditableProfileCard } from './EditableProfileCard';

const profile: Profile = {
  username: 'admin',
  age: 22,
  country: Country.Germany,
  city: 'New York',
  currency: Currency.EUR,
  firstname: 'admin',
  lastname: 'admin',
  id: '1',
};

const options = {
  initialState: {
    profile: {
      readonly: true,
      data: profile,
      form: profile,
    },
    user: {
      authData: { id: '1', username: 'admin' },
    },
  },
  asyncReduces: { profile: profileReducer },
};

describe('features/EditableProfileCard', () => {
  test('Readonly mode must be toggled', async () => {
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(screen.getByTestId('ProfileCard.EditButton'));
    expect(screen.getByTestId('ProfileCard.CancelButton')).toBeInTheDocument();
  });

  test('When canceled, the values should return to their original state', async () => {
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(screen.getByTestId('ProfileCard.EditButton'));
    await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));
    await userEvent.clear(screen.getByTestId('ProfileCard.lastname'));

    await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'User');
    await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'User');

    expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('User');
    expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('User');

    await userEvent.click(screen.getByTestId('ProfileCard.CancelButton'));

    expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('admin');
    expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('admin');
  });

  test('An error should appear', async () => {
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(screen.getByTestId('ProfileCard.EditButton'));

    await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));

    await userEvent.click(screen.getByTestId('ProfileCard.SaveButton'));

    expect(screen.getByTestId('Input.Error.Tag')).toBeInTheDocument();
  });

  test('If there are no errors, then a PUT request is sent to the server', async () => {
    const mockPutRequest = jest.spyOn($api, 'put');
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(screen.getByTestId('ProfileCard.EditButton'));

    await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'User');

    await userEvent.click(screen.getByTestId('ProfileCard.SaveButton'));

    expect(mockPutRequest).toHaveBeenCalled();
  });
});
