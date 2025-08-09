import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';

const products = [
    {
      id: 'prod_1',
      title: 'Booster Pack',
      price: 5,
      oldPrice: 6,
      image: '/images/products/packdemo1.png',
      variantId: 'gid://shopify/ProductVariant/1',
    },
    {
      id: 'prod_2',
      title: 'Crystal Starter Deck',
      price: 20,
      oldPrice: 25,
      image: '/images/products/crystaldemo1.png',
      variantId: 'gid://shopify/ProductVariant/2',
    },
    {
      id: 'prod_3',
      title: 'Lightning Starter Deck',
      price: 20,
      oldPrice: 25,
      image: '/images/products/lightningdemo1.png',
      variantId: 'gid://shopify/ProductVariant/3',
    },
    {
      id: 'prod_4',
      title: 'Dumoles Game Mat & Token Set',
      price: 25,
      oldPrice: 32,
      image: '/images/products/dumoledemo1.png',
      variantId: 'gid://shopify/ProductVariant/4',
    },
    {
      id: 'prod_5',
      title: "Guardian's Sanctuary Game Mat & Token Set",
      price: 25,
      oldPrice: 32,
      image: '/images/products/guardiandemo1.png',
      variantId: 'gid://shopify/ProductVariant/5',
    },
  ];

const ShopPage = () => {
  const { addToCart } = useCart();
  return (
    <div className="bg-[#1A103C] text-white min-h-screen">
      <Helmet>
        <title>Shop - Elekin TCG</title>
        <meta name="description" content="Shop for the latest Elekin TCG products and get exclusive rewards." />
      </Helmet>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-5xl lg:text-7xl font-bold mb-4">Elekin TCG Shop</h1>
          <p className="text-xl lg:text-2xl text-purple-200">
            The official place to get your Elekin TCG gear.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-purple-900/50 rounded-lg p-6 flex flex-col text-center shadow-lg hover:shadow-yellow-400/20 transition-shadow duration-300">
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.title} className="rounded-lg mb-4 h-64 object-cover mx-auto" />
                <h2 className="text-2xl font-bold mb-2 flex-grow">{product.title}</h2>
              </Link>
              <div className="flex justify-center items-center gap-4 mb-4">
                <p className="text-2xl font-bold text-yellow-400">${product.price}</p>
                <p className="text-lg text-gray-400 line-through">${product.oldPrice}</p>
              </div>
              <Button
                size="lg"
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage; 