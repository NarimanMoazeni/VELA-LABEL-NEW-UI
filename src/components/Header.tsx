import React, { useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import { Search, Heart, ShoppingBag, Instagram, Send, X, Menu, Sun, Moon } from 'lucide-react';
import { toPersianDigits } from '../data/products';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('vela_theme');
      if (saved) return saved === 'dark';
      return document.documentElement.classList.contains('dark') || true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const applyTheme = (dark: boolean) => {
    try {
      document.documentElement.classList.toggle('dark', dark);
      localStorage.setItem('vela_theme', dark ? 'dark' : 'light');
    } catch {
      // Ignore
    }
  };

  useEffect(() => {
    applyTheme(isDark);
  }, [isDark]);

  const handleThemeToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = !isDark;
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void> };
    };
    if (doc.startViewTransition) {
      try {
        const x = e.clientX || window.innerWidth / 2;
        const y = e.clientY || 80;
        const endR = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
        );
        const transition = doc.startViewTransition(() => {
          flushSync(() => setIsDark(next));
        });
        transition.ready
          .then(() => {
            document.documentElement.animate(
              {
                clipPath: [
                  `circle(0px at ${x}px ${y}px)`,
                  `circle(${endR}px at ${x}px ${y}px)`,
                ],
              },
              {
                duration: 550,
                easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                pseudoElement: '::view-transition-new(root)',
              }
            );
          })
          .catch(() => {});
        return;
      } catch {
        // Fallback
      }
    }
    setIsDark(next);
  };

  const [cartBump, setCartBump] = useState(false);
  const firstCartRender = useRef(true);
  useEffect(() => {
    if (firstCartRender.current) {
      firstCartRender.current = false;
      return;
    }
    if (cartCount > 0) {
      setCartBump(true);
      const t = setTimeout(() => setCartBump(false), 500);
      return () => clearTimeout(t);
    }
  }, [cartCount]);

  const navLinks = [
    { id: 'all', label: 'همه محصولات' },
    { id: 'set', label: 'ست وست و شلوار' },
    { id: 'blazer', label: 'کت و بلیزر' },
    { id: 'bespoke', label: 'شخصی‌دوزی مزون' },
  ];

  return (
    <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
      isScrolled
        ? 'bg-[#120E0C]/95 dark:bg-[#120E0C]/95 bg-white/95 backdrop-blur-md shadow-md border-b border-white/10 dark:border-white/10 border-stone-200'
        : 'bg-[#120E0C]/80 dark:bg-[#120E0C]/80 bg-[#F6F2EC]/90 backdrop-blur-sm border-b border-white/10 dark:border-white/10 border-stone-200/80'
    }`}>
      
      {/* Main Header Container (Full-bleed bar with wide max-width) */}
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 h-16 sm:h-[72px] grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4 select-none">
        
        {/* Right Zone (RTL start): Mobile Hamburger + Desktop Nav */}
        <div className="flex items-center justify-start gap-3 sm:gap-6 min-w-0">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden w-10 h-10 rounded-full border border-white/15 dark:border-white/15 border-stone-300 bg-white/5 dark:bg-white/5 bg-stone-100 flex items-center justify-center text-white dark:text-white text-stone-800 hover:border-[#C5A880] transition-colors cursor-pointer shrink-0"
            aria-label="منوی سایت"
          >
            <Menu className="w-5 h-5" />
          </button>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((item) => {
              const isActive = activeCategory === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectCategory(item.id)}
                  className={`text-sm font-medium transition-all duration-200 relative py-2 cursor-pointer skip-delay ${
                    isActive
                      ? 'text-white dark:text-white text-stone-900 font-bold'
                      : 'text-[#A89B90] dark:text-[#A89B90] text-stone-600 hover:text-white dark:hover:text-white hover:text-stone-900'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 right-0 left-0 h-[2.5px] bg-[#C5A880] rounded-full shadow-[0_0_8px_rgba(197,168,128,0.6)]" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Center Zone: Logo + Serif Brand Wordmark */}
        <div
          onClick={() => onSelectCategory('all')}
          className="flex items-center justify-center gap-3 cursor-pointer group select-none"
          title="صفحه نخست VELA LABEL"
        >
          <img
            src="/products/logo.webp"
            alt="لوگوی رسمی ولا لیبل"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-[#C5A880]/70 shadow-md group-hover:scale-105 group-hover:border-[#C5A880] transition-all duration-300"
          />
          <div className="hidden min-[440px]:flex flex-col text-right">
            <span
              className="font-serif text-lg sm:text-xl text-white dark:text-white text-stone-900 font-bold uppercase leading-none tracking-[0.16em]"
              dir="ltr"
            >
              VELA
            </span>
            <span
              className="font-latin text-[9px] sm:text-[9.5px] uppercase text-[#C5A880] font-bold tracking-[0.22em] mt-1"
              dir="ltr"
            >
              ATELIER • ISFAHAN
            </span>
          </div>
        </div>

        {/* Left Zone (RTL end): Search, Theme, Wishlist, Cart */}
        <div className="flex items-center justify-end gap-1.5 sm:gap-2.5 min-w-0">
          
          {/* Search Button / Input */}
          <div className="relative">
            {isSearchOpen ? (
              <div className="flex items-center bg-[#1A1613] dark:bg-[#1A1613] bg-white border border-[#C5A880]/60 rounded-full px-3 py-1.5 shadow-lg animate-fade-in">
                <Search className="w-4 h-4 text-[#C5A880] ml-1.5 shrink-0" />
                <input
                  type="text"
                  placeholder="جستجوی مدل..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="bg-transparent text-sm text-white dark:text-white text-stone-900 focus:outline-none w-28 sm:w-44 placeholder:text-[#A89B90]"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    onSearchChange('');
                  }}
                  className="text-[#A89B90] hover:text-white dark:hover:text-white hover:text-stone-900 mr-1 cursor-pointer"
                  aria-label="بستن جستجو"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-10 h-10 rounded-full border border-white/15 dark:border-white/15 border-stone-300 bg-white/5 dark:bg-white/5 bg-white/60 flex items-center justify-center text-white/90 dark:text-white/90 text-stone-700 hover:border-[#C5A880] hover:text-white transition-all cursor-pointer shadow-xs skip-delay"
                title="جستجو در کالکشن"
                aria-label="جستجو در کالکشن"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={handleThemeToggle}
            className={`${isSearchOpen ? 'hidden sm:flex' : 'flex'} w-10 h-10 rounded-full border border-white/15 dark:border-white/15 border-stone-300 bg-white/5 dark:bg-white/5 bg-white/60 items-center justify-center text-white/90 dark:text-white/90 text-stone-700 hover:border-[#C5A880] transition-all cursor-pointer shadow-xs skip-delay`}
            title={isDark ? 'حالت روشن' : 'حالت تیره'}
            aria-label={isDark ? 'فعال‌سازی حالت روشن' : 'فعال‌سازی حالت تیره'}
          >
            {isDark ? <Sun className="w-4 h-4 text-[#C5A880]" /> : <Moon className="w-4 h-4 text-[#C5A880]" />}
          </button>

          {/* Wishlist Button with Badge */}
          <button
            onClick={onOpenWishlist}
            className="w-10 h-10 rounded-full border border-white/15 dark:border-white/15 border-stone-300 bg-white/5 dark:bg-white/5 bg-white/60 flex items-center justify-center text-white/90 dark:text-white/90 text-stone-700 hover:border-[#C5A880] transition-all relative cursor-pointer shadow-xs skip-delay"
            title="برگزیده‌ها"
            aria-label="برگزیده‌ها"
          >
            <Heart className={`w-4 h-4 crossfade-icon ${wishlistCount > 0 ? 'text-[#C5A880] fill-[#C5A880]' : 'text-stone-700 dark:text-white/80'}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C5A880] text-[#120E0C] text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center shadow-sm">
                {toPersianDigits(wishlistCount)}
              </span>
            )}
          </button>

          {/* Cart Pill Button */}
          <button
            onClick={onOpenCart}
            className={`flex items-center gap-2 bg-[#1A1613] dark:bg-[#1A1613] bg-stone-900 hover:bg-[#251F1A] border border-white/15 dark:border-white/15 border-stone-800 hover:border-[#C5A880] text-white pl-3 pr-3.5 sm:pr-4 py-2 rounded-full transition-all shadow-md active:scale-95 cursor-pointer skip-delay ${
              cartBump ? 'animate-cart-bump' : ''
            }`}
            title="سبد خرید"
            aria-label="سبد خرید"
          >
            <ShoppingBag className="w-4 h-4 text-[#C5A880]" />
            <span className="text-sm font-semibold hidden sm:inline text-white/95">سبد خرید</span>
            <span className="bg-[#C5A880] text-[#120E0C] text-[11px] font-bold min-w-5 h-5 px-1 rounded-full flex items-center justify-center shadow-xs">
              {toPersianDigits(cartCount)}
            </span>
          </button>

        </div>

      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm md:hidden animate-fade-in">
          <div className="fixed inset-0" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 right-0 w-4/5 max-w-sm bg-[#16120E] dark:bg-[#16120E] bg-[#FAF7F2] p-6 shadow-2xl flex flex-col justify-between z-10 border-l border-white/10 dark:border-white/10 border-stone-300 animate-fade-in text-right">
            <div className="space-y-6">
              
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 dark:border-white/10 border-stone-300">
                <div className="flex items-center gap-3">
                  <img
                    src="/products/logo.webp"
                    alt="لوگوی ولا لیبل"
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#C5A880]/70"
                  />
                  <div className="flex flex-col text-right">
                    <span className="font-serif text-base text-white dark:text-white text-stone-900 font-bold tracking-wider">VELA LABEL</span>
                    <span className="font-latin text-[8.5px] text-[#C5A880] tracking-[0.2em] uppercase font-bold">ATELIER • ISFAHAN</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-full border border-white/15 dark:border-white/15 border-stone-300 bg-white/5 dark:bg-white/5 bg-stone-100 flex items-center justify-center text-white/80 dark:text-white/80 text-stone-700 hover:text-white"
                  aria-label="بستن منو"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="flex flex-col space-y-1">
                <span className="text-[11px] text-[#C5A880] uppercase tracking-wider font-semibold pb-2">
                  دسته‌بندی‌های کالکشن
                </span>
                {navLinks.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectCategory(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-right py-3 px-3 rounded-xl text-sm font-medium transition-all ${
                      activeCategory === item.id
                        ? 'bg-[#C5A880] text-[#120E0C] font-bold shadow-md'
                        : 'text-[#A89B90] dark:text-[#A89B90] text-stone-700 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                
                <button
                  onClick={() => {
                    onOpenWishlist();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-right py-3 px-3 rounded-xl text-sm font-medium text-[#A89B90] dark:text-[#A89B90] text-stone-700 hover:text-white hover:bg-white/5 flex items-center justify-between"
                >
                  <span>برگزیده‌ها</span>
                  <span className="text-xs bg-[#C5A880]/20 text-[#C5A880] px-2 py-0.5 rounded-full font-bold">
                    {toPersianDigits(wishlistCount)}
                  </span>
                </button>
              </nav>
            </div>

            {/* Social & Contact Actions */}
            <div className="pt-4 border-t border-white/10 dark:border-white/10 border-stone-300 space-y-2.5">
              <a
                href="https://t.me/velalabel"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-white/5 dark:bg-white/5 bg-stone-200/60 hover:bg-white/10 border border-white/15 dark:border-white/15 border-stone-300 text-sm text-white dark:text-white text-stone-900 font-medium transition-all"
              >
                <Send className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>مشاوره سایز و سفارش در تلگرام</span>
              </a>
              <a
                href="https://instagram.com/velalabel"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#C5A880] hover:bg-[#D4B890] text-[#120E0C] text-sm font-bold transition-all shadow-md"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>اینستاگرام ولا لیبل</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </header>
  );
};
