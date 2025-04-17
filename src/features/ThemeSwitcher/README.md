# Theme Switcher Component

The `ThemeSwitcher` component provides a user interface element that allows users to toggle between different themes in the application.

## Overview

The ThemeSwitcher component is a feature that enables users to switch between different visual themes (e.g., light and dark modes) in the application. It integrates with the application's theme system and persists user preferences.

## Structure

```
src/features/ThemeSwitcher/
├── ui/
│   ├── ThemeSwitcher.tsx         # Component implementation
│   └── ThemeSwitcher.stories.tsx # Storybook stories
└── index.ts                      # Public API exports
```

## Component Details

### Props

```typescript
interface ThemeSwitcherProps {
  className?: string;        // Additional CSS class
}
```

### Features

1. **Theme Switching**
   - Toggle between themes
   - Persist theme preferences
   - Smooth theme transitions
   - User preference storage

2. **User Experience**
   - Intuitive interface
   - Accessible controls
   - Visual feedback
   - Responsive design

3. **Integration**
   - Redux integration
   - Theme system integration
   - Internationalization
   - Feature flags support

## Implementation Details

### Theme Toggle Logic

```typescript
const onToggleHandler = useCallback(() => {
  toggleTheme((newTheme) => {
    dispatch(saveJsonSettings({ theme: newTheme }));
  });
}, [dispatch, toggleTheme]);
```

### UI Components

The component uses:
- Button component (both deprecated and redesigned)
- Icon component
- Feature toggle system
- Theme system

## Usage Example

```tsx
import { ThemeSwitcher } from '@/features/ThemeSwitcher';

const App = () => {
  return (
    <div>
      {/* Page content */}
      <ThemeSwitcher />
    </div>
  );
};
```

## Integration

The component integrates with:
- Redux store
- Theme system
- User settings
- Feature flags
- Internationalization

## Best Practices

1. **Implementation**
   - Use feature flags for UI variants
   - Implement proper theme transitions
   - Handle theme persistence
   - Optimize performance

2. **UI/UX**
   - Provide clear visual feedback
   - Maintain consistent styling
   - Ensure accessibility
   - Support keyboard navigation

3. **Accessibility**
   - Include proper ARIA labels
   - Support keyboard navigation
   - Provide clear focus states
   - Use semantic HTML

## Performance Considerations

1. **Optimization**
   - Memoize component
   - Optimize re-renders
   - Handle theme changes efficiently
   - Use appropriate animations

2. **Resource Management**
   - Handle memory efficiently
   - Optimize bundle size
   - Manage theme resources
   - Clean up resources

## Error Handling

The component handles:
- Theme switching errors
- Storage errors
- Edge cases
- Browser compatibility

## Testing

The component should be tested for:
- Theme switching functionality
- Theme persistence
- Accessibility compliance
- Responsive behavior
- Feature flag behavior

## Browser Compatibility

The component supports:
- Modern browsers
- Theme switching
- Local storage
- CSS transitions

## Theme System Integration

The component integrates with:
- Theme context
- User settings
- Feature flags
- Redux store
