import { useTranslation } from 'react-i18next';
import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Listbox } from '@/shared/ui/redesigned/Popups';
import { Text } from '@/shared/ui/redesigned/Text';
import { getFeatureFlag, ToggleFeatures, updateFeatureFlag } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from '@/entities/User';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';
import { LOCAL_STORAGE_LAST_DESIGN_KEY } from '@/shared/const/localstorage';

export type UiDesignSwitcherVariant = 'list' | 'button';

interface UiDesignSwitcherProps {
  className?: string;
  variant?: UiDesignSwitcherVariant;
}

export const UiDesignSwitcher = memo((props: UiDesignSwitcherProps) => {
  const { className, variant = 'list' } = props;
  const { t } = useTranslation();
  const isAppRedesigned = getFeatureFlag('isAppRedesigned');
  const dispatch = useAppDispatch();
  const authData = useSelector(getUserAuthData);
  const [isLoading, setIsLoading] = useState(false);

  let buttonThemeVariant;

  const items = [
    {
      content: t('New design'),
      value: 'new',
    },
    {
      content: t('Old design'),
      value: 'old',
    },
  ];

  const onChange = async (value: string) => {
    if (authData) {
      setIsLoading(true);

      const themeValue = authData.features?.isAppRedesigned === true ? 'old' : 'new';

      await dispatch(
        updateFeatureFlag({
          userId: authData.id,
          newFeatures: {
            isAppRedesigned: value === 'new',
          },
        }),
      ).unwrap();
      localStorage.setItem(LOCAL_STORAGE_LAST_DESIGN_KEY, themeValue);
      setIsLoading(false);
    }
  };

  const onToggleTheme = async () => {
    if (authData) {
      setIsLoading(true);

      const currentFlag = authData?.features?.isAppRedesigned ?? false;
      const themeValue = authData.features?.isAppRedesigned === true ? 'old' : 'new';

      await dispatch(
        updateFeatureFlag({
          userId: authData?.id,
          newFeatures: {
            isAppRedesigned: !currentFlag,
          },
        }),
      ).unwrap();
      localStorage.setItem(LOCAL_STORAGE_LAST_DESIGN_KEY, themeValue);
      setIsLoading(false);
    }
  };

  if (variant === 'button') {
    buttonThemeVariant = (
      !isAppRedesigned
        ? (
          <ToggleFeatures
            feature="isAppRedesigned"
            on={
              isLoading ? (
                <Skeleton width="100%" height={40} />
              ) : (
                <Button variant="clear" onClick={onToggleTheme}>{t('Switch to new theme now')}</Button>
              )
            }
            off={
              isLoading ? (
                <SkeletonDeprecated border="8px" width="100%" height={40} />
              ) : (
                <ButtonDeprecated
                  theme={ButtonTheme.OUTLINE}
                  onClick={onToggleTheme}
                >
                  {t('Switch to new theme now')}
                </ButtonDeprecated>
              )
            }
          />
        )
        : (
          <ToggleFeatures
            feature="isAppRedesigned"
            on={
              isLoading ? (
                <Skeleton border="8" width="100%" height={40} />
              ) : (
                <Button variant="clear" onClick={onToggleTheme}>{t('Return to old theme')}</Button>
              )
            }
            off={
              isLoading ? (
                <SkeletonDeprecated width="100%" height={40} />
              ) : (
                <ButtonDeprecated
                  theme={ButtonTheme.OUTLINE}
                  onClick={onToggleTheme}
                >
                  {t('Return to old theme')}
                </ButtonDeprecated>
              )
            }
          />
        )
    );
  }

  if (variant === 'list') {
    buttonThemeVariant = (
      <HStack gap="8">
        <Text>{t('Option interface')}</Text>
        {isLoading ? (
          <Skeleton width={100} height={20} />
        ) : (
          <Listbox
            onChange={onChange}
            items={items}
            value={isAppRedesigned ? 'new' : 'old'}
            className={className}
          />
        )}
      </HStack>
    );
  }

  return buttonThemeVariant ?? null;
});
