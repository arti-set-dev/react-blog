import { useState } from 'react';
import { Icon } from '../Icon/Icon';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cl from './StarRating.module.scss';
import StarIcon from '@/shared/assets/icons/star-icon.svg';

interface StarRatingProps {
  className?: string;
  onSelect?: (starsCount: number) => void;
  size?: number;
  selectStars?: number;
}

const stars = [1, 2, 3, 4, 5];

/**
 * Outdated, use the component from the Redesigned folder
 * @deprecated
 */
export const StarRating = (props: StarRatingProps) => {
  const {
    className, selectStars = 0, onSelect, size = 30,
  } = props;

  const [currentStarsCount, setCurrentStarsCount] = useState(selectStars);
  const [isSelected, setIsSelected] = useState(Boolean(selectStars));

  const mods: Mods = {
    [cl.hovered]: currentStarsCount >= stars.length ? cl.hovered : cl.default,
  };

  const onHover = (starsCount: number) => () => {
    if (!isSelected) {
      setCurrentStarsCount(starsCount);
    }
  };

  const onLeave = () => {
    if (!isSelected) {
      setCurrentStarsCount(0);
    }
  };

  const onClick = (starsCount: number) => () => {
    if (!isSelected) {
      onSelect?.(starsCount);
      setCurrentStarsCount(starsCount);
      setIsSelected(true);
    }
  };

  return (
    <div className={classNames('', mods, [className])}>
      {stars.map((starNumber) => (
        <Icon
          className={classNames(cl.Icon, { [cl.Selected]: isSelected }, [
            currentStarsCount >= starNumber ? cl.hovered : cl.default,
          ])}
          data-testid={`StarRating.${starNumber}`}
          data-selected={currentStarsCount >= starNumber}
          width={size}
          height={size}
          Svg={StarIcon}
          key={starNumber}
          onMouseLeave={onLeave}
          onMouseEnter={onHover(starNumber)}
          onClick={onClick(starNumber)}
        />
      ))}
    </div>
  );
};
