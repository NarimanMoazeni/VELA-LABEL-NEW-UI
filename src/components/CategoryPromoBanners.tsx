import React from 'react';
import { ArrowLeft, Award, ShieldCheck, Truck } from 'lucide-react';
import { Reveal } from './Reveal';

interface CategoryPromoBannersProps {
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryPromoBanners: React.FC<CategoryPromoBannersProps> = ({
  onSelectCategory,
}) => {
  const trustItems = [
    {
      icon: Award,
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
      imgStyle: 'object-cover object-top',
    },
    {
      id: 'set',
      title: 'ست وست و شلوار',
      image: '/products/cat-set.webp',
      imgStyle: 'object-cover object-top',
    },
    {
      id: 'blazer',
      title: 'کت و بلیزر',
      image: '/products/cat-blazer.webp',
      imgStyle: 'object-contain object-bottom',
      hasInnerFrame: true,
    },
  ];

  return (
    <div className="w-full select-none">
      
      {/* 1. Full-Width Integrated Trust Strip (directly under Hero, matching Reference 1 media_1790347087207.png) */}
      <div className="w-full bg-[#120E0C] dark:bg-[#120E0C] bg-[#F2EDE7] border-b border-[#2E251E] dark:border-white/10 border-stone-300 py-3.5 sm:py-4 px-4 sm:px-8">
        <div className="w-full max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-[#2E251E] dark:divide-white/10 divide-stone-300">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center justify-center gap-3 py-2.5 md:py-1 px-4 text-center md:text-right"
              >
                <div className="w-9 h-9 rounded-full bg-[#C5A880]/15 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-[#C5A880]" />
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-xs sm:text-sm font-bold text-white dark:text-white text-stone-900">
                    {item.title}
                  </span>
                  <span className="text-[11px] text-[#A89B90] dark:text-[#A89B90] text-stone-600">
                    {item.desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Visual Category Showcase Cards (matching Reference 2 media_1790347625640.png) */}
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {categoryCards.map((card, idx) => (
            <Reveal key={card.id} delay={idx * 80} className="h-full">
              <div
                onClick={() => onSelectCategory(card.id)}
                className="group relative h-[145px] sm:h-[165px] lg:h-[175px] rounded-2xl sm:rounded-[20px] overflow-hidden border border-[#3E3228] dark:border-white/10 border-stone-300 bg-gradient-to-l from-[#251D16] via-[#352A20] to-[#453629] dark:from-[#251D16] dark:via-[#352A20] dark:to-[#453629] from-[#ECE3D8] via-[#DFD2C2] to-[#D2C0AC] flex items-center justify-between p-5 sm:p-6 cursor-pointer shadow-md hover:shadow-2xl hover:border-[#C5A880]/80 transition-all duration-300"
              >
                {/* Content Side (Right in RTL, matching Reference 2) */}
                <div className="z-10 flex items-center gap-2.5 text-right">
                  <h3 className="font-display text-base sm:text-lg lg:text-xl font-bold text-white dark:text-white text-stone-900 group-hover:text-[#C5A880] transition-colors leading-snug">
                    {card.title}
                  </h3>
                  <ArrowLeft className="w-4 h-4 text-white/80 dark:text-white/80 text-stone-700 group-hover:text-[#C5A880] group-hover:-translate-x-1 transition-all" />
                </div>

                {/* Left Side: Visual Frame (filling the left side) */}
                <div className="absolute inset-y-0 left-0 w-[46%] sm:w-[48%] overflow-hidden flex items-end justify-center pointer-events-none">
                  {card.hasInnerFrame ? (
                    /* Black blazer hanger card with beige inner backdrop frame */
                    <div className="w-[85%] h-[90%] rounded-t-xl bg-[#E8DFD5] dark:bg-[#DCD4C8] shadow-inner overflow-hidden flex items-center justify-center p-1">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-contain object-bottom group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    /* Model or Set image filling left half */
                    <img
                      src={card.image}
                      alt={card.title}
                      className={`w-full h-full ${card.imgStyle} group-hover:scale-105 transition-transform duration-500`}
                      loading="lazy"
                    />
                  )}

                  {/* Soft right-edge gradient fade into card background */}
                  <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-transparent to-[#352A20]/40 dark:to-[#352A20]/40 to-[#DFD2C2]/40 pointer-events-none" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

    </div>
  );
};
