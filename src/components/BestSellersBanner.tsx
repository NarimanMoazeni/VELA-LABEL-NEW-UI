import React from 'react';

export const BestSellersBanner: React.FC = () => {
  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 pt-8 sm:pt-12 pb-4 select-none">
      <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#181411] border border-white/10 p-6 sm:p-8 lg:p-10 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        {/* Subtle Ambient Diagonal Light */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#3D2B1F]/30 rounded-full blur-[80px] pointer-events-none" />

        {/* Right Side: Persian Title & English Tag */}
        <div className="relative z-10 flex flex-col text-right space-y-2">
          <div className="flex items-center gap-3">
            <span
              className="font-latin text-xs text-[#C5A880] tracking-[0.25em] uppercase font-bold"
              dir="ltr"
            >
              BEST SELLERS
            </span>
            <div className="w-10 h-[1.5px] bg-[#C5A880] rounded-full" />
          </div>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug">
            پرفروش‌ترین محصولات
          </h2>

          <p className="text-sm sm:text-base text-[#A89B90] font-normal leading-relaxed">
            محبوب‌ترین انتخاب‌های شما، با بالاترین رضایت
          </p>
        </div>

        {/* Left Side: Poetic Quote */}
        <div className="relative z-10 hidden sm:flex flex-col text-left md:text-left border-r md:border-r-0 md:border-l border-white/10 pr-4 md:pr-0 md:pl-6">
          <span className="font-serif italic text-base sm:text-lg text-[#EAE0D5] font-medium leading-relaxed" dir="rtl">
            «کیفیت، سبک و اصالت
          </span>
          <span className="font-serif italic text-base sm:text-lg text-[#C5A880] font-medium leading-relaxed" dir="rtl">
            در هر انتخاب شماست.»
          </span>
        </div>

      </div>
    </div>
  );
};
