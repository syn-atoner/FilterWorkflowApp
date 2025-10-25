// Filter Engine - Applies various filters to p5 graphics
const FilterEngine = {
    // Apply grayscale filter
    grayscale: function(p) {
        p.filter(p.GRAY);
    },

    // Apply invert filter
    invert: function(p) {
        p.filter(p.INVERT);
    },

    // Apply blur filter
    blur: function(p, amount = 3) {
        p.filter(p.BLUR, amount);
    },

    // Apply posterize filter
    posterize: function(p, levels = 5) {
        p.filter(p.POSTERIZE, levels);
    },

    // Apply threshold filter
    threshold: function(p, value = 0.5) {
        p.filter(p.THRESHOLD, value);
    },

    // Apply all active filters in sequence
    applyFilters: function(p, activeFilters, parameters) {
        activeFilters.forEach(filterName => {
            switch(filterName) {
                case 'grayscale':
                    this.grayscale(p);
                    break;
                case 'invert':
                    this.invert(p);
                    break;
                case 'blur':
                    this.blur(p, parameters.blur);
                    break;
                case 'posterize':
                    this.posterize(p, parameters.posterize);
                    break;
                case 'threshold':
                    this.threshold(p, parameters.threshold);
                    break;
                default:
                    console.warn(`Unknown filter: ${filterName}`);
            }
        });
    }
};

// Export for use in sketch
window.FilterEngine = FilterEngine;
