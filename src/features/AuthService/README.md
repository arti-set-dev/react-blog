# Authentication Service Module

The `AuthService` module provides comprehensive authentication functionality for the application. It includes user authentication, authorization, and session management with support for both redesigned and deprecated UI components.

## Structure

```
src/features/AuthService/
├── model/
│   ├── api/              # API endpoints for authentication
│   ├── services/         # Authentication services
│   ├── slice/            # Redux slice for auth state
│   ├── types/            # Type definitions
│   └── selectors/        # State selectors
├── ui/
│   ├── AuthModal/        # Authentication modal
│   └── AuthForm/         # Authentication form
└── index.ts              # Public API of the module
```

## Model Layer

### API

The module provides the following API endpoints:

1. **Email Verification API** (`authVerifyApi`)
   ```typescript
   const authApi = rtkApi.injectEndpoints({
     endpoints: (build) => ({
       verifyEmail: build.mutation<User, string>({
         query: (token) => ({
           url: `/auth/verify-email?token=${token}`,
           method: 'GET',
         }),
       }),
     }),
   });
   ```
   - Endpoint for email verification
   - Uses RTK Query for API calls
   - Returns user data on success

### Services

The module includes several authentication services:

1. **Login Service** (`loginByUsername`)
   - Handles user authentication
   - Manages login state
   - Processes login errors

2. **Registration Service** (`registration`)
   - Handles user registration
   - Manages registration state
   - Processes registration errors

3. **Email Verification Service** (`authVerify`)
   - Handles email verification
   - Manages verification state
   - Processes verification results

### Redux Slice

The authentication state is managed through a Redux slice:

```typescript
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handles login and registration states
  },
});
```

### Types

The module defines the following types:

```typescript
export interface AuthSchema extends UserSchema {
  username: string;      // User's username
  password: string;      // User's password
  email?: string;        // User's email (optional)
  isLoading: boolean;    // Loading state
  error?: string;        // Error message
}
```

### Selectors

The module provides several selectors for accessing authentication state:

1. **Login State Selectors**
   - `getLoginUsername`: Get current username
   - `getLoginPassword`: Get current password
   - `getLoginEmail`: Get current email
   - `getLoginIsLoading`: Get loading state
   - `getLoginError`: Get error message
   - `getLoginIsActive`: Check if login is active

2. **Registration State Selectors**
   - `getAuthIsRegistration`: Check if in registration mode
   - `getAuthIsVerifying`: Check if verifying email

## Components

### AuthModal

The main component for authentication. It provides a modal interface for user authentication with the following features:

#### Props

```typescript
interface LoginModalProps {
  className?: string;            // Additional CSS class
  isOpen?: boolean;             // Modal visibility
  onClose: () => void;          // Close handler
  redirectPath?: string;        // Path to redirect after auth
  'data-testid'?: string;      // Test identifier
}
```

#### Features

1. **Authentication Interface**
   - Modal-based authentication
   - Form integration
   - Loading states
   - Success handling

2. **User Experience**
   - Responsive design
   - Feature toggle support
   - Loading indicators
   - Redirect handling

3. **State Management**
   - Modal state
   - Authentication state
   - Success handlers

## Features

1. **Authentication System**
   - User login
   - Email verification
   - Session management
   - Token handling

2. **User Interface**
   - Responsive design
   - Feature toggle support
   - Loading states
   - Error handling

3. **Security Features**
   - Token validation
   - Session management
   - Secure storage
   - Error handling

4. **State Management**
   - Authentication state
   - User session
   - Loading states
   - Error states

## Usage

```tsx
import { AuthModal } from '@/features/AuthService';

const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AuthModal 
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      redirectPath="/dashboard"
    />
  );
};
```

## Integration

The module integrates with:
- Redux for state management
- Router for navigation
- UI components for interface
- API services for authentication

## Best Practices

1. Handle authentication securely
2. Implement proper error handling
3. Use proper validation
4. Provide clear feedback
5. Handle edge cases
6. Use appropriate UI variants
7. Follow security guidelines

## Testing

The module includes tests for:
- API endpoints
- Component rendering
- State management
- Error handling
- Security features

## Security Considerations

1. **Authentication**
   - Secure token handling
   - Session management
   - Password security
   - Token validation

2. **Data Protection**
   - Secure storage
   - Data encryption
   - Input validation
   - XSS prevention

3. **Error Handling**
   - Secure error messages
   - Logging
   - Rate limiting
   - Brute force protection
