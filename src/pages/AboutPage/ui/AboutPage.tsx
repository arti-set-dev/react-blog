import { useTranslation } from 'react-i18next';

const AboutPage = () => {
    const { t } = useTranslation('about');

    return (
        <h1>{t('about title')}</h1>
    );
};

export default AboutPage;
