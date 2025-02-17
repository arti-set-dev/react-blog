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

const FOOTER_WIDTH = 1200;

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
      on={<FooterRedesigned width={FOOTER_WIDTH} itemsList={itemsList} />}
      off={<FooterDeprecated width={FOOTER_WIDTH} itemsList={itemsList} />}
    />
  );
});
