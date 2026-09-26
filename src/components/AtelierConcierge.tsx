import React from 'react';
import { Send, Clock, Sparkles, Scissors, Gem, Ruler } from 'lucide-react';

export const AtelierConcierge: React.FC = () => {
  const pillars = [
    {
      icon: Scissors,
      title: 'لایی‌کشی سنتی اتویی',
      desc: 'ایستایی ساختاریافته و آسترکشی ابریشمی',
    },
    {
      icon: Gem,
      title: 'پارچه وارداتی درجه‌یک',
      desc: 'کرپ و فاستونی ترک بدون چروک',
    },
    {
      icon: Ruler,
      title: 'شخصی‌سازی قد و سایز',
      desc: 'الگوی اختصاصی متناسب با اندام شما',
    },
  ];

  return (
    <section
      id="bespoke-appointment"
      className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 py-6 sm:py-8 select-none scroll-mt-20"
      aria-label="آتلیه و شخصی‌دوزی ولا"
    >
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#EFEAE2] dark:bg-[#181411] border border-[#DDD5C9] dark:border-white/10 p-5 sm:p-6 lg:p-7 shadow-xs transition-colors duration-300">
        
        {/* Soft Ambient Radiance in Dark Mode */}
        <div className="absolute -right-20 -bottom-20 w-72 h-72 rounded-full bg-[#8C6D46]/8 dark:bg-[#C5A880]/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -top-20 w-72 h-72 rounded-full bg-[#8C6D46]/5 dark:bg-[#3D2B1F]/30 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
          
          {/* Right Side (7 cols): Atelier Craftsmanship Story & 3 Pillars */}
          <div className="lg:col-span-7 space-y-3.5 text-right">
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#7A5B36] dark:text-[#C5A880]" />
                <span
                  className="font-latin text-[10px] sm:text-xs text-[#7A5B36] dark:text-[#C5A880] tracking-[0.2em] uppercase font-bold"
                  dir="ltr"
                >
                  ATELIER CRAFTSMANSHIP • ISFAHAN
                </span>
              </div>
              <h2 className="font-display text-lg sm:text-xl lg:text-2xl font-bold text-[#181310] dark:text-white leading-snug">
                اصالت دوخت و شخصی‌دوزی در آتلیه ولا
              </h2>
              <p className="text-xs sm:text-[13px] text-[#52443A] dark:text-[#A89B90] leading-relaxed max-w-xl">
                دوخت سفارشی با پارچه‌های وارداتی ترک و امکان شخصی‌سازی دقیق قد و سایز در آتلیه اختصاصی اصفهان.
              </p>
            </div>

            {/* 3 Compact Feature Rows */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-0.5">
              {pillars.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#FAF7F2] dark:bg-white/5 border border-[#DDD5C9]/80 dark:border-white/5 space-y-1 hover:border-[#7A5B36]/30 dark:hover:border-[#C5A880]/30 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-md bg-[#7A5B36]/10 dark:bg-[#C5A880]/15 flex items-center justify-center text-[#7A5B36] dark:text-[#C5A880]">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <h3 className="text-xs font-bold text-[#181310] dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-[#5C4F44] dark:text-[#A89B90] leading-normal">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Left Side (5 cols): Direct Telegram Concierge Card */}
          <div className="lg:col-span-5">
            <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#FAF7F2] dark:bg-white/5 border border-[#DDD5C9]/80 dark:border-white/10 text-right space-y-3 shadow-2xs">
              
              <div className="flex items-center justify-between pb-2.5 border-b border-[#DDD5C9] dark:border-white/10 text-xs">
                <span className="font-bold text-[#181310] dark:text-white">
                  مشاوره سایز و سفارش شخصی‌دوزی
                </span>
                <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 px-2 py-0.5 rounded-full font-medium text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>پاسخگویی فعال</span>
                </span>
              </div>

              <p className="text-xs text-[#52443A] dark:text-[#A89B90] leading-relaxed">
                جهت راهنمایی اندازه، تغییر قد مانتو یا هماهنگی سفارش شخصی در آتلیه، با ما در ارتباط باشید.
              </p>

              <div className="space-y-1.5 pt-0.5">
                <a
                  href="https://t.me/velalabel"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-full bg-[#181310] hover:bg-[#2C231E] dark:bg-[#C5A880] dark:hover:bg-[#D4B890] text-[#F8F5F0] dark:text-[#120E0C] font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-xs hover:shadow-sm active:scale-95 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-[#F8F5F0] dark:text-[#120E0C]" />
                  <span>گفتگو و ثبت سفارش در تلگرام</span>
                </a>

                <div className="flex items-center justify-center gap-1.5 text-[10.5px] text-[#6B5C51] dark:text-[#A89B90] pt-0.5">
                  <Clock className="w-3 h-3 text-[#7A5B36] dark:text-[#C5A880]" />
                  <span>ساعات پاسخگویی: ۱۰ صبح الی ۸ شب</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
