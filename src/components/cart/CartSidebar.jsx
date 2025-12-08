import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { bundles } from '@/data/bundles';

const CartSidebar = () => {
  const { isOpen, toggleCart, items, updateQuantity, removeFromCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { toast } = useToast();

  // Calculate subtotal with bundle detection
  const calculateSubtotal = () => {
    let total = 0;
    
    // Group items by bundleId
    const itemsByBundle = {};
    const nonBundleItems = [];
    
    items.forEach(item => {
      if (item.bundleId && item.bundleVariantId) {
        if (!itemsByBundle[item.bundleId]) {
          itemsByBundle[item.bundleId] = [];
        }
        itemsByBundle[item.bundleId].push(item);
      } else {
        nonBundleItems.push(item);
      }
    });
    
    // Process each bundle type
    Object.keys(itemsByBundle).forEach(bundleId => {
      const bundle = bundles.find(b => b.id === bundleId);
      if (!bundle || !bundle.variantId) {
        // Invalid bundle, add items individually
        nonBundleItems.push(...itemsByBundle[bundleId]);
        return;
      }
      
      const bundleItems = itemsByBundle[bundleId];
      
      // Count quantities per product ID in cart
      const cartQuantities = new Map();
      bundleItems.forEach(item => {
        const qty = cartQuantities.get(item.id) || 0;
        cartQuantities.set(item.id, qty + (item.quantity || 1));
      });
      
      // Count required quantities per product ID in bundle
      const bundleQuantities = new Map();
      bundle.items.forEach(bundleItem => {
        const qty = bundleQuantities.get(bundleItem.id) || 0;
        bundleQuantities.set(bundleItem.id, qty + (bundleItem.quantity || 1));
      });
      
      // Check if we have enough items to form at least one bundle
      let canFormBundle = true;
      for (const [productId, requiredQty] of bundleQuantities.entries()) {
        const availableQty = cartQuantities.get(productId) || 0;
        if (availableQty < requiredQty) {
          canFormBundle = false;
          break;
        }
      }
      
      if (canFormBundle) {
        // Calculate how many complete bundles we can form
        let bundleCount = Infinity;
        for (const [productId, requiredQty] of bundleQuantities.entries()) {
          const availableQty = cartQuantities.get(productId) || 0;
          const possibleBundles = Math.floor(availableQty / requiredQty);
          bundleCount = Math.min(bundleCount, possibleBundles);
        }
        
        if (bundleCount > 0) {
          // Add bundle price(s)
          total += bundle.price * bundleCount;
          
          // Calculate remaining items that don't form bundles
          for (const [productId, requiredQty] of bundleQuantities.entries()) {
            const usedQty = requiredQty * bundleCount;
            const availableQty = cartQuantities.get(productId) || 0;
            const remainingQty = availableQty - usedQty;
            
            if (remainingQty > 0) {
              // Find the original item and add remaining quantity price
              const originalItem = bundleItems.find(item => item.id === productId);
              if (originalItem) {
                total += originalItem.price * remainingQty;
              }
            }
          }
        } else {
          // Can't form bundle, add items individually
          bundleItems.forEach(item => {
            total += item.price * (item.quantity || 1);
          });
        }
      } else {
        // Can't form bundle, add items individually
        bundleItems.forEach(item => {
          total += item.price * (item.quantity || 1);
        });
      }
    });
    
    // Add non-bundle items
    nonBundleItems.forEach(item => {
      total += item.price * (item.quantity || 1);
    });
    
    return total;
  };

  const subtotal = calculateSubtotal();

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setIsCheckingOut(true);
    
    try {
      // Detect bundles in cart and replace individual items with bundle variantIds
      const checkoutItems = [];
      
      // Group items by bundleId
      const itemsByBundle = {};
      const nonBundleItems = [];
      
      items.forEach(item => {
        if (item.bundleId && item.bundleVariantId) {
          if (!itemsByBundle[item.bundleId]) {
            itemsByBundle[item.bundleId] = [];
          }
          itemsByBundle[item.bundleId].push(item);
        } else {
          nonBundleItems.push(item);
        }
      });
      
      // Process each bundle type
      Object.keys(itemsByBundle).forEach(bundleId => {
        const bundle = bundles.find(b => b.id === bundleId);
        if (!bundle || !bundle.variantId) {
          // Invalid bundle, add items individually
          nonBundleItems.push(...itemsByBundle[bundleId]);
          return;
        }
        
        const bundleItems = itemsByBundle[bundleId];
        
        // Count quantities per product ID in cart
        const cartQuantities = new Map();
        bundleItems.forEach(item => {
          const qty = cartQuantities.get(item.id) || 0;
          cartQuantities.set(item.id, qty + (item.quantity || 1));
        });
        
        // Count required quantities per product ID in bundle
        const bundleQuantities = new Map();
        bundle.items.forEach(bundleItem => {
          const qty = bundleQuantities.get(bundleItem.id) || 0;
          bundleQuantities.set(bundleItem.id, qty + (bundleItem.quantity || 1));
        });
        
        // Check if we have enough items to form at least one bundle
        let canFormBundle = true;
        for (const [productId, requiredQty] of bundleQuantities.entries()) {
          const availableQty = cartQuantities.get(productId) || 0;
          if (availableQty < requiredQty) {
            canFormBundle = false;
            break;
          }
        }
        
        if (canFormBundle) {
          // Calculate how many complete bundles we can form
          let bundleCount = Infinity;
          for (const [productId, requiredQty] of bundleQuantities.entries()) {
            const availableQty = cartQuantities.get(productId) || 0;
            const possibleBundles = Math.floor(availableQty / requiredQty);
            bundleCount = Math.min(bundleCount, possibleBundles);
          }
          
          if (bundleCount > 0) {
            checkoutItems.push({
              variantId: bundle.variantId,
              handle: bundle.handle,
              quantity: bundleCount
            });
            
            // Subtract used quantities and add remaining items
            for (const [productId, requiredQty] of bundleQuantities.entries()) {
              const usedQty = requiredQty * bundleCount;
              const availableQty = cartQuantities.get(productId) || 0;
              const remainingQty = availableQty - usedQty;
              
              if (remainingQty > 0) {
                // Find the original item and add remaining quantity
                const originalItem = bundleItems.find(item => item.id === productId);
                if (originalItem) {
                  nonBundleItems.push({
                    ...originalItem,
                    quantity: remainingQty,
                    bundleId: undefined, // Remove bundle metadata
                    bundleVariantId: undefined,
                    bundleHandle: undefined,
                  });
                }
              }
            }
          } else {
            // Can't form bundle, add items individually
            nonBundleItems.push(...bundleItems);
          }
        } else {
          // Can't form bundle, add items individually
          nonBundleItems.push(...bundleItems);
        }
      });
      
      // Add non-bundle items
      nonBundleItems.forEach(item => {
        checkoutItems.push({
          variantId: item.variantId,
          handle: item.handle,
          quantity: item.quantity
        });
      });
      
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: checkoutItems
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Open Shopify checkout - use same window on mobile, new tab on desktop
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        // On mobile, open in same window (better UX)
      window.location.href = data.checkoutUrl;
      } else {
        // On desktop, open in new tab
        window.open(data.checkoutUrl, '_blank');
      }
      
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        variant: "destructive",
        title: "Checkout Error",
        description: error.message || "Failed to start checkout process.",
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50" onClick={toggleCart}>
      <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-purple-900/95 backdrop-blur-sm text-white flex flex-col shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b border-purple-500/30">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <Button variant="ghost" size="icon" onClick={toggleCart}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex-grow p-6 overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-center text-purple-300">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {(() => {
                // Group items for display (bundles as single items, others individually)
                const displayItems = [];
                const processedIndices = new Set();
                
                // Group items by bundleId
                const itemsByBundle = {};
                items.forEach((item, index) => {
                  if (item.bundleId && item.bundleVariantId) {
                    if (!itemsByBundle[item.bundleId]) {
                      itemsByBundle[item.bundleId] = [];
                    }
                    itemsByBundle[item.bundleId].push({ item, index });
                  }
                });
                
                // Process bundles for display
                Object.keys(itemsByBundle).forEach(bundleId => {
                  const bundle = bundles.find(b => b.id === bundleId);
                  if (!bundle || !bundle.variantId) return;
                  
                  const bundleItems = itemsByBundle[bundleId];
                  
                  // Count quantities
                  const cartQuantities = new Map();
                  bundleItems.forEach(({ item }) => {
                    const qty = cartQuantities.get(item.id) || 0;
                    cartQuantities.set(item.id, qty + (item.quantity || 1));
                  });
                  
                  const bundleQuantities = new Map();
                  bundle.items.forEach(bundleItem => {
                    const qty = bundleQuantities.get(bundleItem.id) || 0;
                    bundleQuantities.set(bundleItem.id, qty + (bundleItem.quantity || 1));
                  });
                  
                  // Check if we can form bundles
                  let canFormBundle = true;
                  for (const [productId, requiredQty] of bundleQuantities.entries()) {
                    const availableQty = cartQuantities.get(productId) || 0;
                    if (availableQty < requiredQty) {
                      canFormBundle = false;
                      break;
                    }
                  }
                  
                  if (canFormBundle) {
                    let bundleCount = Infinity;
                    for (const [productId, requiredQty] of bundleQuantities.entries()) {
                      const availableQty = cartQuantities.get(productId) || 0;
                      const possibleBundles = Math.floor(availableQty / requiredQty);
                      bundleCount = Math.min(bundleCount, possibleBundles);
                    }
                    
                    if (bundleCount > 0) {
                      // Add bundle as display item
                      displayItems.push({
                        id: `bundle_${bundleId}`,
                        title: bundle.title,
                        price: bundle.price,
                        quantity: bundleCount,
                        image: bundle.image,
                        isBundle: true,
                        bundleId: bundleId,
                      });
                      
                      // Mark bundle items as processed
                      bundleItems.forEach(({ index }) => {
                        processedIndices.add(index);
                      });
                    }
                  }
                });
                
                // Add non-bundle items
                items.forEach((item, index) => {
                  if (!processedIndices.has(index)) {
                    displayItems.push(item);
                  }
                });
                
                return displayItems.map((displayItem) => (
                  <div key={displayItem.id} className="flex items-center gap-4 bg-purple-800/50 p-4 rounded-lg">
                    <img src={displayItem.image} alt={displayItem.title} className="h-20 w-20 rounded-md object-cover" />
                  <div className="flex-grow">
                      <p className="font-semibold">{displayItem.title}</p>
                      {displayItem.isBundle && (
                        <p className="text-xs text-purple-300 mb-1">Bundle</p>
                      )}
                      <p className="text-yellow-400">${displayItem.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                        <Button variant="outline" size="icon" onClick={() => {
                          if (displayItem.isBundle) {
                            // Remove entire bundle
                            const bundle = bundles.find(b => b.id === displayItem.bundleId);
                            if (bundle && bundle.items) {
                              bundle.items.forEach(bundleItem => {
                                for (let i = 0; i < bundleItem.quantity * displayItem.quantity; i++) {
                                  const cartItem = items.find(item => 
                                    item.id === bundleItem.id && item.bundleId === displayItem.bundleId
                                  );
                                  if (cartItem) {
                                    removeFromCart(cartItem.id);
                                  }
                                }
                              });
                            }
                          } else {
                            updateQuantity(displayItem.id, displayItem.quantity - 1);
                          }
                        }}>
                        <Minus className="h-4 w-4" />
                      </Button>
                        <span>{displayItem.quantity}</span>
                        <Button variant="outline" size="icon" onClick={() => {
                          if (displayItem.isBundle) {
                            // Add another bundle
                            const bundle = bundles.find(b => b.id === displayItem.bundleId);
                            if (bundle) {
                              // Add bundle items again
                              bundle.items.forEach(bundleItem => {
                                for (let i = 0; i < bundleItem.quantity; i++) {
                                  // Find or create item with bundle metadata
                                  const existingItem = items.find(item => 
                                    item.id === bundleItem.id && item.bundleId === displayItem.bundleId
                                  );
                                  if (existingItem) {
                                    updateQuantity(existingItem.id, existingItem.quantity + 1);
                                  } else {
                                    // This would require adding to cart, which is complex
                                    // For now, just update quantity if item exists
                                  }
                                }
                              });
                            }
                          } else {
                            updateQuantity(displayItem.id, displayItem.quantity + 1);
                          }
                        }}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                    <Button variant="ghost" size="icon" onClick={() => {
                      if (displayItem.isBundle) {
                        // Remove entire bundle
                        const bundle = bundles.find(b => b.id === displayItem.bundleId);
                        if (bundle && bundle.items) {
                          bundle.items.forEach(bundleItem => {
                            for (let i = 0; i < bundleItem.quantity * displayItem.quantity; i++) {
                              const cartItem = items.find(item => 
                                item.id === bundleItem.id && item.bundleId === displayItem.bundleId
                              );
                              if (cartItem) {
                                removeFromCart(cartItem.id);
                              }
                            }
                          });
                        }
                      } else {
                        removeFromCart(displayItem.id);
                      }
                    }}>
                    <Trash2 className="h-5 w-5 text-red-500" />
                  </Button>
                </div>
                ));
              })()}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-purple-500/30">
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-semibold">Subtotal</p>
            <p className="text-xl font-bold text-yellow-400">${subtotal.toFixed(2)}</p>
          </div>
          <Button 
            size="lg" 
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold disabled:opacity-50" 
            onClick={handleCheckout}
            disabled={items.length === 0 || isCheckingOut}
          >
            {isCheckingOut ? 'Processing...' : 'Checkout'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar; 