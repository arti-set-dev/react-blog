import { ArticleBlock } from '../../model/types/article';
import { ArticleBlockType } from '../../model/types/articleType';

export const validateBlock = (block: ArticleBlock): boolean => {
  switch (block.type) {
  case ArticleBlockType.TEXT:
    return !!block.title?.trim()
      && block.paragraphs.some((p) => p.trim() !== '');
  case ArticleBlockType.IMAGE:
    return block.src.trim() !== '' && block.title.trim() !== '';
  case ArticleBlockType.CODE:
    return block.code.trim() !== '';
  default:
    return false;
  }
};
