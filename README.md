# FilterWorkflowApp

A web-based application for creating stunning visual content with p5.js filters and templates. Perfect for generating album covers, Instagram reels, and other social media visuals.

## Features

- **Multiple Templates**: Choose from single image, 2x2 grid, or video/GIF layouts
- **Image Upload**: Support for multiple image uploads
- **Built-in Filters**: 
  - Grayscale
  - Invert
  - Blur (adjustable)
  - Posterize (adjustable levels)
  - Threshold (adjustable)
- **Real-time Preview**: See your changes as you apply filters
- **Export**: Save your creations as PNG images

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- No installation required!

### Quick Start

**🚀 New users?** See [QUICKSTART.md](QUICKSTART.md) for a 5-minute tutorial!

### Running the App

1. Clone this repository:
   ```bash
   git clone https://github.com/syn-atoner/FilterWorkflowApp.git
   cd FilterWorkflowApp
   ```

2. Open `index.html` in your web browser:
   - Double-click the file, or
   - Right-click and select "Open with" → your browser, or
   - Use a local server (recommended for development):
     ```bash
     python -m http.server 8000
     # or
     python3 -m http.server 8000
     ```
     Then visit `http://localhost:8000`

### Quick Start Guide

1. **Select a Template**: Choose from Single Image, Grid (2x2), or Video/GIF format
2. **Upload Images**: Click the file upload button and select one or more images
3. **Choose Filters**: Check the filters you want to apply
4. **Adjust Parameters**: Fine-tune blur amount, posterize levels, or threshold values
5. **Apply**: Click "Apply Filters" to see the results
6. **Export**: Save your creation with the "Export Image" button

## Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Get started in 5 minutes
- **[EXAMPLES.md](EXAMPLES.md)** - Practical usage examples for music projects
- **[DEVELOPER.md](DEVELOPER.md)** - Architecture and development guide
- **README.md** - This file (overview and reference)

## Project Structure

```
FilterWorkflowApp/
├── index.html              # Main HTML file
├── css/
│   └── styles.css         # Application styles
├── js/
│   ├── app.js            # Main application logic and state management
│   ├── sketch.js         # p5.js sketch and canvas management
│   └── templates.js      # Template rendering functions
├── filters/
│   └── filterEngine.js   # Filter implementation
├── assets/
│   └── images/           # Directory for user-uploaded images (gitignored)
└── README.md             # This file
```

## Templates

### Single Image
Displays one image centered on the canvas, perfect for album covers or single photo edits.

### Grid (2x2)
Displays up to 4 images in a 2x2 grid layout, ideal for photo collages or comparison shots.

### Video/GIF
Displays images in a cinematic 16:9 aspect ratio with a "recording" indicator, perfect for video thumbnails or animated content previews.

## Available Filters

### Grayscale
Converts the image to black and white.

### Invert
Inverts all colors in the image (negative effect).

### Blur
Applies a blur effect. Adjustable from 1-10 (higher = more blur).

### Posterize
Reduces the number of colors in the image. Adjustable levels from 2-20 (lower = more dramatic effect).

### Threshold
Converts the image to pure black and white based on a threshold value (0.0-1.0).

## Customization

### Adding New Filters

1. Add filter function to `filters/filterEngine.js`:
   ```javascript
   customFilter: function(p, param) {
       // Your filter logic here
       p.filter(p.CUSTOM_EFFECT);
   }
   ```

2. Add UI controls in `index.html`:
   ```html
   <label class="filter-item">
       <input type="checkbox" data-filter="customFilter">
       <span>Custom Filter</span>
   </label>
   ```

3. Handle the filter in `FilterEngine.applyFilters()` method.

### Creating New Templates

1. Add template function to `js/templates.js`:
   ```javascript
   customTemplate: function(p, images) {
       // Your template rendering logic
   }
   ```

2. Add button in `index.html`:
   ```html
   <button class="template-btn" data-template="customTemplate">
       Custom Template
   </button>
   ```

## Development Workflow

### Typical Use Cases

**Album Cover Creation:**
1. Select "Single Image" template
2. Upload your artwork or photo
3. Apply filters to create the mood (e.g., Grayscale + High Posterize)
4. Export as PNG

**Instagram Grid Post:**
1. Select "Grid (2x2)" template
2. Upload 4 related images
3. Apply consistent filters across all images
4. Export and post

**Video Thumbnail:**
1. Select "Video/GIF" template
2. Upload your key frame
3. Apply eye-catching filters
4. Export for video cover

## Technologies Used

- **p5.js** (v1.7.0) - Creative coding library for visual effects
- **Vanilla JavaScript** - No framework dependencies
- **CSS Grid** - Modern responsive layout
- **HTML5 Canvas** - For image manipulation and rendering

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## Roadmap

- [ ] Add more filters (sepia, saturation, brightness, contrast)
- [ ] Support for GIF/video export
- [ ] Batch processing for multiple images
- [ ] Custom filter workflows (save/load filter combinations)
- [ ] Animation timeline for video template
- [ ] Text overlay support
- [ ] More grid layouts (3x3, 1x3, custom)
- [ ] Preset styles (vintage, modern, retro, etc.)

## Contributing

This is a personal project for creating music visuals. Feel free to fork and adapt for your own use!

## License

MIT License - Feel free to use for your creative projects!

## Acknowledgments

- Built with [p5.js](https://p5js.org/)
- Inspired by the need for quick visual content creation for music projects
