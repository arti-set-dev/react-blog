import { ArticleCodeBlock, ArticleImageBlock, ArticleTextBlock } from '../../model/types/article';
import { ArticleBlockType } from '../../model/types/articleType';

export const createTextBlock = (): ArticleTextBlock => ({
  id: crypto.randomUUID(),
  type: ArticleBlockType.TEXT,
  title: '',
  paragraphs: [''],
});
export const createImageBlock = (): ArticleImageBlock => ({
  id: crypto.randomUUID(),
  type: ArticleBlockType.IMAGE,
  src: '',
  title: '',
});
export const createCodeBlock = (): ArticleCodeBlock => ({
  id: crypto.randomUUID(),
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
      id: crypto.randomUUID(),
    };
  }
  return newBlock;
};
