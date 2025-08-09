import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

const AddToCartButton = ({ product }) => {
  const { items, addToCart, updateQuantity } = useCart();
  const itemInCart = items.find(item => item.id === product.id);

  if (itemInCart) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => updateQuantity(product.id, itemInCart.quantity - 1)}>
          <Minus className="h-4 w-4" />
        </Button>
        <span className="text-lg font-bold w-12 text-center">{itemInCart.quantity}</span>
        <Button variant="outline" size="icon" onClick={() => updateQuantity(product.id, itemInCart.quantity + 1)}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold" onClick={() => addToCart(product)}>
      Add to Cart
    </Button>
  );
};

export default AddToCartButton; 