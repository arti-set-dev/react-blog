# Article Edit Module

The `articleEdit` module provides functionality for editing existing articles in the application. It includes a comprehensive form for article editing with support for different types of content blocks, image management, and real-time updates.

## Structure

```
src/features/articleEdit/
├── ui/
│   └── ArticleEdit/            # Article editing components
└── index.ts                    # Public API of the module
```

## Components

### ArticleEdit

The main component for editing articles. It provides a rich interface for article editing with the following features:

#### Props

```typescript
interface ArticleEditProps {
  className?: string;  // Additional CSS class
  id?: string;        // Article ID to edit
}
```

#### Features

1. **Content Management**
   - Title and subtitle editing
   - Multiple content block types (text, code, image)
   - Block reordering and editing
   - Block deletion
   - Real-time content updates

2. **Media Handling**
   - Article preview image management
   - Image block support
   - File upload handling

3. **Article Types**
   - Multiple type selection
   - Type management
   - Type validation

4. **State Management**
   - Redux integration
   - Dynamic module loading
   - Form state management

5. **Validation**
   - Required field validation
   - Block content validation
   - Form submission validation

## State Management

The component manages several pieces of state:

1. **Article Content**
   - Title
   - Subtitle
   - Preview image
   - Content blocks
   - Article types
   - Current block
   - Tab value

2. **UI State**
   - Loading state
   - Error state
   - Validation state
   - Form state

## Features

1. **Content Blocks**
   - Text blocks
   - Code blocks
   - Image blocks
   - Block validation
   - Block editing
   - Block deletion

2. **Media Handling**
   - Image uploads
   - File management
   - Preview generation

3. **Type Management**
   - Type selection
   - Type validation
   - Type updates

4. **Validation**
   - Required fields
   - Content validation
   - Type validation
   - Block validation

## Usage

```tsx
import { ArticleEdit } from '@/features/articleEdit';

const MyComponent = () => {
  return (
    <ArticleEdit id="123" />
  );
};
```

## Integration

The module integrates with:
- Redux for state management
- Article entity for data structure
- User entity for authentication
- Router for navigation
- RTK Query for API calls

## Best Practices

1. Always validate article content before submission
2. Handle image uploads appropriately
3. Implement proper error handling
4. Use proper loading states
5. Follow the block validation rules
6. Ensure proper type selection
7. Handle edge cases appropriately

## Testing

The module includes tests for:
- Component rendering
- State management
- Form validation
- Error handling
- API integration

## Security Considerations

1. **Authorization**
   - Ensure proper authentication
   - Verify user permissions
   - Implement role-based access

2. **Data Protection**
   - Validate article ownership
   - Prevent unauthorized edits
   - Implement proper access controls

3. **Error Handling**
   - Don't expose sensitive information
   - Provide appropriate error messages
   - Log security-related events
