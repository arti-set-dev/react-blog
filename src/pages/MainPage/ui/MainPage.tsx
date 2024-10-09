import { BugButton } from 'app/ErrorBoundary';
import { useTranslation } from 'react-i18next';

const MainPage = () => {
    const { t } = useTranslation('main');

    return (
        <div>
            <h1>{t('main title')}</h1>
        </div>
    );
};

export default MainPage;
