import { EditBlockText } from '../EditBlockText/EditBlockText';
import { ArticleCodeBlock, ArticleImageBlock, ArticleTextBlock } from '../../../../model/types/article';
import { ArticleBlockType } from '../../../../model/types/articleType';
import { EditBlockImage } from '../EditBlockImage/EditBlockImage';
import { EditBlockCode } from '../EditBlockCode/EditBlockCode';

interface EditBlockSwitcherProps {
  type: ArticleBlockType;
  block?: ArticleTextBlock | ArticleImageBlock | ArticleCodeBlock;
  onChange?: (block: ArticleTextBlock | ArticleImageBlock | ArticleCodeBlock) => void;
  onCancel?: () => void;
  onSave?: () => void;
}

export const EditBlockSwitcher = ({
  type,
  block,
  onChange,
  onCancel,
  onSave,
}: EditBlockSwitcherProps) => {
  switch (type) {
  case ArticleBlockType.TEXT:
    return (
      <EditBlockText
        block={block as ArticleTextBlock}
        onChange={onChange}
        onCancel={onCancel}
        onSave={onSave}
      />
    );
  case ArticleBlockType.IMAGE:
    return (
      <EditBlockImage
        block={block as ArticleImageBlock}
        onChange={onChange}
        onCancel={onCancel}
        onSave={onSave}
      />
    );
  case ArticleBlockType.CODE:
    return (
      <EditBlockCode
        block={block as ArticleCodeBlock}
        onChange={onChange}
        onCancel={onCancel}
        onSave={onSave}
      />
    );
  default:
    return null;
  }
};
