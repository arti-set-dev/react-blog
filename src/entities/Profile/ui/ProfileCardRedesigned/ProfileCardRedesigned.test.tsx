import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { ProfileCardRedesigned } from './ProfileCardRedesigned';
import { ProfileCardProps } from '../ProfileCard/ProfileCard';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

const mockProfile = {
  firstname: 'John',
  lastname: 'Doe',
  age: 30,
  city: 'New York',
  username: 'johndoe',
  avatar: 'https://example.com/avatar.jpg',
  country: Country.USA,
  currency: Currency.USD,
};

const defaultProps: ProfileCardProps = {
  data: mockProfile,
  isLoading: false,
  error: undefined,
  readonly: true,
  onEdit: jest.fn(),
  onSave: jest.fn(),
  onCancelEdit: jest.fn(),
  onChangeFirstname: jest.fn(),
  onChangeLastname: jest.fn(),
  onChangeCity: jest.fn(),
  onChangeAge: jest.fn(),
  onChangeCountry: jest.fn(),
  onChangeAvatar: jest.fn(),
  onChangeUsername: jest.fn(),
  onChangeCurrency: jest.fn(),
  fieldErrors: undefined,
};

describe('ProfileCardRedesigned', () => {
  test('Рендер в режиме чтения', () => {
    componentRender(<ProfileCardRedesigned {...defaultProps} />);

    // Проверяем наличие аватара
    const avatar = screen.getByAltText('Profile avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', mockProfile.avatar);

    // Проверяем наличие кнопки редактирования
    const editButton = screen.getByTestId('ProfileCard.EditButton');
    expect(editButton).toBeInTheDocument();
    expect(editButton).toHaveTextContent('Edit');

    // Проверяем поля ввода
    const firstnameInput = screen.getByTestId('ProfileCard.firstname');
    expect(firstnameInput).toBeInTheDocument();
    expect(firstnameInput).toHaveValue(mockProfile.firstname);
    expect(firstnameInput).toHaveAttribute('readonly');

    const lastnameInput = screen.getByTestId('ProfileCard.lastname');
    expect(lastnameInput).toBeInTheDocument();
    expect(lastnameInput).toHaveValue(mockProfile.lastname);
    expect(lastnameInput).toHaveAttribute('readonly');
  });

  test('Рендер в режиме редактирования', () => {
    componentRender(
      <ProfileCardRedesigned
        {...defaultProps}
        readonly={false}
      />,
    );

    // Проверяем наличие кнопок отмены и сохранения
    const cancelButton = screen.getByTestId('ProfileCard.CancelButton');
    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton).toHaveTextContent('Cancel');

    const saveButton = screen.getByTestId('ProfileCard.SaveButton');
    expect(saveButton).toBeInTheDocument();
    expect(saveButton).toHaveTextContent('Save');

    // Проверяем, что поля ввода доступны для редактирования
    const firstnameInput = screen.getByTestId('ProfileCard.firstname');
    expect(firstnameInput).not.toHaveAttribute('readonly');
  });

  test('Рендер с ошибками валидации', () => {
    const fieldErrors = {
      firstname: 'Firstname is required',
      lastname: 'Lastname is required',
      city: 'City is required',
      username: 'Username is required',
    };

    componentRender(
      <ProfileCardRedesigned
        {...defaultProps}
        fieldErrors={fieldErrors}
      />,
    );

    // Проверяем наличие сообщений об ошибках
    const firstnameInput = screen.getByTestId('ProfileCard.firstname');
    expect(firstnameInput).toHaveClass('error');

    const lastnameInput = screen.getByTestId('ProfileCard.lastname');
    expect(lastnameInput).toHaveClass('error');
  });

  test('Рендер с загрузкой', () => {
    componentRender(
      <ProfileCardRedesigned
        {...defaultProps}
        isLoading
      />,
    );

    // Проверяем, что компонент не отображается при загрузке
    const card = screen.queryByTestId('Card');
    expect(card).not.toBeInTheDocument();
  });

  test('Рендер с ошибкой', () => {
    componentRender(
      <ProfileCardRedesigned
        {...defaultProps}
        error="Error message"
      />,
    );

    // Проверяем, что компонент не отображается при ошибке
    const card = screen.queryByTestId('Card');
    expect(card).not.toBeInTheDocument();
  });
});
