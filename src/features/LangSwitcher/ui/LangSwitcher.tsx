import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';

interface LangSwitcherProps {
  className?: string;
  short?: boolean;
}

export const LangSwitcher = memo((props: LangSwitcherProps) => {
  const { className, short } = props;
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en');
  };

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={(
        <Button
          isHovered
          variant="text-primary"
          onClick={toggleLanguage}
          className={classNames('', {}, [className])}
        >
          {short ? t('Lang') : t('Language')}
        </Button>
      )}
      off={(
        <ButtonDeprecated
          theme={ButtonTheme.TEXT_PRIMARY}
          onClick={toggleLanguage}
          className={classNames('', {}, [className])}
        >
          {short ? t('Lang') : t('Language')}
        </ButtonDeprecated>
      )}
    />
  );
});
