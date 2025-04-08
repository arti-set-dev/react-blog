import { getProfileData } from './model/selectors/getProfileData/getProfileData';
import type { Profile } from './model/types/profile';
import { ProfileCard } from './ui/ProfileCard/ProfileCard';
import { useProfile } from './lib/hooks/useProfile';

export {
  Profile, ProfileCard, getProfileData, useProfile,
};
