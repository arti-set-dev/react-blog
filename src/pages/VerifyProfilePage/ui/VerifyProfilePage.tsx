import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Page } from '@/widgets/Page';
import { Text } from '@/shared/ui/redesigned/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Loader } from '@/shared/ui/redesigned/Loader';
import { Button } from '@/shared/ui/redesigned/Button';
import { useVerifyEmailMutation } from '@/features/AuthService';
import { getRouteMain } from '@/shared/const/router';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';

interface VerifyProfilePageProps {
    className?: string;
}

const VerifyProfilePage = (props: VerifyProfilePageProps) => {
  const { className } = props;
  const { t } = useTranslation('verify-page');
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const [verifyEmail, {
    data, isLoading, error, isSuccess,
  }] = useVerifyEmailMutation();

  useInitialEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  });

  const backToMain = useCallback(() => {
    navigate(getRouteMain());
  }, [navigate]);

  return (
    <Page>
      <VStack fullHeight align="center" justify="center">
        {isLoading
          && <Loader />}
        {error
          && <Text>{t('error verification')}</Text>}

        {isSuccess
        && (
          <VStack gap="16" align="center">
            <Text align="center" tag="h1" size="xl">{t('eamai succeseful')}</Text>
            <Button onClick={backToMain}>{t('Go to home')}</Button>
          </VStack>
        )}
      </VStack>
    </Page>
  );
};

export default memo(VerifyProfilePage);
