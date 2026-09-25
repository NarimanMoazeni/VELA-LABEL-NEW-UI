import React from 'react';
import { Send, Clock, CalendarCheck, Sparkles } from 'lucide-react';

interface BespokeBannerProps {
  onOpenCart?: () => void;
}

export const BespokeBanner: React.FC<BespokeBannerProps> = () => {
  return (
    <section id="bespoke-appointment" className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 py-10 sm:py-14 select-none scroll-mt-28">
      <div className="bg-[#181411] text-[#FAF6F0] rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl border border-white/10">
        
        {/* Soft Ambient Radiance */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#C5A880]/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[#3D2B1F]/30 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Main Copy */}
          <div className="lg:col-span-8 space-y-3.5 text-right">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C5A880]" />
              <span className="font-latin text-[10.5px] sm:text-[11px] text-[#C5A880] uppercase tracking-[0.2em] font-bold">
                ATELIER CONCIERGE & SIZING ✦
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-white">
              مشاوره سایز و سفارش شخصی‌دوزی
            </h2>

            <p className="text-sm sm:text-base text-[#A89B90] leading-relaxed max-w-2xl font-light">
              برای دریافت راهنمایی در خصوص اندازه‌گیری، انتخاب سایز ایده‌آل یا درخواست تغییر قد و جزئیات دوخت، کارشناسان آتلیه ولا در تلگرام همراه شما هستند.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="https://t.me/velalabel"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 py-3 px-8 rounded-full bg-[#C5A880] hover:bg-[#D4B890] text-[#120E0C] transition-all text-sm sm:text-base font-bold shadow-md shadow-[#C5A880]/20 active:scale-95"
              >
                <Send className="w-4 h-4 text-[#120E0C]" />
                <span>گفتگو و ثبت سفارش در تلگرام</span>
              </a>

              <div className="flex items-center gap-1.5 text-xs text-[#A89B90]">
                <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>ساعات پاسخگویی: ۱۰ صبح الی ۸ شب</span>
              </div>
            </div>
          </div>

          {/* Right Status Card */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="bg-white/5 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-white/10 space-y-3 max-w-xs w-full shadow-lg text-right">
              <div className="flex items-center gap-2 text-[#C5A880]">
                <CalendarCheck className="w-4 h-4" />
                <span className="text-xs font-bold text-white">خدمات پرو اختصاصی</span>
              </div>
              <p className="text-xs text-[#A89B90] leading-relaxed">
                امکان هماهنگی جهت پرو حضوری در آتلیه اصفهان و تحویل در کاور اختصاصی مزونی
              </p>
              <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-xs text-[#A89B90]">
                <span>پشتیبانی سفارشات</span>
                <span className="font-semibold text-emerald-400">آنلاین و فعال</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
