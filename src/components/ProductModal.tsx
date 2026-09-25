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
      <div className="bg-[#181411] rounded-2xl sm:rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto z-10 border border-white/10 flex flex-col md:flex-row relative animate-pop text-right">
        
        {/* Left Column (in RTL: Lookbook Gallery) */}
        <div className="md:w-1/2 p-5 sm:p-7 flex flex-col justify-between bg-[#14100E] border-b md:border-b-0 md:border-l border-white/10">
          
          {/* Main Visual Frame */}
          <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden bg-[#1E1915] border border-white/10 shadow-md relative group">
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
                      ? 'border-[#C5A880] shadow-md scale-105'
                      : 'border-white/10 opacity-70 hover:opacity-100'
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
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
              <span
                className="font-latin text-[11px] uppercase tracking-wider text-[#C5A880] font-bold"
                dir="ltr"
              >
                {product.code} • {product.categoryLabel}
              </span>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {onToggleWishlist && (
                  <button
                    onClick={(e) => onToggleWishlist(product, e)}
                    className="w-8 h-8 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white/90 hover:border-[#C5A880] transition-all cursor-pointer active:scale-110"
                    title={isWishlisted ? 'حذف از برگزیده‌ها' : 'افزودن به برگزیده‌ها'}
                    aria-label="افزودن به برگزیده‌ها"
                  >
                    <Heart
                      className={`w-4 h-4 crossfade-icon ${
                        isWishlisted ? 'fill-[#C5A880] text-[#C5A880]' : 'text-white/80'
                      }`}
                    />
                  </button>
                )}
                
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white/80 hover:text-white hover:border-white/30 transition-colors cursor-pointer"
                  aria-label="بستن پنجره"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Title, Fabric, Price */}
            <div className="space-y-1.5">
              <h2 className="font-display text-xl sm:text-2xl text-white font-bold tracking-tight">
                {product.title}
              </h2>
              <div className="text-xs text-[#A89B90] font-medium">{product.fabric} • {product.origin}</div>
              <div className="text-xl font-extrabold text-[#E5CCA8] pt-1">{product.priceFormatted}</div>
            </div>

            {/* Description */}
            <p className="text-sm text-[#A89B90] leading-relaxed font-normal">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">
                  انتخاب سایز: <strong className="text-[#C5A880]">{selectedSize}</strong>
                </span>
                <button
                  onClick={() => setIsSizeGuideOpen(!isSizeGuideOpen)}
                  className="flex items-center gap-1 text-xs text-[#C5A880] hover:text-white transition-colors cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>راهنمای سایز</span>
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2.5 rounded-xl text-sm font-bold border transition-all cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-[#C5A880] text-[#120E0C] border-[#C5A880] shadow-md font-bold'
                        : 'bg-[#1E1915] text-[#A89B90] border-white/10 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>

              {/* Size Guide Info */}
              {isSizeGuideOpen && (
                <div className="p-3 bg-[#14100E] rounded-xl border border-white/10 text-xs text-[#A89B90] space-y-1 animate-fade-in">
                  <div className="font-semibold text-white">استاندارد دور سینه و کمر آتلیه:</div>
                  <div>۳۶ (۸۴-۸۸) • ۳۸ (۸۸-۹۲) • ۴۰ (۹۲-۹۶) • ۴۲ (۹۶-۱۰۰)</div>
                  <div className="text-[11px] text-[#C5A880]">✦ امکان تنظیم قد و سایز سفارشی در تلگرام فراهم است.</div>
                </div>
              )}
            </div>

            {/* Color Swatches */}
            <div className="space-y-2.5">
              <span className="text-sm font-bold text-white">
                رنگ: <strong className="text-[#C5A880]">{selectedColor}</strong>
              </span>
              <div className="flex items-center gap-2.5">
                {product.colors.map((c) => {
                  const isSelected = selectedColor === c.name;
                  return (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#C5A880]/15 border-[#C5A880] text-[#C5A880] font-bold shadow-sm'
                          : 'bg-[#1E1915] border-white/10 text-[#A89B90] hover:border-white/25 hover:text-white'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0"
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
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center gap-2.5">
              
              {/* Stepper */}
              <div className="flex items-center gap-0.5 bg-[#14100E] border border-white/10 rounded-full p-1 shrink-0">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white/90 hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="کم کردن تعداد"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center text-sm font-extrabold text-white">
                  {toPersianDigits(quantity)}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(9, q + 1))}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white/90 hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="زیاد کردن تعداد"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cart CTA */}
              <button
                onClick={handleAdd}
                disabled={isAddedAnimation}
                className={`flex-1 py-3.5 px-5 rounded-full flex items-center justify-between gap-2 text-sm sm:text-base font-bold transition-all shadow-lg cursor-pointer ${
                  isAddedAnimation
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#C5A880] hover:bg-[#D4B890] text-[#120E0C] active:scale-[0.98]'
                }`}
              >
                {isAddedAnimation ? (
                  <span className="flex items-center justify-center gap-2 w-full">
                    <Check className="w-4 h-4 text-white" />
                    <span>به سبد اضافه شد</span>
                  </span>
                ) : (
                  <>
                    <span className="flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-[#120E0C]" />
                      <span>افزودن به سبد خرید</span>
                    </span>
                    <span className="font-extrabold">{formatTomans(product.price * quantity)}</span>
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
