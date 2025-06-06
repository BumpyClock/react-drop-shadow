# React Drop Shadow

A highly customizable React component for applying drop shadows with elevation-based layered shadows and CSS transitions. Built following Josh Comeau's shadow design principles for realistic depth perception.

## Installation

```bash
npm install @your-username/react-drop-shadow
```

## Peer Dependencies

Make sure you have React installed:

```bash
npm install react
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

### State-Based Shadows with Config

```tsx
import { DropShadow, DropShadowConfig, shadowPresets } from '@your-username/react-drop-shadow'

// Using global config for consistent behavior
function App() {
  return (
    <DropShadowConfig {...shadowPresets.card}>
      <div className="card-section">
        <DropShadow currentState="auto">
          <Card /> {/* Automatically detects hover/active/focus states */}
        </DropShadow>
        
        <DropShadow currentState="hover">
          <Card /> {/* Always shows hover state */}
        </DropShadow>
      </div>
    </DropShadowConfig>
  )
}

// Using inline states
function CustomStates() {
  const [isAnimating, setIsAnimating] = useState(false)
  
  return (
    <DropShadow
      states={{
        default: { elevation: 2 },
        hover: { elevation: 4 },
        active: { elevation: 1 },
        animating: { elevation: 6, blur: 1.2 }
      }}
      currentState={isAnimating ? 'animating' : 'auto'}
      transition={{ duration: 0.3 }}
    >
      <AnimatedCard />
    </DropShadow>
  )
}

// Using shadow presets
function PresetExample() {
  return (
    <>
      <DropShadow config="card">
        <ProductCard />
      </DropShadow>
      
      <DropShadow config={shadowPresets.button}>
        <button>Action</button>
      </DropShadow>
      
      <DropShadow 
        config="modal"
        currentState="entering"
      >
        <Modal />
      </DropShadow>
    </>
  )
}
```

### Hook Usage for Advanced Cases

```tsx
import { useDropShadow } from '@your-username/react-drop-shadow'

function AdvancedComponent() {
  const { shadowStyle, currentState, setDetectedState } = useDropShadow({
    config: 'card',
    states: {
      loading: { elevation: 0, opacity: 0.5 },
      error: { elevation: 4, color: 'red' }
    },
    currentState: isLoading ? 'loading' : 'auto'
  })
  
  return (
    <div style={shadowStyle}>
      Current state: {currentState}
    </div>
  )
}
```

## Shadow Presets

The library includes built-in shadow configurations for common UI patterns:

```tsx
import { shadowPresets } from '@your-username/react-drop-shadow'

// Available presets:
// - card: Standard card elevation with hover/active states
// - button: Interactive button with focus state
// - modal: High elevation for overlays
// - floating: Medium elevation with animation states

// Define custom presets
const customPresets = {
  toast: {
    states: {
      default: { elevation: 8 },
      entering: { elevation: 4 },
      exiting: { elevation: 12 }
    },
    transition: { duration: 0.2 }
  }
}

// Use in DropShadowConfig
<DropShadowConfig presets={customPresets}>
  <DropShadow config="toast">
    <Toast />
  </DropShadow>
</DropShadowConfig>
```

## Legacy Preset Components

For backward compatibility:

```tsx
import { CardShadow, ButtonShadow } from '@your-username/react-drop-shadow'

function LegacyPresets() {
  return (
    <>
      <CardShadow>
        <div>Card with medium shadow</div>
      </CardShadow>
      
      <ButtonShadow>
        <button>Animated button with small shadow</button>
      </ButtonShadow>
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
| `config` | `ShadowConfig \| string` | - | Shadow configuration object or preset name |
| `states` | `Record<string, ShadowStateConfig>` | - | State-based shadow configurations |
| `currentState` | `string \| 'auto'` | `'auto'` | Current shadow state (auto detects hover/active/focus) |
| `transition` | `TransitionConfig` | - | Custom transition configuration (duration in ms, ease as CSS function) |
| `className` | `string` | `''` | Additional CSS classes |
| `style` | `CSSProperties` | `{}` | Additional inline styles |
| `...props` | `HTMLAttributes<HTMLDivElement>` | - | Any additional HTML div props |

### DropShadowConfig Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Components that will inherit the shadow config |
| `states` | `Record<string, ShadowStateConfig>` | - | State configurations to apply |
| `transition` | `TransitionConfig` | - | Default transition for all shadows (duration in ms, ease as CSS function) |
| `autoDetect` | `boolean` | `true` | Enable automatic state detection |
| `presets` | `Record<string, ShadowConfig>` | - | Custom preset configurations |

### ShadowStateConfig

| Prop | Type | Description |
|------|------|-------------|
| `elevation` | `number` | Elevation level for this state |
| `color` | `ShadowColor` | Shadow color for this state |
| `size` | `ShadowSize` | Legacy size for this state |
| `opacity` | `number` | Opacity multiplier (0-1) |
| `blur` | `number` | Blur multiplier (default: 1) |
| `innerShadow` | `boolean \| string` | Inner shadow configuration |

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

## Hook API

### useDropShadow

```tsx
const { shadowStyle, currentState, setDetectedState, states } = useDropShadow({
  config?: ShadowConfig | string,
  states?: Record<string, ShadowStateConfig>,
  currentState?: string,
  elevation?: number,
  size?: ShadowSize,
  color?: ShadowColor
})
```

Returns:
- `shadowStyle`: CSS properties object with filter and boxShadow
- `currentState`: The current active state
- `setDetectedState`: Function to manually set detected state
- `states`: Merged state configurations

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