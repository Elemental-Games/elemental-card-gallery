import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inPersonDir = path.join(__dirname, '../public/images/products/in-person');

// Images to optimize
const images = [
  'x-11image.png',
  'x-12image.png',
  'x-12packs.png',
  'x-13image.png',
  'x-1pack.png',
  'x-3packs.png',
  'x-5packs.png',
];

async function optimizeImage(filename) {
  const inputPath = path.join(inPersonDir, filename);
  const outputFilename = filename.replace('.png', '.jpg');
  const outputPath = path.join(inPersonDir, outputFilename);

  try {
    console.log(`\n📸 Optimizing ${filename}...`);
    
    // Get original file size
    const originalStats = fs.statSync(inputPath);
    const originalSizeMB = (originalStats.size / (1024 * 1024)).toFixed(2);
    console.log(`   Original size: ${originalSizeMB}MB`);

    // Get image metadata
    const metadata = await sharp(inputPath).metadata();
    console.log(`   Original dimensions: ${metadata.width}x${metadata.height}`);

    // Calculate optimal dimensions for email (max 800px width, maintain aspect ratio)
    const maxWidth = 800;
    const width = metadata.width > maxWidth ? maxWidth : metadata.width;
    const height = Math.round((metadata.height / metadata.width) * width);

    // Optimize: resize, convert to JPEG with high quality, optimize
    await sharp(inputPath)
      .resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({
        quality: 90, // High quality (85-95 is usually imperceptible)
        mozjpeg: true, // Better compression
        progressive: true, // Progressive JPEG for better web loading
      })
      .toFile(outputPath);

    // Get optimized file size
    const optimizedStats = fs.statSync(outputPath);
    const optimizedSizeMB = (optimizedStats.size / (1024 * 1024)).toFixed(2);
    const optimizedSizeKB = (optimizedStats.size / 1024).toFixed(0);
    const reduction = ((1 - optimizedStats.size / originalStats.size) * 100).toFixed(1);

    console.log(`   ✅ Optimized size: ${optimizedSizeMB}MB (${optimizedSizeKB}KB)`);
    console.log(`   📉 Size reduction: ${reduction}%`);
    console.log(`   📐 New dimensions: ${width}x${height}`);

    // Check if it meets email requirements
    if (optimizedStats.size > 500 * 1024) {
      console.log(`   ⚠️  Warning: Still over 500KB (${optimizedSizeKB}KB)`);
    } else {
      console.log(`   ✅ Under 500KB - perfect for email!`);
    }

    return {
      filename,
      originalSize: originalStats.size,
      optimizedSize: optimizedStats.size,
      reduction: parseFloat(reduction),
    };
  } catch (error) {
    console.error(`   ❌ Error optimizing ${filename}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🚀 Starting image optimization for email...\n');
  console.log('📁 Directory:', inPersonDir);
  console.log(`📸 Found ${images.length} images to optimize\n`);

  const results = [];

  for (const image of images) {
    const result = await optimizeImage(image);
    if (result) {
      results.push(result);
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 OPTIMIZATION SUMMARY');
  console.log('='.repeat(60));

  const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
  const totalOptimized = results.reduce((sum, r) => sum + r.optimizedSize, 0);
  const totalReduction = ((1 - totalOptimized / totalOriginal) * 100).toFixed(1);

  console.log(`\nTotal original size: ${(totalOriginal / (1024 * 1024)).toFixed(2)}MB`);
  console.log(`Total optimized size: ${(totalOptimized / (1024 * 1024)).toFixed(2)}MB`);
  console.log(`Total reduction: ${totalReduction}%`);
  console.log(`\n✅ All images optimized! New .jpg files created.`);
  console.log(`\n📝 Note: Original .png files are preserved.`);
  console.log(`   Update your email HTML to use .jpg versions.`);
}

main().catch(console.error);

