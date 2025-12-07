import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += 1;
        return { ...state, items: updatedItems };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }
    }
    case 'REMOVE_FROM_CART': {
      const updatedItems = state.items.filter(item => item.id !== action.payload.id);
      return { ...state, items: updatedItems };
    }
    case 'UPDATE_QUANTITY': {
        const updatedItems = state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: action.payload.quantity }
              : item
          );
          return { ...state, items: updatedItems.filter(item => item.quantity > 0) };
    }
    case 'TOGGLE_CART': {
      return { ...state, isOpen: !state.isOpen };
    }
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
  });

  const addToCart = (item) => dispatch({ type: 'ADD_TO_CART', payload: item });
  const removeFromCart = (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  const updateQuantity = (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  const toggleCart = () => dispatch({ type: 'TOGGLE_CART' });

  // Add bundle to cart - uses bundle product if available, otherwise adds individual items
  const addBundleToCart = async (bundle) => {
    // If bundle has a variantId (Shopify bundle product), redirect to checkout for correct pricing
    if (bundle.variantId) {
      try {
        const response = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: [{
              variantId: bundle.variantId,
              handle: bundle.handle,
              quantity: 1
            }]
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to create checkout session');
        }

        // Redirect to Shopify checkout with bundle product
        window.location.href = data.checkoutUrl;
        return;
      } catch (error) {
        console.error('Bundle checkout error:', error);
        // Fall through to add individual items as fallback
      }
    }

    // Fallback: add individual items if no variantId or checkout failed
    if (bundle.items && Array.isArray(bundle.items)) {
      bundle.items.forEach(item => {
        for (let i = 0; i < item.quantity; i++) {
          addToCart(item);
        }
      });
    }
  };

  const buyNow = async (product) => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [{
            variantId: product.variantId,
            handle: product.handle,
            quantity: 1
          }]
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Shopify checkout
      window.location.href = data.checkoutUrl;
      
    } catch (error) {
      console.error('Buy now error:', error);
      throw error; // Re-throw so calling component can handle it
    }
  };

  // Buy bundle now - creates checkout with bundle product or individual items
  const buyBundleNow = async (bundle) => {
    try {
      // If bundle has a variantId (Shopify bundle product), use that
      if (bundle.variantId) {
        const response = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: [{
              variantId: bundle.variantId,
              handle: bundle.handle,
              quantity: 1
            }]
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to create checkout session');
        }

        // Redirect to Shopify checkout
        window.location.href = data.checkoutUrl;
        return;
      }

      // Fallback: use individual items if no variantId
      if (!bundle.items || !Array.isArray(bundle.items)) {
        throw new Error('Invalid bundle configuration');
      }

      const items = bundle.items.map(item => ({
        variantId: item.variantId,
        handle: item.handle,
        quantity: item.quantity || 1
      }));

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Shopify checkout
      window.location.href = data.checkoutUrl;
      
    } catch (error) {
      console.error('Buy bundle now error:', error);
      throw error;
    }
  };

  return (
    <CartContext.Provider value={{ ...state, addToCart, removeFromCart, updateQuantity, toggleCart, buyNow, addBundleToCart, buyBundleNow }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext); 