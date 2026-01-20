import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Truck, ChevronLeft, ChevronRight, AlertTriangle, Clock } from 'lucide-react';
import SubscribeButton from '@/components/SubscribeButton';
import KickstarterCountdown from '@/components/KickstarterCountdown';

const products = [
    {
      id: 'prod_1',
      title: 'Booster Pack',
      price: 5,
      oldPrice: 6,
      image: '/images/products/in-person/x-1pack.png',
      secondaryImages: [
        '/images/products/in-person/x-3packs.png',
        '/images/products/in-person/x-5packs.png',
        '/images/products/demopack1.png', // Original pack image last
      ],
      variantId: 'gid://shopify/ProductVariant/47888806904048',
      handle: 'booster-pack-demo-day-edition',
    },
    {
      id: 'prod_2',
      title: 'Crystal Starter Deck',
      price: 20,
      oldPrice: 25,
      image: '/images/products/crystaldemo1.png',
      variantId: 'gid://shopify/ProductVariant/47888803004656',
      handle: 'crystal-starter-deck',
    },
    {
      id: 'prod_3',
      title: 'Lightning Starter Deck',
      price: 20,
      oldPrice: 25,
      image: '/images/products/lightningdemo1.png',
      variantId: 'gid://shopify/ProductVariant/47888788717808',
      handle: 'lightning-starter-deck',
    },
    {
      id: 'prod_4',
      title: 'Dumoles Game Mat & Token Set',
      price: 25,
      oldPrice: 32,
      image: '/images/products/dumoledemo1.png',
      variantId: 'gid://shopify/ProductVariant/47917101121776',
      handle: 'dumoles-game-mat-token-set',
    },
    {
      id: 'prod_5',
      title: "Guardian's Sanctuary Game Mat & Token Set",
      price: 25,
      oldPrice: 32,
      image: '/images/products/guardiandemo1.png',
      variantId: 'gid://shopify/ProductVariant/47917102432496',
      handle: 'guardians-sanctuary-game-mat-token-set',
    },
  ];

const ShopPage = () => {
  const { addToCart } = useCart();
  const [sparks, setSparks] = useState([]);
  const [showCurtain, setShowCurtain] = useState(true);

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

  // Remove curtain overlay after animation completes
  useEffect(() => {
    if (!showCurtain) return;
    const timer = setTimeout(() => setShowCurtain(false), 1200);
    return () => clearTimeout(timer);
  }, [showCurtain]);

  return (
    <div className="bg-[#1A103C] text-white min-h-screen relative overflow-hidden">
      <Helmet>
        <title>Shop - Elekin TCG</title>
        <meta name="description" content="Shop for the latest Elekin TCG products and get exclusive rewards." />
      </Helmet>

      {/* Curtain Opening Overlay */}
      {showCurtain && (
        <div className="absolute inset-0 z-50 pointer-events-none">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: '-100%' }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="absolute left-0 top-0 h-full w-1/2 bg-[#1A103C] border-r-2 border-yellow-400 shadow-[inset_-10px_0_30px_rgba(0,0,0,0.4)]"
          />
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: '100%' }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="absolute right-0 top-0 h-full w-1/2 bg-[#1A103C] border-l-2 border-yellow-400 shadow-[inset_10px_0_30px_rgba(0,0,0,0.4)]"
          />

        </div>
      )}

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
        {/* Scarcity Alert Banner */}
        <motion.div 
          className="max-w-4xl mx-auto mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border-2 border-red-500/50 rounded-lg p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              <h2 className="text-2xl lg:text-3xl font-bold text-red-400">⚠️ Demo Day Edition Ends February 17th</h2>
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <p className="text-lg font-semibold text-white mb-2">
              These exclusive products will <span className="text-red-400 font-bold">disappear forever</span> when our Kickstarter launches!
            </p>
            <p className="text-purple-200">
              Stock is limited and will not be restocked. Get yours before they're gone!
            </p>
          </div>
        </motion.div>

        {/* Promotions Banner */}
        <motion.div 
          className="max-w-4xl mx-auto mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/50 rounded-lg p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Truck className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-purple-400">Free Shipping on Orders $50+</h2>
              <Truck className="w-6 h-6 text-purple-400" />
            </div>
            <div className="bg-purple-900/50 rounded-lg p-4 inline-block mt-4">
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
            Limited Demo Day Edition products - <span className="text-red-400 font-bold">Only available until February 17th!</span>
          </p>
        </motion.div>

        {/* Individual Products Section */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 via-yellow-400 to-purple-400 bg-clip-text text-transparent">
            Individual Products
          </h2>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {products.map((product, index) => {
            const ProductImageCarousel = ({ product }) => {
              const [currentImageIndex, setCurrentImageIndex] = useState(0);
              const allImages = product.secondaryImages 
                ? [product.image, ...product.secondaryImages]
                : [product.image];
              
              const nextImage = (e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
              };
              
              const prevImage = (e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
              };
              
              return (
                <div className="relative group">
                  <Link to={`/product/${product.id}`} className="block">
                    <div className="relative overflow-hidden rounded-lg mb-4 h-64 flex items-center justify-center bg-purple-800/20">
                      <motion.img 
                        key={currentImageIndex}
                        src={allImages[currentImageIndex]} 
                        alt={`${product.title} - Image ${currentImageIndex + 1}`}
                        className={`w-full h-full mx-auto ${
                          product.title.toLowerCase().includes('deck') 
                            ? 'object-contain' 
                            : 'object-cover'
                        }`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      {allImages.length > 1 && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 hover:bg-black/50 text-white"
                            onClick={prevImage}
                          >
                            <ChevronLeft className="h-5 w-5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 hover:bg-black/50 text-white"
                            onClick={nextImage}
                          >
                            <ChevronRight className="h-5 w-5" />
                          </Button>
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {allImages.map((_, idx) => (
                              <div
                                key={idx}
                                className={`h-1.5 rounded-full transition-all ${
                                  idx === currentImageIndex 
                                    ? 'w-6 bg-yellow-400' 
                                    : 'w-1.5 bg-white/50'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </Link>
                </div>
              );
            };
            
            return (
            <motion.div 
              key={product.id} 
              className="bg-purple-900/50 rounded-lg p-6 flex flex-col text-center shadow-lg hover:shadow-yellow-400/20 transition-all duration-300 hover:transform hover:scale-105 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
            >
              {/* Limited Edition Badge */}
              <div className="absolute top-3 right-3 bg-red-500/90 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 z-10">
                <Clock className="w-3 h-3" />
                Ends Feb 17
              </div>
              
                <ProductImageCarousel product={product} />
              <Link to={`/product/${product.id}`}>
                <h2 className="text-2xl font-bold mb-2 flex-grow">{product.title}</h2>
              </Link>
              
              {/* Demo Day Edition Badge */}
              <div className="mb-2">
                <span className="inline-block bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold">
                  Demo Day Edition
                </span>
              </div>
              
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
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default ShopPage; 