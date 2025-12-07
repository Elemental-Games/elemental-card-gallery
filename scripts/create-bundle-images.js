/**
 * Script to create professional bundle product images by compositing existing product images
 * 
 * Usage: node scripts/create-bundle-images.js
 * 
 * Creates beautiful, professional-looking bundle images with proper composition
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const productsDir = path.join(__dirname, '..', 'public', 'images', 'products');
const bundlesDir = path.join(__dirname, '..', 'public', 'images', 'products', 'bundles');

// Ensure bundles directory exists
if (!fs.existsSync(bundlesDir)) {
  fs.mkdirSync(bundlesDir, { recursive: true });
}

// Bundle configurations
const bundles = [
  {
    name: 'dumoles-holiday-bundle',
    products: [
      { image: 'dumoledemo1.png', label: 'Dumoles Mat', count: 1 },
      { image: 'packdemo1.png', label: '3 Packs', count: 3 },
      { image: 'lightningdemo1.png', label: 'Lightning Deck', count: 1 },
    ],
    title: 'Dumoles Holiday Bundle',
  },
  {
    name: 'guardian-holiday-bundle',
    products: [
      { image: 'guardiandemo1.png', label: 'Guardian Mat', count: 1 },
      { image: 'packdemo1.png', label: '3 Packs', count: 3 },
      { image: 'crystaldemo1.png', label: 'Crystal Deck', count: 1 },
    ],
    title: 'Guardian Holiday Bundle',
  },
  {
    name: 'holiday-pack-bundle',
    products: [
      { image: 'packdemo1.png', label: '12 Packs', count: 12 },
    ],
    title: 'Holiday Pack Bundle',
  },
];

async function createBundleImage(bundle) {
  try {
    console.log(`Creating ${bundle.name}...`);

    // Load product images
    const productImages = [];
    for (const product of bundle.products) {
      const imagePath = path.join(productsDir, product.image);
      if (!fs.existsSync(imagePath)) {
        console.warn(`Warning: ${product.image} not found, skipping...`);
        continue;
      }
      
      const metadata = await sharp(imagePath).metadata();
      productImages.push({
        ...product,
        buffer: await sharp(imagePath).toBuffer(),
        width: metadata.width,
        height: metadata.height,
        aspectRatio: metadata.width / metadata.height,
      });
    }

    if (productImages.length === 0) {
      console.error(`No images found for ${bundle.name}`);
      return;
    }

    // Canvas dimensions - larger for better quality
    const totalWidth = 1400;
    const totalHeight = 900;
    const padding = 50;
    const titleHeight = 120;
    const contentHeight = totalHeight - titleHeight - padding * 2;

    // Create base with gradient background
    const gradientSvg = `
      <svg width="${totalWidth}" height="${totalHeight}">
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#1a103c;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#2d1b4e;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="${totalWidth}" height="${totalHeight}" fill="url(#bgGradient)"/>
      </svg>
    `;

    let composite = sharp(Buffer.from(gradientSvg));

    // Add title with glow effect
    const titleSvg = `
      <svg width="${totalWidth}" height="${totalHeight}">
        <defs>
          <linearGradient id="titleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#a855f7;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#eab308;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#a855f7;stop-opacity:1" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <text x="${totalWidth / 2}" y="80" font-family="Arial, sans-serif" font-size="48" font-weight="bold" text-anchor="middle" fill="url(#titleGradient)" filter="url(#glow)">
          ${bundle.title}
        </text>
      </svg>
    `;

    composite = composite.composite([{
      input: Buffer.from(titleSvg),
      top: 0,
      left: 0,
    }]);

    const composites = [];
    const contentTop = padding + titleHeight;
    const centerY = contentTop + contentHeight / 2;

    if (productImages.length === 1) {
      // Pack bundle - create a beautiful fanned arrangement
      const product = productImages[0];
      const packCount = product.count || 1;
      
      // Size for individual packs
      const packHeight = Math.min(450, contentHeight * 0.85);
      const packWidth = Math.round(packHeight * product.aspectRatio);
      
      // Create a fan arrangement
      const centerX = totalWidth / 2;
      const maxPacksToShow = Math.min(packCount, 6);
      const angleStep = maxPacksToShow > 1 ? 20 / (maxPacksToShow - 1) : 0;
      const startAngle = -(angleStep * (maxPacksToShow - 1)) / 2;
      const radius = 100;
      
      for (let i = 0; i < maxPacksToShow; i++) {
        const angle = startAngle + (i * angleStep);
        const rad = (angle * Math.PI) / 180;
        const xOffset = Math.sin(rad) * radius;
        const yOffset = -Math.cos(rad) * radius * 0.5; // Less vertical spread
        const rotation = angle * 0.8; // Slight rotation
        
        const resizedPack = await sharp(product.buffer)
          .resize(packWidth, packHeight, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .toBuffer();
        
        // Rotate the pack
        const rotatedPack = await sharp(resizedPack)
          .rotate(rotation, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .toBuffer();
        
        const packMetadata = await sharp(rotatedPack).metadata();
        const packX = Math.round(centerX + xOffset - packMetadata.width / 2);
        const packY = Math.round(centerY + yOffset - packMetadata.height / 2);
        
        composites.push({
          input: rotatedPack,
          top: packY,
          left: packX,
        });
      }
      
      // Add count text if more than 6 packs
      if (packCount > 6) {
        const countSvg = `
          <svg width="${totalWidth}" height="${totalHeight}">
            <defs>
              <filter id="textShadow">
                <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.7"/>
              </filter>
            </defs>
            <text x="${centerX}" y="${centerY + 280}" font-family="Arial, sans-serif" font-size="36" font-weight="bold" text-anchor="middle" fill="#eab308" filter="url(#textShadow)">
              ${packCount} Packs Total
            </text>
          </svg>
        `;
        composites.push({
          input: Buffer.from(countSvg),
          top: 0,
          left: 0,
        });
      }
    } else {
      // Multi-product bundle - professional layout
      const packProduct = productImages.find(p => p.image.includes('pack'));
      const matProduct = productImages.find(p => p.image.includes('mat') || p.image.includes('dumole') || p.image.includes('guardian'));
      const deckProduct = productImages.find(p => p.image.includes('deck') || p.image.includes('lightning') || p.image.includes('crystal'));
      
      const leftX = totalWidth * 0.22;
      const centerX = totalWidth / 2;
      const rightX = totalWidth * 0.78;
      
      // Process mat (left) - slightly rotated
      if (matProduct) {
        const matHeight = Math.min(500, contentHeight * 0.95);
        const matWidth = Math.round(matHeight * matProduct.aspectRatio);
        const resizedMat = await sharp(matProduct.buffer)
          .resize(matWidth, matHeight, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .rotate(-8, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .toBuffer();
        
        const matMetadata = await sharp(resizedMat).metadata();
        composites.push({
          input: resizedMat,
          top: Math.round(centerY - matMetadata.height / 2),
          left: Math.round(leftX - matMetadata.width / 2),
        });
      }
      
      // Process packs (center) - stacked arrangement
      if (packProduct) {
        const packCount = packProduct.count || 3;
        const packHeight = Math.min(380, contentHeight * 0.75);
        const packWidth = Math.round(packHeight * packProduct.aspectRatio);
        
        // Create a nice stacked arrangement
        for (let i = 0; i < Math.min(packCount, 3); i++) {
          const xOffset = (i - 1) * 30; // Horizontal spread
          const yOffset = i * -20; // Stacking effect
          const rotation = (i - 1) * 10; // Rotation for visual interest
          
          const resizedPack = await sharp(packProduct.buffer)
            .resize(packWidth, packHeight, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
            .toBuffer();
          
          const rotatedPack = await sharp(resizedPack)
            .rotate(rotation, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
            .toBuffer();
          
          const packMetadata = await sharp(rotatedPack).metadata();
          
          composites.push({
            input: rotatedPack,
            top: Math.round(centerY + yOffset - packMetadata.height / 2),
            left: Math.round(centerX + xOffset - packMetadata.width / 2),
          });
        }
      }
      
      // Process deck (right) - slightly rotated
      if (deckProduct) {
        const deckHeight = Math.min(500, contentHeight * 0.95);
        const deckWidth = Math.round(deckHeight * deckProduct.aspectRatio);
        const resizedDeck = await sharp(deckProduct.buffer)
          .resize(deckWidth, deckHeight, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .rotate(8, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .toBuffer();
        
        const deckMetadata = await sharp(resizedDeck).metadata();
        
        composites.push({
          input: resizedDeck,
          top: Math.round(centerY - deckMetadata.height / 2),
          left: Math.round(rightX - deckMetadata.width / 2),
        });
      }
    }

    // Apply all composites
    const finalImage = await composite.composite(composites).png().toBuffer();

    // Save the image
    const outputPath = path.join(bundlesDir, `${bundle.name}.png`);
    fs.writeFileSync(outputPath, finalImage);
    console.log(`✓ Created ${outputPath}`);

  } catch (error) {
    console.error(`Error creating ${bundle.name}:`, error);
    throw error;
  }
}

async function main() {
  console.log('Creating professional bundle images...\n');

  try {
    await import('sharp');
  } catch (e) {
    console.error('Error: sharp package is required. Install it with: npm install sharp');
    process.exit(1);
  }

  for (const bundle of bundles) {
    await createBundleImage(bundle);
  }

  console.log('\n✓ All bundle images created successfully!');
}

main().catch(console.error);
