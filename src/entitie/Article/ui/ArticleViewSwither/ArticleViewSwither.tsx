import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { ArticleView } from 'entitie/Article/model/types/article';
import ListIcon from 'shared/assets/icons/list-icon.svg';
import GridIcon from 'shared/assets/icons/grid-icon.svg';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import cl from './ArticleViewSwither.module.scss';

interface ArticleViewSwitherProps {
    className?: string;
    view: ArticleView;
    onViewClick: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.GRID,
    icon: GridIcon,
  },
  {
    view: ArticleView.COLUMN,
    icon: ListIcon,
  },
];

export const ArticleViewSwither = memo((props: ArticleViewSwitherProps) => {
  const { className, view, onViewClick } = props;
  const { t } = useTranslation();

  const onClick = (newView: ArticleView) => () => {
    onViewClick?.(newView);
  };

  return (
    <div className={classNames(cl.ArticleViewSwither, {}, [className])}>
      {viewTypes.map((viewType) => (
        <Button
          key={viewType.view}
          className={classNames(cl.Button, { [cl.Current]: viewType.view === view })}
          onClick={onClick(viewType.view)}
          theme={ButtonTheme.ICON}
        >
          <Icon Svg={viewType.icon} />
        </Button>
      ))}
    </div>
  );
});
