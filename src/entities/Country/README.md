# Country Entity

## Overview
The Country entity module is responsible for managing country-related data within the application. It provides functionality for selecting, displaying, and managing country information, which is used in various parts of the application such as user profiles and article metadata.

## Features
- Country selection and display
- Country data management
- Country list with search functionality
- Country code and name mapping
- Localization support for country names

## Components

### CountrySelect
Provides a dropdown interface for country selection.
- Displays list of available countries
- Supports search functionality
- Shows country flags
- Handles country selection
- Provides keyboard navigation
- Supports disabled state

### CountryFlag
Displays the flag of a selected country.
- Renders country flag image
- Handles missing flag cases
- Supports different sizes
- Provides alt text for accessibility

## Types

### Country
```typescript
interface Country {
  value: string;  // Country code (e.g., 'US', 'RU')
  content: string; // Country name
  flag: string;   // Path to flag image
}
```

### CountrySelectOption
```typescript
interface CountrySelectOption {
  value: string;
  content: string;
  disabled?: boolean;
}
```

## Constants

### CountryList
Array of available countries with their metadata:
```typescript
const CountryList: Country[] = [
  {
    value: 'US',
    content: 'United States',
    flag: '/flags/us.svg'
  },
  {
    value: 'RU',
    content: 'Russia',
    flag: '/flags/ru.svg'
  },
  // ... other countries
];
```

## Hooks

### useCountrySelect
Custom hook for managing country selection.
```typescript
const {
  selectedCountry,
  setSelectedCountry,
  countryOptions,
  isLoading,
} = useCountrySelect();
```

## API Integration
The module integrates with the backend API for:
- Fetching country data
- Updating user's country preference
- Validating country codes

## State Management
- Uses Redux for global state management
- Implements local state for component-specific data
- Manages loading and error states
- Caches country data for better performance

## Localization
- Supports multiple languages for country names
- Uses i18next for translations
- Provides fallback for missing translations

## Best Practices
1. Use proper country code standards (ISO 3166)
2. Implement proper validation for country codes
3. Handle loading and error states gracefully
4. Cache country data appropriately
5. Use proper TypeScript types for type safety
6. Implement proper accessibility features
7. Provide fallback for missing country data

## Dependencies
- React
- Redux Toolkit
- i18next
- Testing Library
- Flag Icons (for country flags)

## Security Considerations
1. Validate country codes on both client and server
2. Sanitize country data
3. Implement proper access controls
4. Handle edge cases for country selection

## Performance Optimization
1. Cache country data
2. Optimize flag image loading
3. Implement proper memoization
4. Use virtual scrolling for large country lists
5. Optimize re-renders

## Usage Examples

### Basic Country Selection
```typescript
import { CountrySelect } from '@/entities/Country';

const ProfileForm = () => {
  return (
    <CountrySelect
      value={selectedCountry}
      onChange={setSelectedCountry}
      label="Select your country"
    />
  );
};
```

### With Search
```typescript
import { CountrySelect } from '@/entities/Country';

const ProfileForm = () => {
  return (
    <CountrySelect
      value={selectedCountry}
      onChange={setSelectedCountry}
      searchable
      placeholder="Search countries..."
    />
  );
};
```

### With Custom Styling
```typescript
import { CountrySelect } from '@/entities/Country';

const ProfileForm = () => {
  return (
    <CountrySelect
      value={selectedCountry}
      onChange={setSelectedCountry}
      className="custom-country-select"
      dropdownClassName="custom-dropdown"
    />
  );
};
```
