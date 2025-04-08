import {
  ArticleBlock, ArticleCodeBlock, ArticleImageBlock, ArticleTextBlock,
} from '../../../../model/types/article';
import { ArticleBlockType } from '../../../../model/types/articleType';
import { EditBlockText } from '../EditBlockText/EditBlockText';
import { EditBlockImage } from '../EditBlockImage/EditBlockImage';
import { EditBlockCode } from '../EditBlockCode/EditBlockCode';

interface EditBlockSwitcherProps {
  type: ArticleBlockType;
  block: ArticleBlock;
  onChange?: (block: ArticleBlock) => void;
  onFileChange?: (file: File | null) => void;
  onCancel?: () => void;
  onSave?: () => void;
}

export const EditBlockSwitcher = ({
  type,
  block,
  onChange,
  onFileChange,
  onCancel,
  onSave,
}: EditBlockSwitcherProps) => {
  if (type === ArticleBlockType.TEXT) {
    return (
      <EditBlockText
        block={block as ArticleTextBlock}
        onChange={onChange}
        onCancel={onCancel}
        onSave={onSave}
      />
    );
  }

  if (type === ArticleBlockType.IMAGE) {
    return (
      <EditBlockImage
        block={block as ArticleImageBlock}
        onChange={onChange}
        onFileChange={onFileChange}
        onCancel={onCancel}
        onSave={onSave}
      />
    );
  }

  if (type === ArticleBlockType.CODE) {
    return (
      <EditBlockCode
        block={block as ArticleCodeBlock}
        onChange={onChange}
        onCancel={onCancel}
        onSave={onSave}
      />
    );
  }

  return null;
};
