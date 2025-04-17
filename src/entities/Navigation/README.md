# Navigation Module

The `Navigation` module provides functionality for creating and managing navigation items in the application. It includes components and types for building navigation menus with support for authentication-based visibility and theme switching.

## Structure

```
Navigation/
├── model/
│   └── types/
│       └── navigation.ts    # Types for navigation items
├── ui/
│   └── NavigationItem.tsx   # Navigation item component
└── index.ts                 # Public API of the module
```

## Types

### NavigationItemType

Interface defining the structure of a navigation item:

```typescript
export interface NavigationItemType {
  path: string;                           // Route path
  text: string;                           // Display text (translation key)
  Icon?: React.VFC<React.SVGProps<SVGSVGElement>>; // Optional SVG icon component
  authOnly: boolean;                      // Whether the item is visible only to authenticated users
}
```

## Components

### NavigationItem

A component that renders a single navigation item with support for authentication-based visibility and theme switching.

#### Props

```typescript
export interface NavigationItemProps {
  item: NavigationItemType;  // Navigation item configuration
}
```

#### Features

- Supports authentication-based visibility (`authOnly` flag)
- Integrates with the application's translation system (`react-i18next`)
- Supports both redesigned and deprecated UI versions through `ToggleFeatures`
- Automatically handles icon rendering
- Integrates with the application's routing system

#### Implementation Details

The component:
1. Checks user authentication status using `getUserAuthData` selector
2. Hides items marked as `authOnly` for unauthenticated users
3. Renders either the redesigned or deprecated version based on feature flags
4. Supports SVG icons with customizable dimensions
5. Uses translation system for text localization

## Usage

```typescript
import { NavigationItem } from '@/entities/Navigation';
import { HomeIcon } from '@/shared/assets/icons';

const navigationItem = {
  path: '/home',
  text: 'navigation.home',
  Icon: HomeIcon,
  authOnly: false,
};

// In your component
<NavigationItem item={navigationItem} />
```

## Integration

The module integrates with:
- Application theme system
- Authentication system
- Localization system (i18n)
- Feature flags system for UI version switching
- Routing system

## Best Practices

1. Always provide translation keys for text
2. Use appropriate SVG icons with consistent dimensions
3. Set `authOnly` flag correctly based on route protection requirements
4. Follow the application's routing conventions for paths
5. Use the component within navigation menus or sidebars

## Security Considerations

- The `authOnly` flag provides basic route protection at the UI level
- Additional route protection should be implemented at the router level
- Sensitive navigation items should always have `authOnly: true`
