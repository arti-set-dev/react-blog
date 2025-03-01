import { memo, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { toggleFeatures } from '@/shared/lib/features';
import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './MainLayout.module.scss';

interface MainLayoutProps {
  className?: string;
  header?: ReactElement;
  content?: ReactElement;
  sidebar?: ReactElement;
  toolbar?: ReactElement;
  footer?: ReactElement;
}

export const MainLayout = memo((props: MainLayoutProps) => {
  const {
    className, content, toolbar, header, sidebar, footer,
  } = props;
  const { t } = useTranslation();

  const contentClass = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => cl.contentRedesigned,
    off: () => cl.content,
  });

  return (
    <div className={classNames(cl.MainLayout, {}, [className])}>
      <div className={cl.header}>{header}</div>
      <div className={cl.sidebar}>{sidebar}</div>
      <div className={contentClass}>
        {content}
        <div className={cl.footer}>{footer}</div>
      </div>
      {toolbar && <div className={cl.rightbar}>{toolbar}</div>}
    </div>
  );
});
