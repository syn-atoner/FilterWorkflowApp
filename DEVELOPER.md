# Developer Documentation

## Architecture Overview

The Filter Workflow App is built with a modular architecture that separates concerns:

### Core Components

#### 1. Application State (`js/app.js`)
- **AppState Object**: Central state management
  - `currentTemplate`: Currently selected template ('single', 'grid', 'video')
  - `uploadedImages`: Array of uploaded image objects
  - `activeFilters`: Array of currently active filter names
  - `parameters`: Object containing adjustable filter parameters
  - `canvasWidth/canvasHeight`: Canvas dimensions

#### 2. Template System (`js/templates.js`)
- **Templates Object**: Contains rendering functions for each template type
- Each template function receives:
  - `p`: p5.js instance
  - `images`: Array of loaded p5.Image objects
- Templates handle:
  - Layout calculations
  - Image scaling and positioning
  - Placeholder rendering when no images are present

#### 3. Filter Engine (`filters/filterEngine.js`)
- **FilterEngine Object**: Implements all image filters
- Uses p5.js built-in filter functions
- Supports parameterized filters
- Applies filters in sequence

#### 4. p5.js Sketch (`js/sketch.js`)
- **Instance Mode**: Creates isolated p5.js instance
- Handles canvas setup and drawing
- Manages image loading from data URLs
- Exposes global functions:
  - `updateP5Canvas()`: Redraws with current template
  - `applyFiltersToCanvas()`: Applies active filters

## Data Flow

```
User Action → Event Listener → AppState Update → updateP5Canvas() → Template Render
                                                                    ↓
                                                          Filter Application (optional)
```

## Adding Features

### Adding a New Filter

1. **Implement the filter in `filters/filterEngine.js`:**
   ```javascript
   newFilter: function(p, param1, param2) {
       // Option 1: Use p5.js built-in filters
       p.filter(p.THRESHOLD, param1);
       
       // Option 2: Manual pixel manipulation
       p.loadPixels();
       for (let i = 0; i < p.pixels.length; i += 4) {
           // Modify p.pixels[i], p.pixels[i+1], p.pixels[i+2], p.pixels[i+3]
           // R, G, B, A respectively
       }
       p.updatePixels();
   }
   ```

2. **Add filter to the applyFilters switch statement:**
   ```javascript
   case 'newFilter':
       this.newFilter(p, parameters.param1, parameters.param2);
       break;
   ```

3. **Add UI checkbox in `index.html`:**
   ```html
   <label class="filter-item">
       <input type="checkbox" data-filter="newFilter">
       <span>New Filter</span>
   </label>
   ```

4. **Add parameter controls if needed:**
   ```html
   <label>
       Filter Parameter:
       <input type="range" id="filterParam" min="0" max="100" value="50">
       <span id="filterParamValue">50</span>
   </label>
   ```

5. **Add event listener in `app.js`:**
   ```javascript
   const filterParam = document.getElementById('filterParam');
   const filterParamValue = document.getElementById('filterParamValue');
   if (filterParam && filterParamValue) {
       filterParam.addEventListener('input', (e) => {
           AppState.parameters.param1 = parseInt(e.target.value);
           filterParamValue.textContent = e.target.value;
       });
   }
   ```

### Adding a New Template

1. **Create template function in `js/templates.js`:**
   ```javascript
   newTemplate: function(p, images) {
       p.background(255);
       
       // Your layout logic here
       if (images.length > 0) {
           // Render images
           images.forEach((img, index) => {
               // Position and draw each image
               p.image(img, x, y, w, h);
           });
       } else {
           // Placeholder
           p.fill(150);
           p.textAlign(p.CENTER, p.CENTER);
           p.text('Upload images', p.width / 2, p.height / 2);
       }
   }
   ```

2. **Add button in `index.html`:**
   ```html
   <button class="template-btn" data-template="newTemplate">
       New Template Name
   </button>
   ```

3. **Template is automatically wired through event listeners!**

### Custom Pixel Manipulation

For advanced effects, you can directly manipulate pixels:

```javascript
customEffect: function(p) {
    p.loadPixels();
    const d = p.pixelDensity();
    
    for (let y = 0; y < p.height; y++) {
        for (let x = 0; x < p.width; x++) {
            // Calculate pixel index
            const index = 4 * ((y * d) * (p.width * d) + (x * d));
            
            // Get current pixel values
            const r = p.pixels[index];
            const g = p.pixels[index + 1];
            const b = p.pixels[index + 2];
            const a = p.pixels[index + 3];
            
            // Modify values
            p.pixels[index] = 255 - r;     // Invert red
            p.pixels[index + 1] = g * 0.5; // Darken green
            p.pixels[index + 2] = b;       // Keep blue
            p.pixels[index + 3] = a;       // Keep alpha
        }
    }
    
    p.updatePixels();
}
```

## Performance Considerations

### Image Loading
- Images are loaded asynchronously via FileReader
- Converted to data URLs and stored in AppState
- p5.js loads images from data URLs on demand

### Filter Performance
- Filters are applied sequentially (not in parallel)
- Built-in p5.js filters are optimized
- Custom pixel manipulation can be slow for large images
- Consider reducing canvas size for better performance

### Optimization Tips
1. **Debounce Parameter Changes**: Don't apply filters on every slider change
2. **Canvas Size**: Limit canvas to reasonable dimensions (800x800 default)
3. **Image Preprocessing**: Resize large images before upload
4. **Filter Order**: Apply cheap filters first (grayscale) before expensive ones (blur)

## State Management Best Practices

### Reading State
```javascript
const currentTemplate = window.AppState.currentTemplate;
const images = window.AppState.uploadedImages;
```

### Updating State
```javascript
// Always trigger canvas update after state change
window.AppState.currentTemplate = 'grid';
updateCanvas();
```

### Adding New State Properties
```javascript
// In app.js AppState object
const AppState = {
    // ... existing properties
    newProperty: defaultValue
};
```

## Testing

### Manual Testing Checklist
- [ ] Upload single image - verify display
- [ ] Upload multiple images - verify grid display
- [ ] Switch between templates - verify layout changes
- [ ] Apply each filter individually
- [ ] Apply multiple filters in combination
- [ ] Adjust parameters - verify changes
- [ ] Reset filters - verify clean state
- [ ] Export image - verify file download
- [ ] Test with different image sizes and formats
- [ ] Test responsive layout on different screen sizes

### Browser Testing
Test in multiple browsers:
- Chrome/Edge (Chromium)
- Firefox
- Safari (WebKit)

### Common Issues

**Images not loading:**
- Check browser console for CORS errors
- Verify file is valid image format
- Check FileReader API support

**Filters not applying:**
- Verify filter is added to activeFilters array
- Check filter name spelling
- Ensure p5.js canvas is initialized

**Export not working:**
- Check p5.js instance is available
- Verify browser supports download attribute
- Check for popup blockers

## Code Style Guidelines

### JavaScript
- Use `const` for variables that don't change
- Use `let` for variables that do change
- Avoid `var`
- Use arrow functions for callbacks
- Comment complex logic
- Keep functions small and focused

### HTML
- Use semantic HTML elements
- Add descriptive class names
- Keep structure clean and indented

### CSS
- Use CSS Grid for layout
- Mobile-first responsive design
- Use CSS variables for theme colors
- Comment section boundaries

## Future Enhancements

### Planned Features
1. **Animation Export**: Export as GIF or video
2. **Filter Presets**: Save/load filter combinations
3. **Undo/Redo**: History of changes
4. **Layer System**: Multiple layers with blend modes
5. **Text Overlay**: Add text with custom fonts
6. **More Templates**: 3x3 grid, panorama, circle layout

### Architecture Improvements
1. **Module System**: Convert to ES6 modules
2. **Build Process**: Add bundler (Webpack/Vite)
3. **Testing**: Add automated tests
4. **TypeScript**: Type safety for better DX
5. **State Management**: Consider Redux/Zustand for complex state

## Debugging Tips

### Enable Verbose Logging
```javascript
// In app.js, add at top:
window.DEBUG = true;

// Then throughout code:
if (window.DEBUG) console.log('Debug info:', data);
```

### Inspect Canvas
```javascript
// In browser console:
window.p5Instance.canvas // Access canvas element
window.AppState // View current state
window.Templates // View template functions
window.FilterEngine // View filter functions
```

### Common Console Commands
```javascript
// Reload images
window.updateP5Canvas()

// Apply filters
window.applyFiltersToCanvas()

// Get current state
console.log(window.AppState)

// List loaded images
console.log(window.AppState.uploadedImages)
```

## Resources

- [p5.js Reference](https://p5js.org/reference/)
- [p5.js Tutorials](https://p5js.org/learn/)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [FileReader API](https://developer.mozilla.org/en-US/docs/Web/API/FileReader)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
