# Notification Module

The `Notification` module provides functionality for displaying and managing notifications in the application. It includes components for rendering notification lists and individual notification items, with support for different UI versions and loading states.

## Structure

```
Notification/
├── model/
│   └── types/
│       └── notification.ts  # Types for notifications
├── ui/
│   ├── NotificationList/    # List of notifications component
│   └── NotificationItem/    # Individual notification component
└── index.ts                 # Public API of the module
```

## Types

### Notification

Interface defining the structure of a notification:

```typescript
export interface Notification {
  id: string;           // Unique identifier
  title: string;        // Notification title
  description: string;  // Notification description
  href?: string;        // Optional link URL
  hrefDescr?: string;   // Optional link description
  isUiSwitch?: boolean; // Whether to show UI switcher
}
```

## Components

### NotificationList

A component that renders a list of notifications with support for loading states and error handling.

#### Props

```typescript
interface NotificationListProps {
  className?: string;
  id?: string;
  notifications?: Notification[];
  isLoading?: boolean;
  error?: FetchBaseQueryError | string | SerializedError | undefined;
  uiSwitcher?: ReactElement;
}
```

#### Features

- Supports loading states with skeleton placeholders
- Handles error states with error messages
- Shows empty state message when no notifications are available
- Supports both redesigned and deprecated UI versions
- Integrates with the translation system
- Uses VStack for consistent spacing

### NotificationItem

A component that renders a single notification item with optional link and UI switcher.

#### Props

```typescript
interface NotificationItemProps {
  className?: string;
  notification: Notification;
  uiSwitcher?: ReactElement;
}
```

#### Features

- Supports optional links with descriptions
- Can display UI switcher when needed
- Adapts to both redesigned and deprecated UI versions
- Uses Card component in redesigned version
- Supports custom styling through className

## Usage

```typescript
import { NotificationList } from '@/entities/Notification';

// In your component
const notifications = [
  {
    id: '1',
    title: 'New message',
    description: 'You have received a new message',
    href: '/messages',
    hrefDescr: 'View message',
  },
];

<NotificationList
  notifications={notifications}
  isLoading={false}
  error={undefined}
/>
```

## Integration

The module integrates with:
- Application theme system
- Translation system (i18n)
- Feature flags system for UI version switching
- Redux Toolkit for error handling
- Routing system for notification links

## Best Practices

1. Always provide unique IDs for notifications
2. Use translation keys for text content
3. Handle loading and error states appropriately
4. Provide meaningful link descriptions
5. Use UI switcher only when necessary
6. Follow the application's styling conventions

## Testing

The module includes test files for both components:
- `NotificationList.test.tsx`
- `NotificationItem.test.tsx`

Tests cover:
- Component rendering
- Loading states
- Error handling
- Empty states
- Notification item rendering
- Link handling
- UI switcher integration
