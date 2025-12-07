# Holiday Bundles System

This document explains the holiday bundle system for Elekin TCG.

## Overview

The holiday bundles combine multiple products at a discounted price. When a customer adds a bundle to their cart, all individual items from the bundle are added to the cart.

## Bundle Definitions

Bundles are defined in `src/data/bundles.js`. Currently, there are three holiday bundles:

### 1. Dumoles Holiday Bundle
- **Price**: $60 (Regular: $70, Save $10)
- **Includes**:
  - Dumoles Game Mat & Token Set (1x)
  - Booster Packs (5x)
  - Lightning Starter Deck (1x)

### 2. Guardian Holiday Bundle
- **Price**: $60 (Regular: $70, Save $10)
- **Includes**:
  - Guardian's Sanctuary Game Mat & Token Set (1x)
  - Booster Packs (5x)
  - Crystal Starter Deck (1x)

### 3. Holiday Pack Bundle
- **Price**: $50 (Regular: $60, Save $10)
- **Includes**:
  - Booster Packs (12x)

## How It Works

### Adding Bundles to Cart
When a customer clicks "Add Bundle to Cart", the system adds all individual items from the bundle to the cart. The pricing is handled through Shopify discount codes or manual adjustment.

### Checkout Process
When checking out, all bundle items are sent to Shopify as separate line items. You'll need to:
1. Create discount codes in Shopify for each bundle, OR
2. Manually adjust pricing in Shopify admin, OR
3. Create bundle products in Shopify with the correct pricing

## Bundle Images

Bundle images are automatically generated from existing product images using the `create-bundle-images` script.

### Generating Bundle Images

Run the following command to generate bundle images:

```bash
npm run create-bundle-images
```

This script:
- Reads bundle configurations from `scripts/create-bundle-images.js`
- Composites product images together
- Saves bundle images to `public/images/products/bundles/`

### Image Specifications
- Format: PNG
- Background: Purple (#1A103C)
- Layout: Horizontal arrangement of product images
- Title: Gradient text overlay

## Adding New Bundles

To add a new bundle:

1. **Add bundle definition** to `src/data/bundles.js`:
```javascript
{
  id: 'bundle_new',
  title: 'New Holiday Bundle',
  price: 50,
  oldPrice: 60,
  image: '/images/products/bundles/new-bundle.png',
  description: 'Bundle description...',
  items: [
    { ...PRODUCTS.boosterPack, quantity: 5 },
    { ...PRODUCTS.crystalDeck, quantity: 1 },
  ],
  handle: 'new-holiday-bundle',
}
```

2. **Add image generation config** to `scripts/create-bundle-images.js`:
```javascript
{
  name: 'new-bundle',
  products: [
    { image: 'demopack1.png', label: '5 Packs', position: 'left' },
    { image: 'crystaldemo1.png', label: 'Crystal Deck', position: 'right' },
  ],
  title: 'New Holiday Bundle',
}
```

3. **Generate the bundle image**:
```bash
npm run create-bundle-images
```

4. **The bundle will automatically appear** on the Shop page!

## Shopify Integration

### Option 1: Discount Codes (Recommended)
Create discount codes in Shopify:
- `DUMOLES-HOLIDAY` - 14.3% discount (makes $70 → $60)
- `GUARDIAN-HOLIDAY` - 14.3% discount (makes $70 → $60)
- `PACK-HOLIDAY` - 16.7% discount (makes $60 → $50)

Then update the checkout API to apply the discount code automatically when bundle items are detected.

### Option 2: Bundle Products in Shopify
Create actual bundle products in Shopify with the correct pricing. Then update bundle definitions to use the Shopify product variant IDs instead of individual items.

### Option 3: Manual Adjustment
Manually adjust pricing in Shopify admin for orders containing bundle items.

## Files Modified/Created

- `src/data/bundles.js` - Bundle definitions
- `src/components/bundles/BundleCard.jsx` - Bundle card component
- `src/pages/BundleDetailPage.jsx` - Bundle detail page
- `src/pages/ShopPage.jsx` - Updated to show bundles
- `src/hooks/useCart.jsx` - Added bundle support
- `scripts/create-bundle-images.js` - Image generation script
- `src/App.jsx` - Added bundle route

## Testing

1. Visit `/shop` to see bundles displayed at the top
2. Click on a bundle to see its detail page
3. Add bundle to cart - verify all items are added
4. Checkout - verify items appear correctly in Shopify

## Notes

- Bundle images use fallback to first product image if bundle image doesn't exist
- Bundle pricing is displayed but actual discount needs to be handled in Shopify
- Consider creating Shopify discount codes for automatic application

