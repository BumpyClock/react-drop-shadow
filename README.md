# React Drop Shadow

A highly customizable React component for applying drop shadows with elevation-based layered shadows and optional Framer Motion animations. Built following Josh Comeau's shadow design principles for realistic depth perception.

## Installation

```bash
npm install @your-username/react-drop-shadow
```

## Peer Dependencies

Make sure you have the required peer dependencies installed:

```bash
npm install react motion
```

## Usage

### Basic Usage

```tsx
import { DropShadow } from '@your-username/react-drop-shadow'

function App() {
  return (
    <DropShadow elevation={3}>
      <div className="card">
        Your content here
      </div>
    </DropShadow>
  )
}
```

### Legacy Size-Based Shadows

```tsx
// Still supported for backward compatibility
function LegacyApp() {
  return (
    <DropShadow size="md">
      <div className="card">
        Your content here
      </div>
    </DropShadow>
  )
}
```

### Elevation-Based Shadows (Recommended)

```tsx
import { DropShadow } from '@your-username/react-drop-shadow'

// Different elevation levels for UI hierarchy
function ElevationExamples() {
  return (
    <>
      {/* Flat surface */}
      <DropShadow elevation={0}>
        <div>No shadow</div>
      </DropShadow>
      
      {/* Button */}
      <DropShadow elevation={2} animated>
        <button>Interactive button</button>
      </DropShadow>
      
      {/* Card */}
      <DropShadow elevation={4}>
        <div>Content card</div>
      </DropShadow>
      
      {/* Modal */}
      <DropShadow elevation={8}>
        <div>Modal dialog</div>
      </DropShadow>
      
      {/* Tooltip */}
      <DropShadow elevation={12}>
        <div>Floating tooltip</div>
      </DropShadow>
    </>
  )
}
```

### With Animation

```tsx
function AnimatedCard() {
  return (
    <DropShadow elevation={4} animated>
      <button className="btn">
        Hover me for enhanced shadow
      </button>
    </DropShadow>
  )
}
```

### Colored Shadows

```tsx
import { DropShadow } from '@your-username/react-drop-shadow'

function ColoredShadows() {
  return (
    <>
      <DropShadow color="purple" size="lg">
        <div>Purple shadow</div>
      </DropShadow>
      
      <DropShadow color="blue" size="lg">
        <div>Blue shadow</div>
      </DropShadow>
    </>
  )
}
```

### Combining Elevation with Inner Shadow

```tsx
function ElevationWithInner() {
  return (
    <DropShadow elevation={6} innerShadow>
      <div>High elevation with inner shadow</div>
    </DropShadow>
  )
}
```

## Preset Components

The library includes several preset components for common use cases:

```tsx
import { 
  FloatingNavShadow, 
  CardShadow, 
  ButtonShadow, 
  PipShadow 
} from '@your-username/react-drop-shadow'

function Presets() {
  return (
    <>
      <FloatingNavShadow>
        <nav>Navigation with large shadow and inner shadow</nav>
      </FloatingNavShadow>
      
      <CardShadow>
        <div>Card with medium shadow</div>
      </CardShadow>
      
      <ButtonShadow>
        <button>Animated button with small shadow</button>
      </ButtonShadow>
      
      <PipShadow>
        <div>Small element with inner shadow</div>
      </PipShadow>
    </>
  )
}
```

## API Reference

### DropShadow Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | The content to wrap with shadow |
| `elevation` | `number` | - | Elevation level (0-100+) using programmatically generated layered shadows |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Legacy size-based shadow (use elevation instead) |
| `color` | `'default' \| 'purple' \| 'blue' \| 'white'` | `'default'` | Color variant of the shadow |
| `innerShadow` | `boolean` | `false` | Whether to add an inner shadow |
| `animated` | `boolean` | `false` | Whether to animate on hover |
| `className` | `string` | `''` | Additional CSS classes |
| `style` | `CSSProperties` | `{}` | Additional inline styles |
| `...motionProps` | `HTMLMotionProps<"div">` | - | Any additional Framer Motion props |

### Elevation System

Elevation creates realistic depth using programmatically generated layered shadows:

- `0`: No shadow (flat surface)
- `1-4`: Subtle elevation for buttons, small cards
- `5-8`: Medium elevation for content cards, panels  
- `9-12`: High elevation for navigation bars, headers
- `13-20`: Very high elevation for modals, dialogs
- `21-50`: Extreme elevation for tooltips, dropdowns
- `50+`: Custom ultra-high elevation

**Any number is supported** - the algorithm automatically generates appropriate layered shadows.

### Legacy Shadow Sizes

- `sm`: Subtle shadow for small elements
- `md`: Medium shadow for cards and containers
- `lg`: Large shadow for floating elements
- `xl`: Extra large shadow for prominent elements

### Color Variants

- `default`: Standard black shadow with opacity
- `purple`: Purple-tinted shadow
- `blue`: Blue-tinted shadow  
- `white`: White outline shadow

## Utility Functions

### combineFilters

Helper function to combine multiple CSS filter values:

```tsx
import { combineFilters } from '@your-username/react-drop-shadow'

const combinedFilter = combineFilters(
  'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
  'blur(2px)',
  'brightness(1.1)'
)
```

## Design Principles

This component follows Josh Comeau's shadow design principles:

1. **Layered Shadows**: Multiple shadow layers create more realistic depth
2. **Consistent Light Source**: All shadows assume light from above-left  
3. **Progressive Enhancement**: Higher elevations have larger, softer shadows
4. **Natural Colors**: Uses HSL colors with appropriate saturation
5. **Programmatic Generation**: Shadows generated algorithmically for consistency
6. **Performance Optimized**: Memoized results + smart layer calculation

## Performance Features

- **Memoization**: Generated shadows are cached to avoid recomputation
- **Smart Layering**: Number of layers scales intelligently with elevation
- **Tiny Bundle**: ~90% smaller than pre-computed shadow tables
- **Runtime Efficiency**: Generation happens once per unique elevation

## Shadow Priority

When multiple shadow props are provided, they're applied in this priority:

1. `elevation` (highest priority - uses layered box-shadows)
2. `color` (colored filter-based shadows)
3. `size` (legacy size-based filter shadows)

## Migration from Size to Elevation

```tsx
// Old approach
<DropShadow size="sm">Button</DropShadow>
<DropShadow size="md">Card</DropShadow>
<DropShadow size="lg">Modal</DropShadow>
<DropShadow size="xl">Overlay</DropShadow>

// New elevation approach (recommended)
<DropShadow elevation={2}>Button</DropShadow>
<DropShadow elevation={4}>Card</DropShadow>
<DropShadow elevation={12}>Modal</DropShadow>
<DropShadow elevation={20}>Overlay</DropShadow>

// Custom elevations
<DropShadow elevation={1.5}>Subtle</DropShadow>
<DropShadow elevation={35}>Dramatic</DropShadow>
<DropShadow elevation={100}>Extreme</DropShadow>
```

## License

MIT