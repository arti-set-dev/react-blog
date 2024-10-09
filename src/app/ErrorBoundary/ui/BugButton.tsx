import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import cls from './BugButton.module.scss';

interface BugButtonProps {
    className?: string;
}

export const BugButton:FC<BugButtonProps> = ({ className }) => {
    const { t } = useTranslation();

    const [error, setError] = useState(false);

    const throwError = () => setError(true);

    useEffect(() => {
        if (error) {
            throw new Error();
        }
    }, [error]);

    return (
        <Button onClick={throwError} className={classNames(cls.BugButton, {}, [className])}>
            {t('throw error')}
        </Button>
    );
};
