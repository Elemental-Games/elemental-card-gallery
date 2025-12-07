# Getting Bundle Variant IDs from Shopify

## What I Need

For each bundle product you created in Shopify, I need the **Variant ID**. It looks like:
```
gid://shopify/ProductVariant/47888806904048
```

## How to Get Variant IDs

### Option 1: From Shopify Admin (Easiest)

1. Go to **Shopify Admin** → **Products**
2. Click on each bundle product:
   - Dumoles Holiday Bundle
   - Guardian Holiday Bundle  
   - Holiday Pack Bundle
3. In the product page, look at the URL - it contains the product ID
4. Or click on the variant - the variant ID is in the URL or you can see it in the browser's developer tools

### Option 2: Use the Debug API Endpoint

I can help you create a script to fetch all products and their variant IDs. Or you can use:

```bash
# Visit this URL (replace with your domain if different)
http://localhost:3000/api/get-products
```

This will show all products with their variant IDs.

### Option 3: From Shopify GraphQL Admin API

If you have Admin API access, you can query:
```graphql
{
  products(first: 10, query: "title:*bundle*") {
    edges {
      node {
        title
        handle
        variants(first: 1) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  }
}
```

## What to Send Me

Just send me the variant IDs in this format:

```
Dumoles Holiday Bundle: gid://shopify/ProductVariant/XXXXXXXXX
Guardian Holiday Bundle: gid://shopify/ProductVariant/XXXXXXXXX
Holiday Pack Bundle: gid://shopify/ProductVariant/XXXXXXXXX
```

Once you provide these, I'll update the code to use the bundle products directly instead of adding individual items!

