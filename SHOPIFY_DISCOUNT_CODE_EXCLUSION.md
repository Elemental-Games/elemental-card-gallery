# Preventing Discount Codes on Holiday Bundles

To ensure customers cannot use discount codes with holiday bundles, you need to configure your discount codes in Shopify to **exclude** the bundle products.

## Step-by-Step Instructions

### Method 1: Exclude Individual Bundle Products (Recommended)

For each discount code you create or edit:

1. **Go to Shopify Admin** → **Discounts**
2. **Click on a discount code** (or create a new one)
3. **Scroll to "Customer eligibility"** section
4. **Under "Product eligibility"**, select **"Specific products"**
5. **Click "Add products"**
6. **Search for and select these bundle products to EXCLUDE:**
   - Dumoles Holiday Bundle
   - Guardian Holiday Bundle
   - Holiday Pack Bundle
   - 2-Player Holiday Bundle
7. **Click "Exclude selected products"** (or similar option)
8. **Save** the discount code

### Method 2: Create a "Bundles" Collection (Alternative)

If you have many discount codes, you can create a collection and exclude that:

1. **Create a Collection:**
   - Go to **Products** → **Collections**
   - Click **"Create collection"**
   - Name it: **"Holiday Bundles"**
   - Add all 4 bundle products to this collection
   - Save

2. **Exclude the Collection in Discount Codes:**
   - Go to **Discounts** → Select a discount code
   - Under "Product eligibility", select **"Specific products"**
   - Click **"Add collections"**
   - Select **"Holiday Bundles"** collection
   - Click **"Exclude selected collections"**
   - Save

### Method 3: Use Product Tags (Most Scalable)

Tag your bundle products and exclude by tag:

1. **Tag Bundle Products:**
   - Go to **Products**
   - Edit each bundle product:
     - Dumoles Holiday Bundle
     - Guardian Holiday Bundle
     - Holiday Pack Bundle
     - 2-Player Holiday Bundle
   - Add tag: **"no-discount-codes"** (or similar)
   - Save each product

2. **Exclude by Tag in Discount Codes:**
   - Go to **Discounts** → Select a discount code
   - Under "Product eligibility", look for tag exclusion options
   - If available, exclude products tagged **"no-discount-codes"**
   - Save

## Important Notes

- **Frontend messaging is already in place**: The bundle pages show a notice that discount codes cannot be used
- **Shopify enforcement is required**: The frontend messaging is informational only - Shopify's discount code settings are what actually prevents codes from being applied
- **Test after setup**: Create a test discount code and try to apply it to a bundle in checkout to verify it's blocked

## Bundle Product Handles (for reference)

- `dumoles-holiday-bundle-1`
- `guardian-holiday-bundle`
- `holiday-pack-bundle`
- `2-player-holiday-bundle`

## Quick Checklist

- [ ] Go through all existing discount codes
- [ ] Exclude all 4 bundle products from each discount code
- [ ] Test by trying to apply a discount code to a bundle in checkout
- [ ] Verify the discount code is rejected/not applied

## Future Discount Codes

When creating new discount codes:
- Always exclude bundle products during creation
- Consider using a collection or tag system for easier management

