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
 * Gets the best available card image, prioritizing new-marketing folder
 * @param {Object} card - The card object with id and potentially existing paths
 * @returns {string} The best available image path
 */
export function getCardImagePath(card) {
  if (!card) return '';
  
  const cardId = card.id;
  if (!cardId) return card.webpPath || card.imagePath || '';
  
  // Create the filename by replacing hyphens with spaces
  const imageFileName = cardId.replace(/-/g, ' ');
  
  // First priority: new-marketing folder (optimized webp)
  const marketingPath = `/images/cards/new-marketing/${imageFileName}-r.webp`;
  
  // Second priority: existing webpPath or imagePath
  const fallbackPath = card.webpPath || card.imagePath || `/images/cards/new/${imageFileName}.webp`;
  
  return { marketingPath, fallbackPath };
}

/**
 * Creates an onError handler that tries marketing images first, then falls back to regular paths
 * @param {Object} card - The card object
 * @returns {Function} The error handler function
 */
export function createCardImageErrorHandler(card) {
  return (event) => {
    const img = event.target;
    const currentSrc = img.src;
    
    // If we're currently trying the marketing image and it failed, try the fallback
    if (currentSrc.includes('/new-marketing/')) {
      const { fallbackPath } = getCardImagePath(card);
      img.onerror = (e) => handleImageError(e); // Use the existing error handler for further fallbacks
      img.src = fallbackPath;
      return;
    }
    
    // Use the existing error handler for other cases
    handleImageError(event);
  };
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