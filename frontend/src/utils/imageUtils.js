// Base URL for images
const BASE_IMAGE_URL = process.env.REACT_APP_IMAGE_BASE_URL || 'http://localhost:5000';

// Image types and their corresponding paths
const IMAGE_PATHS = {
  bookCovers: '/uploads/book-covers',
  userAvatars: '/uploads/avatars',
  categoryIcons: '/uploads/categories',
  banners: '/uploads/banners'
};

/**
 * Get the full URL for an image
 * @param {string} imagePath - The relative path of the image
 * @param {string} type - The type of image (bookCovers, userAvatars, etc.)
 * @returns {string} The full URL of the image
 */
export const getImageUrl = (imagePath, type = 'bookCovers') => {
  if (!imagePath) return null;
  
  // If the image path is already a full URL, return it
  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  // If the image path starts with a forward slash, remove it
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // Return the full URL
  return `${BASE_IMAGE_URL}${IMAGE_PATHS[type]}/${cleanPath}`;
};

/**
 * Get a placeholder image URL
 * @param {string} type - The type of placeholder needed
 * @returns {string} The placeholder image URL
 */
export const getPlaceholderImage = (type = 'book') => {
  const placeholders = {
    book: '/images/placeholder-book.jpg',
    avatar: '/images/placeholder-avatar.jpg',
    category: '/images/placeholder-category.jpg',
    banner: '/images/placeholder-banner.jpg'
  };
  
  return placeholders[type] || placeholders.book;
};

/**
 * Handle image loading errors
 * @param {Event} event - The error event
 * @param {string} type - The type of placeholder to use
 */
export const handleImageError = (event, type = 'book') => {
  event.target.src = getPlaceholderImage(type);
  event.target.onerror = null; // Prevent infinite loop
};

/**
 * Get image dimensions
 * @param {string} url - The image URL
 * @returns {Promise<{width: number, height: number}>} The image dimensions
 */
export const getImageDimensions = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height
      });
    };
    img.onerror = reject;
    img.src = url;
  });
};

/**
 * Format image size
 * @param {number} bytes - The size in bytes
 * @returns {string} The formatted size
 */
export const formatImageSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}; 