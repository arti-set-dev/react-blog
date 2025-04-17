# Rating Module

The `Rating` module provides functionality for collecting and displaying user ratings in the application. It includes components for star-based rating systems with optional feedback collection, supporting both desktop and mobile interfaces.

## Structure

```
Rating/
├── model/
│   └── types/
│       └── types.ts         # Rating type definitions
├── ui/
│   └── RatingCard/          # Rating card component
└── index.ts                 # Public API of the module
```

## Types

### Rating

Interface defining the structure of a rating:

```typescript
export interface Rating {
  rate: number;        // Rating value (number of stars)
  feedback?: string;   // Optional feedback text
}
```

## Components

### RatingCard

A component that provides a star-based rating interface with optional feedback collection.

#### Props

```typescript
interface RatingCardProps {
  className?: string;
  title?: string;                    // Title to display
  feedbackTitle?: string;            // Title for feedback modal
  hasFeedback?: boolean;             // Whether to collect feedback
  onCancel?: (starsCount: number) => void;
  onAccept?: (starsCount: number, feedback?: string) => void;
  rate?: number;                     // Initial rating value
  isAuth?: boolean;                  // Whether user is authenticated
}
```

#### Features

- Star-based rating system
- Optional feedback collection
- Responsive design (desktop/mobile)
- Authentication-aware
- Supports both redesigned and deprecated UI versions
- Modal/Drawer feedback interface
- Localization support
- Test coverage with data-testid attributes

#### Implementation Details

The component:
1. Uses `StarRating` for the rating interface
2. Shows different UI based on device type (BrowserView/MobileView)
3. Handles feedback collection through Modal (desktop) or Drawer (mobile)
4. Supports both redesigned and deprecated UI versions
5. Integrates with the translation system
6. Provides callbacks for rating acceptance and cancellation

## Usage

```typescript
import { RatingCard } from '@/entities/Rating';

// In your component
<RatingCard
  title="Rate this article"
  feedbackTitle="Share your thoughts"
  hasFeedback
  onAccept={(starsCount, feedback) => {
    // Handle rating submission
  }}
  isAuth={isAuthenticated}
/>
```

## Integration

The module integrates with:
- Application theme system
- Authentication system
- Translation system (i18n)
- Feature flags system for UI version switching
- Responsive design system (react-device-detect)

## Best Practices

1. Always check `isAuth` before allowing ratings
2. Provide meaningful titles and feedback prompts
3. Handle both rating and feedback submission appropriately
4. Use appropriate UI version based on feature flags
5. Consider mobile users when designing feedback interfaces
6. Provide clear feedback to users after rating submission

## Testing

The component includes test attributes:
- `data-testid="RatingCard"` for the main component
- `data-testid="RatingCard.Input"` for feedback input
- `data-testid="RatingCard.Cancel"` for cancel button
- `data-testid="RatingCard.Send"` for submit button

Tests should cover:
- Component rendering
- Star rating selection
- Feedback collection
- Modal/Drawer behavior
- Authentication state handling
- UI version switching
