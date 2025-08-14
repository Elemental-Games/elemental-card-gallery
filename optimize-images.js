import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cardsDir = path.join(__dirname, 'public', 'images', 'cards', 'new');
const MAX_FILE_SIZE_MB = 1;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

async function processNewCards() {
  try {
    const files = await fs.readdir(cardsDir);
    const pngFiles = files.filter(file => path.extname(file).toLowerCase() === '.png');

    console.log(`Found ${pngFiles.length} PNG files to process.`);

    for (const file of pngFiles) {
      const filePath = path.join(cardsDir, file);
      const fileName = path.basename(file, path.extname(file));
      const webpPath = path.join(cardsDir, `${fileName}.webp`);

      // Optimize PNG
      console.log(`Optimizing ${file}...`);
      const originalBuffer = await fs.readFile(filePath);
      let pngBuffer = await sharp(originalBuffer)
        .png({ quality: 90, compressionLevel: 9 })
        .toBuffer();

      if (pngBuffer.length > MAX_FILE_SIZE_BYTES) {
        console.log(`${file} is still too large, resizing...`);
        pngBuffer = await sharp(pngBuffer)
          .resize({ width: 1000 }) // Resize if still too large
          .png({ quality: 85, compressionLevel: 9 })
          .toBuffer();
      }
      
      await fs.writeFile(filePath, pngBuffer);
      const stats = await fs.stat(filePath);
      console.log(`Optimized ${file}, new size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);

      // Create WebP
      console.log(`Creating WebP for ${fileName}...`);
      await sharp(filePath)
        .webp({ quality: 80 })
        .toFile(webpPath);
      console.log(`Created ${fileName}.webp`);
    }

    console.log('All new cards have been processed.');
  } catch (error) {
    console.error('An error occurred during card processing:', error);
  }
}

processNewCards(); 