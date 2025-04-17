# Language Switcher Component

The `LangSwitcher` component provides a user interface for switching between different languages in the application.

## Overview

The LangSwitcher component is a feature that enables users to switch between different languages (currently supporting English and Russian) in the application. It integrates with the i18n system and provides both full and short text variants.

## Structure

```
src/features/LangSwitcher/
├── ui/
│   └── LangSwitcher.tsx    # Component implementation
└── index.ts                # Public API exports
```

## Component Details

### Props

```typescript
interface LangSwitcherProps {
  className?: string;        // Additional CSS class
  short?: boolean;          // Use short text variant
}
```

### Features

1. **Language Switching**
   - Toggle between English and Russian
   - Automatic language change
   - Persistent language selection
   - i18n integration

2. **UI Variants**
   - Full text display ("Language")
   - Short text display ("Lang")
   - Redesigned and deprecated versions
   - Customizable styling

3. **Integration**
   - React-i18next integration
   - Feature flag support
   - Theme support
   - Responsive design

## Implementation Details

### Language Switching Logic

```typescript
const toggleLanguage = () => {
  i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en');
};
```

### UI Components

The component uses:
- Button component (both redesigned and deprecated)
- ToggleFeatures for feature flags
- ClassNames utility for styling
- i18n for translations

## Usage Example

```tsx
import { LangSwitcher } from '@/features/LangSwitcher';

const Header = () => {
  return (
    <header>
      <LangSwitcher short />
    </header>
  );
};
```

## Integration

The component integrates with:
- React-i18next
- Feature flags system
- Theme system
- Styling system

## Best Practices

1. **Implementation**
   - Use proper i18n setup
   - Handle language changes properly
   - Implement proper styling
   - Support feature flags

2. **UI/UX**
   - Provide clear language indicators
   - Use appropriate button styles
   - Support both text variants
   - Maintain consistent styling

3. **Accessibility**
   - Include proper ARIA labels
   - Support keyboard navigation
   - Provide clear focus states
   - Use semantic HTML

## Performance Considerations

1. **Optimization**
   - Memoize component
   - Optimize re-renders
   - Handle language changes efficiently
   - Use proper feature flags

2. **Resource Management**
   - Load translations efficiently
   - Handle language switching smoothly
   - Manage state properly
   - Optimize bundle size

## Error Handling

The component handles:
- Missing translations
- Invalid language codes
- Failed language switches
- UI state errors

## Testing

The component should be tested for:
- Language switching functionality
- UI rendering
- Feature flag behavior
- Accessibility compliance
- Responsive design
