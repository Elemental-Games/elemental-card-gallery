import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { bundles } from '@/data/bundles';
import { Gift, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const BundleDetailPage = () => {
  const { id } = useParams();
  const { addBundleToCart, buyBundleNow } = useCart();
  const [isBuying, setIsBuying] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const { toast } = useToast();
  const bundle = bundles.find(b => b.id === id);
  
  // Set initial image when bundle loads
  useEffect(() => {
    if (bundle) {
      setCurrentImage(bundle.image);
    }
  }, [bundle]);
  
  const allImages = bundle?.secondaryImages 
    ? [bundle.image, ...bundle.secondaryImages]
    : bundle ? [bundle.image] : [];
  
  const nextImage = () => {
    const currentIdx = allImages.indexOf(currentImage || bundle?.image);
    const nextIdx = (currentIdx + 1) % allImages.length;
    setCurrentImage(allImages[nextIdx]);
  };
  
  const prevImage = () => {
    const currentIdx = allImages.indexOf(currentImage || bundle?.image);
    const prevIdx = currentIdx === 0 ? allImages.length - 1 : currentIdx - 1;
    setCurrentImage(allImages[prevIdx]);
  };

  const handleBuyNow = async () => {
    setIsBuying(true);
    try {
      await buyBundleNow(bundle);
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

  const handleAddToCart = () => {
    addBundleToCart(bundle);
    toast({
      title: "Bundle Added!",
      description: "Bundle items have been added to your cart.",
    });
  };

  if (!bundle) {
    return (
      <div className="bg-[#1A103C] text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Bundle not found</h1>
          <Link to="/shop" className="text-yellow-400 hover:underline">
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1A103C] text-white min-h-screen">
      <Helmet>
        <title>{bundle.title} - Elekin TCG Shop</title>
        <meta name="description" content={bundle.description} />
      </Helmet>
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Gift className="w-6 h-6 text-yellow-400" />
                  <span className="text-yellow-400 font-bold text-lg uppercase">Holiday Bundle</span>
                  <Gift className="w-6 h-6 text-yellow-400" />
                </div>
                <div className="relative group bg-purple-800/20 rounded-lg overflow-hidden flex items-center justify-center min-h-[500px]">
                  <motion.img 
                    key={currentImage || bundle.image}
                    src={currentImage || bundle.image} 
                    alt={bundle.title} 
                    className="rounded-lg shadow-lg border-2 border-yellow-400/20 w-full max-w-full object-contain"
                    style={{ imageRendering: 'auto', maxHeight: '600px' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    onError={(e) => {
                      // Fallback to first product image if bundle image doesn't exist
                      if (bundle.items && bundle.items.length > 0) {
                        e.target.src = bundle.items[0].image;
                      }
                    }}
                  />
                  {allImages.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 hover:bg-black/50 text-white"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 hover:bg-black/50 text-white"
                        onClick={nextImage}
                      >
                        <ChevronRight className="h-6 w-6" />
                      </Button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {allImages.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImage(img)}
                            className={`h-2 rounded-full transition-all ${
                              (currentImage || bundle.image) === img 
                                ? 'w-8 bg-yellow-400' 
                                : 'w-2 bg-white/50 hover:bg-white/75'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
                {bundle.secondaryImages && bundle.secondaryImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {allImages.map((img, idx) => (
                      <img 
                        key={idx} 
                        src={img} 
                        alt={`${bundle.title} view ${idx + 1}`} 
                        className={`rounded-lg shadow-md cursor-pointer transition-all ${
                          (currentImage || bundle.image) === img 
                            ? 'ring-2 ring-yellow-400 opacity-100' 
                            : 'hover:opacity-80 opacity-70'
                        }`}
                        onClick={() => setCurrentImage(img)}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-4">{bundle.title}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <p className="text-3xl font-bold text-yellow-400">${bundle.price}</p>
                  <p className="text-xl text-gray-400 line-through">${bundle.oldPrice}</p>
                  <span className="text-lg text-green-400 font-semibold">
                    Save ${bundle.oldPrice - bundle.price}!
                  </span>
                </div>
                <p className="text-lg text-purple-200 mb-8 whitespace-pre-wrap">{bundle.description}</p>

                {/* Bundle Contents */}
                <div className="mb-8 bg-purple-900/50 rounded-lg p-4">
                  <h3 className="text-xl font-bold text-yellow-400 mb-3">What's Included:</h3>
                  <ul className="space-y-2">
                    {bundle.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-purple-200">
                        <span className="text-yellow-400 font-bold">•</span>
                        <span className="flex-1">
                          {item.quantity > 1 ? `${item.quantity}x ` : ''}{item.title}
                        </span>
                        <span className="text-yellow-400">${item.price * (item.quantity || 1)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-4 border-t border-purple-700">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Regular Price:</span>
                      <span className="text-lg line-through text-gray-400">${bundle.oldPrice}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xl font-bold text-yellow-400">Bundle Price:</span>
                      <span className="text-2xl font-bold text-yellow-400">${bundle.price}</span>
                    </div>
                  </div>
                </div>

                {bundle.noDiscountCodes && (
                  <div className="mt-6 bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <span className="text-yellow-400 text-lg">⚠️</span>
                      <div>
                        <p className="text-sm font-semibold text-yellow-400 mb-1">
                          Discount Code Restriction
                        </p>
                        <p className="text-sm text-purple-200">
                          This bundle is already discounted and cannot be combined with other discount codes or promotions.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="mt-8 text-sm text-purple-300">
                  <p>Shipping calculated at checkout. Ships in 3-5 business days.</p>
                  <p>30-day return policy. <Link to="/return-policy" className="underline hover:text-yellow-400">Read more</Link>.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="mb-8">
              <div className="flex flex-col gap-4">
                <Button 
                  size="lg" 
                  className="w-full bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold"
                  onClick={handleAddToCart}
                >
                  Add Bundle to Cart
                </Button>
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
          </div>
        </div>
        <div className="mt-8 lg:hidden">
          <div className="flex items-center gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              className="bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold"
              onClick={handleAddToCart}
            >
              Add Bundle to Cart
            </Button>
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
      </div>
    </div>
  );
};

export default BundleDetailPage;

