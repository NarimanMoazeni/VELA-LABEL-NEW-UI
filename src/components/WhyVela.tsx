import React from 'react';
import { Award, MessagesSquare, Package, Ruler } from 'lucide-react';
import { Reveal } from './Reveal';

export const WhyVela: React.FC = () => {
  const benefits = [
    {
      icon: Award,
      title: 'دوخت و پارچه درجه‌یک',
      description: 'دوخت تمیز در آتلیه اصفهان با پارچه بدون چروک و بدون آبرفت.',
    },
    {
      icon: MessagesSquare,
      title: 'مشاوره سریع سایز',
      description: 'راهنمای انتخاب سایز در تلگرام و اینستاگرام، ۱۰ صبح تا ۸ شب.',
    },
    {
      icon: Package,
      title: 'ارسال سریع',
      description: 'تحویل به سراسر ایران با کاور اختصاصی مزون.',
    },
    {
      icon: Ruler,
      title: 'تنظیم قد و سایز',
      description: 'سفارشی‌سازی اندازه و پرو حضوری در آتلیه اصفهان.',
    },
  ];

  return (
    <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 py-8 sm:py-12 select-none">
      <div className="bg-[#FAF6F0] rounded-3xl border border-[#E8DFD5] p-6 sm:p-8 lg:p-10 shadow-xs">
        
        {/* Section Heading matching Reference 8 */}
        <div className="text-center max-w-xl mx-auto mb-8 space-y-1.5">
          <span
            className="font-latin text-[10.5px] sm:text-[11.5px] text-[#8A715D] dark:text-[#E5CCA8] font-bold tracking-[0.2em] uppercase inline-block"
            dir="ltr"
          >
            WHY CHOOSE VELA LABEL
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1C1917]">
            چرا ولا؟
          </h2>
          <p className="text-sm sm:text-[15px] text-[#786C65] font-normal">
            کیفیت ماندگار و خرید مطمئن
          </p>
        </div>

        {/* 4 Cards: 2 cols on mobile, 4 cols on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={idx} delay={idx * 80} className="h-full">
              <div
                className="bg-[#FFFFFF] h-full p-5 rounded-2xl border border-[#E8DFD5]/80 flex flex-col items-center text-center space-y-3 transition-all duration-300 hover:border-[#A08875] hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-full bg-[#F5F0EB] border border-[#E8DFD5] flex items-center justify-center text-[#2A2421] shrink-0">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="font-display text-base font-bold text-[#1C1917] leading-snug">
                  {item.title}
                </h3>

                <p className="text-sm text-[#6B5F58] font-normal leading-relaxed">
                  {item.description}
                </p>
              </div>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};
