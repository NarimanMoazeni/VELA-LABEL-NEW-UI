import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpDown, ChevronDown } from 'lucide-react';
import { toPersianDigits } from '../data/products';

interface CategoryFilterBarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  productCount: number;
}

export const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  productCount,
}) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all', label: 'همه محصولات' },
    { id: 'set', label: 'ست وست و شلوار' },
    { id: 'blazer', label: 'کت و بلیزر' },
    { id: 'bespoke', label: 'شخصی‌دوزی مزون' },
  ];

  const sortOptions = [
    { value: 'featured', label: 'منتخب مزون' },
    { value: 'price-desc', label: 'قیمت: از بیشترین' },
    { value: 'price-asc', label: 'قیمت: از کمترین' },
  ];

  const currentSortLabel =
    sortOptions.find((opt) => opt.value === sortBy)?.label || 'مرتب‌سازی';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      id="catalog-filter-bar"
      className="sticky top-16 sm:top-[72px] z-30 bg-[#F6F2EC]/95 dark:bg-[#120E0C]/95 backdrop-blur-md py-3.5 border-y border-[#DDD5C9] dark:border-white/10 select-none transition-all shadow-xs"
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
                    ? 'bg-[#7A5B36] dark:bg-[#C5A880] text-white dark:text-[#120E0C] font-bold shadow-md'
                    : 'bg-white dark:bg-[#181411] text-[#55473D] dark:text-[#A89B90] hover:text-[#181310] dark:hover:text-white border border-[#DDD5C9] dark:border-white/10'
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
          <span className="text-[#6B5C51] dark:text-[#A89B90] text-xs sm:text-sm whitespace-nowrap">
            نمایش <strong className="text-[#181310] dark:text-white font-bold">{toPersianDigits(productCount)}</strong> اثر
          </span>

          {/* Luxury Sort Dropdown */}
          <div className="relative" ref={sortRef}>
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 bg-white dark:bg-[#181411] hover:bg-stone-50 dark:hover:bg-[#1E1915] border border-[#DDD5C9] dark:border-white/10 px-4 py-2 rounded-full text-xs sm:text-sm text-[#181310] dark:text-white/90 font-medium transition-all shadow-sm cursor-pointer"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-[#7A5B36] dark:text-[#C5A880]" />
              <span>{currentSortLabel}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#6B5C51] dark:text-[#A89B90]" />
            </button>

            {isSortOpen && (
              <div className="absolute left-0 mt-2 w-52 bg-white dark:bg-[#1A1613] border border-[#DDD5C9] dark:border-white/15 rounded-xl shadow-2xl py-1.5 z-50 overflow-hidden text-xs animate-fade-in text-right">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      onSortChange(opt.value);
                      setIsSortOpen(false);
                    }}
                    className={`w-full text-right px-4 py-2.5 flex items-center justify-between hover:bg-stone-100 dark:hover:bg-white/5 transition-colors cursor-pointer ${
                      sortBy === opt.value
                        ? 'text-[#7A5B36] dark:text-[#C5A880] font-bold bg-[#7A5B36]/10 dark:bg-[#C5A880]/10'
                        : 'text-[#55473D] dark:text-[#A89B90]'
                    }`}
                  >
                    <span>{opt.label}</span>
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
