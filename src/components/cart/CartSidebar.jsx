import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { X, Plus, Minus, Trash2 } from 'lucide-react';

const CartSidebar = () => {
  const { isOpen, toggleCart, items, updateQuantity, removeFromCart } = useCart();

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50">
      <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-purple-900/95 backdrop-blur-sm text-white flex flex-col shadow-2xl">
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
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-4 bg-purple-800/50 p-4 rounded-lg">
                  <img src={item.image} alt={item.title} className="h-20 w-20 rounded-md object-cover" />
                  <div className="flex-grow">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-yellow-400">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span>{item.quantity}</span>
                      <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                    <Trash2 className="h-5 w-5 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-purple-500/30">
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-semibold">Subtotal</p>
            <p className="text-xl font-bold text-yellow-400">${subtotal.toFixed(2)}</p>
          </div>
          <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold">
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar; 