# Add New Comment Module

The `addNewComment` module provides functionality for adding new comments in the application. It includes user interface components, state management through Redux, and selectors for data access.

## Structure

```
src/features/addNewComment/
├── model/
│   ├── slices/           # Redux slice for state management
│   ├── selectors/        # Selectors for data access
│   └── types/            # Data types
└── ui/
    └── AddCommentForm/   # Comment form components
```

## Components

### AddCommentForm

The main component for adding comments. Supports two design variants:

1. **Redesigned** (`AddCommentFormRedesigned.tsx`)
   - Modern design using components from `@/shared/ui/redesigned`
   - Dark theme support
   - Responsive design

2. **Deprecated** (`AddCommentFormDeprecated.tsx`)
   - Legacy design using components from `@/shared/ui/deprecated`
   - Modular styles via SCSS

#### Props

- `onSendComment: (text: string) => void` - callback function called when sending a comment
- `className?: string` - additional CSS class

## State Management

### Redux Slice

```typescript
interface AddNewCommentSchema {
  text?: string;      // Comment text
  error?: string;     // Error message
}
```

### Actions

- `setText(text: string)` - set comment text

### Selectors

- `getCommentFormText` - get comment text
- `getCommentFormError` - get error message

## Features

1. **Validation**
   - User authentication check
   - Comment text length validation

2. **Error Handling**
   - Error message display
   - Authentication error handling

3. **Internationalization**
   - Multi-language support via i18next

4. **Responsiveness**
   - Mobile device support
   - Responsive design

## Usage

```tsx
import { AddCommentForm } from '@/features/addNewComment';

const MyComponent = () => {
  const handleSendComment = (text: string) => {
    // Handle comment submission
  };

  return (
    <AddCommentForm onSendComment={handleSendComment} />
  );
};
```

## Testing

The module includes tests for both component variants:
- `AddCommentFormRedesigned.test.tsx`
- `AddCommentFormDeprecated.test.tsx`

Tests cover basic usage scenarios and verify component functionality.
