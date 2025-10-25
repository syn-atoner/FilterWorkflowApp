// App State Management
const AppState = {
    currentTemplate: 'single',
    uploadedImages: [],
    activeFilters: [],
    parameters: {
        blur: 3,
        posterize: 5,
        threshold: 0.5
    },
    canvasWidth: 800,
    canvasHeight: 800
};

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    console.log('Filter Workflow App initialized');
});

// Initialize all event listeners
function initializeEventListeners() {
    // Template selection
    document.querySelectorAll('.template-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.template-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            AppState.currentTemplate = e.target.dataset.template;
            console.log('Template changed to:', AppState.currentTemplate);
            updateCanvas();
        });
    });

    // Image upload
    const imageUpload = document.getElementById('imageUpload');
    if (imageUpload) {
        imageUpload.addEventListener('change', handleImageUpload);
    }

    // Filter checkboxes
    document.querySelectorAll('.filter-item input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const filterName = e.target.dataset.filter;
            if (e.target.checked) {
                if (!AppState.activeFilters.includes(filterName)) {
                    AppState.activeFilters.push(filterName);
                }
            } else {
                AppState.activeFilters = AppState.activeFilters.filter(f => f !== filterName);
            }
            console.log('Active filters:', AppState.activeFilters);
        });
    });

    // Parameter controls
    const blurAmount = document.getElementById('blurAmount');
    const blurValue = document.getElementById('blurValue');
    if (blurAmount && blurValue) {
        blurAmount.addEventListener('input', (e) => {
            AppState.parameters.blur = parseInt(e.target.value);
            blurValue.textContent = e.target.value;
        });
    }

    const posterizeLevels = document.getElementById('posterizeLevels');
    const posterizeValue = document.getElementById('posterizeValue');
    if (posterizeLevels && posterizeValue) {
        posterizeLevels.addEventListener('input', (e) => {
            AppState.parameters.posterize = parseInt(e.target.value);
            posterizeValue.textContent = e.target.value;
        });
    }

    const thresholdValue = document.getElementById('thresholdValue');
    const thresholdDisplay = document.getElementById('thresholdDisplay');
    if (thresholdValue && thresholdDisplay) {
        thresholdValue.addEventListener('input', (e) => {
            AppState.parameters.threshold = parseFloat(e.target.value);
            thresholdDisplay.textContent = e.target.value;
        });
    }

    // Action buttons
    const applyFilters = document.getElementById('applyFilters');
    if (applyFilters) {
        applyFilters.addEventListener('click', () => {
            console.log('Applying filters...');
            applyAllFilters();
        });
    }

    const resetFilters = document.getElementById('resetFilters');
    if (resetFilters) {
        resetFilters.addEventListener('click', () => {
            console.log('Resetting filters...');
            resetAllFilters();
        });
    }

    const exportImage = document.getElementById('exportImage');
    if (exportImage) {
        exportImage.addEventListener('click', () => {
            console.log('Exporting image...');
            exportCanvas();
        });
    }
}

// Handle image upload
function handleImageUpload(event) {
    const files = event.target.files;
    const uploadedList = document.getElementById('uploadedImages');
    
    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                AppState.uploadedImages.push({
                    name: file.name,
                    data: e.target.result
                });
                
                // Update UI
                const item = document.createElement('div');
                item.textContent = `✓ ${file.name}`;
                uploadedList.appendChild(item);
                
                console.log(`Uploaded: ${file.name}`);
                updateCanvas();
            };
            reader.readAsDataURL(file);
        }
    });
}

// Update canvas based on current state
function updateCanvas() {
    if (window.updateP5Canvas) {
        window.updateP5Canvas();
    }
}

// Apply all active filters
function applyAllFilters() {
    if (window.applyFiltersToCanvas) {
        window.applyFiltersToCanvas();
    }
}

// Reset all filters
function resetAllFilters() {
    // Uncheck all filter checkboxes
    document.querySelectorAll('.filter-item input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Clear active filters
    AppState.activeFilters = [];
    
    // Reset parameters to defaults
    AppState.parameters = {
        blur: 3,
        posterize: 5,
        threshold: 0.5
    };
    
    // Update UI
    document.getElementById('blurAmount').value = 3;
    document.getElementById('blurValue').textContent = '3';
    document.getElementById('posterizeLevels').value = 5;
    document.getElementById('posterizeValue').textContent = '5';
    document.getElementById('thresholdValue').value = 0.5;
    document.getElementById('thresholdDisplay').textContent = '0.5';
    
    updateCanvas();
}

// Export canvas as image
function exportCanvas() {
    if (window.p5Instance) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `filter-workflow-${timestamp}.png`;
        window.p5Instance.saveCanvas(filename);
        console.log(`Exported: ${filename}`);
    }
}

// Expose AppState globally for p5 sketch
window.AppState = AppState;
