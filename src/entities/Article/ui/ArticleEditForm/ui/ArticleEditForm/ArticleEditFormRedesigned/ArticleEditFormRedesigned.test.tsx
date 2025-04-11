import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { ArticleEditFormRedesigned } from './ArticleEditFormRedesigned';
import { ArticleBlockType, ArticleType } from '../../../../../model/types/articleType';
import { ArticleBlock } from '../../../../../model/types/article';

const mockTextBlock: ArticleBlock = {
  id: '1',
  type: ArticleBlockType.TEXT,
  title: 'Test Title',
  paragraphs: ['Test paragraph'],
};

const mockImageBlock: ArticleBlock = {
  id: '2',
  type: ArticleBlockType.IMAGE,
  title: 'Test Image',
  src: 'test.jpg',
};

const mockCodeBlock: ArticleBlock = {
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

const defaultState = {
  user: {
    _inited: false,
  },
};

describe('ArticleEditFormRedesigned', () => {
  test('Рендер компонента', () => {
    componentRender(<ArticleEditFormRedesigned {...defaultProps} />, {
      initialState: defaultState,
    });
    expect(screen.getByText('Create new article')).toBeInTheDocument();
    expect(screen.getByText('Upload article preview')).toBeInTheDocument();
    expect(screen.getByTestId('ArticleEditForm.Title')).toBeInTheDocument();
    expect(screen.getByTestId('ArticleEditForm.Description')).toBeInTheDocument();
    expect(screen.getByText('Save article')).toBeInTheDocument();
  });

  test('Рендер с сохраненными блоками', () => {
    componentRender(
      <ArticleEditFormRedesigned
        {...defaultProps}
        savedBlocks={[mockTextBlock, mockImageBlock, mockCodeBlock]}
      />,
      {
        initialState: defaultState,
      },
    );
    expect(screen.getByText('Saved blocks')).toBeInTheDocument();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Image')).toBeInTheDocument();
  });

  test('Рендер в состоянии загрузки', () => {
    componentRender(
      <ArticleEditFormRedesigned
        {...defaultProps}
        isLoading
      />,
      {
        initialState: defaultState,
      },
    );
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });

  test('Рендер с ошибкой', () => {
    componentRender(
      <ArticleEditFormRedesigned
        {...defaultProps}
        error="Test error"
      />,
      {
        initialState: defaultState,
      },
    );
    expect(screen.getByText('An error arose when publishing an article')).toBeInTheDocument();
    expect(screen.getByText('Repeat the attempt')).toBeInTheDocument();
  });

  test('Рендер с выбранными типами статей', () => {
    componentRender(
      <ArticleEditFormRedesigned
        {...defaultProps}
        types={[ArticleType.IT, ArticleType.SCIENCE]}
      />,
      {
        initialState: defaultState,
      },
    );
    expect(screen.getByText(ArticleType.IT)).toBeInTheDocument();
    expect(screen.getByText(ArticleType.SCIENCE)).toBeInTheDocument();
  });

  test('Взаимодействие с формой', async () => {
    const setTitle = jest.fn();
    const setDescription = jest.fn();
    const setPreview = jest.fn();

    componentRender(
      <ArticleEditFormRedesigned
        {...defaultProps}
        setArticleTitle={setTitle}
        setArticleDescription={setDescription}
        setArticlePreview={setPreview}
      />,
      {
        initialState: defaultState,
      },
    );

    const titleInput = screen.getByTestId('ArticleEditForm.Title');
    const descriptionInput = screen.getByTestId('ArticleEditForm.Description');

    await userEvent.type(titleInput, 'Test Title');
    await userEvent.type(descriptionInput, 'Test Description');

    expect(setTitle).toHaveBeenCalled();
    expect(setDescription).toHaveBeenCalled();
  });

  test('Взаимодействие с типами статей', async () => {
    const handleAddType = jest.fn();

    componentRender(
      <ArticleEditFormRedesigned
        {...defaultProps}
        handleAddType={handleAddType}
      />,
      {
        initialState: defaultState,
      },
    );

    const itButton = screen.getByText(ArticleType.IT);
    await userEvent.click(itButton);

    expect(handleAddType).toHaveBeenCalledWith(ArticleType.IT);
  });

  test('Взаимодействие с блоками', async () => {
    const handleEditBlock = jest.fn();
    const handleDeleteBlock = jest.fn();

    componentRender(
      <ArticleEditFormRedesigned
        {...defaultProps}
        savedBlocks={[mockTextBlock]}
        handleEditBlock={handleEditBlock}
        handleDeleteBlock={handleDeleteBlock}
      />,
      {
        initialState: defaultState,
      },
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
      <ArticleEditFormRedesigned
        {...defaultProps}
        isArticleValid={false}
      />,
      {
        initialState: defaultState,
      },
    );

    const saveButton = screen.getByText('Save article');
    expect(saveButton).toBeDisabled();
  });

  test('Сохранение статьи', async () => {
    const onSaveArticle = jest.fn();

    componentRender(
      <ArticleEditFormRedesigned
        {...defaultProps}
        isArticleValid
        onSaveArticle={onSaveArticle}
      />,
      {
        initialState: defaultState,
      },
    );

    const saveButton = screen.getByText('Save article');
    await userEvent.click(saveButton);

    expect(onSaveArticle).toHaveBeenCalled();
  });
});
