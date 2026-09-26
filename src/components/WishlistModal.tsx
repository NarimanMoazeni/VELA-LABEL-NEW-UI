import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  items?: Product[];
  wishlist?: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  items,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const activeItems = items || wishlist || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in select-none">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="bg-white dark:bg-[#181411] rounded-2xl sm:rounded-3xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-hidden flex flex-col z-10 border border-[#DDD5C9] dark:border-white/10 animate-pop text-right">
        {/* Header */}
        <div className="p-5 bg-[#FAF7F2] dark:bg-[#14100E] border-b border-[#DDD5C9] dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Heart className="w-4 h-4 text-[#7A5B36] fill-[#7A5B36] dark:text-[#C5A880] dark:fill-[#C5A880]" />
            <h3 className="font-display text-lg text-[#181310] dark:text-white font-bold">
              لیست برگزیده‌ها
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 dark:bg-white/5 border border-[#DDD5C9] dark:border-white/10 text-[#4A3E36] dark:text-white/80 hover:text-white hover:bg-stone-800 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="بستن"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-3">
          {activeItems.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Heart className="w-10 h-10 text-[#7A5B36]/30 dark:text-[#C5A880]/30 mx-auto" />
              <p className="text-sm text-[#6B5C51] dark:text-[#A89B90]">هنوز اثری به برگزیده‌ها اضافه نشده است.</p>
            </div>
          ) : (
            activeItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF7F2] dark:bg-[#14100E] border border-[#DDD5C9] dark:border-white/10 gap-3"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-14 h-18 object-cover rounded-xl border border-[#DDD5C9] dark:border-white/10"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-[#181310] dark:text-white truncate">
                    {item.title}
                  </h4>
                  <div className="text-xs text-[#6B5C51] dark:text-[#A89B90] mt-0.5">{item.fabric}</div>
                  <div className="text-sm font-extrabold text-[#6E4F2E] dark:text-[#E5CCA8] mt-1 font-display">{item.priceFormatted}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onAddToCart(item)}
                    className="p-2.5 rounded-full bg-[#181310] dark:bg-[#C5A880] text-white dark:text-[#120E0C] hover:bg-[#2C231E] dark:hover:bg-[#D4B890] transition-colors cursor-pointer shadow-sm"
                    title="مشاهده و افزودن به سبد"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-white dark:text-[#120E0C]" />
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(item)}
                    className="p-2.5 rounded-full bg-stone-100 dark:bg-white/5 border border-[#DDD5C9] dark:border-white/10 text-[#8E827A] hover:text-red-500 transition-colors cursor-pointer"
                    title="حذف"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
