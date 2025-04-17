# User Module

The `User` module provides functionality for user authentication, authorization, and management in the application. It includes Redux state management, role-based access control, and user settings management.

## Structure

```
User/
├── api/
│   └── userApi.ts           # API endpoints and queries
├── model/
│   ├── consts/             # Constants and enums
│   ├── selectors/          # Redux selectors
│   ├── services/           # Async actions and services
│   ├── slice/              # Redux slice
│   └── types/              # Type definitions
└── index.ts                # Public API of the module
```

## Types

### User

Interface defining the structure of a user:

```typescript
export interface User {
  id: string;               // Unique identifier
  username: string;         // Username
  email: string;           // Email address
  avatar?: string;         // Avatar URL
  isEmailVerified?: boolean; // Email verification status
  activationLink?: string;  // Account activation link
  roles?: UserRole[];      // User roles
  features?: FeatureFlags;  // Feature flags
  jsonSettings?: JsonSettings; // User settings
  accessToken?: string;    // Authentication token
}
```

### UserRole

Enum defining available user roles:

```typescript
export enum UserRole {
  ADMIN = 'ADMIN',    // Administrator
  USER = 'USER',      // Regular user
  MANAGER = 'MANAGER', // Manager
}
```

### JsonSettings

Interface for user-specific settings:

```typescript
export interface JsonSettings {
  theme?: Theme;                    // Preferred theme
  isArticlePageWasOpened?: boolean; // Article page visit flag
}
```

## Features

### Authentication

- User login/logout functionality
- Token-based authentication
- Email verification support
- Session management
- Initialization check

### Authorization

- Role-based access control
- Admin and manager role support
- Feature flag management
- Permission checking utilities

### User Settings

- Theme preferences
- User-specific feature flags
- Custom settings storage
- Settings synchronization

## Selectors

- `getUserAuthData` - Get authenticated user data
- `getUserInited` - Check if user data is initialized
- `isUserAdmin` - Check if user has admin role
- `isUserManager` - Check if user has manager role
- `getUserRoles` - Get user roles
- `useJsonSettings` - Get user settings

## Services

- `checkAuth` - Verify authentication status
- `initAuthData` - Initialize user data
- `logout` - Handle user logout
- `saveJsonSettings` - Save user settings
- `getUserDataByIdQuery` - Fetch user data by ID

## Usage

```typescript
import {
  getUserAuthData,
  isUserAdmin,
  useJsonSettings,
  saveJsonSettings,
} from '@/entities/User';

// In your component
const user = useSelector(getUserAuthData);
const isAdmin = useSelector(isUserAdmin);
const { theme } = useJsonSettings();

// Save settings
const handleSaveSettings = () => {
  saveJsonSettings({ theme: 'dark' });
};
```

## Integration

The module integrates with:
- Redux state management
- API layer
- Feature flags system
- Theme system
- Authentication system

## Best Practices

1. Always check user roles before sensitive operations
2. Use feature flags for role-specific features
3. Handle authentication state appropriately
4. Save user settings consistently
5. Implement proper error handling
6. Use type-safe selectors and actions
7. Follow security best practices for token management

## Security Considerations

- Token storage and management
- Role-based access control
- Email verification
- Session handling
- Secure API communication
- Data validation and sanitization
