import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
    const { t } = useTranslation();
    return (
        <h1 className={classNames(cls.title)}>
            {t('not-found.Not found page')}
        </h1>
    );
};

export default NotFoundPage;
