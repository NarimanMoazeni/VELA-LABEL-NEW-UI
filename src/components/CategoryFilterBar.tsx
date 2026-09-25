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
      className="sticky top-[70px] sm:top-[88px] z-30 bg-[#120E0C]/90 backdrop-blur-md py-3.5 border-y border-white/10 select-none transition-all"
    >
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-3.5">
        
        {/* Category Pills (Horizontal Scroll on Mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-1.5 px-5 sm:px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer active:scale-95 ${
                  isActive
                    ? 'bg-[#C5A880] text-[#120E0C] font-bold shadow-md shadow-[#C5A880]/15'
                    : 'bg-[#181411] text-[#A89B90] hover:text-white hover:bg-[#1E1915] border border-white/10'
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
          <span className="text-[#A89B90] text-xs sm:text-sm whitespace-nowrap">
            نمایش <strong className="text-white font-bold">{toPersianDigits(productCount)}</strong> اثر
          </span>

          {/* Luxury Sort Dropdown */}
          <div className="relative" ref={sortRef}>
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 bg-[#181411] hover:bg-[#1E1915] border border-white/10 hover:border-white/20 px-4 py-2 rounded-full text-xs sm:text-sm text-white/90 font-medium transition-all shadow-sm cursor-pointer"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>{currentSortLabel}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#A89B90]" />
            </button>

            {isSortOpen && (
              <div className="absolute left-0 mt-2 w-52 bg-[#1A1613] border border-white/15 rounded-xl shadow-2xl py-1.5 z-50 overflow-hidden text-xs animate-fade-in">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      onSortChange(opt.value);
                      setIsSortOpen(false);
                    }}
                    className={`w-full text-right px-4 py-2.5 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer ${
                      sortBy === opt.value
                        ? 'text-[#C5A880] font-bold bg-[#C5A880]/10'
                        : 'text-[#A89B90]'
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
