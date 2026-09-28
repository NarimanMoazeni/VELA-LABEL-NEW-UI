import React from 'react';
import { X, ShoppingBag, Trash2, Send, ShieldCheck, ArrowRight } from 'lucide-react';
import { CartItem, CustomerOrderData } from '../types';
import { BANK_CARD_DETAILS, formatTomans, toPersianDigits } from '../data/products';
import { BankCardPreview } from './BankCardPreview';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  customerData: CustomerOrderData;
  onCustomerDataChange: (data: CustomerOrderData) => void;
  onShowToast: (message: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  customerData,
  onCustomerDataChange,
  onShowToast,
}) => {
  if (!isOpen) return null;

  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleSubmitTelegramOrder = () => {
    if (items.length === 0) {
      onShowToast('سبد خرید شما خالی است');
      return;
    }

    if (!customerData.fullName.trim() || !customerData.phone.trim()) {
      onShowToast('لطفاً نام و شماره همراه خود را وارد نمایید');
      return;
    }

    if (!customerData.address.trim()) {
      onShowToast('لطفاً آدرس دقیق تحویل را وارد نمایید');
      return;
    }

    const orderItemsSummary = items
      .map(
        (item) =>
          `• ${item.product.title} (سایز: ${item.size}، رنگ: ${item.color}) - تعداد: ${toPersianDigits(
            item.quantity
          )} - مبلغ: ${formatTomans(item.product.price * item.quantity)}`
      )
      .join('\n');

    const totalFormatted = formatTomans(totalPrice);

    const messageText =
      `✦ ثبت سفارش اختصاصی در مزون VELA LABEL ✦\n\n` +
      `خریدار: ${customerData.fullName}\n` +
      `شماره تماس: ${customerData.phone}\n` +
      `آدرس تحویل: ${customerData.address}\n` +
      (customerData.postalCode ? `کد پستی: ${customerData.postalCode}\n` : '') +
      `\nاقلام سفارش:\n${orderItemsSummary}\n\n` +
      `مبلغ کل قابل واریز: ${totalFormatted}\n` +
      `واریز به کارت: ${BANK_CARD_DETAILS.cardNumber} (${BANK_CARD_DETAILS.bankName})\n\n` +
      `لطفاً تصویر فیش واریز را پس از ارسال این پیام ضمیمه فرمایید.`;

    const encodedText = encodeURIComponent(messageText);
    const telegramUrl = `https://t.me/velalabel?text=${encodedText}`;

    window.open(telegramUrl, '_blank');
    onShowToast('در حال انتقال به تلگرام مشاور اختصاصی مزون ولا...');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md p-2 sm:p-4 md:p-6 flex items-center justify-center animate-fade-in select-none">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Main Modal Window */}
      <div className="relative w-full max-w-5xl bg-[#F6F2EC] dark:bg-[#181411] rounded-2xl sm:rounded-3xl shadow-2xl border border-stone-300 dark:border-white/10 flex flex-col max-h-[94vh] overflow-hidden z-10 animate-pop text-right transition-colors duration-200">
        
        {/* Header */}
        <div className="px-6 sm:px-8 py-4 bg-white/70 dark:bg-[#14100E] border-b border-stone-200 dark:border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C5A880]/15 border border-[#C5A880]/30 text-[#8C6D46] dark:text-[#C5A880] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-xs sm:text-sm tracking-widest text-[#181310] dark:text-white font-bold uppercase">
                  VELA LABEL
                </span>
                <span className="text-[#C5A880] text-xs">•</span>
                <h2 className="font-display text-sm sm:text-base font-bold text-[#181310] dark:text-white">
                  سبد خرید و تسویه‌حساب
                </h2>
              </div>
              <p className="text-[11px] text-stone-500 dark:text-[#A89B90] font-sans">
                {items.length > 0
                  ? `${toPersianDigits(items.length)} اثر انتخاب‌شده در سبد شما`
                  : 'سبد خرید شما در حال حاضر خالی است'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-200/70 dark:bg-white/10 text-stone-700 dark:text-white/80 hover:text-stone-900 dark:hover:text-white hover:bg-stone-300 dark:hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="بستن"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8">
          {items.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-200/60 dark:bg-white/5 border border-stone-300 dark:border-white/10 flex items-center justify-center text-[#8C6D46] dark:text-[#C5A880]">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-display text-lg text-stone-900 dark:text-white font-bold">
                  سبد خرید شما خالی است
                </h3>
                <p className="text-xs text-stone-500 dark:text-[#A89B90] max-w-xs leading-relaxed font-sans">
                  برای انتخاب آثار مزونی، از کلکسیون کپسولی وست، شلوار و کت‌های تک ولا دیدن فرمایید.
                </p>
              </div>
              <button
                onClick={onClose}
                className="mt-2 py-3 px-8 rounded-full bg-[#C5A880] text-[#120E0C] text-xs font-bold hover:bg-[#D4B890] transition-colors cursor-pointer shadow-md font-sans"
              >
                مشاهده کلکسیون مزون
              </button>
            </div>
          ) : (
            /* 2-Column Desktop RTL Layout */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* MAIN AREA (Right Column in RTL - 7 Cols): Items + Shipping Form + Payment Card */}
              <div className="lg:col-span-7 space-y-8">
                
                {/* 01 — Cart Items Review */}
                <section className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-4 rounded-full bg-[#C5A880]" />
                      <h3 className="font-display text-sm sm:text-base font-bold text-stone-900 dark:text-white">
                        ۰۱ — بازبینی اقلام سفارش
                      </h3>
                      <span className="text-xs text-stone-400 dark:text-stone-500 font-sans">
                        ({toPersianDigits(items.length)} اثر)
                      </span>
                    </div>

                    <button
                      onClick={onClearCart}
                      className="text-xs text-stone-500 dark:text-[#A89B90] hover:text-red-500 transition-colors cursor-pointer font-sans"
                    >
                      خالی کردن سبد
                    </button>
                  </div>

                  {/* Clean Items List */}
                  <div className="divide-y divide-stone-200 dark:divide-white/8">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                      >
                        {/* 3:4 Thumbnail Image */}
                        <div className="w-16 h-20 rounded-xl overflow-hidden bg-stone-200 dark:bg-[#1E1915] border border-stone-300 dark:border-white/10 shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Title, Variant Info, Price */}
                        <div className="flex-1 min-w-0 space-y-1">
                          <h4 className="font-display text-sm sm:text-[15px] font-bold text-stone-900 dark:text-white truncate">
                            {item.product.title}
                          </h4>
                          <div className="text-xs text-stone-500 dark:text-[#A89B90] font-sans">
                            سایز: <strong className="text-stone-800 dark:text-stone-200 font-bold">{item.size}</strong> • رنگ: {item.color}
                          </div>
                          <div className="font-display text-sm font-bold text-[#8C6D46] dark:text-[#E5CCA8] pt-0.5">
                            {formatTomans(item.product.price * item.quantity)}
                          </div>
                        </div>

                        {/* Quantity Stepper & Remove */}
                        <div className="flex items-center gap-3 shrink-0">
                          {/* Stepper */}
                          <div className="flex items-center gap-1 bg-white dark:bg-[#1E1915] border border-stone-300 dark:border-white/15 px-2 py-1 rounded-full shadow-2xs">
                            <button
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="w-6 h-6 rounded-full flex items-center justify-center text-stone-700 dark:text-stone-300 hover:text-[#C5A880] cursor-pointer text-xs font-bold"
                              aria-label="کاهش تعداد"
                            >
                              -
                            </button>
                            <span className="w-5 text-center text-xs font-bold text-stone-900 dark:text-white font-sans">
                              {toPersianDigits(item.quantity)}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="w-6 h-6 rounded-full flex items-center justify-center text-stone-700 dark:text-stone-300 hover:text-[#C5A880] cursor-pointer text-xs font-bold"
                              aria-label="افزایش تعداد"
                            >
                              +
                            </button>
                          </div>

                          {/* Remove button */}
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-stone-400 hover:text-red-500 transition-colors p-1.5 rounded-full hover:bg-stone-200 dark:hover:bg-white/5 cursor-pointer"
                            title="حذف اثر از سبد"
                            aria-label="حذف اثر"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 02 — Recipient Contact & Delivery Information */}
                <section className="space-y-4">
                  <div className="pb-3 border-b border-stone-200 dark:border-white/10 flex items-center gap-2">
                    <span className="w-1.5 h-4 rounded-full bg-[#C5A880]" />
                    <h3 className="font-display text-sm sm:text-base font-bold text-stone-900 dark:text-white">
                      ۰۲ — مشخصات گیرنده و نشانی پستی
                    </h3>
                  </div>

                  <div className="space-y-3.5 bg-white/60 dark:bg-[#14100E] p-5 sm:p-6 rounded-2xl border border-stone-200/80 dark:border-white/8 shadow-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs text-stone-700 dark:text-[#D1C5B8] mb-1.5 font-medium font-sans">
                          نام و نام خانوادگی <span className="text-[#C5A880]">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="مثال: سارا محمدی"
                          value={customerData.fullName}
                          onChange={(e) =>
                            onCustomerDataChange({
                              ...customerData,
                              fullName: e.target.value,
                            })
                          }
                          className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-[#1E1915] border border-stone-300 dark:border-white/10 text-stone-900 dark:text-white text-sm font-sans focus:outline-none focus:border-[#C5A880] placeholder:text-stone-400 dark:placeholder:text-stone-600 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-stone-700 dark:text-[#D1C5B8] mb-1.5 font-medium font-sans">
                          شماره همراه (تماس و هماهنگی) <span className="text-[#C5A880]">*</span>
                        </label>
                        <input
                          type="tel"
                          dir="ltr"
                          placeholder="0912..."
                          value={customerData.phone}
                          onChange={(e) =>
                            onCustomerDataChange({
                              ...customerData,
                              phone: e.target.value,
                            })
                          }
                          className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-[#1E1915] border border-stone-300 dark:border-white/10 text-stone-900 dark:text-white text-sm font-sans focus:outline-none focus:border-[#C5A880] text-right placeholder:text-stone-400 dark:placeholder:text-stone-600 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-stone-700 dark:text-[#D1C5B8] mb-1.5 font-medium font-sans">
                        کد پستی ۱۰ رقمی <span className="text-stone-400 text-[11px]">(اختیاری)</span>
                      </label>
                      <input
                        type="text"
                        dir="ltr"
                        placeholder="کد پستی محل سکونت یا کار"
                        value={customerData.postalCode || ''}
                        onChange={(e) =>
                          onCustomerDataChange({
                            ...customerData,
                            postalCode: e.target.value,
                          })
                        }
                        className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-[#1E1915] border border-stone-300 dark:border-white/10 text-stone-900 dark:text-white text-sm font-sans focus:outline-none focus:border-[#C5A880] text-right placeholder:text-stone-400 dark:placeholder:text-stone-600 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-stone-700 dark:text-[#D1C5B8] mb-1.5 font-medium font-sans">
                        نشانی دقیق پستی <span className="text-[#C5A880]">*</span>
                      </label>
                      <textarea
                        rows={2}
                        placeholder="استان، شهر، خیابان، کوچه، پلاک، واحد..."
                        value={customerData.address}
                        onChange={(e) =>
                          onCustomerDataChange({
                            ...customerData,
                            address: e.target.value,
                          })
                        }
                        className="w-full p-3 rounded-xl bg-white dark:bg-[#1E1915] border border-stone-300 dark:border-white/10 text-stone-900 dark:text-white text-sm font-sans focus:outline-none focus:border-[#C5A880] placeholder:text-stone-400 dark:placeholder:text-stone-600 transition-colors resize-none"
                      />
                    </div>
                  </div>
                </section>

                {/* 03 — Payment Section: Premium Demo Bank Card */}
                <section className="space-y-4">
                  <div className="pb-3 border-b border-stone-200 dark:border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-4 rounded-full bg-[#C5A880]" />
                      <h3 className="font-display text-sm sm:text-base font-bold text-stone-900 dark:text-white">
                        ۰۳ — واریز کارت‌به‌کارت
                      </h3>
                    </div>
                    <span className="text-[11px] text-[#8C6D46] dark:text-[#C5A880] font-sans font-medium">
                      بدون کارمزد واسط
                    </span>
                  </div>

                  {/* Luxury Interactive Demo Bank Card */}
                  <div className="bg-white/60 dark:bg-[#14100E] p-4 sm:p-6 rounded-2xl border border-stone-200/80 dark:border-white/8 shadow-xs flex justify-center">
                    <BankCardPreview
                      bankName={BANK_CARD_DETAILS.bankName}
                      accountHolder={BANK_CARD_DETAILS.accountHolder}
                      cardNumber={BANK_CARD_DETAILS.cardNumber}
                      cardNumberRaw={BANK_CARD_DETAILS.cardNumberRaw}
                      onCopySuccess={onShowToast}
                    />
                  </div>
                </section>

              </div>

              {/* SECONDARY AREA (Left Column in RTL - 5 Cols): Sticky Order Summary & Telegram CTA */}
              <div className="lg:col-span-5 lg:sticky lg:top-0 space-y-4">
                
                {/* 04 — Order Summary Card */}
                <div className="p-6 rounded-2xl bg-white dark:bg-[#14100E] border border-stone-200 dark:border-white/10 space-y-5 shadow-md">
                  <div className="pb-3 border-b border-stone-200 dark:border-white/10 flex items-center gap-2">
                    <span className="w-1.5 h-4 rounded-full bg-[#C5A880]" />
                    <h3 className="font-display text-base font-bold text-stone-900 dark:text-white">
                      ۰۴ — خلاصه فاکتور سفارش
                    </h3>
                  </div>

                  <div className="space-y-3.5 text-xs sm:text-sm font-sans text-stone-600 dark:text-[#A89B90]">
                    <div className="flex justify-between items-center">
                      <span>مجموع ارزش سفارش:</span>
                      <span className="text-stone-900 dark:text-white font-semibold font-display">
                        {formatTomans(totalPrice)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>بسته‌بندی و ارسال اختصاصی:</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                        رایگان (کاور مزون)
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>پوشش بیمه مرسوله پستی:</span>
                      <span className="text-stone-800 dark:text-stone-300 font-medium">
                        رایگان
                      </span>
                    </div>
                  </div>

                  {/* Final Total Amount: Maximum Visual Emphasis */}
                  <div className="pt-4 border-t border-stone-200 dark:border-white/10 flex items-baseline justify-between gap-2">
                    <span className="text-sm sm:text-base font-bold text-stone-900 dark:text-white font-sans">
                      مبلغ نهایی قابل واریز:
                    </span>
                    <span className="text-xl sm:text-2xl font-extrabold text-[#7A5B36] dark:text-[#E5CCA8] font-display">
                      {formatTomans(totalPrice)}
                    </span>
                  </div>

                  {/* Primary Checkout CTA */}
                  <div className="pt-2 space-y-3">
                    <button
                      onClick={handleSubmitTelegramOrder}
                      className="w-full py-3.5 px-6 rounded-full bg-[#C5A880] hover:bg-[#D4B890] text-[#120E0C] font-sans font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-[#C5A880]/20 active:scale-95 cursor-pointer"
                      id="submit-telegram-order-btn"
                    >
                      <Send className="w-4 h-4 text-[#120E0C]" />
                      <span>تکمیل سفارش و ارسال در تلگرام</span>
                    </button>

                    <p className="text-center text-[11px] text-stone-500 dark:text-[#8E827A] leading-relaxed px-1 font-sans">
                      ارتباط مستقیم با کارشناس آتلیه ولا (@velalabel) جهت ثبت قطعی و ارسال تصویر فیش واریزی
                    </p>
                  </div>
                </div>

                {/* Assurance & Packaging Card */}
                <div className="p-4 bg-white/60 dark:bg-white/5 rounded-2xl border border-stone-200 dark:border-white/10 text-xs text-stone-600 dark:text-[#A89B90] flex items-start gap-3 shadow-2xs">
                  <ShieldCheck className="w-5 h-5 text-[#8C6D46] dark:text-[#C5A880] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="font-bold text-stone-900 dark:text-white font-sans">
                      ضمانت اصالت و سلامت مرسوله:
                    </div>
                    <div className="leading-relaxed font-sans text-stone-500 dark:text-[#A89B90]">
                      تمامی سفارشات با کاور زیپ‌دار اختصاصی مزون و چوب‌لباسی نفیس ارسال می‌گردند.
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
