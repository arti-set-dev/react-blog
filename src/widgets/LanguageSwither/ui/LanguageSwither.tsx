import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import cls from './LanguageSwither.module.scss';

interface LanguageSwitherProps {
    className?: string;
}

export const LanguageSwither:FC<LanguageSwitherProps> = ({ className }) => {
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <Button
            onClick={toggleLanguage}
            className={classNames(cls.LanguageSwither, {}, [className])}
        >
            {t('Language')}
        </Button>
    );
};
