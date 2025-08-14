import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import AddToCartButton from '@/components/cart/AddToCartButton';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

// This would typically come from an API, but we're using the local list for now
const products = [
    {
      id: 'prod_1',
      title: 'Booster Pack',
      price: 5,
      oldPrice: 6,
      image: '/images/products/demopack1.png',
      description: `Unleash the power of Kinbrold with Demo Day Edition Booster Packs!

Each pack contains 6 cards from the exclusive Demo Day Edition set - your chance to pull legendary Dragons and Elementalists before the official launch.

What's Inside:
- 5 cards from the Demo Day Edition set
- 1 guaranteed holographic card
- Chance to pull any of the 6 Epic Dragons
- Chance to pull any of the 4 Legendary Elementalists

Perfect for competitive players and collectors seeking the best and rarest cards in Elekin before anyone else.

Ages 10+`,
      variantId: 'gid://shopify/ProductVariant/9589326676208',
    },
    {
      id: 'prod_2',
      title: 'Crystal Starter Deck',
      price: 20,
      oldPrice: 25,
      image: '/images/products/crystaldemo1.png',
      description: `Harness the storm with the Crystal Starter Deck - Demo Day Edition!

Command the mighty Crystal Dragon, Diamoria, in this ready-to-play 40-card deck featuring resilient Water/Earth elemental combinations.

What's Included:
- 40-card constructed deck
- 3 Shield cards (all tiers)
- How to play card

Perfect for new players or anyone wanting to master the Crystal element's defensive strategies and shield restoration powers.

Ages 10+`,
      variantId: 'gid://shopify/ProductVariant/9589325398256',
    },
    {
      id: 'prod_3',
      title: 'Lightning Starter Deck',
      price: 20,
      oldPrice: 25,
      image: '/images/products/lightningdemo1.png',
      description: `Harness the storm with the Lightning Starter Deck - Demo Day Edition!

Command the legendary Lightning Dragon, Veton, in this ready-to-play 40-card deck featuring explosive Air/Fire elemental combinations.

What's Included:
- 40-card constructed deck
- 3 Shield cards (all tiers)
- How to play card

Perfect for new players or anyone wanting to master the Lightning element's devastating combo potential.

Ages 10+`,
      variantId: 'gid://shopify/ProductVariant/9589321892080',
    },
    {
      id: 'prod_4',
      title: 'Dumoles Game Mat & Token Set',
      price: 25,
      oldPrice: 32,
      image: '/images/products/dumoledemo1.png',
      description: `Play on an official Elekin Game Mat
- This product comes with 6 clear tokens and 3 purple "10" tokens for essence and shield tracking on your mat
- Rubberized bottom and colored stitched edges`,
      variantId: 'gid://shopify/ProductVariant/9600666566896',
    },
    {
      id: 'prod_5',
      title: "Guardian's Sanctuary Game Mat & Token Set",
      price: 25,
      oldPrice: 32,
      image: '/images/products/guardiandemo1.png',
      description: `Play on an official Elekin Game Mat
- This product comes with 6 clear tokens and 3 purple "10" tokens for essence and shield tracking on your mat
- Rubberized bottom and colored stitched edges`,
      variantId: 'gid://shopify/ProductVariant/9600667648240',
    },
  ];
  
const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart, buyNow } = useCart();
  const [isBuying, setIsBuying] = useState(false);
  const { toast } = useToast();
  const product = products.find(p => p.id === id);

  const handleBuyNow = async () => {
    setIsBuying(true);
    try {
      await buyNow(product);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Purchase Error",
        description: error.message || "Failed to start checkout process.",
      });
    } finally {
      setIsBuying(false);
    }
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="bg-[#1A103C] text-white min-h-screen">
      <Helmet>
        <title>{product.title} - Elekin TCG Shop</title>
        <meta name="description" content={product.description} />
      </Helmet>
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <img src={product.image} alt={product.title} className="rounded-lg shadow-lg" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <p className="text-3xl font-bold text-yellow-400">${product.price}</p>
                  <p className="text-xl text-gray-400 line-through">${product.oldPrice}</p>
                </div>
                <p className="text-lg text-purple-200 mb-8 whitespace-pre-wrap">{product.description}</p>
                <div className="mt-8 text-sm text-purple-300">
                  <p>Shipping calculated at checkout. Ships September 2025.</p>
                  <p>30-day return policy. <Link to="/return-policy" className="underline hover:text-yellow-400">Read more</Link>.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="mb-8">
              <div className="flex flex-col gap-4">
                <AddToCartButton product={product} />
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={handleBuyNow}
                  disabled={isBuying}
                  className="disabled:opacity-50"
                >
                  {isBuying ? 'Processing...' : 'Buy Now'}
                </Button>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4">Why not add...</h2>
            <div className="space-y-4">
              {products.filter(p => p.id !== id).slice(0, 3).map(p => (
                <div key={p.id} className="bg-purple-900/50 rounded-lg p-4 flex items-center gap-4">
                  <img src={p.image} alt={p.title} className="h-16 w-16 rounded-md object-cover" />
                  <div>
                    <Link to={`/product/${p.id}`}>
                      <p className="font-semibold hover:text-yellow-400">{p.title}</p>
                    </Link>
                    <p className="text-yellow-400">${p.price}</p>
                  </div>
                  <Button size="sm" className="ml-auto" onClick={() => addToCart(p)}>Add</Button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 lg:hidden">
          <div className="flex items-center gap-4 justify-center mb-8">
            <AddToCartButton product={product} />
            <Button 
              size="lg" 
              variant="outline" 
              onClick={handleBuyNow}
              disabled={isBuying}
              className="disabled:opacity-50"
            >
              {isBuying ? 'Processing...' : 'Buy Now'}
            </Button>
          </div>
        </div>
        <div className="mt-16 lg:hidden">
          <h2 className="text-3xl font-bold text-center mb-8">Why not add...</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.filter(p => p.id !== id).slice(0, 4).map(p => (
              <div key={p.id} className="bg-purple-900/50 rounded-lg p-6 flex flex-col text-center shadow-lg hover:shadow-yellow-400/20 transition-shadow duration-300">
                <Link to={`/product/${p.id}`}>
                  <img src={p.image} alt={p.title} className="rounded-lg mb-4 h-48 object-cover mx-auto" />
                  <h2 className="text-xl font-bold mb-2 flex-grow">{p.title}</h2>
                </Link>
                <div className="flex justify-center items-center gap-4 mb-4">
                  <p className="text-xl font-bold text-yellow-400">${p.price}</p>
                </div>
                <AddToCartButton product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage; 