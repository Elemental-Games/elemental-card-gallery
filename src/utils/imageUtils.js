/**
 * Gets the optimized image path for a card
 * @param {string} originalPath - The original image path (e.g., "/images/cards/new/swoop.webp")
 * @param {string} size - Either 'thumbnail' or 'large'
 * @returns {string} The path to the optimized image
 */
export function getOptimizedCardImage(originalPath, size = 'large') {
  if (!originalPath) return '';
  
  // Check if this is already an optimized path
  if (originalPath.includes('/optimized/')) {
    return originalPath;
  }

  const validSizes = ['thumbnail', 'large'];
  const imageSize = validSizes.includes(size) ? size : 'large';
  
  // Extract the filename from the path
  const filename = originalPath.split('/').pop();
  const filenameWithoutExt = filename.split('.')[0];
  
  return `/images/cards/optimized/${filenameWithoutExt}-${imageSize}.webp`;
}

/**
 * Provides a fallback mechanism for image loading
 * @param {Event} event - The error event
 */
export function handleImageError(event) {
  const img = event.target;
  const currentSrc = img.src;
  
  // If we're already using an optimized image that failed, try the original
  if (currentSrc.includes('/optimized/')) {
    const originalPath = currentSrc
      .replace('/optimized/', '/new/')
      .replace(/-(?:thumbnail|large)\.webp$/, '.webp');
    
    img.src = originalPath;
    return;
  }
  
  // If we're using a .webp that failed, try .png
  if (currentSrc.endsWith('.webp')) {
    img.src = currentSrc.replace('.webp', '.png');
  }
} 