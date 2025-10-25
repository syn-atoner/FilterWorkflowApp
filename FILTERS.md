# Filter Reference Guide

Complete guide to all available filters in the Filter Workflow App.

## Filter Overview

The app includes 5 built-in filters that use p5.js image processing capabilities. Filters can be combined for unique effects.

---

## 1. Grayscale

**Effect:** Converts the image to black and white

**Parameters:** None

**Use Cases:**
- Classic, timeless look
- Emphasize shapes and contrast
- Reduce color distraction
- Vintage/retro aesthetics

**Tips:**
- Works well with high-contrast images
- Great as a base for other filters
- Perfect for minimalist designs

**Combine With:**
- Posterize for retro look
- Threshold for high contrast
- Blur for soft, dreamy effect

---

## 2. Invert

**Effect:** Inverts all colors (creates a negative)

**Parameters:** None

**Use Cases:**
- Dramatic, eye-catching effect
- Abstract art style
- Unique color palettes
- Night/dark mode aesthetics

**Tips:**
- Bright images become dark
- Dark images become bright
- Creates unexpected color combinations
- Can reveal hidden details

**Combine With:**
- Posterize for psychedelic effect
- Threshold for stark contrast
- Works on grayscale for classic negative

---

## 3. Blur

**Effect:** Applies Gaussian blur to soften image

**Parameters:**
- **Blur Amount:** 1-10
  - 1-3: Subtle softening
  - 4-6: Medium blur (good for backgrounds)
  - 7-10: Heavy blur (abstract effect)

**Use Cases:**
- Soft, dreamy aesthetics
- Background defocus
- Reduce image detail
- Create depth perception

**Tips:**
- Lower values (2-3) work best for portraits
- Higher values for abstract effects
- Can slow down rendering with large amounts
- Combine sparingly with other filters

**Combine With:**
- Posterize for painted effect
- Grayscale for soft B&W
- Use alone for subtle enhancement

---

## 4. Posterize

**Effect:** Reduces the number of colors in the image

**Parameters:**
- **Posterize Levels:** 2-20
  - 2-4: Extreme, graphic novel style
  - 5-8: Retro poster effect
  - 9-15: Subtle color reduction
  - 16-20: Minimal effect

**Use Cases:**
- Pop art style
- Retro/vintage aesthetic
- Screen print simulation
- Reduce color complexity

**Tips:**
- Lower values = more dramatic effect
- Works great with high-contrast images
- Creates distinct color bands
- Excellent for graphic design looks

**Combine With:**
- Grayscale for B&W toning
- Blur for painted look
- Threshold for extreme abstraction
- Invert for psychedelic effect

---

## 5. Threshold

**Effect:** Converts image to pure black and white based on threshold value

**Parameters:**
- **Threshold Value:** 0.0-1.0
  - 0.0-0.3: More black, high contrast
  - 0.4-0.6: Balanced conversion
  - 0.7-1.0: More white, inverted contrast

**Use Cases:**
- Silhouette effect
- High contrast graphics
- Stencil/stamp look
- Binary art style

**Tips:**
- Adjust value based on image brightness
- 0.5 is a good starting point
- Works well with text/logos
- Great for bold, graphic designs

**Combine With:**
- Grayscale first for better control
- Invert for reversed silhouette
- Use alone for clean, sharp look

---

## Filter Application Order

Filters are applied in the order they are checked. Order matters!

### Example: Different Results Based on Order

**Order 1:** Grayscale → Posterize
- Result: Posterized black and white

**Order 2:** Posterize → Grayscale
- Result: Grayscale of posterized colors (different tones)

**Order 3:** Blur → Threshold
- Result: Softer edges on threshold

**Order 4:** Threshold → Blur
- Result: Blurred hard edges (different effect)

---

## Popular Filter Combinations

### Vintage Poster
```
☑ Grayscale
☑ Posterize (levels: 5)
```

### Dreamy Soft Focus
```
☑ Blur (amount: 5)
☑ Posterize (levels: 12)
```

### High Contrast Art
```
☑ Grayscale
☑ Threshold (0.4)
```

### Psychedelic
```
☑ Posterize (levels: 4)
☑ Invert
```

### Film Noir
```
☑ Grayscale
☑ Threshold (0.5)
☑ Posterize (levels: 3)
```

### Abstract Painting
```
☑ Blur (amount: 6)
☑ Posterize (levels: 6)
```

### Neon Negative
```
☑ Invert
☑ Posterize (levels: 5)
☑ Blur (amount: 2)
```

### Soft Black & White
```
☑ Grayscale
☑ Blur (amount: 3)
```

---

## Performance Notes

### Fast Filters (instant)
- Grayscale
- Invert
- Threshold

### Medium Filters (quick)
- Posterize (low-medium levels)

### Slower Filters (may take a moment)
- Blur (especially amounts > 5)
- Posterize (high levels)

### Optimization Tips
- Apply fast filters first when combining
- Reduce canvas size for faster processing
- Use lower blur amounts when possible
- Limit number of filters applied at once

---

## Technical Details

### How Filters Work

**Built-in p5.js Filters:**
- Grayscale: `filter(GRAY)`
- Invert: `filter(INVERT)`
- Blur: `filter(BLUR, amount)`
- Posterize: `filter(POSTERIZE, levels)`
- Threshold: `filter(THRESHOLD, value)`

**Custom Filters:**
See [DEVELOPER.md](DEVELOPER.md) for creating custom filters using pixel manipulation.

---

## Filter Matrix

| Filter | Parameters | Intensity | Best For |
|--------|------------|-----------|----------|
| Grayscale | None | N/A | B&W, base layer |
| Invert | None | N/A | Dramatic, abstract |
| Blur | 1-10 | Low-High | Soft, dreamy |
| Posterize | 2-20 | High-Low | Retro, pop art |
| Threshold | 0.0-1.0 | Variable | High contrast, graphic |

---

## Experiment!

The best way to learn filters is to experiment:

1. Start with one filter
2. Adjust parameters
3. Add a second filter
4. Compare results
5. Try different orders
6. Save your favorites

**Remember:** There are no rules! Create the aesthetic that matches your vision.

---

## Coming Soon

Future filters in development:
- Sepia (vintage brown tones)
- Saturation adjustment
- Brightness/Contrast controls
- Hue shift
- Edge detection
- Pixelate
- Mosaic effect
- Glitch effect

Want to add a custom filter? See [DEVELOPER.md](DEVELOPER.md)!
