import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Check, Ruler, Heart, Minus, Plus } from 'lucide-react';
import { Product } from '../types';
import { formatTomans, toPersianDigits } from '../data/products';
import { SafeImage } from './SafeImage';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string, quantity: number) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: Product, e: React.MouseEvent) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
  const [isAddedAnimation, setIsAddedAnimation] = useState<boolean>(false);
  const [badImgs, setBadImgs] = useState<string[]>([]);

  const fullGallery =
    product && product.gallery && product.gallery.length > 0
      ? product.gallery
      : product
      ? [product.image]
      : [];
  const gallery = fullGallery.filter((g) => !badImgs.includes(g));
  const visibleGallery = gallery.length > 0 ? gallery : product ? [product.image] : [];
  const mainSrc =
    selectedImage && !badImgs.includes(selectedImage)
      ? selectedImage
      : visibleGallery[0] || (product ? product.image : '');

  const markBad = (src: string) => {
    setBadImgs((prev) => (prev.includes(src) ? prev : [...prev, src]));
  };

  useEffect(() => {
    if (product) {
      setSelectedImage(product.gallery && product.gallery.length > 0 ? product.gallery[0] : product.image);
      setSelectedSize(product.sizes[0] || '۳۸');
      setSelectedColor(product.colors[0]?.name || 'مشکی کلاغی');
      setQuantity(1);
      setIsSizeGuideOpen(false);
      setIsAddedAnimation(false);
      setBadImgs([]);
    }
  }, [product, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    setIsAddedAnimation(true);
    setTimeout(() => {
      onAddToCart(product, selectedSize, selectedColor, quantity);
      setTimeout(() => {
        setIsAddedAnimation(false);
        onClose();
      }, 350);
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fade-in select-none">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog Card */}
      <div className="bg-white dark:bg-[#181411] rounded-2xl sm:rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto z-10 border border-[#DDD5C9] dark:border-white/10 flex flex-col md:flex-row relative animate-pop text-right">
        
        {/* Left Column (in RTL: Lookbook Gallery) */}
        <div className="md:w-1/2 p-5 sm:p-7 flex flex-col justify-between bg-[#FAF7F2] dark:bg-[#14100E] border-b md:border-b-0 md:border-l border-[#DDD5C9] dark:border-white/10">
          
          {/* Main Visual Frame */}
          <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden bg-[#EDE6DD] dark:bg-[#1E1915] border border-[#DDD5C9] dark:border-white/10 shadow-md relative group">
            <SafeImage
              key={mainSrc}
              src={mainSrc}
              fallback={product.image}
              alt={product.title}
              onError={() => markBad(mainSrc)}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {product.badge && (
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md border border-white/15 text-white text-[10px] font-semibold px-3 py-1 rounded-full shadow-sm">
                {product.badge}
              </div>
            )}
          </div>

          {/* Gallery Thumbnails */}
          {visibleGallery.length > 1 && (
            <div className="flex items-center gap-2.5 mt-4 overflow-x-auto pb-1 no-scrollbar justify-center">
              {visibleGallery.map((img, idx) => (
                <button
                  key={img}
                  onClick={() => setSelectedImage(img)}
                  className={`w-14 h-18 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    mainSrc === img
                      ? 'border-[#7A5B36] dark:border-[#C5A880] shadow-md scale-105'
                      : 'border-[#DDD5C9] dark:border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <SafeImage
                    src={img}
                    fallback={product.image}
                    alt={`${product.title} — عکس ${toPersianDigits(idx + 1)}`}
                    onError={() => markBad(img)}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Purchase Options */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          
          <div className="space-y-4">
            
            {/* Top Toolbar: Code on Right, Actions on Left */}
            <div className="flex items-center justify-between pb-3.5 border-b border-[#DDD5C9] dark:border-white/10">
              <span
                className="font-latin text-[11px] uppercase tracking-wider text-[#7A5B36] dark:text-[#C5A880] font-bold"
                dir="ltr"
              >
                {product.code}
              </span>
              
              <div className="flex items-center gap-2">
                {onToggleWishlist && (
                  <button
                    onClick={(e) => onToggleWishlist(product, e)}
                    className={`w-8 h-8 rounded-full border transition-all flex items-center justify-center cursor-pointer ${
                      isWishlisted
                        ? 'bg-[#7A5B36] dark:bg-[#C5A880] border-[#7A5B36] dark:border-[#C5A880] text-white dark:text-[#120E0C]'
                        : 'border-[#DDD5C9] dark:border-white/15 text-[#55473D] dark:text-white/80 hover:text-white hover:bg-stone-800'
                    }`}
                    title={isWishlisted ? 'حذف از برگزیده‌ها' : 'افزودن به برگزیده‌ها'}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                )}
                
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full border border-[#DDD5C9] dark:border-white/15 text-[#55473D] dark:text-white/80 hover:text-white hover:bg-stone-800 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="بستن پنجره"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Title, Fabric, Price */}
            <div className="space-y-1.5">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[#181310] dark:text-white leading-snug">
                {product.title}
              </h2>
              <p className="text-xs text-[#6B5C51] dark:text-[#A89B90] leading-relaxed">
                {product.description}
              </p>
              <div className="flex items-center gap-2 pt-1 text-xs text-[#7A5B36] dark:text-[#C5A880]">
                <span>جنس پارچه:</span>
                <span className="font-bold text-[#181310] dark:text-white">{product.fabric}</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-3.5 rounded-2xl bg-[#FAF7F2] dark:bg-[#14100E] border border-[#DDD5C9] dark:border-white/10 flex items-center justify-between">
              <span className="text-xs text-[#6B5C51] dark:text-[#A89B90]">بهای اثر:</span>
              <span className="font-display text-lg font-extrabold text-[#6E4F2E] dark:text-[#E5CCA8]">
                {product.priceFormatted}
              </span>
            </div>

            {/* Size Selector */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#55473D] dark:text-[#A89B90] font-medium">انتخاب سایز:</span>
                <button
                  onClick={() => setIsSizeGuideOpen(!isSizeGuideOpen)}
                  className="text-[#7A5B36] dark:text-[#C5A880] hover:underline flex items-center gap-1 cursor-pointer font-medium text-[11px]"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>راهنمای سایز آتلیه</span>
                </button>
              </div>

              {isSizeGuideOpen && (
                <div className="p-3 bg-[#FAF7F2] dark:bg-[#14100E] border border-[#DDD5C9] dark:border-white/10 rounded-xl text-[11px] text-[#6B5C51] dark:text-[#A89B90] space-y-1 animate-fade-in leading-relaxed">
                  <div>• سایز ۱ (۳۶ تا ۳۸): دور سینه ۸۶-۹۲، دور کمر ۶۸-۷۴</div>
                  <div>• سایز ۲ (۴۰ تا ۴۲): دور سینه ۹۴-۱۰۰، دور کمر ۷۶-۸۲</div>
                  <div>• امکان شخصی‌دوزی و تغییر قد در آتلیه اصفهان فراهم است.</div>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => {
                  const isSelected = selectedSize === s;
                  return (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`min-w-11 h-9 px-3 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#181310] dark:bg-[#C5A880] border-[#181310] dark:border-[#C5A880] text-white dark:text-[#120E0C] shadow-sm'
                          : 'bg-white dark:bg-[#1E1915] border-[#DDD5C9] dark:border-white/10 text-[#55473D] dark:text-white hover:border-stone-400'
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color Selector */}
            <div className="space-y-2 pt-1">
              <span className="text-xs text-[#55473D] dark:text-[#A89B90] font-medium block">
                انتخاب رنگ:
              </span>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => {
                  const isSelected = selectedColor === c.name;
                  return (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#7A5B36]/15 dark:bg-[#C5A880]/15 border-[#7A5B36] dark:border-[#C5A880] text-[#7A5B36] dark:text-[#C5A880] font-bold shadow-sm'
                          : 'bg-white dark:bg-[#1E1915] border-[#DDD5C9] dark:border-white/10 text-[#55473D] dark:text-[#A89B90] hover:border-stone-400'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-stone-300 dark:border-white/20 shrink-0"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Stepper + Add to Cart Button */}
          <div className="pt-4 border-t border-[#DDD5C9] dark:border-white/10">
            <div className="flex items-center gap-2.5">
              
              {/* Stepper */}
              <div className="flex items-center gap-0.5 bg-[#FAF7F2] dark:bg-[#14100E] border border-[#DDD5C9] dark:border-white/10 rounded-full p-1 shrink-0">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 rounded-full bg-white dark:bg-[#1E1915] border border-[#DDD5C9] dark:border-white/10 text-[#181310] dark:text-white flex items-center justify-center hover:bg-[#7A5B36] hover:text-white dark:hover:bg-[#C5A880] dark:hover:text-[#120E0C] transition-colors cursor-pointer"
                  aria-label="کاهش تعداد"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-7 text-center text-xs font-bold text-[#181310] dark:text-white">
                  {toPersianDigits(quantity)}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 h-7 rounded-full bg-white dark:bg-[#1E1915] border border-[#DDD5C9] dark:border-white/10 text-[#181310] dark:text-white flex items-center justify-center hover:bg-[#7A5B36] hover:text-white dark:hover:bg-[#C5A880] dark:hover:text-[#120E0C] transition-colors cursor-pointer"
                  aria-label="افزایش تعداد"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              {/* Add to Cart CTA */}
              <button
                onClick={handleAdd}
                className={`flex-1 py-3 px-5 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer ${
                  isAddedAnimation
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#181310] hover:bg-[#2C231E] dark:bg-[#C5A880] dark:hover:bg-[#D4B890] text-[#F8F5F0] dark:text-[#120E0C]'
                }`}
              >
                {isAddedAnimation ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>به سبد خرید اضافه شد</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>افزودن به سبد خرید</span>
                  </>
                )}
              </button>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
