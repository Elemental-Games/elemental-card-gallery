# Shopify Bundles Setup Guide

## Current Implementation

Your bundles currently work by adding **individual products** to the Shopify cart. When a customer buys a bundle, it adds all the individual items (mat + packs + deck) separately.

## How It Works Now

1. **Bundle Definition**: Each bundle has an `items` array with individual products
2. **Checkout**: When customer clicks "Buy Now" or "Add to Cart", it sends all bundle items to Shopify
3. **Pricing**: The bundle price ($50) is displayed, but Shopify will charge the regular prices ($60 total)

## ⚠️ Current Issue

**The bundle discount ($10 off) is NOT automatically applied in Shopify.** You need to handle this one of two ways:

---

## Option 1: Create Bundle Products in Shopify (Recommended)

Create actual bundle products in Shopify with the correct pricing.

### Steps:

1. **Go to Shopify Admin** → Products → Add product

2. **For each bundle, create a product:**
   - **Dumoles Holiday Bundle**
     - Title: "Dumoles Holiday Bundle"
     - Price: $50.00
     - Handle: `dumoles-holiday-bundle` (must match your code)
     - Description: Copy from your bundle description
     - Images: Upload `x-12image.png`
     - Inventory: Set as needed

   - **Guardian Holiday Bundle**
     - Title: "Guardian Holiday Bundle"
     - Price: $50.00
     - Handle: `guardian-holiday-bundle`
     - Description: Copy from your bundle description
     - Images: Upload `x-11image.png`

   - **Holiday Pack Bundle**
     - Title: "Holiday Pack Bundle"
     - Price: $50.00
     - Handle: `holiday-pack-bundle`
     - Description: Copy from your bundle description
     - Images: Upload `x-12packs.png`

3. **Get the Variant IDs:**
   - After creating each product, go to the product page
   - The variant ID will be in the URL or you can use the API
   - Format: `gid://shopify/ProductVariant/XXXXXXXXX`

4. **Update Your Code:**
   - Update `src/data/bundles.js` to use the bundle product variant IDs instead of individual items
   - Example:
   ```javascript
   {
     id: 'bundle_dumoles',
     title: 'Dumoles Holiday Bundle',
     price: 50,
     oldPrice: 60,
     image: '/images/products/in-person/x-12image.png',
     variantId: 'gid://shopify/ProductVariant/YOUR_BUNDLE_VARIANT_ID',
     handle: 'dumoles-holiday-bundle',
     // Remove items array, use single variantId instead
   }
   ```

5. **Update Cart Functions:**
   - Modify `buyBundleNow` to use the bundle variant ID instead of individual items
   - The bundle will appear as a single line item in Shopify

---

## Option 2: Use Discount Codes (Current Approach)

Keep adding individual items but apply discount codes automatically.

### Steps:

1. **Create Discount Codes in Shopify:**
   - Go to Discounts → Create discount
   - Create codes:
     - `DUMOLES-HOLIDAY` - 14.3% discount (makes $70 → $60, but you want $50)
     - `GUARDIAN-HOLIDAY` - 14.3% discount
     - `PACK-HOLIDAY` - 16.7% discount (makes $60 → $50)

2. **Update Checkout API:**
   - Modify `api/create-checkout-session.js` to detect bundle items
   - Apply the appropriate discount code when bundle items are detected
   - Note: Shopify Storefront API doesn't support discount codes directly
   - You'd need to use Shopify Admin API or handle it differently

3. **Manual Adjustment:**
   - Manually adjust pricing in Shopify admin for orders containing bundle items
   - Not scalable, but works for low volume

---

## Option 3: Use Shopify Scripts (Advanced)

Use Shopify Scripts (Shopify Plus only) to automatically apply discounts when specific product combinations are in the cart.

---

## Recommended: Option 1 (Create Bundle Products)

**Why?**
- ✅ Cleaner checkout experience
- ✅ Proper inventory tracking
- ✅ Automatic pricing
- ✅ Better analytics
- ✅ Easier to manage

**After creating bundle products in Shopify, update the code:**

1. Update bundle definitions to use bundle variant IDs
2. Update `buyBundleNow` function to use single variant instead of multiple items
3. Keep `addBundleToCart` as-is (adds individual items for cart display)

---

## Testing

After setting up, test:
1. Add bundle to cart → Check cart shows correct items
2. Buy bundle → Check Shopify checkout shows correct price
3. Complete test order → Verify order total is correct

---

## Getting Variant IDs

You can use the debug endpoint to find variant IDs:

```bash
# Get all products and their variant IDs
curl http://localhost:3000/api/get-products
```

Or check Shopify admin:
- Product page → URL contains variant ID
- Or use Shopify GraphQL Admin API

