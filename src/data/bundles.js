// Bundle product definitions
// These bundles combine multiple products at a discounted price

// Individual product references (for bundle composition)
export const PRODUCTS = {
  boosterPack: {
    id: 'prod_1',
    title: 'Booster Pack',
    price: 5,
    variantId: 'gid://shopify/ProductVariant/47888806904048',
    handle: 'booster-pack-demo-day-edition',
    image: '/images/products/in-person/x-1pack.png',
    secondaryImages: [
      '/images/products/in-person/x-3packs.png',
      '/images/products/in-person/x-5packs.png',
      '/images/products/demopack1.png', // Original pack image last
    ],
  },
  crystalDeck: {
    id: 'prod_2',
    title: 'Crystal Starter Deck',
    price: 20,
    variantId: 'gid://shopify/ProductVariant/47888803004656',
    handle: 'crystal-starter-deck',
    image: '/images/products/crystaldemo1.png',
  },
  lightningDeck: {
    id: 'prod_3',
    title: 'Lightning Starter Deck',
    price: 20,
    variantId: 'gid://shopify/ProductVariant/47888788717808',
    handle: 'lightning-starter-deck',
    image: '/images/products/lightningdemo1.png',
  },
  dumolesMat: {
    id: 'prod_4',
    title: 'Dumoles Game Mat & Token Set',
    price: 25,
    variantId: 'gid://shopify/ProductVariant/47917101121776',
    handle: 'dumoles-game-mat-token-set',
    image: '/images/products/dumoledemo1.png',
  },
  guardianMat: {
    id: 'prod_5',
    title: "Guardian's Sanctuary Game Mat & Token Set",
    price: 25,
    variantId: 'gid://shopify/ProductVariant/47917102432496',
    handle: 'guardians-sanctuary-game-mat-token-set',
    image: '/images/products/guardiandemo1.png',
  },
};

// Bundle definitions
export const bundles = [
  {
    id: 'bundle_dumoles',
    title: 'Dumoles Holiday Bundle',
    price: 50, // Regular price would be $60 (25+15+20), saving $10
    oldPrice: 60,
    image: '/images/products/in-person/x-12image.png',
    secondaryImages: [
      '/images/products/dumoledemo1.png', // Dumoles mat
      '/images/products/crystaldemo1.png', // Crystal deck (correct)
      '/images/products/in-person/x-3packs.png', // 3 pack image
    ],
    description: `Perfect starter bundle for Crystal players! This holiday bundle includes everything you need to start playing Elekin TCG.

What's Included:
- Dumoles Game Mat & Token Set
- 3 Booster Packs
- Crystal Starter Deck

Save $10 when you buy this bundle!

Note: Bundles are already discounted and cannot be combined with other discount codes or promotions.`,
    // Shopify bundle product variant ID (preferred - uses bundle pricing)
    variantId: 'gid://shopify/ProductVariant/48403837419760',
    handle: 'dumoles-holiday-bundle-1',
    // Fallback: individual items (used for cart display and if variantId not available)
    items: [
      { ...PRODUCTS.dumolesMat, quantity: 1 },
      { ...PRODUCTS.boosterPack, quantity: 3 },
      { ...PRODUCTS.crystalDeck, quantity: 1 },
    ],
    noDiscountCodes: true,
  },
  {
    id: 'bundle_guardian',
    title: 'Guardian Holiday Bundle',
    price: 50, // Regular price would be $60 (25+15+20), saving $10
    oldPrice: 60,
    image: '/images/products/in-person/x-11image.png',
    secondaryImages: [
      '/images/products/guardiandemo1.png', // Guardian mat
      '/images/products/lightningdemo1.png', // Lightning deck (correct)
      '/images/products/in-person/x-3packs.png', // 3 pack image
    ],
    description: `Perfect starter bundle for Lightning players! This holiday bundle includes everything you need to start playing Elekin TCG.

What's Included:
- Guardian's Sanctuary Game Mat & Token Set
- 3 Booster Packs
- Lightning Starter Deck

Save $10 when you buy this bundle!

Note: Bundles are already discounted and cannot be combined with other discount codes or promotions.`,
    // Shopify bundle product variant ID (preferred - uses bundle pricing)
    variantId: 'gid://shopify/ProductVariant/48403842007280',
    handle: 'guardian-holiday-bundle',
    // Fallback: individual items (used for cart display and if variantId not available)
    items: [
      { ...PRODUCTS.guardianMat, quantity: 1 },
      { ...PRODUCTS.boosterPack, quantity: 3 },
      { ...PRODUCTS.lightningDeck, quantity: 1 },
    ],
    noDiscountCodes: true,
  },
  {
    id: 'bundle_packs',
    title: 'Holiday Pack Bundle',
    price: 50, // Regular price would be $60 (12 packs × $5), saving $10
    oldPrice: 60,
    image: '/images/products/in-person/x-12packs.png',
    description: `Stock up on cards with our Holiday Pack Bundle! Get 12 booster packs for the price of 10 - that's 2 packs FREE!

What's Included:
- 12 Booster Packs (Demo Day Edition)

Perfect for collectors and competitive players looking to expand their collection.

Note: Bundles are already discounted and cannot be combined with other discount codes or promotions.`,
    // Shopify bundle product variant ID (preferred - uses bundle pricing)
    variantId: 'gid://shopify/ProductVariant/48404181221616',
    handle: 'holiday-pack-bundle',
    // Fallback: individual items (used for cart display and if variantId not available)
    items: [
      { ...PRODUCTS.boosterPack, quantity: 12 },
    ],
    noDiscountCodes: true,
  },
  {
    id: 'bundle_2player',
    title: '2 Player Holiday Bundle',
    price: 90, // Regular price would be $120 (50+50+20), saving $30
    oldPrice: 120,
    image: '/images/products/in-person/x-13image.png',
    secondaryImages: [
      '/images/products/in-person/x-12image.png', // Dumoles bundle pic
      '/images/products/in-person/x-11image.png', // Guardian bundle pic
      '/images/products/crystaldemo1.png', // Crystal deck
      '/images/products/lightningdemo1.png', // Lightning deck
      '/images/products/in-person/x-3packs.png', // 3 pack image
    ],
    description: `Perfect for two players or anyone who wants both decks! This ultimate holiday bundle includes everything two players need to start playing Elekin TCG together.

What's Included:
- Dumoles Game Mat & Token Set
- Guardian's Sanctuary Game Mat & Token Set
- Crystal Starter Deck
- Lightning Starter Deck
- 6 Booster Packs (3 for each player)

Save $30 when you buy this bundle! Perfect for friends, couples, or anyone who wants to experience both elemental paths.

Note: Bundles are already discounted and cannot be combined with other discount codes or promotions.`,
    // Shopify bundle product variant ID (preferred - uses bundle pricing)
    // NOTE: Update price in Shopify to $90.00 (currently shows $100)
    variantId: 'gid://shopify/ProductVariant/48404295483632',
    handle: '2-player-holiday-bundle',
    // Fallback: individual items (used for cart display and if variantId not available)
    items: [
      { ...PRODUCTS.dumolesMat, quantity: 1 },
      { ...PRODUCTS.guardianMat, quantity: 1 },
      { ...PRODUCTS.crystalDeck, quantity: 1 },
      { ...PRODUCTS.lightningDeck, quantity: 1 },
      { ...PRODUCTS.boosterPack, quantity: 6 },
    ],
    noDiscountCodes: true,
  },
];

// Optional: General intro bundle where user selects deck and mat
export const introBundle = {
  id: 'bundle_intro',
  title: 'Intro Starter Bundle',
  price: 60,
  oldPrice: 70,
  image: '/images/products/bundles/intro-bundle.png',
  description: `Create your perfect starter bundle! Choose your preferred deck and game mat.

What's Included:
- Your choice of Game Mat & Token Set (Dumoles or Guardian)
- 5 Booster Packs
- Your choice of Starter Deck (Lightning or Crystal)

Save $10 when you buy this bundle!`,
  requiresSelection: true,
  options: {
    deck: ['lightning', 'crystal'],
    mat: ['dumoles', 'guardian'],
  },
};

