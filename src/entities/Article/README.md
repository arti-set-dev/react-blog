# Article Entity

## Overview
The Article entity module is responsible for managing and displaying articles within the application. It provides components for viewing article details, listing articles, and managing article-related functionality.

## Features
- Article details viewing
- Article listing with different view modes
- Article sorting and filtering
- Article type selection
- Article data management

## Components

### ArticleDetails
Displays detailed information about a specific article.
- Shows article title, subtitle, and content
- Displays article metadata (views, creation date)
- Handles article blocks (text, code, image)
- Manages article rating functionality

### ArticleList
Renders a list of articles with configurable view modes.
- Supports tile and list view modes
- Implements virtual scrolling for performance
- Handles article loading states
- Provides article selection functionality

### ArticleViewSelector
Controls the display mode of the article list.
- Toggles between tile and list views
- Maintains user preference for view mode
- Provides visual feedback for current view

### ArticleSortSelector
Manages article sorting options.
- Supports sorting by:
  - Creation date
  - Views count
  - Title
- Maintains current sort order
- Updates article list based on sort selection

### ArticleTypeTabs
Handles article type filtering.
- Filters articles by type (IT, Science, Economics, etc.)
- Provides visual tabs for type selection
- Updates article list based on selected type

## Types

### Article
```typescript
interface Article {
  id: string;
  title: string;
  subtitle: string;
  img: string;
  views: number;
  createdAt: string;
  type: ArticleType[];
  blocks: ArticleBlock[];
  userId: string;
}
```

### ArticleBlock
```typescript
type ArticleBlock = ArticleTextBlock | ArticleCodeBlock | ArticleImageBlock;

interface ArticleTextBlock {
  id: string;
  type: 'TEXT';
  title?: string;
  paragraphs: string[];
}

interface ArticleCodeBlock {
  id: string;
  type: 'CODE';
  code: string;
}

interface ArticleImageBlock {
  id: string;
  type: 'IMAGE';
  src: string;
  title?: string;
}
```

## Selectors

### getArticleDetailsData
Retrieves the currently open article's data.
```typescript
const article = useSelector(getArticleDetailsData);
```

### getArticleDetailsIsLoading
Returns the loading state of article details.
```typescript
const isLoading = useSelector(getArticleDetailsIsLoading);
```

### getArticleDetailsError
Returns any error that occurred while loading article details.
```typescript
const error = useSelector(getArticleDetailsError);
```

## Hooks

### useArticleFilters
Custom hook for managing article filters and sorting.
```typescript
const {
  sort,
  order,
  search,
  type,
  onChangeSort,
  onChangeOrder,
  onChangeSearch,
  onChangeType,
} = useArticleFilters();
```

## API Integration
The module integrates with the backend API for:
- Fetching article details
- Loading article lists
- Updating article views
- Managing article ratings

## Best Practices
1. Use virtual scrolling for large article lists
2. Implement proper loading states
3. Handle error states gracefully
4. Cache article data when appropriate
5. Use proper TypeScript types for type safety

## Dependencies
- React
- Redux Toolkit
- i18next
- React Router
- Testing Library
