import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { motion } from 'framer-motion';
import { Gift, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const BundleCard = ({ bundle, index = 0 }) => {
  const { addBundleToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const allImages = bundle.secondaryImages 
    ? [bundle.image, ...bundle.secondaryImages]
    : [bundle.image];

  const handleAddToCart = () => {
    addBundleToCart(bundle);
  };
  
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
    <motion.div 
      className="bg-purple-900/50 rounded-lg p-6 flex flex-col text-center shadow-lg hover:shadow-yellow-400/20 transition-all duration-300 hover:transform hover:scale-105 border-2 border-yellow-400/30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
    >
      {/* Tier label (marketing) */}
      {bundle.tier && (
        <div className="mb-3">
          <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1 rounded-full bg-black/30 border border-yellow-400/30 text-yellow-200">
            {bundle.tier}
          </span>
        </div>
      )}
      {/* Bundle Badge */}
      <div className="flex items-center justify-center gap-2 mb-2">
        <Gift className="w-5 h-5 text-yellow-400" />
        <span className="text-yellow-400 font-bold text-sm uppercase">Holiday Bundle</span>
        <Gift className="w-5 h-5 text-yellow-400" />
      </div>

      <Link to={`/bundle/${bundle.id}`}>
        <div className="relative group mb-4">
          <div className="relative overflow-hidden rounded-lg h-80 border-2 border-yellow-400/20 bg-purple-800/20 flex items-center justify-center">
            <motion.img 
              key={currentImageIndex}
              src={allImages[currentImageIndex]} 
              alt={`${bundle.title} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-contain"
              style={{ imageRendering: 'auto' }}
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
        </div>
        <h2 className="text-2xl font-bold mb-2 flex-grow">{bundle.title}</h2>
      </Link>

      {/* Bundle Contents */}
      <div className="mb-4 text-left bg-purple-800/30 rounded-lg p-3">
        <p className="text-sm font-semibold text-yellow-400 mb-2">Includes:</p>
        <ul className="text-sm text-purple-200 space-y-1">
          {bundle.items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <span className="text-yellow-400">•</span>
              <span>{item.quantity > 1 ? `${item.quantity}x ` : ''}{item.title}</span>
            </li>
          ))}
        </ul>
        {bundle.noDiscountCodes && (
          <div className="mt-3 pt-3 border-t border-purple-700">
            <p className="text-xs text-yellow-400/80 italic">
              ⚠️ Cannot be combined with other discounts or promotions
            </p>
          </div>
        )}
      </div>

      {/* Pricing */}
      <div className="flex justify-center items-center gap-4 mb-4">
        <p className="text-2xl font-bold text-yellow-400">${bundle.price}</p>
        <p className="text-lg text-gray-400 line-through">${bundle.oldPrice}</p>
        <span className="text-sm text-green-400 font-semibold">
          Save ${bundle.oldPrice - bundle.price}!
        </span>
      </div>

      <Button
        size="lg"
        className="w-full bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold"
        onClick={handleAddToCart}
      >
        Add Bundle to Cart
      </Button>
    </motion.div>
  );
};

export default BundleCard;

