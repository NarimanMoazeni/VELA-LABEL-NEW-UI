import React, { useState } from 'react';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { SafeImage } from './SafeImage';

interface ProductCardProps {
  product: Product;
  onOpenModal: (product: Product) => void;
  onQuickAdd: (product: Product, e: React.MouseEvent) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenModal,
  onQuickAdd,
  isWishlisted,
  onToggleWishlist,
  index = 0,
}) => {
  const all = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const [bad, setBad] = useState<string[]>([]);
  const [gIndex, setGIndex] = useState(0);
  const list = all.filter((g) => !bad.includes(g));
  const safeList = list.length > 0 ? list : [product.image];
  const current = Math.min(gIndex, safeList.length - 1);

  const markBad = (src: string) => {
    setBad((prev) => (prev.includes(src) ? prev : [...prev, src]));
  };

  const stepGallery = (e: React.MouseEvent) => {
    e.stopPropagation();
    setGIndex((prev) => (prev + 1) % safeList.length);
  };

  return (
    <div
      onClick={() => onOpenModal(product)}
      style={{ animationDelay: `${index * 80}ms` }}
      className="group relative flex flex-col w-full h-full bg-[#181411] dark:bg-[#181411] bg-white rounded-[22px] overflow-hidden border border-white/10 dark:border-white/10 border-stone-200 hover:border-[#C5A880]/70 dark:hover:border-[#C5A880]/70 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer stagger-item select-none text-right"
      id={`product-card-${product.id}`}
    >
      {/* 1. Visual Frame: 3:4 Aspect Ratio Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#1E1915] dark:bg-[#1E1915] bg-[#F7F4EE]">
        <SafeImage
          key={safeList[current]}
          src={safeList[current]}
          fallback={product.image}
          alt={product.title}
          onError={() => markBad(safeList[current])}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Top-Right Badge (RTL start) */}
        {product.badge && (
          <div className="absolute top-3.5 right-3.5 z-10">
            {product.badgeType === 'limited' ? (
              <span className="bg-black/60 dark:bg-black/60 bg-stone-900/80 backdrop-blur-md border border-white/15 text-white/95 text-[11px] font-medium px-3 py-1 rounded-full shadow-sm">
                {product.badge}
              </span>
            ) : (
              <span className="bg-[#C5A880] text-[#120E0C] text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                {product.badge}
              </span>
            )}
          </div>
        )}

        {/* Top-Left Wishlist Button (RTL end) */}
        <button
          onClick={(e) => onToggleWishlist(product, e)}
          className={`absolute top-3.5 left-3.5 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 z-10 cursor-pointer skip-delay active:scale-110 ${
            isWishlisted
              ? 'bg-[#C5A880] text-[#120E0C] shadow-md'
              : 'bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/15 text-white/90 hover:text-white'
          }`}
          title={isWishlisted ? 'حذف از برگزیده‌ها' : 'افزودن به برگزیده‌ها'}
          aria-label="افزودن به برگزیده‌ها"
        >
          <Heart
            className={`w-4 h-4 crossfade-icon ${
              isWishlisted ? 'fill-[#120E0C] text-[#120E0C]' : ''
            }`}
          />
        </button>

        {/* Bottom-Right Gallery Cycle Button */}
        {safeList.length > 1 && (
          <button
            onClick={stepGallery}
            className="absolute bottom-3.5 right-3.5 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/15 text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer z-10 active:scale-90"
            title="تصویر بعدی"
            aria-label="مشاهده تصویر بعدی"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

        {/* Bottom soft shadow vignette in dark mode */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      </div>

      {/* 2. Product Info Area (RTL right-aligned) */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between space-y-3">
        
        {/* Code & Title */}
        <div className="space-y-1">
          <div
            className="font-latin text-[10.5px] uppercase font-semibold text-[#8E827A] dark:text-[#8E827A] text-stone-500 tracking-wider"
            dir="ltr"
          >
            {product.code}
          </div>

          <h3 className="font-display text-base font-bold text-white dark:text-white text-stone-900 group-hover:text-[#C5A880] transition-colors leading-snug line-clamp-1">
            {product.title}
          </h3>
        </div>

        {/* Price */}
        <div className="font-display text-base font-extrabold text-[#E5CCA8] dark:text-[#E5CCA8] text-stone-900">
          {product.priceFormatted}
        </div>

        {/* Bottom Row: Swatches on Right + Cart Button on Left */}
        <div className="pt-2.5 border-t border-white/10 dark:border-white/10 border-stone-200 flex items-center justify-between">
          
          {/* Color Swatch Dots */}
          <div className="flex items-center gap-1.5">
            {product.colors.map((color, idx) => (
              <span
                key={idx}
                className="w-3.5 h-3.5 rounded-full border border-white/25 dark:border-white/25 border-stone-300 shadow-xs"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>

          {/* Circular Cart Action Button */}
          <button
            onClick={(e) => onQuickAdd(product, e)}
            className="w-9 h-9 rounded-full border border-[#C5A880]/40 hover:border-[#C5A880] bg-[#C5A880]/10 hover:bg-[#C5A880] text-[#C5A880] hover:text-[#120E0C] flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90 shadow-sm"
            title="انتخاب سایز و افزودن به سبد"
            aria-label="افزودن به سبد خرید"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>

        </div>

      </div>

    </div>
  );
};
