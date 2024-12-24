import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import ListIcon from '@/shared/assets/icons/list-icon.svg';
import GridIcon from '@/shared/assets/icons/grid-icon.svg';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Icon } from '@/shared/ui/Icon/Icon';
import { ArticleView } from '../../model/consts/consts';
import cl from './ArticleViewSwither.module.scss';

interface ArticleViewSwitcherProps {
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

export const ArticleViewSwitcher = memo((props: ArticleViewSwitcherProps) => {
  const { className, view, onViewClick } = props;
  const { t } = useTranslation();

  const onClick = (newView: ArticleView) => () => {
    onViewClick?.(newView);
  };

  return (
    <div className={classNames(cl.ArticleViewSwitcher, {}, [className])}>
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
