# Fetch Next Article Page Feature

The `fetchNextArticlePage` feature provides infinite scrolling functionality for articles by automatically fetching the next page of content when needed.

## Overview

The fetchNextArticlePage feature is a Redux thunk that manages the pagination of articles. It automatically loads the next page of articles when certain conditions are met, providing a seamless infinite scrolling experience.

## Structure

```
src/features/fetchNextArticlePage/
├── model/
│   └── services/
│       ├── fetchNextArticlePage.ts      # Main implementation
│       └── fetchNextArticlePage.test.ts # Test implementation
└── index.ts                             # Public API exports
```

## Implementation Details

### Thunk Configuration

```typescript
export const fetchNextArticlesPage = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>('fetchNextArticlesPage', async (_, thunkApi) => {
  // Implementation details
});
```

### State Dependencies

The feature relies on the following state selectors:
- `getArticlesListIsHasMore`: Checks if more articles are available
- `getArticlesListNum`: Gets the current page number
- `getArticlesListIsLoading`: Checks if articles are currently loading

## Features

1. **Automatic Pagination**
   - Loads next page automatically
   - Handles loading states
   - Manages page numbers
   - Prevents duplicate requests

2. **State Management**
   - Updates page number
   - Manages loading states
   - Handles article list updates
   - Controls infinite scroll behavior

3. **Performance Optimization**
   - Prevents unnecessary fetches
   - Handles concurrent requests
   - Manages loading states
   - Optimizes resource usage

## Implementation Details

### Thunk Logic

The thunk performs the following checks:
1. Verifies if more articles are available
2. Checks if articles are currently loading
3. Validates current page number
4. Fetches next page if conditions are met

### State Updates

The feature updates:
- Article list state
- Page number
- Loading states
- Has more flag

## Usage Example

```tsx
import { fetchNextArticlesPage } from '@/features/fetchNextArticlePage';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll';

const ArticlesList = () => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useInfiniteScroll({
    triggerRef,
    callback: () => dispatch(fetchNextArticlesPage()),
  });

  return (
    <div>
      {/* Article list content */}
      <div ref={triggerRef} />
    </div>
  );
};
```

## Integration

The feature integrates with:
- Article entity
- Redux store
- Infinite scroll hook
- Article list component

## Best Practices

1. **Implementation**
   - Use proper loading states
   - Handle edge cases
   - Implement proper error handling
   - Manage state updates carefully

2. **Performance**
   - Prevent unnecessary fetches
   - Handle concurrent requests
   - Optimize resource usage
   - Manage memory efficiently

3. **Error Handling**
   - Handle network errors
   - Manage failed requests
   - Provide fallback behavior
   - Log errors appropriately

## Performance Considerations

1. **Optimization**
   - Prevent duplicate requests
   - Handle loading states properly
   - Manage memory usage
   - Optimize state updates

2. **Resource Management**
   - Clear unused resources
   - Handle memory efficiently
   - Manage concurrent requests
   - Optimize network usage

## Error Handling

The feature handles:
- Network errors
- Failed requests
- Invalid states
- Edge cases
- Concurrent requests

## Testing

The feature includes:
- Unit tests for thunk logic
- State management tests
- Edge case handling
- Error scenario tests

