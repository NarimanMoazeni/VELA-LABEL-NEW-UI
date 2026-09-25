import React from 'react';
import { Send, Clock, Sparkles, Scissors, Gem, Ruler } from 'lucide-react';

export const AtelierConcierge: React.FC = () => {
  const pillars = [
    {
      icon: Scissors,
      title: 'لایی‌کشی سنتی اتویی',
      desc: 'ایستایی ساختاریافته بدون تغییر فرم و آسترکشی ابریشمی',
    },
    {
      icon: Gem,
      title: 'پارچه وارداتی درجه‌یک',
      desc: 'کرپ مازراتی و فاستونی ترک بدون چروک و بدون آبرفت',
    },
    {
      icon: Ruler,
      title: 'شخصی‌دوزی و تنظیم قد',
      desc: 'الگوی اختصاصی با امکان تنظیم اندازه دقیق در آتلیه اصفهان',
    },
  ];

  return (
    <section
      id="bespoke-appointment"
      className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 py-8 sm:py-12 select-none scroll-mt-20"
      aria-label="آتلیه و شخصی‌دوزی ولا"
    >
      <div className="relative rounded-3xl overflow-hidden bg-[#181411] dark:bg-[#181411] bg-white border border-white/10 dark:border-white/10 border-stone-200 p-6 sm:p-8 lg:p-10 shadow-xl">
        
        {/* Soft Ambient Radiance in Dark Mode */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#C5A880]/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[#3D2B1F]/30 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* Right Side (7 cols): Atelier Craftsmanship Story & 3 Pillars */}
          <div className="lg:col-span-7 space-y-5 text-right">
            
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span
                  className="font-latin text-[10.5px] sm:text-xs text-[#C5A880] tracking-[0.2em] uppercase font-bold"
                  dir="ltr"
                >
                  ATELIER CRAFTSMANSHIP • ISFAHAN
                </span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white dark:text-white text-stone-900 leading-snug">
                اصالت دوخت و شخصی‌دوزی در آتلیه ولا
              </h2>
              <p className="text-xs sm:text-sm text-[#A89B90] dark:text-[#A89B90] text-stone-600 leading-relaxed max-w-xl">
                تمام آثار کپسولی ولا با استانداردهای خیاطی سنتی مزونی در آتلیه اختصاصی اصفهان تولید و با کاور نفیس ارسال می‌شوند.
              </p>
            </div>

            {/* 3 Compact Feature Rows */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {pillars.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white/5 dark:bg-white/5 bg-[#FAF7F2] border border-white/5 dark:border-white/5 border-stone-200/80 space-y-1.5"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#C5A880]/15 flex items-center justify-center text-[#C5A880]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs sm:text-[13px] font-bold text-white dark:text-white text-stone-900">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-[#A89B90] dark:text-[#A89B90] text-stone-600 leading-normal">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Left Side (5 cols): Direct Telegram Concierge Card */}
          <div className="lg:col-span-5">
            <div className="p-5 sm:p-6 rounded-2xl bg-white/5 dark:bg-white/5 bg-[#FAF7F2] border border-white/10 dark:border-white/10 border-stone-200 text-right space-y-4 shadow-sm">
              
              <div className="flex items-center justify-between pb-3 border-b border-white/10 dark:border-white/10 border-stone-200 text-xs">
                <span className="font-bold text-white dark:text-white text-stone-900">
                  مشاوره سایز و سفارش آتلیه
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400 dark:text-emerald-400 text-emerald-600 font-semibold text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>پاسخگویی فعال</span>
                </span>
              </div>

              <p className="text-xs text-[#A89B90] dark:text-[#A89B90] text-stone-600 leading-relaxed">
                جهت راهنمایی سایز، درخواست تغییر قد مانتو یا هماهنگی پرو حضوری در آتلیه اصفهان، در تلگرام با ما گفتگو کنید.
              </p>

              <div className="space-y-2 pt-1">
                <a
                  href="https://t.me/velalabel"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-5 rounded-full bg-[#C5A880] hover:bg-[#D4B890] text-[#120E0C] font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-[#C5A880]/15 active:scale-95"
                >
                  <Send className="w-4 h-4 text-[#120E0C]" />
                  <span>گفتگو و ثبت سفارش در تلگرام</span>
                </a>

                <div className="flex items-center justify-center gap-2 text-[11px] text-[#A89B90] dark:text-[#A89B90] text-stone-500 pt-1">
                  <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
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
