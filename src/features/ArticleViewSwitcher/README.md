# Article View Switcher Module

The `ArticleViewSwitcher` module provides functionality for switching between different article view modes in the application. It includes a user interface for toggling between grid and column views with support for both redesigned and deprecated UI components.

## Structure

```
src/features/ArticleViewSwitcher/
├── model/                    # View type definitions
├── ui/
│   └── ArticleViewSwitcher/  # View switcher components
└── index.ts                  # Public API of the module
```

## Components

### ArticleViewSwitcher

The main component for switching article views. It provides a user interface for toggling between different view modes with the following features:

#### Props

```typescript
interface ArticleViewSwitcherProps {
  className?: string;                    // Additional CSS class
  view: ArticleView;                    // Current view mode
  onViewClick: (view: ArticleView) => void;  // View change handler
}
```

#### Features

1. **View Options**
   - Grid view
   - Column view
   - Icon-based switching
   - Active state indication

2. **User Interface**
   - Responsive design
   - Feature toggle support
   - Icon integration
   - Hover effects

3. **State Management**
   - View selection
   - Change handlers
   - Active state

## Features

1. **View Switching**
   - Multiple view modes
   - Real-time updates
   - Visual feedback
   - Icon-based interface

2. **User Interface**
   - Responsive design
   - Feature toggle support
   - Icon integration
   - Hover effects

3. **Display Options**
   - Redesigned UI
   - Deprecated UI
   - Customizable layout
   - Icon variants

4. **State Management**
   - View state
   - Change handlers
   - Active state

## Usage

```tsx
import { ArticleViewSwitcher } from '@/features/ArticleViewSwitcher';
import { ArticleView } from '@/entities/Article';

const MyComponent = () => {
  const [view, setView] = useState<ArticleView>(ArticleView.GRID);

  return (
    <ArticleViewSwitcher 
      view={view}
      onViewClick={setView}
    />
  );
};
```

## Integration

The module integrates with:
- Article entity for view definitions
- UI components for interface
- Icon system for visual elements
- Feature flags for UI variants

## Best Practices

1. Handle view changes appropriately
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
   - Validate view parameters
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
