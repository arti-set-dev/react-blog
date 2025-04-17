# Article Delete Module

The `articleDelete` module provides functionality for deleting articles in the application. It includes API integration for article deletion and proper error handling.

## Structure

```
src/features/articleDelete/
├── api/
│   ├── articleDeleteApi.ts        # API endpoints for article deletion
│   └── articleDeleteApi.test.ts   # API tests
└── index.ts                       # Public API of the module
```

## API Integration

### Article Deletion Endpoint

```typescript
const articleApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    deleteArticle: build.mutation<void, string>({
      query: (articleId) => ({
        url: `/posts/${articleId}`,
        method: 'DELETE',
      }),
    }),
  }),
});
```

## Features

1. **Article Deletion**
   - Secure article deletion
   - Proper error handling
   - Type-safe API integration

2. **Error Handling**
   - 404 Not Found handling
   - Network error handling
   - Validation error handling

3. **Type Safety**
   - Strong typing for article IDs
   - Type-safe mutation response
   - Proper error typing

## Usage

```tsx
import { useDeleteArticle } from '@/features/articleDelete';

const MyComponent = () => {
  const [deleteArticle, { isLoading, error }] = useDeleteArticle();

  const handleDelete = async (articleId: string) => {
    try {
      await deleteArticle(articleId);
      // Handle successful deletion
    } catch (err) {
      // Handle error
    }
  };

  return (
    <button onClick={() => handleDelete('123')}>
      Delete Article
    </button>
  );
};
```

## Integration

The module integrates with:
- RTK Query for API calls
- Article entity for data structure
- Error handling system
- Type system

## Best Practices

1. Always handle deletion errors appropriately
2. Implement proper loading states
3. Use type-safe article IDs
4. Consider implementing confirmation dialogs
5. Update UI state after successful deletion
6. Handle edge cases (e.g., article not found)
7. Implement proper error messages

## Testing

The module includes comprehensive tests for:
- API endpoint injection
- Mutation calls
- Error handling
- Type safety
- Edge cases

### Test Cases

1. **Endpoint Injection**
   - Verifies correct endpoint setup
   - Checks mutation availability

2. **Mutation Calls**
   - Validates correct article ID usage
   - Verifies proper URL construction
   - Checks HTTP method

3. **Error Handling**
   - Tests 404 Not Found scenario
   - Validates error propagation
   - Checks error message handling

4. **Type Safety**
   - Verifies type constraints
   - Checks response typing
   - Validates error typing

## Security Considerations

1. **Authorization**
   - Ensure proper authentication
   - Verify user permissions
   - Implement role-based access

2. **Data Protection**
   - Validate article ownership
   - Prevent unauthorized deletions
   - Implement proper access controls

3. **Error Handling**
   - Don't expose sensitive information
   - Provide appropriate error messages
   - Log security-related events

