import { FeatureFlags } from '@/shared/types/featureFlags';

let featureFlags: FeatureFlags = {};

export function setFeatureFlags(newFeatureFlags?: FeatureFlags) {
  if (newFeatureFlags) {
    featureFlags = newFeatureFlags;
  }
}

export function getFeatureFlag(flag: keyof FeatureFlags) {
  const isEmpty = (obj: object) => Object.keys(obj).length === 0;

  if (isEmpty(featureFlags)) {
    featureFlags.isAppRedesigned = true;
  }

  return featureFlags[flag];
}

export function getAllFeatureFlags() {
  return featureFlags;
}
