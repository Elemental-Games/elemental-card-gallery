# Image Optimization for Elemental Card Gallery

## Overview

The image optimization process significantly improves the website's performance by reducing the loading time of card images. The original card images (~1.5MB each) have been converted to optimized versions in two sizes:

- **Large**: 800px wide (approximately 70-80KB)
- **Thumbnail**: 400px wide (approximately 25-30KB)

This represents approximately a **95% reduction in file size** for thumbnails and a **93% reduction** for detailed views, while maintaining good visual quality.

## Implementation Details

### Optimization Process

1. Created an optimization script (`optimize-images.js`) that:
   - Processes all images in the `public/images/cards/new/` directory
   - Generates optimized versions at different sizes
   - Saves them to `public/images/cards/optimized/`
   - Uses the `sharp` library for high-quality resizing and compression

2. Created utility functions in `src/utils/imageUtils.js`:
   - `getOptimizedCardImage()`: Converts image paths to use optimized versions
   - `handleImageError()`: Provides fallback mechanisms if images fail to load

3. Updated components to use optimized images:
   - `CardGalleryPage.jsx`
   - `CardDetailSidebar.jsx`
   - `AnimatedCardBackground.jsx`
   - `CardOfTheWeek.jsx`

### Benefits

- **Faster Page Loads**: Pages with multiple card images load significantly faster
- **Less Bandwidth Usage**: Reduces data usage for users on limited connections
- **Better Mobile Experience**: Smaller files load more quickly on mobile networks
- **Improved SEO**: Page speed is a factor in search engine rankings

### Original vs. Optimized Size Comparison

| Card Name | Original Size | Large Size | Thumbnail Size | Reduction (Thumbnail) |
|-----------|---------------|------------|----------------|----------------------|
| Swoop     | 1.1MB         | 76KB       | 28KB           | 97.5%                |

## Running the Optimization Script

To regenerate the optimized images:

```bash
node optimize-images.js
```

This will process all images in the `public/images/cards/new/` directory and save optimized versions to `public/images/cards/optimized/`.

## Future Improvements

- Consider adding a `webp` detection system for browsers that don't support it
- Implement lazy-loading for cards that are off-screen
- Set up a CI/CD pipeline to automatically optimize new card images 