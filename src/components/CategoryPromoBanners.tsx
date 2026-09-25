import React from 'react';
import { ArrowLeft, ShieldCheck, Lock, Package } from 'lucide-react';
import { Reveal } from './Reveal';

interface CategoryPromoBannersProps {
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryPromoBanners: React.FC<CategoryPromoBannersProps> = ({
  onSelectCategory,
}) => {
  const trustItems = [
    {
      icon: ShieldCheck,
      title: 'ضمانت کیفیت',
      desc: 'تضمین اصالت کالا و متریال درجه‌یک',
    },
    {
      icon: Lock,
      title: 'پرداخت امن',
      desc: 'درگاه‌های معتبر بانکی و کارت‌به‌کارت',
    },
    {
      icon: Package,
      title: 'ارسال سریع به سراسر کشور',
      desc: 'با کاور اختصاصی مزون و بسته‌بندی ایمن',
    },
  ];

  const categoryCards = [
    {
      id: 'bespoke',
      title: 'شخصی‌دوزی مزون',
      subtitle: 'سفارش دوخت اختصاصی با اندازه‌های دقیق شما',
      cta: 'شخصی‌دوزی مزون',
      image: '/products/vla-adl-001.webp',
      badge: 'خدمات ویژه آتلیه',
    },
    {
      id: 'set',
      title: 'ست وست و شلوار',
      subtitle: 'کالکشن جدید وست، شلوار و شومیز پاییزه',
      cta: 'ست وست و شلوار',
      image: '/products/vla-st-002.webp',
      badge: 'لوک اختصاصی ولا',
    },
    {
      id: 'blazer',
      title: 'کت و بلیزر',
      subtitle: 'کت‌های تک کلاسیک آدل و لورن خوش‌دوخت',
      cta: 'کت و بلیزر',
      image: '/products/vla-adl-002.webp',
      badge: 'پرفروش‌ترین مزون',
    },
  ];

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 py-3 select-none">
      
      {/* 1. Trust Bar (3-Column Horizontal Strip with Dividers) */}
      <Reveal delay={50}>
        <div className="w-full bg-[#181411] border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-5 mb-6 sm:mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0">
            {trustItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3.5 px-3 sm:px-6 ${
                    idx < 2 ? 'md:border-l md:border-white/10' : ''
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/20 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[#C5A880]" />
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-sm font-bold text-white">
                      {item.title}
                    </span>
                    <span className="text-xs text-[#A89B90] mt-0.5">
                      {item.desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* 2. Visual Category Cards (3-Column Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {categoryCards.map((card, idx) => (
          <Reveal key={card.id} delay={100 + idx * 80} className="h-full">
            <div
              onClick={() => onSelectCategory(card.id)}
              className="group relative h-full bg-[#181411] hover:bg-[#1E1915] border border-white/10 hover:border-[#C5A880]/50 rounded-2xl sm:rounded-[24px] overflow-hidden p-5 sm:p-6 flex flex-row items-center justify-between gap-4 cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Content Side (Right in RTL) */}
              <div className="flex-1 flex flex-col justify-between h-full space-y-3 z-10 text-right">
                <div className="space-y-1.5">
                  <span className="inline-block text-[10px] px-2.5 py-0.5 rounded-full bg-[#C5A880]/15 text-[#C5A880] border border-[#C5A880]/25 font-semibold">
                    {card.badge}
                  </span>

                  <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-[#C5A880] transition-colors leading-snug">
                    {card.title}
                  </h3>

                  <p className="text-xs text-[#A89B90] leading-relaxed line-clamp-2">
                    {card.subtitle}
                  </p>
                </div>

                {/* Pill CTA with Arrow */}
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C5A880] group-hover:text-white transition-colors">
                    <span>{card.cta}</span>
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>

              {/* Image Frame (Left in RTL) */}
              <div className="relative w-28 sm:w-32 aspect-[3/4] shrink-0 rounded-xl overflow-hidden bg-[#14100E] border border-white/10 shadow-sm">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </Reveal>
        ))}
      </div>

    </div>
  );
};
