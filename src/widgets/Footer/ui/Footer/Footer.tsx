import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { NavigationItem } from '../../../../entities/Navigation';
import { getFooterItems } from '../../model/selector/getFooterItems';
import { ToggleFeatures } from '@/shared/lib/features';
import { FooterRedesigned } from './FooterRedesigned/FooterRedesigned';
import { FooterDeprecated } from './FooterDeprecated/FooterDeprecated';

interface FooterProps {
    className?: string;
}

export const Footer = memo((props: FooterProps) => {
  const { className } = props;
  const { t } = useTranslation();

  const footerItemsList = useSelector(getFooterItems);
  const itemsList = useMemo(
    () => footerItemsList.map((item) => (
      <li key={item.text}>
        <NavigationItem item={item} />
      </li>
    )),
    [footerItemsList],
  );

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={<FooterRedesigned itemsList={itemsList} />}
      off={<FooterDeprecated itemsList={itemsList} />}
    />
  );
});
