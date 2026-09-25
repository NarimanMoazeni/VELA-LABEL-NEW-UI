import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpDown, ChevronDown, Check } from 'lucide-react';
import { toPersianDigits } from '../data/products';

interface CategoryFilterBarProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  categories: Array<{ id: string; label: string; hasStar?: boolean }>;
  productCount: number;
  sortBy: string;
  onSortChange: (sortBy: string) => void;
}

export const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  categories,
  productCount,
  sortBy,
  onSortChange,
}) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const sortOptions = [
    { value: 'featured', label: 'جدیدترین‌ها' },
    { value: 'price-desc', label: 'قیمت: از بیشترین به کمترین' },
    { value: 'price-asc', label: 'قیمت: از کمترین به بیشترین' },
    { value: 'popular', label: 'محبوب‌ترین‌ها' },
  ];

  const currentSortLabel =
    sortOptions.find((opt) => opt.value === sortBy)?.label || 'جدیدترین‌ها';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      id="catalog-filter-bar"
      className="sticky top-16 sm:top-[72px] z-30 bg-[#120E0C]/95 dark:bg-[#120E0C]/95 bg-[#F6F2EC]/95 backdrop-blur-md py-3.5 border-y border-white/10 dark:border-white/10 border-stone-200 select-none transition-all shadow-xs"
    >
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-3.5">
        
        {/* Category Pills (Horizontal Scroll on Mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-1.5 px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer active:scale-95 ${
                  isActive
                    ? 'bg-[#C5A880] text-[#120E0C] font-bold shadow-md shadow-[#C5A880]/15'
                    : 'bg-[#181411] dark:bg-[#181411] bg-white text-[#A89B90] dark:text-[#A89B90] text-stone-700 hover:text-white dark:hover:text-white hover:text-stone-900 border border-white/10 dark:border-white/10 border-stone-300'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Count & Sort Selector */}
        <div className="flex items-center justify-between md:justify-end gap-5 w-full md:w-auto text-xs">
          
          {/* Active Product Count */}
          <span className="text-[#A89B90] dark:text-[#A89B90] text-stone-600 text-xs sm:text-sm whitespace-nowrap">
            نمایش <strong className="text-white dark:text-white text-stone-900 font-bold">{toPersianDigits(productCount)}</strong> اثر
          </span>

          {/* Luxury Sort Dropdown */}
          <div className="relative" ref={sortRef}>
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 bg-[#181411] dark:bg-[#181411] bg-white hover:bg-[#1E1915] border border-white/10 dark:border-white/10 border-stone-300 px-4 py-2 rounded-full text-xs sm:text-sm text-white/90 dark:text-white/90 text-stone-800 font-medium transition-all shadow-sm cursor-pointer"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>{currentSortLabel}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#A89B90] dark:text-[#A89B90] text-stone-500" />
            </button>

            {isSortOpen && (
              <div className="absolute left-0 mt-2 w-52 bg-[#1A1613] dark:bg-[#1A1613] bg-white border border-white/15 dark:border-white/15 border-stone-200 rounded-xl shadow-2xl py-1.5 z-50 overflow-hidden text-xs animate-fade-in text-right">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      onSortChange(opt.value);
                      setIsSortOpen(false);
                    }}
                    className={`w-full text-right px-4 py-2.5 flex items-center justify-between hover:bg-white/5 dark:hover:bg-white/5 hover:bg-stone-100 transition-colors cursor-pointer ${
                      sortBy === opt.value
                        ? 'text-[#C5A880] font-bold bg-[#C5A880]/10'
                        : 'text-[#A89B90] dark:text-[#A89B90] text-stone-700'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {sortBy === opt.value && (
                      <Check className="w-3.5 h-3.5 text-[#C5A880]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
