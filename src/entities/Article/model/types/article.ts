import { ArticleType, ArticleBlockType } from '../types/articleType';
import { User } from '@/entities/User';

export interface ArticleBlockBase {
  id: string;
  type: ArticleBlockType;
}

export interface ArticleCodeBlock extends ArticleBlockBase {
  type: ArticleBlockType.CODE;
  code: string;
}

export interface ArticleTextBlock extends ArticleBlockBase {
  type: ArticleBlockType.TEXT;
  paragraphs: string[];
  title?: string;
}

export interface ArticleImageBlock extends ArticleBlockBase {
  type: ArticleBlockType.IMAGE;
  src: string;
  title: string;
}

export type ArticleBlock =
  | ArticleCodeBlock
  | ArticleTextBlock
  | ArticleImageBlock;

export interface Article {
  id?: string;
  title: string;
  userId?: string;
  author?: User;
  subtitle: string;
  img: string;
  views: number;
  createdAt: string;
  type: ArticleType[];
  blocks: ArticleBlock[];
}

export interface ArticleEditable extends Article {
  tabValue?: ArticleBlockType | string;
  currentBlock?: ArticleCodeBlock | ArticleTextBlock | ArticleImageBlock;
  savedBlocks?: ArticleBlock[];
  types?: ArticleType[];
}
