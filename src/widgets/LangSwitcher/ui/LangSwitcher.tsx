import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';

interface LangSwitcherProps {
    className?: string;
    short?: boolean;
}

export const LangSwitcher: FC<LangSwitcherProps> = (props) => {
  const { children, className, short } = props;
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en');
  };

  return (
    <Button theme={ButtonTheme.TEXT_INVERTED} onClick={toggleLanguage} className={classNames('', {}, [className])}>
      {short ? t('Lang') : t('Language') }
    </Button>
  );
};
