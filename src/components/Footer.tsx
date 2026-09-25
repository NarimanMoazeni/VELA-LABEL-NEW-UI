import React from 'react';
import { Send, Instagram } from 'lucide-react';

interface FooterProps {
  onSelectCategory?: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  return (
    <footer className="w-full bg-[#120E0C] dark:bg-[#120E0C] bg-[#F3EDE6] border-t border-white/10 dark:border-white/10 border-stone-300 pt-14 pb-8 text-[#A89B90] dark:text-[#A89B90] text-stone-600 select-none transition-colors">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-10 mb-12">
          
          {/* Col 1: Brand Info with Centered Circular Logo */}
          <div className="space-y-4 text-right">
            <div className="flex items-center gap-3">
              <img
                src="/products/logo.webp"
                alt="لوگوی رسمی ولا لیبل"
                className="w-12 h-12 rounded-full object-cover border-2 border-[#C5A880]/70 shadow-sm"
              />
              <div className="flex flex-col text-right">
                <span className="font-serif text-lg tracking-wider text-white dark:text-white text-stone-900 font-bold uppercase">
                  VELA LABEL
                </span>
                <span className="font-latin text-[9px] uppercase text-[#C5A880] tracking-[0.22em] font-bold">
                  WOMEN'S WEAR • ATELIER
                </span>
              </div>
            </div>
            <p className="text-sm text-[#A89B90] dark:text-[#A89B90] text-stone-600 leading-relaxed">
              آتلیه و مزون پوشاک زنانه ولا؛ طراحی اصیل، وقار در سیلوئت و دوخت تمام‌مزونی در اصفهان.
            </p>
          </div>

          {/* Col 2: Categories */}
          <div className="space-y-3.5 text-right">
            <span className="text-sm font-bold tracking-wider text-white dark:text-white text-stone-900 uppercase block">
              کالکشن‌ها
            </span>
            <ul className="space-y-2.5 text-sm text-[#A89B90] dark:text-[#A89B90] text-stone-600">
              <li>
                <button
                  onClick={() => onSelectCategory && onSelectCategory('all')}
                  className="hover:text-[#C5A880] transition-colors cursor-pointer"
                >
                  همه محصولات مزون
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory && onSelectCategory('set')}
                  className="hover:text-[#C5A880] transition-colors cursor-pointer"
                >
                  ست وست و شلوار شکلاتی ولا
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory && onSelectCategory('blazer')}
                  className="hover:text-[#C5A880] transition-colors cursor-pointer"
                >
                  کت و بلیزرهای تک (آدل و لورن)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('bespoke-appointment');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#C5A880] transition-colors cursor-pointer"
                >
                  مشاوره و شخصی‌دوزی مزون
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-3.5 text-right">
            <span className="text-sm font-bold tracking-wider text-white dark:text-white text-stone-900 uppercase block">
              خدمات آتلیه ولا
            </span>
            <ul className="space-y-2.5 text-sm text-[#A89B90] dark:text-[#A89B90] text-stone-600">
              <li>ارسال با کاور اختصاصی و چوب‌لباسی نفیس</li>
              <li>امکان تغییر و تنظیم قد و سایز دقیق</li>
              <li>هماهنگی پرو حضوری در آتلیه اصفهان</li>
              <li>پشتیبانی آنلاین ۱۰ صبح الی ۸ شب</li>
            </ul>
          </div>

          {/* Col 4: Contact & Socials */}
          <div className="space-y-3.5 text-right">
            <span className="text-sm font-bold tracking-wider text-white dark:text-white text-stone-900 uppercase block">
              ارتباط و سفارش
            </span>
            <p className="text-sm text-[#A89B90] dark:text-[#A89B90] text-stone-600 leading-relaxed">
              جهت استعلام موجودی سایز و ثبت سفارش اختصاصی با ما در ارتباط باشید.
            </p>
            <div className="flex flex-col gap-2.5 pt-1">
              <a
                href="https://t.me/velalabel"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 py-2.5 px-4 rounded-full border border-white/10 dark:border-white/10 border-stone-300 bg-white/5 dark:bg-white/5 bg-white hover:border-[#C5A880] text-white dark:text-white text-stone-800 hover:text-[#C5A880] transition-all text-xs font-medium w-fit"
              >
                <Send className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>پشتیبانی تلگرام: velalabel@</span>
              </a>
              <a
                href="https://instagram.com/velalabel"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 py-2.5 px-4 rounded-full border border-white/10 dark:border-white/10 border-stone-300 bg-white/5 dark:bg-white/5 bg-white hover:border-[#C5A880] text-white dark:text-white text-stone-800 hover:text-[#C5A880] transition-all text-xs font-medium w-fit"
              >
                <Instagram className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>اینستاگرام ولا: velalabel@</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 dark:border-white/10 border-stone-300 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8E827A] dark:text-[#8E827A] text-stone-500">
          <div>
            © ۲۰۲۶ مزون زنانه VELA LABEL • تمامی حقوق محفوظ است.
          </div>
          <div className="flex items-center gap-3">
            <span>طراحی و دوخت اختصاصی در آتلیه اصفهان</span>
            <span className="text-[#C5A880]">✦</span>
            <span>بسته‌بندی ایمن و ارسال به سراسر ایران</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
