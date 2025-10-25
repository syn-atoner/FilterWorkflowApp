// p5.js Sketch
let p5Instance;
let loadedImages = [];

// p5.js sketch in instance mode
const sketch = (p) => {
    p.setup = function() {
        const canvas = p.createCanvas(800, 800);
        canvas.parent('canvasContainer');
        p.background(240);
        
        // Initial welcome screen
        p.fill(100);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(20);
        p.text('Welcome to Filter Workflow App', p.width / 2, p.height / 2 - 20);
        p.textSize(16);
        p.text('Upload images and select a template to begin', p.width / 2, p.height / 2 + 20);
    };

    p.draw = function() {
        // Only redraw for animated templates
        if (window.AppState && window.AppState.currentTemplate === 'video' && loadedImages.length > 0) {
            drawCurrentTemplate();
        }
    };

    // Load images from app state
    function loadImages() {
        return new Promise((resolve) => {
            if (!window.AppState || window.AppState.uploadedImages.length === 0) {
                loadedImages = [];
                resolve();
                return;
            }

            const imagesToLoad = window.AppState.uploadedImages.length;
            let imagesLoaded = 0;
            loadedImages = [];

            window.AppState.uploadedImages.forEach((imgData, index) => {
                p.loadImage(imgData.data, (img) => {
                    loadedImages[index] = img;
                    imagesLoaded++;
                    if (imagesLoaded === imagesToLoad) {
                        resolve();
                    }
                }, () => {
                    console.error(`Failed to load image: ${imgData.name}`);
                    imagesLoaded++;
                    if (imagesLoaded === imagesToLoad) {
                        resolve();
                    }
                });
            });
        });
    }

    // Draw current template
    function drawCurrentTemplate() {
        p.background(240);

        if (loadedImages.length === 0) {
            p.fill(100);
            p.textAlign(p.CENTER, p.CENTER);
            p.textSize(20);
            p.text('Upload images to see them here', p.width / 2, p.height / 2);
            return;
        }

        const template = window.AppState.currentTemplate;
        if (window.Templates && window.Templates[template]) {
            window.Templates[template](p, loadedImages);
        }
    }

    // Update canvas - called from app.js
    window.updateP5Canvas = async function() {
        await loadImages();
        drawCurrentTemplate();
    };

    // Apply filters - called from app.js
    window.applyFiltersToCanvas = function() {
        if (!window.AppState || !window.FilterEngine) {
            console.error('AppState or FilterEngine not available');
            return;
        }

        // Redraw the template first
        drawCurrentTemplate();

        // Apply filters
        const activeFilters = window.AppState.activeFilters;
        const parameters = window.AppState.parameters;
        
        if (activeFilters.length > 0) {
            window.FilterEngine.applyFilters(p, activeFilters, parameters);
        }

        console.log('Filters applied:', activeFilters);
    };
};

// Create p5 instance
document.addEventListener('DOMContentLoaded', () => {
    p5Instance = new p5(sketch);
    window.p5Instance = p5Instance;
});
