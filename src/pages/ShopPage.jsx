import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Truck, Gift } from 'lucide-react';

const products = [
    {
      id: 'prod_1',
      title: 'Booster Pack',
      price: 5,
      oldPrice: 6,
      image: '/images/products/demopack1.png',
      variantId: 'gid://shopify/ProductVariant/47888806904048',
    },
    {
      id: 'prod_2',
      title: 'Crystal Starter Deck',
      price: 20,
      oldPrice: 25,
      image: '/images/products/crystaldemo1.png',
      variantId: 'gid://shopify/ProductVariant/9589325398256',
    },
    {
      id: 'prod_3',
      title: 'Lightning Starter Deck',
      price: 20,
      oldPrice: 25,
      image: '/images/products/lightningdemo1.png',
      variantId: 'gid://shopify/ProductVariant/9589321892080',
    },
    {
      id: 'prod_4',
      title: 'Dumoles Game Mat & Token Set',
      price: 25,
      oldPrice: 32,
      image: '/images/products/dumoledemo1.png',
      variantId: 'gid://shopify/ProductVariant/9600666566896',
    },
    {
      id: 'prod_5',
      title: "Guardian's Sanctuary Game Mat & Token Set",
      price: 25,
      oldPrice: 32,
      image: '/images/products/guardiandemo1.png',
      variantId: 'gid://shopify/ProductVariant/9600667648240',
    },
  ];

const ShopPage = () => {
  const { addToCart } = useCart();
  const [sparks, setSparks] = useState([]);

  // Generate sparkling particles on page load
  useEffect(() => {
    const generateSparks = () => {
      const newSparks = [];
      for (let i = 0; i < 15; i++) {
        newSparks.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 2,
          duration: 2 + Math.random() * 3,
        });
      }
      setSparks(newSparks);
    };

    generateSparks();
  }, []);

  return (
    <div className="bg-[#1A103C] text-white min-h-screen relative overflow-hidden">
      <Helmet>
        <title>Shop - Elekin TCG</title>
        <meta name="description" content="Shop for the latest Elekin TCG products and get exclusive rewards." />
      </Helmet>

      {/* Sparkling Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {sparks.map((spark) => (
          <motion.div
            key={spark.id}
            className="absolute"
            style={{ left: `${spark.x}%`, top: `${spark.y}%` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: spark.duration,
              delay: spark.delay,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Pre-Order Banner */}
        <motion.div 
          className="max-w-4xl mx-auto mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-lg p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Gift className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-bold text-yellow-400">Pre-Orders Live Now!</h2>
              <Gift className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Truck className="w-5 h-5 text-purple-200" />
              <p className="text-lg text-purple-200">
                Shipping begins in September 2025
              </p>
            </div>
            <div className="bg-purple-900/50 rounded-lg p-4 inline-block">
              <p className="text-lg font-semibold text-white mb-2">
                🎯 <span className="text-yellow-400">Bonus Wheel Spin</span> with every $25+ order!
              </p>
              <p className="text-purple-200">
                Win free packs, mats, decks, or discounts on your next purchase
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="max-w-4xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-yellow-400 to-purple-400 bg-clip-text text-transparent">
            Elekin TCG Shop
          </h1>
          <p className="text-xl lg:text-2xl text-purple-200">
            The official place to get your Elekin TCG gear.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {products.map((product, index) => (
            <motion.div 
              key={product.id} 
              className="bg-purple-900/50 rounded-lg p-6 flex flex-col text-center shadow-lg hover:shadow-yellow-400/20 transition-all duration-300 hover:transform hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
            >
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ShopPage; 