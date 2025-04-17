# UI Design Switcher Component

The `UiDesignSwitcher` component provides a user interface element that allows users to switch between different UI designs (old and new) in the application.

## Overview

The UiDesignSwitcher component is a feature that enables users to toggle between different UI designs in the application. It supports two variants of switching interface and integrates with the feature flag system to persist user preferences.

## Structure

```
src/features/uiDesignSwitcher/
├── ui/
│   └── UiDesignSwitcher/
│       └── UiDesignSwitcher.tsx    # Component implementation
└── index.ts                         # Public API exports
```

## Component Details

### Props

```typescript
interface UiDesignSwitcherProps {
  className?: string;                // Additional CSS class
  variant?: UiDesignSwitcherVariant; // Switching interface variant ('list' | 'button')
}
```

### Features

1. **Design Switching**
   - Toggle between old and new designs
   - Two interface variants (list and button)
   - Persist design preferences
   - User preference storage

2. **User Experience**
   - Intuitive interface
   - Loading states
   - Responsive design
   - Accessible controls

3. **Integration**
   - Feature flags system
   - Redux integration
   - User settings
   - Local storage

## Implementation Details

### Design Toggle Logic

```typescript
const onToggleTheme = async () => {
  if (authData) {
    setIsLoading(true);
    const currentFlag = authData?.features?.isAppRedesigned ?? false;
    await dispatch(
      updateFeatureFlag({
        userId: authData?.id,
        newFeatures: {
          isAppRedesigned: !currentFlag,
        },
      })
    ).unwrap();
    localStorage.setItem(LOCAL_STORAGE_LAST_DESIGN_KEY, themeValue);
    setIsLoading(false);
  }
};
```

### UI Components

The component uses:
- Listbox component (for list variant)
- Button component (for button variant)
- Skeleton components (for loading states)
- Feature toggle system
- Stack component for layout

## Usage Example

```tsx
import { UiDesignSwitcher } from '@/features/uiDesignSwitcher';

const App = () => {
  return (
    <div>
      {/* Page content */}
      <UiDesignSwitcher variant="list" />
    </div>
  );
};
```

## Integration

The component integrates with:
- Feature flags system
- Redux store
- User settings
- Local storage
- Internationalization

## Best Practices

1. **Implementation**
   - Use appropriate variant based on context
   - Handle loading states properly
   - Implement proper error handling
   - Optimize performance

2. **UI/UX**
   - Provide clear visual feedback
   - Show loading states
   - Maintain consistent styling
   - Ensure accessibility

3. **Accessibility**
   - Include proper ARIA labels
   - Support keyboard navigation
   - Provide clear focus states
   - Use semantic HTML

## Performance Considerations

1. **Optimization**
   - Memoize component
   - Optimize re-renders
   - Handle state changes efficiently
   - Use appropriate loading states

2. **Resource Management**
   - Handle memory efficiently
   - Optimize bundle size
   - Manage feature flags
   - Clean up resources

## Error Handling

The component handles:
- Feature flag update errors
- Storage errors
- Edge cases
- Loading states

## Testing

The component should be tested for:
- Design switching functionality
- Feature flag updates
- Loading states
- Accessibility compliance
- Responsive behavior
- Both variants (list and button)

## Browser Compatibility

The component supports:
- Modern browsers
- Local storage
- Feature flags
- CSS transitions

## Feature Flag Integration

The component integrates with:
- Feature flag system
- User settings
- Local storage
- Redux store

