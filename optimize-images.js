import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, 'public', 'images', 'cards', 'new');
const optimizedDir = path.join(__dirname, 'public', 'images', 'cards', 'optimized');

// Ensure the optimized directory exists
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

// Configuration for different image sizes
const configs = [
  {
    name: 'large', // For card detail views
    width: 800,
    quality: 80
  },
  {
    name: 'thumbnail', // For card thumbnails in galleries
    width: 400,
    quality: 80
  }
];

// Get all image files from the source directory
const imageFiles = fs.readdirSync(sourceDir)
  .filter(file => {
    const extension = path.extname(file).toLowerCase();
    return ['.webp', '.jpg', '.jpeg', '.png'].includes(extension);
  });

// Function to optimize an image
async function optimizeImage(file) {
  const sourcePath = path.join(sourceDir, file);
  const fileExt = path.extname(file);
  const fileName = path.basename(file, fileExt);
  
  try {
    const image = sharp(sourcePath);
    const metadata = await image.metadata();
    
    for (const config of configs) {
      const outputPath = path.join(optimizedDir, `${fileName}-${config.name}${fileExt}`);
      
      await image
        .resize({ 
          width: config.width,
          height: Math.round(config.width * (metadata.height / metadata.width)),
          fit: 'inside'
        })
        .webp({ quality: config.quality })
        .toFile(outputPath.replace(fileExt, '.webp'));
      
      console.log(`Optimized: ${fileName}-${config.name}.webp`);
    }
  } catch (error) {
    console.error(`Error optimizing ${file}:`, error);
  }
}

// Process all images
async function processImages() {
  console.log(`Found ${imageFiles.length} images to optimize...`);
  
  // Process images in batches to avoid overwhelming system resources
  const batchSize = 5;
  for (let i = 0; i < imageFiles.length; i += batchSize) {
    const batch = imageFiles.slice(i, i + batchSize);
    await Promise.all(batch.map(file => optimizeImage(file)));
    console.log(`Processed batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(imageFiles.length / batchSize)}`);
  }
  
  console.log('Optimization complete!');
}

processImages().catch(err => {
  console.error('Error processing images:', err);
}); 