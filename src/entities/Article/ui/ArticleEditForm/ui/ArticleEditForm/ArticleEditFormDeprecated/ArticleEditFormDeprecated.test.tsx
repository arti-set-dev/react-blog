import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { ArticleEditFormDeprecated } from './ArticleEditFormDeprecated';
import { ArticleBlockType, ArticleType } from '../../../../../model/types/articleType';
import { ArticleTextBlock, ArticleImageBlock, ArticleCodeBlock } from '../../../../../model/types/article';

const mockTextBlock: ArticleTextBlock = {
  id: '1',
  type: ArticleBlockType.TEXT,
  title: 'Test Title',
  paragraphs: ['Test paragraph'],
};

const mockImageBlock: ArticleImageBlock = {
  id: '2',
  type: ArticleBlockType.IMAGE,
  title: 'Test Image',
  src: 'test.jpg',
};

const mockCodeBlock: ArticleCodeBlock = {
  id: '3',
  type: ArticleBlockType.CODE,
  code: 'console.log("test")',
};

const defaultProps = {
  articleTitle: '',
  setArticleTitle: jest.fn(),
  articleDescription: '',
  setArticleDescription: jest.fn(),
  savedBlocks: [],
  handleEditBlock: jest.fn(),
  handleDeleteBlock: jest.fn(),
  handleBlockChange: jest.fn(),
  handleCancel: jest.fn(),
  handleSaveBlock: jest.fn(),
  isArticleValid: false,
  handleTabChange: jest.fn(),
  articlePreview: undefined,
  setArticlePreview: jest.fn(),
  tabValue: undefined,
  currentBlock: undefined,
  onSaveArticle: jest.fn(),
  isLoading: false,
  error: undefined,
  types: [],
  handleAddType: jest.fn(),
  onBlockFileChange: jest.fn(),
};

describe('ArticleEditFormDeprecated', () => {
  test('Рендер компонента', () => {
    componentRender(<ArticleEditFormDeprecated {...defaultProps} />);
    expect(screen.getByText('Create new article')).toBeInTheDocument();
    expect(screen.getByText('Upload article preview')).toBeInTheDocument();
    expect(screen.getByText('Enter the heading of the article')).toBeInTheDocument();
    expect(screen.getByText('Enter the description of the article')).toBeInTheDocument();
    expect(screen.getByText('Save article')).toBeInTheDocument();
  });

  test('Рендер с сохраненными блоками', () => {
    componentRender(
      <ArticleEditFormDeprecated
        {...defaultProps}
        savedBlocks={[mockTextBlock, mockImageBlock, mockCodeBlock]}
      />,
    );
    expect(screen.getByText('Saved blocks')).toBeInTheDocument();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Image')).toBeInTheDocument();
  });

  test('Рендер в состоянии загрузки', () => {
    componentRender(
      <ArticleEditFormDeprecated
        {...defaultProps}
        isLoading
      />,
    );
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });

  test('Рендер с ошибкой', () => {
    componentRender(
      <ArticleEditFormDeprecated
        {...defaultProps}
        error="Test error"
      />,
    );
    expect(screen.getByText('An error arose when publishing an article')).toBeInTheDocument();
    expect(screen.getByText('Repeat the attempt')).toBeInTheDocument();
  });

  test('Рендер с выбранными типами статей', () => {
    componentRender(
      <ArticleEditFormDeprecated
        {...defaultProps}
        types={[ArticleType.IT, ArticleType.SCIENCE]}
      />,
    );
    expect(screen.getByText(ArticleType.IT)).toBeInTheDocument();
    expect(screen.getByText(ArticleType.SCIENCE)).toBeInTheDocument();
  });

  test('Взаимодействие с формой', async () => {
    const setTitle = jest.fn();
    const setDescription = jest.fn();
    const setPreview = jest.fn();

    componentRender(
      <ArticleEditFormDeprecated
        {...defaultProps}
        setArticleTitle={setTitle}
        setArticleDescription={setDescription}
        setArticlePreview={setPreview}
      />,
    );

    const titleInput = screen.getByText('Enter the heading of the article')
      .nextElementSibling as HTMLInputElement;
    const descriptionInput = screen.getByText('Enter the description of the article')
      .nextElementSibling as HTMLInputElement;

    await userEvent.type(titleInput, 'Test Title');
    await userEvent.type(descriptionInput, 'Test Description');

    expect(setTitle).toHaveBeenCalled();
    expect(setDescription).toHaveBeenCalled();
  });

  test('Взаимодействие с типами статей', async () => {
    const handleAddType = jest.fn();

    componentRender(
      <ArticleEditFormDeprecated
        {...defaultProps}
        handleAddType={handleAddType}
      />,
    );

    const itButton = screen.getByText(ArticleType.IT);
    await userEvent.click(itButton);

    expect(handleAddType).toHaveBeenCalledWith(ArticleType.IT);
  });

  test('Взаимодействие с блоками', async () => {
    const handleEditBlock = jest.fn();
    const handleDeleteBlock = jest.fn();

    componentRender(
      <ArticleEditFormDeprecated
        {...defaultProps}
        savedBlocks={[mockTextBlock]}
        handleEditBlock={handleEditBlock}
        handleDeleteBlock={handleDeleteBlock}
      />,
    );

    const editButton = screen.getByText('Edit');
    const deleteButton = screen.getByText('Delete');

    await userEvent.click(editButton);
    await userEvent.click(deleteButton);

    expect(handleEditBlock).toHaveBeenCalledWith(mockTextBlock);
    expect(handleDeleteBlock).toHaveBeenCalledWith(mockTextBlock.id);
  });

  test('Валидация формы', () => {
    componentRender(
      <ArticleEditFormDeprecated
        {...defaultProps}
        isArticleValid={false}
      />,
    );

    const saveButton = screen.getByText('Save article');
    expect(saveButton).toBeDisabled();
  });

  test('Сохранение статьи', async () => {
    const onSaveArticle = jest.fn();

    componentRender(
      <ArticleEditFormDeprecated
        {...defaultProps}
        isArticleValid
        onSaveArticle={onSaveArticle}
      />,
    );

    const saveButton = screen.getByText('Save article');
    await userEvent.click(saveButton);

    expect(onSaveArticle).toHaveBeenCalled();
  });
});
