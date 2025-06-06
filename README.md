# React Drop Shadow

A highly customizable React component for applying drop shadows with optional Framer Motion animations.

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
    <DropShadow size="md">
      <div className="card">
        Your content here
      </div>
    </DropShadow>
  )
}
```

### With Animation

```tsx
import { DropShadow } from '@your-username/react-drop-shadow'

function AnimatedCard() {
  return (
    <DropShadow size="lg" animated>
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

### With Inner Shadow

```tsx
import { DropShadow } from '@your-username/react-drop-shadow'

function InnerShadow() {
  return (
    <DropShadow size="md" innerShadow>
      <div>Content with inner shadow</div>
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
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size of the shadow |
| `color` | `'default' \| 'purple' \| 'blue' \| 'white'` | `'default'` | Color variant of the shadow |
| `innerShadow` | `boolean` | `false` | Whether to add an inner shadow |
| `animated` | `boolean` | `false` | Whether to animate on hover |
| `className` | `string` | `''` | Additional CSS classes |
| `style` | `CSSProperties` | `{}` | Additional inline styles |
| `...motionProps` | `HTMLMotionProps<"div">` | - | Any additional Framer Motion props |

### Shadow Sizes

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

## License

MIT