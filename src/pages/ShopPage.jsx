import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Truck, ChevronLeft, ChevronRight, Clock, X, Store, Mail } from 'lucide-react';

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
  const [showPromoBanner, setShowPromoBanner] = useState(true);

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

  // Check if promo banner was dismissed
  useEffect(() => {
    const dismissed = localStorage.getItem('shopKickstarterBannerDismissed');
    if (dismissed) {
      setShowPromoBanner(false);
    }
  }, []);

  const handleDismissPromoBanner = () => {
    setShowPromoBanner(false);
    localStorage.setItem('shopKickstarterBannerDismissed', 'true');
  };

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

        {/* Available in Stores Link */}
        <motion.div 
          className="max-w-4xl mx-auto mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link to="/elekin/overview#where-to-find-elekin">
            <div className="bg-gradient-to-r from-green-500/20 via-yellow-500/20 to-purple-500/20 border-2 border-yellow-500/50 rounded-xl p-6 text-center hover:border-yellow-400 transition-all duration-300 cursor-pointer group">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Store className="w-6 h-6 text-yellow-400 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl lg:text-2xl font-bold text-yellow-400">Elekin Available in Stores</h3>
              </div>
              <p className="text-purple-200 text-sm md:text-base">
                Find Elekin at 3 locations across the US. View store locations, demo days, and tournament info →
              </p>
            </div>
          </Link>
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
            Limited Demo Day Edition products - <span className="text-red-400 font-bold">Limited quantities available!</span>
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
                Ending Soon
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

        {/* Wholesale Pricing Section */}
        <motion.div 
          className="max-w-4xl mx-auto mt-16 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-2 border-purple-500/50 rounded-lg p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Store className="w-8 h-8 text-yellow-400" />
              <h2 className="text-2xl lg:text-3xl font-bold text-yellow-400">Local Game Store Wholesale Pricing</h2>
            </div>
            <p className="text-lg text-purple-200 mb-6 max-w-2xl mx-auto">
              Are you a Local Game Store interested in carrying Elekin TCG products? 
              We offer competitive wholesale pricing for retailers.
            </p>
            <div className="flex items-center justify-center gap-2">
              <Mail className="w-5 h-5 text-purple-300" />
              <a 
                href="mailto:mark@elementalgames.gg?subject=Wholesale Pricing Inquiry"
                className="text-xl font-semibold text-yellow-400 hover:text-yellow-300 transition-colors underline"
              >
                mark@elementalgames.gg
              </a>
            </div>
            <p className="text-sm text-purple-300 mt-4">
              Please reach out to learn more about our wholesale program and pricing options.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Sticky Kickstarter Banner at Bottom */}
      <AnimatePresence>
        {showPromoBanner && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-green-600/95 to-emerald-600/95 border-t border-green-400/50 backdrop-blur-sm"
          >
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 relative">
              <button
                onClick={handleDismissPromoBanner}
                className="absolute top-0 right-0 md:right-4 text-green-200 hover:text-white transition-colors p-1"
                aria-label="Close banner"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <span className="text-lg">🚀</span>
                <span className="text-base md:text-lg font-semibold text-white">
                  Our Kickstarter is live! Help us fund Elekin&apos;s first set.
                </span>
              </div>
              <a
                href="https://www.kickstarter.com/projects/elemental-games/elekin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-white hover:bg-gray-100 text-green-700 font-bold px-6 py-1.5 text-sm rounded-lg whitespace-nowrap">
                  Back Us on Kickstarter →
                </Button>
              </a>
            </div>
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShopPage; 