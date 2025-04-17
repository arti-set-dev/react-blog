# Profile Module

The `Profile` module provides functionality for managing and displaying user profiles in the application. It includes components for profile display and editing, with support for different UI versions and validation.

## Structure

```
Profile/
├── model/
│   ├── types/
│   │   └── profile.ts       # Profile type definitions
│   └── selectors/           # Redux selectors
├── ui/
│   ├── ProfileCard/         # Main profile card component
│   ├── ProfileCardDeprecated/ # Deprecated UI version
│   └── ProfileCardRedesigned/ # Redesigned UI version
├── lib/
│   └── hooks/               # Custom hooks
└── index.ts                 # Public API of the module
```

## Types

### Profile

Interface defining the structure of a user profile:

```typescript
export interface Profile {
  id?: string;          // User ID
  firstname?: string;   // First name
  lastname?: string;    // Last name
  age?: number;         // Age
  currency?: Currency;  // Preferred currency
  country?: Country;    // Country of residence
  city?: string;        // City
  username?: string;    // Username
  avatar?: string;      // Avatar URL
}
```

## Components

### ProfileCard

The main component for displaying and editing user profiles.

#### Props

```typescript
interface ProfileCardProps {
  className?: string;
  data?: Profile;
  error?: string;
  isLoading?: boolean;
  readonly?: boolean;
  onEdit?: () => void;
  onCancelEdit?: () => void;
  onSave?: () => void;
  onChangeFirstname?: (value?: string) => void;
  onChangeLastname?: (value?: string) => void;
  onChangeCity?: (value?: string) => void;
  onChangeAge?: (value?: string) => void;
  onChangeCountry?: (country: Country) => void;
  onChangeCurrency?: (currency: Currency) => void;
  onChangeAvatar?: (value?: File) => void;
  onChangeUsername?: (value?: string) => void;
  fieldErrors?: ValidateFields;
}
```

#### Features

- Supports both viewing and editing modes
- Handles loading and error states
- Supports field validation
- Adapts to both redesigned and deprecated UI versions
- Provides callbacks for all profile field changes
- Supports avatar upload
- Integrates with currency and country selection

## Hooks

### useProfile

Custom hook for profile-related functionality:

```typescript
export function useProfile() {
  const authData = useSelector(getUserAuthData);
  const profileData = useSelector(getProfileData);
  const canEdit = authData?.id === profileData?.id;

  return {
    canEdit,
  };
}
```

## Usage

```typescript
import { ProfileCard, useProfile } from '@/entities/Profile';

// In your component
const { canEdit } = useProfile();

<ProfileCard
  data={profileData}
  isLoading={isLoading}
  error={error}
  readonly={!canEdit}
  onChangeFirstname={handleFirstnameChange}
  onChangeLastname={handleLastnameChange}
  // ... other handlers
/>
```

## Integration

The module integrates with:
- Application theme system
- Redux state management
- Currency and Country modules
- User authentication system
- Feature flags system for UI version switching
- Form validation system

## Best Practices

1. Always check `canEdit` before allowing profile modifications
2. Handle loading and error states appropriately
3. Validate all user inputs
4. Use appropriate UI version based on feature flags
5. Provide meaningful error messages
6. Handle avatar uploads securely
7. Implement proper data sanitization

## Testing

The module includes test files for components:
- `ProfileCard.stories.tsx`

Tests cover:
- Component rendering
- Loading states
- Error handling
- Edit mode functionality
- Field validation
- Avatar handling
- UI version switching
