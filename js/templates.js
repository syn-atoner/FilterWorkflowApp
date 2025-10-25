// Template rendering functions
const Templates = {
    // Single image template
    single: function(p, images) {
        if (images.length > 0) {
            const img = images[0];
            const scale = Math.min(
                p.width / img.width,
                p.height / img.height
            );
            const w = img.width * scale;
            const h = img.height * scale;
            const x = (p.width - w) / 2;
            const y = (p.height - h) / 2;
            p.image(img, x, y, w, h);
        } else {
            // Placeholder
            p.background(240);
            p.fill(150);
            p.textAlign(p.CENTER, p.CENTER);
            p.textSize(24);
            p.text('Upload an image to get started', p.width / 2, p.height / 2);
        }
    },

    // Grid template (2x2)
    grid: function(p, images) {
        const cols = 2;
        const rows = 2;
        const cellWidth = p.width / cols;
        const cellHeight = p.height / rows;
        const padding = 10;

        p.background(255);

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const index = i + j * cols;
                const x = i * cellWidth;
                const y = j * cellHeight;

                // Draw cell background
                p.fill(240);
                p.noStroke();
                p.rect(x + padding, y + padding, cellWidth - padding * 2, cellHeight - padding * 2);

                // Draw image if available
                if (index < images.length) {
                    const img = images[index];
                    const scale = Math.min(
                        (cellWidth - padding * 2) / img.width,
                        (cellHeight - padding * 2) / img.height
                    );
                    const w = img.width * scale;
                    const h = img.height * scale;
                    const imgX = x + padding + (cellWidth - padding * 2 - w) / 2;
                    const imgY = y + padding + (cellHeight - padding * 2 - h) / 2;
                    p.image(img, imgX, imgY, w, h);
                } else {
                    // Placeholder text
                    p.fill(150);
                    p.textAlign(p.CENTER, p.CENTER);
                    p.textSize(16);
                    p.text(`Image ${index + 1}`, x + cellWidth / 2, y + cellHeight / 2);
                }
            }
        }
    },

    // Video/GIF template (animated placeholder for now)
    video: function(p, images) {
        if (images.length > 0) {
            const img = images[0];
            
            // Create a cinematic aspect ratio (16:9)
            const targetAspect = 16 / 9;
            let targetWidth = p.width;
            let targetHeight = p.width / targetAspect;
            
            if (targetHeight > p.height) {
                targetHeight = p.height;
                targetWidth = p.height * targetAspect;
            }

            const x = (p.width - targetWidth) / 2;
            const y = (p.height - targetHeight) / 2;

            // Black bars for cinematic effect
            p.background(0);
            
            // Scale image to fit
            const scale = Math.min(targetWidth / img.width, targetHeight / img.height);
            const w = img.width * scale;
            const h = img.height * scale;
            const imgX = x + (targetWidth - w) / 2;
            const imgY = y + (targetHeight - h) / 2;
            
            p.image(img, imgX, imgY, w, h);

            // Add animated overlay to simulate video feel
            p.noFill();
            p.stroke(255, 100);
            p.strokeWeight(3);
            p.rect(x, y, targetWidth, targetHeight);

            // "Recording" indicator
            if (p.frameCount % 60 < 30) {
                p.fill(255, 0, 0);
                p.noStroke();
                p.circle(x + 20, y + 20, 15);
            }
        } else {
            // Placeholder
            p.background(0);
            p.fill(255);
            p.textAlign(p.CENTER, p.CENTER);
            p.textSize(24);
            p.text('Upload an image for video template', p.width / 2, p.height / 2);
        }
    }
};

// Export for use in sketch
window.Templates = Templates;
