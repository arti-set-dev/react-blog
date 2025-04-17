# Article Sort Selector Module

The `ArticleSortSelector` module provides functionality for sorting articles in the application. It includes a user interface for selecting sort criteria and order, with support for both redesigned and deprecated UI components.

## Structure

```
src/features/ArticleSortSelector/
├── ui/
│   └── ArticleSortSelector/    # Sort selector components
└── index.ts                    # Public API of the module
```

## Components

### ArticleSortSelector

The main component for sorting articles. It provides a user interface for selecting sort criteria and order with the following features:

#### Props

```typescript
interface ArticleSortSelectorProps {
  className?: string;                    // Additional CSS class
  sort: ArticleSortField;               // Current sort field
  order: SortOrder;                     // Current sort order
  onChangeOrder: (newOrder: SortOrder) => void;    // Order change handler
  onChangeSort: (newSort: ArticleSortField) => void;  // Sort field change handler
}
```

#### Features

1. **Sort Options**
   - Sort by creation date
   - Sort by title
   - Sort by views
   - Ascending/descending order

2. **User Interface**
   - Responsive design
   - Feature toggle support
   - Translation support
   - Accessible controls

3. **State Management**
   - Sort field selection
   - Sort order selection
   - Change handlers

## Features

1. **Sorting System**
   - Multiple sort criteria
   - Order direction
   - Real-time updates
   - Flexible configuration

2. **User Interface**
   - Responsive design
   - Feature toggle support
   - Translation support
   - Accessible controls

3. **Display Options**
   - Redesigned UI
   - Deprecated UI
   - Customizable layout
   - Flexible styling

4. **State Management**
   - Sort field state
   - Order state
   - Change handlers

## Usage

```tsx
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleSortField, SortOrder } from '@/entities/Article';

const MyComponent = () => {
  const [sort, setSort] = useState<ArticleSortField>(ArticleSortField.CREATED);
  const [order, setOrder] = useState<SortOrder>('asc');

  return (
    <ArticleSortSelector 
      sort={sort}
      order={order}
      onChangeSort={setSort}
      onChangeOrder={setOrder}
    />
  );
};
```

## Integration

The module integrates with:
- Article entity for sort fields
- UI components for interface
- Translation system for text
- Feature flags for UI variants

## Best Practices

1. Handle state changes appropriately
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
   - Validate sort parameters
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

