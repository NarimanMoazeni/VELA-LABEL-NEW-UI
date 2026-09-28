import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronRight, ChevronLeft, ArrowLeft, Feather } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface HeroProps {
  onExploreClick: () => void;
  onOpenQuickView: (product: Product) => void;
  featuredProducts?: Product[];
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onOpenQuickView,
  featuredProducts = [],
}) => {
  const pool = featuredProducts.length > 0 ? featuredProducts : PRODUCTS.slice(0, 3);

  // 3 Wide Panoramic Neutral-Architecture Hero Slides with Consistent Subject Scale & Art Direction
  const slides = [
    {
      product: pool[0] || PRODUCTS[0],
      image: '/products/hero-slide-1.webp',
      title: pool[0]?.title || 'ست وست و شلوار شکلاتی ولا',
      categoryType: 'set',
      slideClassName: 'hero-slide-img-0',
      tagline: 'طراحی انحصاری ست سه‌تکه با ایستایی شکیل و خط اتوی ماندگار؛ دوخته‌شده با متریال بافت‌دار پاییزه در آتلیه اختصاصی اصفهان.',
    },
    {
      product: pool[1] || PRODUCTS[1],
      image: '/products/hero-slide-2.webp',
      title: pool[1]?.title || 'کت تک کلاسیک مشکی آدل',
      categoryType: 'blazer',
      slideClassName: 'hero-slide-img-1',
      tagline: 'کت تک کلاسیک با لایی‌کشی سنتی اتویی و آسترکشی تمام‌ابریشمی؛ تجسم کمال دوخت برای استایل‌های رسمی و باوقار.',
    },
    {
      product: pool[2] || PRODUCTS[2],
      image: '/products/hero-slide-3.webp',
      title: pool[2]?.title || 'کت تک مزونی مشکی لورن',
      categoryType: 'blazer',
      slideClassName: 'hero-slide-img-2',
      tagline: 'برش مینیمال مدرن با جیب‌های شکافی مخفی و خط شانه ساختاریافته؛ گزینه‌ای فاخر و بی‌پیرایه برای کژوال اسمارت.',
    },
  ];

  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const go = useCallback(
    (d: 1 | -1) => {
      if (slides.length < 2) return;
      setIndex((prev) => (prev + d + slides.length) % slides.length);
    },
    [slides.length]
  );

  const goTo = useCallback(
    (i: number) => {
      if (i === index || slides.length < 2) return;
      setIndex(i);
    },
    [index, slides.length]
  );

  useEffect(() => {
    if (slides.length <= 1 || isHovered) return;
    const timer = setInterval(() => {
      go(1);
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length, isHovered, go]);

  // Touch swipe support for mobile
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const diffY = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX < 0) {
        go(1);
      } else {
        go(-1);
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const current = slides[index] || slides[0];

  return (
    <section
      className="w-full relative overflow-hidden select-none bg-[#F6F2EC] dark:bg-[#120E0C] min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] h-[78vh] max-h-[820px] flex items-center border-b border-stone-300/80 dark:border-white/10 transition-colors duration-300"
      aria-label="کمپین پاییز و زمستان ولا لیبل"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 100% Full-Bleed Panoramic Slide Images with Slide-Specific Focal Positioning */}
      <div className="absolute inset-0 pointer-events-none">
        {slides.map((s, idx) => {
          const isActive = idx === index;
          return (
            <div
              key={s.image}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Neutral Architectural Fashion Image with Slide-Specific Top/Model Anchoring */}
              <img
                src={s.image}
                alt={s.title}
                className={`w-full h-full object-cover ${s.slideClassName} transition-transform duration-[1400ms] ease-out scale-100`}
                loading={idx === 0 ? 'eager' : 'lazy'}
              />

              {/* Desktop Theme-Aware Left Gradient (Controlled & Subtle: Fades to 0% before reaching the model!) */}
              <div className="absolute inset-0 hidden sm:block pointer-events-none hero-gradient-desktop transition-opacity duration-300" />

              {/* Mobile Theme-Aware Vertical Gradient (Protects model at top, provides text contrast at bottom) */}
              <div className="absolute inset-0 sm:hidden pointer-events-none hero-gradient-mobile transition-opacity duration-300" />

              {/* Subtle Top Edge Vignette */}
              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/10 dark:from-black/40 to-transparent pointer-events-none" />
            </div>
          );
        })}
      </div>

      {/* Persian Editorial Content Block (Asymmetric, Left-Safe Area, Strictly Isolated from Model) */}
      <div className="relative z-20 w-full max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-20 h-full flex items-center" dir="rtl">
        <div className="w-full sm:max-w-[540px] lg:max-w-[580px] mr-auto flex flex-col items-start text-right">
          
          {/* Eyebrow: Unified Capsule Campaign Tag */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/35 dark:bg-black/45 backdrop-blur-md border border-stone-400/30 dark:border-white/15 text-[#C5A880] mb-3.5 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
            <span
              className="font-latin text-[11px] sm:text-[11.5px] font-semibold tracking-[0.24em] text-[#C5A880] uppercase"
              dir="ltr"
            >
              AUTUMN / WINTER 2026
            </span>
            <span className="text-white/40 text-xs">•</span>
            <span className="font-sans text-[11px] font-medium text-white/90">
              کالکشن کپسولی
            </span>
          </div>

          {/* Main Persian Campaign Headline: Strict Estedad 800 Display Font */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[50px] xl:text-[54px] font-extrabold text-stone-950 dark:text-white tracking-tight leading-[1.16] drop-shadow-sm">
            اصالت، وقار و سادگی
          </h1>

          {/* Dynamic Slide Subtitle & Look Indicator: Strict Vazirmatn Font */}
          <div className="flex items-center gap-2 mt-3.5 mb-2.5">
            <span className="font-sans text-xs sm:text-sm font-bold text-[#C5A880] tracking-wide">
              لوک ۰{index + 1}:
            </span>
            <h2 className="font-sans text-sm sm:text-base lg:text-[17px] font-semibold text-stone-800 dark:text-[#E8DDD0]">
              {current.title}
            </h2>
          </div>

          {/* Tailored Poetic Description: Strict Vazirmatn Font */}
          <p className="font-sans text-xs sm:text-[13.5px] lg:text-sm text-stone-700 dark:text-[#C5B8AB] leading-[1.85] max-w-[480px] mb-6 sm:mb-8 font-normal">
            {current.tagline}
          </p>

          {/* Editorial Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Primary Action Button (Right in RTL) */}
            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#C5A880] hover:bg-[#D4B890] text-[#120E0C] font-sans font-bold px-7 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer text-xs sm:text-sm"
            >
              <span>مشاهده کلکسیون</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Secondary Action Button (Left in RTL) */}
            <button
              onClick={() => onOpenQuickView(current.product)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-stone-400/40 dark:border-white/20 hover:border-stone-500 dark:hover:border-white/40 bg-white/70 dark:bg-black/40 hover:bg-white dark:hover:bg-black/60 text-stone-900 dark:text-white font-sans font-medium px-6 py-3 rounded-full backdrop-blur-md transition-all duration-200 active:scale-95 cursor-pointer text-xs sm:text-sm"
            >
              <span>جزئیات و سفارش اثر</span>
            </button>
          </div>

          {/* Grounded Slider Indicator & Navigation */}
          <div className="mt-6 sm:mt-8 flex items-center gap-3 bg-white/75 dark:bg-black/40 backdrop-blur-md border border-stone-300/80 dark:border-white/15 px-3.5 py-1.5 rounded-full shadow-xs">
            <div className="flex items-center gap-1.5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === index
                      ? 'w-6 bg-[#C5A880]'
                      : 'w-1.5 bg-stone-300 dark:bg-white/30 hover:bg-stone-400 dark:hover:bg-white/60'
                  }`}
                  aria-label={`اسلاید ${idx + 1}`}
                />
              ))}
            </div>
            <div className="w-[1px] h-3 bg-stone-300 dark:bg-white/20" />
            <span
              className="font-latin text-[11px] font-bold text-[#8C6D46] dark:text-[#C5A880] tracking-wider"
              dir="ltr"
            >
              0{index + 1} / 0{slides.length}
            </span>
          </div>

        </div>
      </div>

      {/* Bottom-Right Floating Glass Badge */}
      <div className="absolute bottom-6 right-6 sm:right-12 z-20 pointer-events-auto hidden min-[480px]:inline-flex items-center gap-2 bg-white/80 dark:bg-black/50 backdrop-blur-md border border-stone-300/80 dark:border-white/20 text-stone-800 dark:text-[#EAE0D5] text-xs font-sans font-medium px-4 py-2 rounded-full shadow-sm">
        <Feather className="w-3.5 h-3.5 text-[#8C6D46] dark:text-[#C5A880]" />
        <span>طراحی و دوخت اختصاصی</span>
      </div>

      {/* Circular Edge Navigation Chevrons */}
      {slides.length > 1 && (
        <>
          <button
            onClick={() => go(1)}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 dark:bg-black/40 hover:bg-white dark:hover:bg-black/75 backdrop-blur-md border border-stone-300/80 dark:border-white/20 text-[#181310] dark:text-white flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90 z-30 shadow-xs"
            aria-label="اسلاید قبلی"
            title="قبلی"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => go(-1)}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 dark:bg-black/40 hover:bg-white dark:hover:bg-black/75 backdrop-blur-md border border-stone-300/80 dark:border-white/20 text-[#181310] dark:text-white flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90 z-30 shadow-xs"
            aria-label="اسلاید بعدی"
            title="بعدی"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </>
      )}

    </section>
  );
};
