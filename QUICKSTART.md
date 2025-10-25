# Quick Start Guide

Get started with Filter Workflow App in under 5 minutes!

## 🚀 Installation

### Option 1: Simple (Recommended)
1. Open `index.html` in your web browser
2. That's it! (Works with most modern browsers)

### Option 2: Local Server (Better for development)
```bash
# Using Python 3
python3 -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if you have it)
npx serve

# Using PHP
php -S localhost:8000
```

Then open: `http://localhost:8000`

## 🎨 First Steps

### Create Your First Album Cover

1. **Open the app**
   - Double-click `index.html` or open via server

2. **Upload an image**
   - Click "Choose File" button
   - Select a photo from your computer
   - Image appears in the canvas

3. **Apply a filter**
   - Check "Grayscale" to make it black & white
   - Click "Apply Filters" button

4. **Export your creation**
   - Click "Export Image"
   - Image saves to your Downloads folder

**Congratulations! 🎉** You just created your first filtered image!

## 🎯 Try These Next

### Make it Artistic
- Add "Posterize" filter
- Adjust "Posterize Levels" slider to 5
- Click "Apply Filters"

### Create a Grid
- Click "Grid (2x2)" template button
- Upload 4 different images
- Apply filters to all at once

### Video Thumbnail Style
- Click "Video/GIF" template button
- Upload one image
- See it in cinematic 16:9 format

## 📖 Learn More

- [README.md](README.md) - Full documentation
- [EXAMPLES.md](EXAMPLES.md) - Real-world usage examples
- [DEVELOPER.md](DEVELOPER.md) - Technical details and customization

## ❓ Troubleshooting

**Problem: Canvas is blank**
- Make sure you uploaded an image
- Try clicking "Apply Filters"

**Problem: p5.js error in console**
- Download p5.js from https://p5js.org/download/
- Place it in `libs/p5.min.js`
- Update index.html to use local file

**Problem: Filters not applying**
- Make sure image is uploaded first
- Click "Apply Filters" button after selecting filters

## 💡 Quick Tips

- **Use high quality images** - They filter better
- **Experiment with combinations** - Try 2-3 filters together
- **Less blur is usually better** - Start with low values
- **Reset often** - Don't be afraid to start over
- **Export variations** - Save multiple versions to compare

## 🎵 Music Project Ideas

### Album Cover
1. Single Image template
2. Upload artwork
3. Grayscale + Posterize
4. Export

### Instagram Grid
1. Grid (2x2) template
2. Upload 4 photos
3. Same filters on all
4. Export

### Video Thumbnail
1. Video/GIF template
2. Upload key frame
3. Bold filters (Invert + Posterize)
4. Export

## 🔥 Pro Tip

Save your favorite filter combinations! Write them down:
```
My Preset #1: Grayscale + Posterize (level 5)
My Preset #2: Blur (3) + Posterize (8)
My Preset #3: Threshold (0.4) + Invert
```

## Next Steps

Ready to dive deeper? Check out:
- [EXAMPLES.md](EXAMPLES.md) for step-by-step tutorials
- [DEVELOPER.md](DEVELOPER.md) to add custom filters

---

**Have fun creating! 🎨✨**
