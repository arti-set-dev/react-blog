import { v4 as uuidv4 } from 'uuid';
import { ArticleCodeBlock, ArticleImageBlock, ArticleTextBlock } from '../../model/types/article';
import { ArticleBlockType } from '../../model/types/articleType';

export const createTextBlock = (): ArticleTextBlock => ({
  id: uuidv4(),
  type: ArticleBlockType.TEXT,
  title: '',
  paragraphs: [''],
});
export const createImageBlock = (): ArticleImageBlock => ({
  id: uuidv4(),
  type: ArticleBlockType.IMAGE,
  src: '',
  title: '',
});
export const createCodeBlock = (): ArticleCodeBlock => ({
  id: uuidv4(),
  type: ArticleBlockType.CODE,
  code: '',
});
export const createEmptyBlock = (type: ArticleBlockType) => {
  const newBlock = {
    [ArticleBlockType.TEXT]: createTextBlock,
    [ArticleBlockType.IMAGE]: createImageBlock,
    [ArticleBlockType.CODE]: createCodeBlock,
  }[type]();

  if (!type) {
    return {
      ...newBlock,
      id: uuidv4(),
    };
  }
  return newBlock;
};
