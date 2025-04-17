# Avatar Dropdown Component

The `AvatarDropdown` component provides a user interface element that displays a user's avatar with a dropdown menu containing navigation and authentication options.

## Overview

The AvatarDropdown component is a feature that combines user authentication state with a dropdown menu interface. It displays the user's avatar and provides quick access to profile navigation and logout functionality.

## Structure

```
src/features/avatarDropdown/
├── ui/
│   ├── AvatarDropdown.tsx          # Main component implementation
│   ├── AvatarDropdown.stories.tsx  # Storybook stories
│   └── AvatarDropdown.module.scss  # Component styles
└── index.ts                        # Public API exports
```

## Component Details

### Props

```typescript
interface AvatarDropdownProps {
  className?: string;            // Additional CSS class
  'data-testid'?: string;       // Test identifier for testing purposes
}
```

### Features

1. **User Authentication Integration**
   - Displays user avatar
   - Shows username
   - Handles authentication state

2. **Navigation**
   - Direct access to user profile
   - Logout functionality
   - Dynamic menu items based on auth state

3. **UI Components**
   - Avatar display
   - Dropdown menu
   - Responsive design

## Implementation Details

### State Management

The component integrates with Redux for:
- User authentication data
- Logout functionality
- Profile information

### Dependencies

- React
- Redux
- React-i18next for translations
- Shared UI components (Avatar, Dropdown)

## Usage Example

```tsx
import { AvatarDropdown } from '@/features/avatarDropdown';

const Header = () => {
  return (
    <header>
      <AvatarDropdown data-testid="avatar-dropdown" />
    </header>
  );
};
```

## Integration

The component integrates with:
- User authentication system
- Profile routing
- Internationalization system
- Redux store

## Testing

The component includes:
- Storybook stories for visual testing
- Test IDs for automated testing
- State management testing through decorators

## Best Practices

1. **Implementation**
   - Use proper authentication state management
   - Implement proper error handling
   - Follow accessibility guidelines
   - Use appropriate test IDs

2. **Styling**
   - Use consistent avatar sizes
   - Implement responsive design
   - Follow design system guidelines

3. **Security**
   - Handle authentication state securely
   - Implement proper logout functionality
   - Protect user data

## Accessibility

The component should:
- Include proper ARIA labels
- Support keyboard navigation
- Provide clear focus states
- Include proper alt text for avatars

## Performance Considerations

1. **Optimization**
   - Memoize callback functions
   - Optimize avatar image loading
   - Minimize re-renders

2. **Loading States**
   - Handle loading states gracefully
   - Provide fallback UI
   - Implement proper error states
