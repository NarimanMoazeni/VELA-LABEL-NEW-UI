import React from 'react';
import { Gem, Scissors, Ruler } from 'lucide-react';
import { Reveal } from './Reveal';

export const AtelierPhilosophy: React.FC = () => {
  const pillars = [
    {
      icon: Scissors,
      title: 'لایی‌کشی سنتی',
      subtitle: 'ایستایی ساختاریافته بدون تغییر فرم',
      description:
        'لایی اتویی مرغوب و آستر ابریشمی با تنفس‌پذیری بالا در تمامی برش‌های کتی.',
    },
    {
      icon: Gem,
      title: 'پارچه کرپ مازراتی و فاستونی',
      subtitle: 'بدون پرزدهی و بدون آبرفت',
      description:
        'انتخاب وسواس‌گونه پارچه‌های وارداتی درجه‌یک با ریزش شکیل روی خطوط اندام.',
    },
    {
      icon: Ruler,
      title: 'فیت اختصاصی آتلیه اصفهان',
      subtitle: 'متناسب با اندام شما',
      description:
        'الگوهای اختصاصی مزونی با امکان سفارش شخصی‌دوزی و تنظیم قد و سایز دقیق.',
    },
  ];

  return (
    <section
      id="atelier-philosophy"
      className="w-full bg-[#14100E] py-12 sm:py-16 border-y border-white/10 select-none"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12 space-y-2">
          <span 
            className="font-latin text-[10.5px] sm:text-xs text-[#C5A880] tracking-[0.25em] uppercase font-bold block"
            dir="ltr"
          >
            ATELIER CRAFTSMANSHIP • VELA LABEL
          </span>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white font-bold tracking-tight">
            اصالت دوخت در آتلیه ولا
          </h2>

          <p className="text-sm sm:text-base text-[#A89B90] leading-relaxed max-w-xl mx-auto font-normal">
            ترکیب هنر خیاطی سنتی با طراحی معاصر؛ زیبایی در تک‌تک کوک‌ها جریان دارد.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={idx} delay={idx * 100} className="h-full">
                <div
                  className="bg-[#181411] h-full p-6 sm:p-7 rounded-2xl sm:rounded-[24px] border border-white/10 flex flex-col space-y-3.5 group cursor-default shadow-md hover:border-[#C5A880]/50 hover:bg-[#1E1915] transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#C5A880]/10 border border-[#C5A880]/20 flex items-center justify-center text-[#C5A880] group-hover:bg-[#C5A880] group-hover:text-[#120E0C] transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-display text-base sm:text-lg text-white font-bold group-hover:text-[#C5A880] transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-xs text-[#C5A880] font-medium block">
                      {item.subtitle}
                    </span>
                  </div>

                  <p className="text-sm text-[#A89B90] leading-relaxed font-normal">
                    {item.description}
                  </p>

                  <div className="pt-3 mt-auto">
                    <div className="w-8 h-[2px] bg-white/15 group-hover:w-16 group-hover:bg-[#C5A880] transition-all duration-300 rounded-full" />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};
