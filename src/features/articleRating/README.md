# Article Rating Module

The `articleRating` module provides functionality for rating articles in the application. It includes a user interface for rating articles, API integration for rating operations, and proper state management.

## Structure

```
src/features/articleRating/
├── model/
│   └── api/                      # API endpoints for article rating
├── ui/
│   └── ArticleRating/           # Article rating components
└── index.ts                      # Public API of the module
```

## Components

### ArticleRating

The main component for rating articles. It provides a user interface for rating articles with the following features:

#### Props

```typescript
interface ArticleRatingProps {
  className?: string;  // Additional CSS class
  articleId: number;   // ID of the article to rate
}
```

#### Features

1. **Rating Interface**
   - Star-based rating system
   - Optional feedback input
   - Authentication check
   - Loading states
   - Error handling

2. **User Experience**
   - Responsive design
   - Loading skeletons
   - Error messages
   - Feedback form

3. **State Management**
   - Rating data fetching
   - Rating submission
   - Loading states
   - Error states

## API Integration

### Rating Endpoints

```typescript
interface GetArticleRatingArg {
  userId: number;
  articleId: number;
}

interface RareArticleArg {
  userId: number;
  articleId: number;
  rate: number;
  feedback?: string;
}
```

### Available Operations

1. **Get Article Rating**
   - Fetches rating for a specific article and user
   - Returns rating data

2. **Rate Article**
   - Submits a new rating
   - Optional feedback
   - Updates rating data

## Features

1. **Rating System**
   - Star-based rating (1-5)
   - Optional feedback
   - Real-time updates
   - User-specific ratings

2. **User Interface**
   - Responsive design
   - Loading states
   - Error handling
   - Feedback form

3. **Authentication**
   - User verification
   - Guest handling
   - Permission checks

4. **State Management**
   - Rating data
   - Loading states
   - Error states
   - Form state

## Usage

```tsx
import { ArticleRating } from '@/features/articleRating';

const MyComponent = () => {
  return (
    <ArticleRating articleId={123} />
  );
};
```

## Integration

The module integrates with:
- RTK Query for API calls
- User entity for authentication
- Rating entity for data structure
- UI components for interface

## Best Practices

1. Always check user authentication
2. Handle loading states appropriately
3. Implement proper error handling
4. Use proper validation
5. Provide clear feedback
6. Handle edge cases
7. Implement proper loading states

## Testing

The module includes tests for:
- API endpoints
- Component rendering
- State management
- Error handling
- User interactions

## Security Considerations

1. **Authentication**
   - Verify user identity
   - Check permissions
   - Handle guest users

2. **Data Protection**
   - Validate user input
   - Prevent unauthorized access
   - Protect user data

3. **Error Handling**
   - Don't expose sensitive information
   - Provide appropriate error messages
   - Log security-related events
