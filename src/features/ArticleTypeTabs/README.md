# Article Type Tabs Module

The `ArticleTypeTabs` module provides functionality for filtering articles by their type in the application. It includes a user interface for selecting article types with support for both redesigned and deprecated UI components.

## Structure

```
src/features/ArticleTypeTabs/
├── ui/
│   └── ArticleTypeTabs/    # Type tabs components
└── index.ts                # Public API of the module
```

## Components

### ArticleTypeTabs

The main component for filtering articles by type. It provides a user interface for selecting article types with the following features:

#### Props

```typescript
interface ArticleTypeTabsProps {
  className?: string;                    // Additional CSS class
  value: ArticleType;                   // Current selected type
  direction?: FlexDirection;            // Tabs direction
  onChangeType: (type: ArticleType) => void;  // Type change handler
}
```

#### Features

1. **Type Options**
   - All articles
   - Economics articles
   - IT articles
   - Science articles
   - Politics articles

2. **User Interface**
   - Responsive design
   - Feature toggle support
   - Translation support
   - Flexible direction

3. **State Management**
   - Type selection
   - Change handlers
   - Direction control

## Features

1. **Type Filtering**
   - Multiple article types
   - Real-time updates
   - Flexible configuration
   - Type switching

2. **User Interface**
   - Responsive design
   - Feature toggle support
   - Translation support
   - Direction control

3. **Display Options**
   - Redesigned UI
   - Deprecated UI
   - Customizable layout
   - Flexible direction

4. **State Management**
   - Type state
   - Change handlers
   - Direction state

## Usage

```tsx
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticleType } from '@/entities/Article';

const MyComponent = () => {
  const [type, setType] = useState<ArticleType>(ArticleType.ALL);

  return (
    <ArticleTypeTabs 
      value={type}
      onChangeType={setType}
      direction="row"
    />
  );
};
```

## Integration

The module integrates with:
- Article entity for type definitions
- UI components for interface
- Translation system for text
- Feature flags for UI variants

## Best Practices

1. Handle type changes appropriately
2. Implement proper error handling
3. Use proper validation
4. Provide clear feedback
5. Handle edge cases
6. Use appropriate UI variants
7. Follow accessibility guidelines

## Testing

The module includes tests for:
- Component rendering
- State management
- Change handlers
- UI variants
- Accessibility

## Security Considerations

1. **Data Protection**
   - Validate type parameters
   - Handle sensitive data
   - Prevent unauthorized access

2. **Error Handling**
   - Don't expose sensitive information
   - Provide appropriate error messages
   - Log security-related events

3. **Accessibility**
   - Follow WCAG guidelines
   - Provide keyboard navigation
   - Support screen readers
