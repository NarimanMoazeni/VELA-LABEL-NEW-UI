import React from 'react';
import { ArrowLeft, BadgeCheck, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { Reveal } from './Reveal';

interface CategoryPromoBannersProps {
  selectedCategory?: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryPromoBanners: React.FC<CategoryPromoBannersProps> = ({
  selectedCategory = 'all',
  onSelectCategory,
}) => {
  const trustItems = [
    {
      icon: BadgeCheck,
      title: 'ضمانت کیفیت',
      desc: 'تضمین اصالت کالا و دوخت مزونی',
    },
    {
      icon: ShieldCheck,
      title: 'پرداخت امن',
      desc: 'درگاه‌های معتبر بانکی و کارت‌به‌کارت',
    },
    {
      icon: Truck,
      title: 'ارسال سریع به سراسر کشور',
      desc: 'با بسته‌بندی ایمن و کاور اختصاصی',
    },
  ];

  const categoryCards = [
    {
      id: 'bespoke',
      title: 'شخصی‌دوزی مزون',
      image: '/products/cat-bespoke.webp',
    },
    {
      id: 'set',
      title: 'ست وست و شلوار',
      image: '/products/cat-set.webp',
    },
    {
      id: 'blazer',
      title: 'کت و بلیزر',
      image: '/products/cat-blazer.webp',
    },
  ];

  const handleCardClick = (cardId: string) => {
    if (cardId === 'bespoke') {
      onSelectCategory('bespoke');
      return;
    }
    // Toggle behavior: clicking an already active category returns to 'all'
    if (selectedCategory === cardId) {
      onSelectCategory('all');
    } else {
      onSelectCategory(cardId);
    }
  };

  return (
    <div className="w-full select-none">
      
      {/* 1. Refined, Decompressed Trust Strip */}
      <div className="w-full bg-[#EFE9E0] dark:bg-[#14100D] border-b border-stone-300/60 dark:border-white/10 py-4 sm:py-5 px-4 sm:px-8 transition-colors duration-300">
        <div className="w-full max-w-[1140px] mx-auto flex flex-col sm:flex-row items-center justify-around gap-5 sm:gap-0">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <React.Fragment key={idx}>
                <div className="flex items-center justify-center gap-3.5 sm:gap-4 px-4 sm:px-6">
                  {/* Right-Aligned Text Hierarchy */}
                  <div className="flex flex-col text-right">
                    <span className="text-xs sm:text-[13.5px] font-bold text-[#1C1613] dark:text-white leading-snug">
                      {item.title}
                    </span>
                    <span className="text-[11px] text-[#6B5D52] dark:text-[#9E9287] mt-0.5 leading-tight">
                      {item.desc}
                    </span>
                  </div>

                  {/* Minimalist Line Icon (Directly to the left of text in RTL) */}
                  <Icon
                    className="w-5 h-5 text-[#8C6D46] dark:text-[#D2B998] shrink-0"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Softened, Slender Vertical Divider ONLY between items */}
                {idx < trustItems.length - 1 && (
                  <div
                    className="hidden sm:block h-6 w-[1px] bg-stone-300/50 dark:bg-white/10 shrink-0"
                    aria-hidden="true"
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* 2. 3 Bespoke Category Showcase Cards (Primary Category Navigation with Crisp Photography) */}
      <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 pt-8 sm:pt-10 pb-8 sm:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {categoryCards.map((card, idx) => {
            const isActive = selectedCategory === card.id;
            return (
              <Reveal key={card.id} delay={idx * 70} className="h-full">
                <div
                  onClick={() => handleCardClick(card.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardClick(card.id);
                    }
                  }}
                  aria-pressed={isActive}
                  className={`group relative h-[150px] sm:h-[168px] lg:h-[180px] rounded-[20px] overflow-hidden border transition-all duration-300 cursor-pointer flex items-center justify-start px-6 sm:px-7 ${
                    isActive
                      ? 'border-[#C5A880] ring-2 ring-[#C5A880]/30 shadow-xl'
                      : 'border-stone-300/90 dark:border-white/12 hover:border-[#C5A880]/80 shadow-md hover:shadow-2xl'
                  }`}
                >
                  {/* Full-Card Seamless Editorial Image */}
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover object-left group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
                    loading="lazy"
                  />

                  {/* Theme-Aware Right-to-Left Gradient Overlay so Dynamic Text sits directly on the card image */}
                  <div className="absolute inset-0 cat-card-overlay pointer-events-none transition-opacity duration-300" />

                  {/* Dynamic Category Title + Arrow Overlay (Right side in RTL) */}
                  <div className="relative z-10 flex items-center gap-2.5 text-right mr-1">
                    <h3
                      className={`font-display text-base sm:text-lg lg:text-[19px] font-bold transition-colors leading-snug ${
                        isActive
                          ? 'text-[#8C6D46] dark:text-[#C5A880]'
                          : 'text-[#1C1613] dark:text-white group-hover:text-[#8C6D46] dark:group-hover:text-[#C5A880]'
                      }`}
                    >
                      {card.title}
                    </h3>
                    <ArrowLeft
                      className={`w-4 h-4 transition-all duration-300 ${
                        isActive
                          ? 'text-[#8C6D46] dark:text-[#C5A880] -translate-x-1'
                          : 'text-[#3A2E25] dark:text-white/85 group-hover:text-[#8C6D46] dark:group-hover:text-[#C5A880] group-hover:-translate-x-1'
                      }`}
                    />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Subtle Reset Filter Pill only when a specific category card is active */}
        {selectedCategory !== 'all' && (
          <div className="mt-4 flex items-center justify-end">
            <button
              onClick={() => onSelectCategory('all')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C6D46] dark:text-[#C5A880] hover:underline cursor-pointer px-3 py-1 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>نمایش همه محصولات</span>
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
