# Scroll Save Feature

The `scrollSave` feature provides functionality for saving and restoring scroll positions across different pages in the application.

## Overview

The scrollSave feature is a Redux-based solution that manages scroll positions for different routes in the application. It allows users to return to their previous scroll position when navigating back to a page.

## Structure

```
src/features/scrollSave/
├── model/
│   ├── slices/
│   │   ├── ScrollSaveSlice.ts        # Redux slice implementation
│   │   └── ScrollSaveSlice.test.ts   # Slice tests
│   ├── types/
│   │   └── ScrollSaveSchema.ts       # Type definitions
│   └── selectors/
│       └── scrollSaveSelectors.ts    # Redux selectors
└── index.ts                          # Public API exports
```

## Implementation Details

### State Schema

```typescript
interface ScrollSaveSchema {
  scroll: Record<string, number>;  // Path to scroll position mapping
}
```

### Redux Slice

The feature uses a Redux slice with:
- Initial state
- Scroll position setter
- Path-based storage
- Type-safe actions

## Features

1. **Scroll Position Management**
   - Save scroll positions
   - Restore scroll positions
   - Path-based storage
   - Persistent state

2. **State Management**
   - Redux integration
   - Type-safe actions
   - Efficient updates
   - Path-based organization

3. **Integration**
   - Route-based storage
   - Navigation support
   - State persistence
   - Type safety

## Usage Example

```tsx
import { useDispatch, useSelector } from 'react-redux';
import { ScrollSaveActions, getScrollByPath } from '@/features/scrollSave';

const PageComponent = () => {
  const dispatch = useDispatch();
  const path = useLocation().pathname;
  const scrollPosition = useSelector(getScrollByPath(path));

  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, [scrollPosition]);

  const handleScroll = () => {
    dispatch(ScrollSaveActions.setScrollPosition({
      path,
      position: window.scrollY,
    }));
  };

  return (
    <div onScroll={handleScroll}>
      {/* Page content */}
    </div>
  );
};
```

## Integration

The feature integrates with:
- Redux store
- React Router
- Navigation system
- State management

## Best Practices

1. **Implementation**
   - Use path-based storage
   - Handle scroll events efficiently
   - Implement proper cleanup
   - Manage state updates carefully

2. **Performance**
   - Debounce scroll events
   - Optimize state updates
   - Handle large datasets
   - Manage memory efficiently

3. **Error Handling**
   - Handle invalid paths
   - Manage scroll restoration
   - Handle edge cases
   - Provide fallbacks

## Performance Considerations

1. **Optimization**
   - Debounce scroll events
   - Optimize state updates
   - Handle large path sets
   - Manage memory usage

2. **Resource Management**
   - Clean up unused paths
   - Handle memory efficiently
   - Optimize state size
   - Manage updates properly

## Error Handling

The feature handles:
- Invalid paths
- Scroll restoration errors
- State update errors
- Edge cases

## Testing

The feature includes:
- Slice tests
- Selector tests
- Integration tests
- Edge case handling

## State Management

The feature provides:
- Path-based storage
- Efficient updates
- Type safety
- Persistent state

## Type Safety

The feature ensures:
- Type-safe actions
- Type-safe state
- Type-safe selectors
- Type-safe updates

