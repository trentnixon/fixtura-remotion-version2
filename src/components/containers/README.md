# AnimatedContainer Component

A versatile container component with animation capabilities for Remotion videos. Supports both entry and exit animations, theme integration, and flexible styling options.

## Features

- **Remotion Integration**: Uses Remotion's animation patterns for smooth, frame-based animations
- **Multiple Animation Types**: Supports fade, slide, scale, spring, and many other animation types
- **Entry and Exit Animations**: Configure separate animations for entering and exiting
- **Spring Animations**: Physics-based spring animations with configurable parameters
- **Theming Support**: Integrates with the theme system for consistent styling
- **Flexible Styling**: Customize size, rounding, shadows, and more

## Examples

The component comes with a set of examples that demonstrate different animation types and configurations. You can find these examples in the `examples` directory.

```tsx
import {
  BasicContainer,
  FadeInContainer,
  SlideInContainer,
  ScaleContainer,
  SpringContainer,
  FlipContainer,
  SequencedContainers,
  AnimationShowcase,
  SpringConfigShowcase,
} from "../components/containers/examples";

// Use these examples in your compositions
const MyComposition = () => (
  <>
    <BasicContainer />
    <FadeInContainer />
    {/* ... */}
  </>
);
```

For a complete showcase of all animation types, use the `AnimationShowcase` component:

```tsx
const MyShowcaseComposition = () => <AnimationShowcase />;
```

## Basic Usage

```tsx
import { AnimatedContainer } from "../components/containers";

const MyComponent = () => (
  <AnimatedContainer
    type="border"
    backgroundColor="primary"
    rounded="md"
    shadow="md"
  >
    <Typography>Container Content</Typography>
  </AnimatedContainer>
);
```

## With Animation

```tsx
import { AnimatedContainer, SPRING_CONFIGS } from "../components/containers";

const MyAnimatedComponent = () => (
  <AnimatedContainer
    type="card"
    backgroundColor="light"
    rounded="lg"
    shadow="lg"
    animation={{
      type: "fadeIn",
      duration: 30,
      easing: "easeInOut",
    }}
    exitAnimation={{
      type: "fadeOut",
      duration: 30,
      easing: "easeInOut",
    }}
    exitFrame={60}
  >
    <Typography>Animated Container</Typography>
  </AnimatedContainer>
);
```

## With Spring Animation

```tsx
import { AnimatedContainer, SPRING_CONFIGS } from "../components/containers";

const MySpringComponent = () => (
  <AnimatedContainer
    type="card"
    backgroundColor="light"
    rounded="lg"
    shadow="lg"
    animation="springIn"
    springConfig={SPRING_CONFIGS.BOUNCE}
    animationDuration={45}
  >
    <Typography>Spring Animated Container</Typography>
  </AnimatedContainer>
);
```

## Props

### Container Styling

| Prop              | Type                                                       | Default   | Description            |
| ----------------- | ---------------------------------------------------------- | --------- | ---------------------- |
| `type`            | `"basic" \| "border" \| "card" \| ...`                     | `"basic"` | Container type/variant |
| `size`            | `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "full" \| "auto"` | `"auto"`  | Container size         |
| `rounded`         | `"none" \| "sm" \| "md" \| "lg" \| "full"`                 | `"none"`  | Border radius          |
| `shadow`          | `"none" \| "sm" \| "md" \| "lg" \| "xl"`                   | `"none"`  | Shadow size            |
| `backgroundColor` | `string`                                                   | `"none"`  | Background color       |

### Animation

| Prop                | Type                                                 | Default       | Description                               |
| ------------------- | ---------------------------------------------------- | ------------- | ----------------------------------------- |
| `animation`         | `ContainerAnimationType \| ContainerAnimationConfig` | `"none"`      | Animation type or config                  |
| `animationDelay`    | `number`                                             | `0`           | Delay before animation starts (in frames) |
| `animationDuration` | `number`                                             | `30`          | Animation duration (in frames)            |
| `animationEasing`   | `AnimationEasing`                                    | `"easeInOut"` | Animation easing function                 |
| `springConfig`      | `ContainerSpringConfig`                              | -             | Spring animation configuration            |

### Exit Animation

| Prop                    | Type                                                 | Default       | Description                                    |
| ----------------------- | ---------------------------------------------------- | ------------- | ---------------------------------------------- |
| `exitAnimation`         | `ContainerAnimationType \| ContainerAnimationConfig` | `"none"`      | Exit animation type or config                  |
| `exitAnimationDelay`    | `number`                                             | `0`           | Delay before exit animation starts (in frames) |
| `exitAnimationDuration` | `number`                                             | `30`          | Exit animation duration (in frames)            |
| `exitAnimationEasing`   | `AnimationEasing`                                    | `"easeInOut"` | Exit animation easing function                 |
| `exitSpringConfig`      | `ContainerSpringConfig`                              | -             | Exit spring animation configuration            |
| `exitFrame`             | `number`                                             | `0`           | Frame at which to start the exit animation     |

### Additional Props

| Prop        | Type                  | Default | Description              |
| ----------- | --------------------- | ------- | ------------------------ |
| `className` | `string`              | `""`    | Additional CSS classes   |
| `style`     | `React.CSSProperties` | `{}`    | Additional inline styles |
| `onClick`   | `() => void`          | -       | Click handler            |
| `role`      | `string`              | -       | ARIA role                |
| `ariaLabel` | `string`              | -       | ARIA label               |
| `tabIndex`  | `number`              | -       | Tab index                |

## Animation Types

The component supports the following animation types:

### Fade Animations

- `fadeIn`: Fade in from transparent to opaque
- `fadeOut`: Fade out from opaque to transparent

### Slide Animations

- `slideInLeft`: Slide in from the left
- `slideInRight`: Slide in from the right
- `slideInTop`: Slide in from the top
- `slideInBottom`: Slide in from the bottom
- `slideOutLeft`: Slide out to the left
- `slideOutRight`: Slide out to the right
- `slideOutTop`: Slide out to the top
- `slideOutBottom`: Slide out to the bottom

### Scale Animations

- `scaleIn`: Scale in from 50% to 100%
- `scaleOut`: Scale out from 100% to 50%
- `scaleInX`: Scale in horizontally
- `scaleInY`: Scale in vertically
- `scaleOutX`: Scale out horizontally
- `scaleOutY`: Scale out vertically

### Special Animations

- `revealLeft`: Reveal from left to right
- `revealRight`: Reveal from right to left
- `revealTop`: Reveal from top to bottom
- `revealBottom`: Reveal from bottom to top
- `collapseLeft`: Collapse from right to left
- `collapseRight`: Collapse from left to right
- `collapseTop`: Collapse from bottom to top
- `collapseBottom`: Collapse from top to bottom

### Spring Animations

- `springIn`: Spring in with scale and opacity
- `springOut`: Spring out with scale and opacity
- `springScale`: Oscillating scale effect
- `springTranslateX`: Oscillating horizontal movement
- `springTranslateY`: Oscillating vertical movement
- `springRotate`: Oscillating rotation

### 3D Animations

- `flipX`: Flip around the X axis
- `flipY`: Flip around the Y axis
- `rotate3D`: Rotate in 3D space
- `swing`: Swing from the top
- `zoomPerspective`: Zoom with perspective
- `glitch`: Glitch effect
- `blur`: Blur effect

## Spring Configurations

The component provides several predefined spring configurations:

- `DEFAULT`: Standard spring animation
- `GENTLE`: Gentle, slow spring animation
- `WOBBLY`: Wobbly, oscillating spring animation
- `STIFF`: Stiff, quick spring animation
- `SLOW`: Slow, heavy spring animation
- `MOLASSES`: Very slow, heavy spring animation
- `BOUNCE`: Bouncy spring animation
- `NO_WOBBLE`: Spring animation with no oscillation

## Advanced Usage

### Combining with Remotion's Sequence

You can combine the AnimatedContainer with Remotion's Sequence component to create complex animations:

```tsx
import { Sequence } from "remotion";
import { AnimatedContainer } from "../components/containers";

const MySequencedAnimation = () => (
  <>
    <Sequence from={0} durationInFrames={120}>
      <AnimatedContainer
        type="card"
        backgroundColor="primary"
        animation="fadeIn"
        animationDuration={30}
        exitAnimation="fadeOut"
        exitFrame={90}
      >
        <Typography>First Container</Typography>
      </AnimatedContainer>
    </Sequence>

    <Sequence from={30} durationInFrames={120}>
      <AnimatedContainer
        type="card"
        backgroundColor="secondary"
        animation="slideInRight"
        animationDuration={30}
        exitAnimation="slideOutRight"
        exitFrame={120}
      >
        <Typography>Second Container</Typography>
      </AnimatedContainer>
    </Sequence>
  </>
);
```

### Creating Staggered Animations

You can create staggered animations by using multiple AnimatedContainers with different delays:

```tsx
const StaggeredAnimation = () => (
  <AnimatedContainer type="basic" backgroundColor="transparent">
    {[0, 1, 2, 3, 4].map((index) => (
      <AnimatedContainer
        key={index}
        type="card"
        backgroundColor="primary"
        rounded="md"
        shadow="md"
        animation="slideInRight"
        animationDelay={index * 5} // Stagger the animations
        animationDuration={20}
      >
        <Typography>{`Item ${index + 1}`}</Typography>
      </AnimatedContainer>
    ))}
  </AnimatedContainer>
);
```
