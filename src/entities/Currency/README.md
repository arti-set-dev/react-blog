# Currency Module

The `Currency` module provides functionality for working with currencies in the application. It includes an enumeration of available currencies and a component for currency selection.

## Structure

```
Currency/
├── model/
│   └── types/
│       └── currency.ts      # Types and enums for currencies
├── ui/
│   └── CurrencySelect/
│       ├── CurrencySelect.tsx        # Currency selection component
│       └── CurrencySelect.stories.tsx # Component stories
└── index.ts                 # Public API of the module
```

## Types

### Currency

Enumeration of available currencies:

```typescript
export enum Currency {
  USD = 'USD',  // US Dollar
  EUR = 'EUR',  // Euro
  KZT = 'KZT',  // Kazakhstani Tenge
}
```

## Components

### CurrencySelect

Component for currency selection with support for dark and light themes, as well as read-only mode.

#### Props

```typescript
interface CurrencySelectProps {
  className?: string;          // Additional CSS classes
  currValue?: Currency;        // Current currency value
  onChange?: (value: Currency) => void; // Currency change handler
  readonly?: boolean;          // Read-only mode
  background?: ListBoxBackground; // Background color (new version only)
}
```

#### Features

- Supports adaptive design through `ToggleFeatures`
- Has two interface versions: deprecated and new (redesigned)
- Supports localization through `react-i18next`
- Integrates with the application's theme system

## Usage

```typescript
import { CurrencySelect, Currency } from '@/entities/Currency';

// In component
const [currency, setCurrency] = useState<Currency>(Currency.USD);

<CurrencySelect
  currValue={currency}
  onChange={setCurrency}
  readonly={false}
/>
```

## Testing

The `CurrencySelect` component has the following variants for testing in Storybook:

1. `Default` - standard view with USD
2. `WithEUR` - with EUR selected
3. `WithKZT` - with KZT selected
4. `Readonly` - in read-only mode
5. `Dark` - dark theme
6. `DarkReadonly` - dark theme in read-only mode

## Integration

The module integrates with:
- Application theme system
- Localization system (i18n)
- Feature flags system for switching between interface versions
