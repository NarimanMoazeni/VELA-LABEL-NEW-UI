import React, { useState, useEffect, useMemo } from 'react';
import { ArrowUp } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryPromoBanners } from './components/CategoryPromoBanners';
import { ProductCard } from './components/ProductCard';
import { ProductSkeleton } from './components/ProductSkeleton';
import { AtelierConcierge } from './components/AtelierConcierge';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { Reveal } from './components/Reveal';
import { WishlistModal } from './components/WishlistModal';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { PRODUCTS } from './data/products';
import { Product, CartItem, CustomerOrderData, ToastData } from './types';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCategoryLoading, setIsCategoryLoading] = useState<boolean>(false);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 450);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart state with localStorage persistence (starts empty)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('vela_cart');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return [];
  });

  // Customer order form with localStorage persistence
  const [customerData, setCustomerData] = useState<CustomerOrderData>(() => {
    try {
      const saved = localStorage.getItem('vela_customer_data');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return {
      fullName: '',
      phone: '',
      address: '',
      postalCode: '',
    };
  });

  // Wishlist with localStorage persistence
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('vela_wishlist');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return [];
  });

  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem('vela_cart', JSON.stringify(cartItems));
    } catch {
      // Ignore
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('vela_customer_data', JSON.stringify(customerData));
    } catch {
      // Ignore
    }
  }, [customerData]);

  useEffect(() => {
    try {
      localStorage.setItem('vela_wishlist', JSON.stringify(wishlist));
    } catch {
      // Ignore
    }
  }, [wishlist]);

  const showToast = (message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const handleDismissToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleScrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCategorySelect = (cat: string) => {
    if (cat === 'bespoke') {
      const el = document.getElementById('bespoke-appointment');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    setIsCategoryLoading(true);
    setSelectedCategory(cat);
    setTimeout(() => setIsCategoryLoading(false), 200);
    handleScrollToCatalog();
  };

  const handleAddToCart = (
    product: Product,
    size: string,
    color: string,
    quantity: number
  ) => {
    const compositeId = `${product.id}-${size}-${color}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === compositeId);
      if (existing) {
        return prev.map((item) =>
          item.id === compositeId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: compositeId,
          product,
          size,
          color,
          quantity,
        },
      ];
    });
    showToast(`«${product.title}» به سبد خرید اضافه شد`);
    setIsCartOpen(true);
  };

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    handleOpenModal(product);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    showToast('محصول از سبد خرید حذف شد');
  };

  const handleClearCart = () => {
    setCartItems([]);
    showToast('سبد خرید خالی شد');
  };

  const handleToggleWishlist = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      showToast(`«${product.title}» از لیست برگزیده‌ها حذف شد`);
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`«${product.title}» به لیست برگزیده‌ها اضافه شد`);
    }
  };

  const handleRemoveFromWishlist = (product: Product) => {
    setWishlist((prev) => prev.filter((item) => item.id !== product.id));
    showToast(`«${product.title}» از برگزیده‌ها حذف شد`);
  };

  const handleOpenModal = (product: Product) => {
    setActiveModalProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      const matchesSearch =
        !searchQuery.trim() ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'price-asc') return a.price - b.price;
      return 0;
    });
  }, [selectedCategory, sortBy, searchQuery]);

  const cartTotalCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F2EC] dark:bg-[#120E0C] text-[#181310] dark:text-[#F2E9DC] selection:bg-[#C5A880]/30 selection:text-white transition-colors duration-200">
      
      {/* 1. Header (Fixed top, without top announcement bar) */}
      <Header
        cartCount={cartTotalCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        activeCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Flow: Compact top offset since announcement bar is removed */}
      <main className="flex-1 pt-16 sm:pt-[72px]">
        
        {/* 2. Full-Bleed Open Hero Section (Reference 1: Widescreen, No Container) */}
        <Hero
          onExploreClick={handleScrollToCatalog}
          onOpenQuickView={handleOpenModal}
          featuredProducts={PRODUCTS.slice(0, 3)}
        />

        {/* 3. Full-Width Trust Bar + 3 Category Showcase Cards (Primary Navigation) */}
        <CategoryPromoBanners
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />

        {/* 4. Product Cards Grid (Aligned 3-Column Grid with Dedicated Section Header) */}
        <section id="catalog-section" className="w-full scroll-mt-[80px] pt-8 sm:pt-12 lg:pt-14 pb-14 sm:pb-20">
          <div
            id="catalog-grid"
            className="w-full max-w-[1360px] mx-auto px-4 sm:px-8"
          >
            {/* Editorial Section Header: Clearly separates category navigation from product collection */}
            <div className="flex items-center justify-between mb-7 sm:mb-9 pb-3.5 border-b border-stone-300/40 dark:border-white/8">
              <div className="flex items-center gap-2.5">
                <div className="w-1 h-5 rounded-full bg-[#8C6D46] dark:bg-[#C5A880]" />
                <h2 className="font-display text-lg sm:text-xl font-bold text-[#181310] dark:text-white leading-tight">
                  {selectedCategory === 'all'
                    ? 'منتخب آثار مزون ولا'
                    : selectedCategory === 'set'
                    ? 'ست وست و شلوار'
                    : selectedCategory === 'blazer'
                    ? 'کت و بلیزر تک'
                    : 'شخصی‌دوزی مزون'}
                </h2>
              </div>
              <span className="text-xs text-[#6B5D52] dark:text-[#9E9287]">
                {filteredProducts.length} اثر کپسولی
              </span>
            </div>

            {isCategoryLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-[#181411] rounded-3xl border border-stone-200 dark:border-white/10 space-y-4 px-4 max-w-xl mx-auto shadow-md">
                <p className="font-display text-base sm:text-lg text-stone-900 dark:text-white font-semibold">
                  هیچ اثری با مشخصات انتخابی شما یافت نشد.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="py-3 px-8 rounded-full bg-[#C5A880] text-[#120E0C] text-sm font-bold cursor-pointer hover:bg-[#D4B890] transition-colors shadow-md"
                >
                  نمایش همه محصولات مزون
                </button>
              </div>
            ) : (
              <div
                key={selectedCategory}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProducts.map((product, idx) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={idx}
                    onOpenModal={handleOpenModal}
                    onQuickAdd={handleQuickAdd}
                    isWishlisted={wishlist.some((item) => item.id === product.id)}
                    onToggleWishlist={handleToggleWishlist}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 6. Compact, Unified Atelier & Bespoke Concierge Section */}
        <Reveal>
          <AtelierConcierge />
        </Reveal>

      </main>

      {/* 7. Minimalist Boutique Footer */}
      <Footer onSelectCategory={handleCategorySelect} />

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-30 w-10 h-10 rounded-full bg-white dark:bg-[#181411] text-[#C5A880] hover:bg-[#C5A880] hover:text-[#120E0C] border border-[#DDD5C9] dark:border-white/15 flex items-center justify-center shadow-2xl transition-all duration-200 active:scale-95 cursor-pointer skip-delay"
          title="بازگشت به ابتدای صفحه"
          aria-label="بازگشت به بالا"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        customerData={customerData}
        onCustomerDataChange={setCustomerData}
        onShowToast={showToast}
      />

      {/* Product Detail Modal */}
      {activeModalProduct && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          product={activeModalProduct}
          onAddToCart={handleAddToCart}
          isWishlisted={wishlist.some((item) => item.id === activeModalProduct.id)}
          onToggleWishlist={handleToggleWishlist}
        />
      )}

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        items={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={(product) => {
          setIsWishlistOpen(false);
          handleOpenModal(product);
        }}
      />

      {/* Toast Notification */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />

    </div>
  );
}
