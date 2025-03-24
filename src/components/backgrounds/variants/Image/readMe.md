# Image Background Component

This component provides customizable image backgrounds for Remotion video templates with various animation and styling options.

## Usage

```tsx
import { ImageBackground } from "./index";

// Basic usage
<ImageBackground
  url="https://example.com/image.jpg"
  ratio="landscape"
  type="pan"
  direction="left"
  overlayStyle="vignette"
/>;
```

## Configuration Options

### Basic Image Properties

| Property | Type                                  | Default     | Description                   |
| -------- | ------------------------------------- | ----------- | ----------------------------- |
| `url`    | string                                | -           | URL to the source image       |
| `ratio`  | 'landscape' \| 'portrait' \| 'square' | 'landscape' | Aspect ratio of the image     |
| `width`  | number                                | -           | Width of the image in pixels  |
| `height` | number                                | -           | Height of the image in pixels |

### Animation Options

| Property    | Type                                      | Default  | Description                         |
| ----------- | ----------------------------------------- | -------- | ----------------------------------- |
| `type`      | 'static' \| 'pan' \| 'zoom' \| 'kenBurns' | 'static' | Type of animation to apply          |
| `direction` | 'left' \| 'right' \| 'up' \| 'down'       | 'left'   | Direction for pan animations        |
| `duration`  | number                                    | -        | Duration of the animation in frames |
| `easing`    | string                                    | 'linear' | Easing function for the animation   |

### Overlay Options

| Property         | Type                                          | Default   | Description                                             |
| ---------------- | --------------------------------------------- | --------- | ------------------------------------------------------- |
| `overlayStyle`   | 'none' \| 'solid' \| 'gradient' \| 'vignette' | 'none'    | Type of overlay to apply                                |
| `overlayColor`   | string                                        | '#000000' | Color of the overlay                                    |
| `overlayOpacity` | number                                        | 0.5       | Opacity of the overlay (0-1)                            |
| `gradientType`   | 'linear' \| 'radial'                          | 'linear'  | Type of gradient to use when overlayStyle is 'gradient' |
| `gradientAngle`  | number                                        | 45        | Angle of the gradient in degrees                        |

## Template Variations

The component supports different template variations that can be selected using the `variant` prop:

```tsx
<ImageBackground variant="fullscreen" url="https://example.com/image.jpg" />
```

Available variations:

- `default`: Standard image background
- `fullscreen`: Image that fills the entire frame
- `split`: Image that takes up part of the frame
- `boxed`: Image contained in a box with optional border

### Template Variation Structure

Template variations are typically defined in JSON as part of a larger template configuration:

```json
{
  "templateVariation": {
    "Image": {
      "url": "https://fixtura.s3.ap-southeast-2.amazonaws.com/183_A3066_ba8dc12541_4aabea8ceb.jpg",
      "ratio": "portrait",
      "width": 3290,
      "height": 3354,
      "type": "pan",
      "direction": "left",
      "overlayStyle": "vignette",
      "gradientType": "linear",
      "overlayOpacity": 0.7
    }
  }
}
```

### Available User Options

Users can customize the image background through the following options:

#### Animation Types

- `static`: Displays the image without animation
- `pan`: Moves the image in a specified direction
- `zoom`: Gradually enlarges or shrinks the image
- `kenBurns`: Combines pan and zoom for a dynamic effect

#### Direction Options (for pan animations)

- `left`: Pan from right to left
- `right`: Pan from left to right
- `up`: Pan from bottom to top
- `down`: Pan from top to bottom

#### Overlay Styles

- `none`: No overlay applied
- `solid`: Solid color overlay
- `gradient`: Gradient overlay (requires gradientType)
- `vignette`: Darkened edges that fade toward the center

#### Gradient Types

- `linear`: Straight-line color transition
- `radial`: Circular color transition from center

#### Aspect Ratio Options

- `landscape`: Wider than tall (16:9, 4:3, etc.)
- `portrait`: Taller than wide (9:16, 3:4, etc.)
- `square`: Equal width and height (1:1)

### Template Variation Examples

#### Full-screen Image with Ken Burns Effect

```json
{
  "templateVariation": {
    "Image": {
      "url": "https://example.com/stadium.jpg",
      "ratio": "landscape",
      "type": "kenBurns",
      "duration": 250,
      "overlayStyle": "gradient",
      "gradientType": "linear",
      "overlayOpacity": 0.6,
      "overlayColor": "#051937"
    }
  }
}
```

#### Split-Screen Image with Team Colors

```json
{
  "templateVariation": {
    "Image": {
      "url": "https://example.com/player.jpg",
      "ratio": "portrait",
      "type": "static",
      "position": "right",
      "width": 50,
      "overlayStyle": "solid",
      "overlayColor": "#e01e37",
      "overlayOpacity": 0.3
    }
  }
}
```

#### Boxed Image with Vignette

```json
{
  "templateVariation": {
    "Image": {
      "url": "https://example.com/team_photo.jpg",
      "ratio": "landscape",
      "type": "zoom",
      "zoomDirection": "in",
      "borderWidth": 8,
      "borderColor": "#ffffff",
      "overlayStyle": "vignette",
      "overlayOpacity": 0.75
    }
  }
}
```

## Advanced Configuration

Users can further customize their image backgrounds with these additional options:

| Property        | Type                          | Description                                   |
| --------------- | ----------------------------- | --------------------------------------------- |
| `position`      | 'left' \| 'right' \| 'center' | Position of the image in split layouts        |
| `zoomDirection` | 'in' \| 'out'                 | Direction for zoom animations                 |
| `zoomAmount`    | number                        | Intensity of zoom (1-10)                      |
| `borderWidth`   | number                        | Width of border in pixels (for boxed variant) |
| `borderColor`   | string                        | Color of border (for boxed variant)           |
| `cornerRadius`  | number                        | Rounds the corners of the image               |
| `startScale`    | number                        | Starting scale for animations                 |
| `endScale`      | number                        | Ending scale for animations                   |

## Overlays

Additional overlay components can be used with the ImageBackground:

```tsx
import { ImageBackground } from "./index";
import { TextOverlay } from "./overlays/TextOverlay";

<ImageBackground url="https://example.com/image.jpg">
  <TextOverlay text="Hello World" position="bottom" />
</ImageBackground>;
```

## Examples

### Ken Burns Effect

```tsx
<ImageBackground
  url="https://example.com/image.jpg"
  type="kenBurns"
  duration={300}
/>
```

### Gradient Overlay

```tsx
<ImageBackground
  url="https://example.com/image.jpg"
  overlayStyle="gradient"
  gradientType="linear"
  overlayOpacity={0.7}
  overlayColor="#0056b3"
/>
```

## JSON Configuration

When configuring through JSON templates:

```json
{
  "Image": {
    "url": "https://example.com/image.jpg",
    "ratio": "portrait",
    "width": 3290,
    "height": 3354,
    "type": "pan",
    "direction": "left",
    "overlayStyle": "vignette",
    "gradientType": "linear",
    "overlayOpacity": 0.7
  }
}
```

## Advanced Usage

For more advanced configurations and programmatic control, refer to the `templateVariationAdapter.ts` file which provides utilities for adapting image properties across different template formats.
