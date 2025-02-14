import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getHstack } from '@/shared/lib/stack/getHstack/getHstack';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { ArticleView } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import ListIconDeprecated from '@/shared/assets/icons/list-icon.svg';
import GridIconDeprecated from '@/shared/assets/icons/grid-icon.svg';
import ListIcon from '@/shared/assets/icons/list-icon-new.svg';
import GridIcon from '@/shared/assets/icons/grid-icon-new.svg';
import cl from './ArticleViewSwitcher.module.scss';

interface ArticleViewSwitcherProps {
  className?: string;
  view: ArticleView;
  onViewClick: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.GRID,
    icon: toggleFeatures({
      name: 'isAppRedesigned',
      on: () => GridIcon,
      off: () => GridIconDeprecated,
    }),
  },
  {
    view: ArticleView.COLUMN,
    icon: toggleFeatures({
      name: 'isAppRedesigned',
      on: () => ListIcon,
      off: () => ListIconDeprecated,
    }),
  },
];

export const ArticleViewSwitcher = memo((props: ArticleViewSwitcherProps) => {
  const { className, view, onViewClick } = props;
  const { t } = useTranslation();

  const onClick = (newView: ArticleView) => () => {
    onViewClick?.(newView);
  };

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={(
        <div className={classNames('', {}, [className, getHstack({ gap: 8 })])}>
          {viewTypes.map((viewType) => (
            <Button
              isHovered
              Svg={viewType.icon}
              key={viewType.view}
              className={classNames(cl.Button, {
                [cl.Current]: viewType.view === view,
              })}
              onClick={onClick(viewType.view)}
              variant="icon"
            />
          ))}
        </div>
      )}
      off={(
        <div className={classNames(cl.ArticleViewSwitcher, {}, [className])}>
          {viewTypes.map((viewType) => (
            <ButtonDeprecated
              key={viewType.view}
              className={classNames(cl.Button, {
                [cl.Current]: viewType.view === view,
              })}
              onClick={onClick(viewType.view)}
              theme={ButtonTheme.ICON}
            >
              <IconDeprecated Svg={viewType.icon} width="100%" height="100%" />
            </ButtonDeprecated>
          ))}
        </div>
      )}
    />
  );
});
