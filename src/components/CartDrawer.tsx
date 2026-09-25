import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, Copy, Send, Check } from 'lucide-react';
import { CartItem, CustomerOrderData } from '../types';
import { BANK_CARD_DETAILS, formatTomans, toPersianDigits } from '../data/products';

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
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleCopyCard = () => {
    navigator.clipboard
      .writeText(BANK_CARD_DETAILS.cardNumberRaw)
      .then(() => {
        setCopied(true);
        onShowToast('شماره کارت با موفقیت کپی شد');
        setTimeout(() => setCopied(false), 2500);
      })
      .catch(() => {
        onShowToast(`شماره کارت: ${BANK_CARD_DETAILS.cardNumber}`);
      });
  };

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
      onShowToast('لطفاً آدرس تحویل سفارش را وارد نمایید');
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

    try {
      const a = document.createElement('a');
      a.href = telegramUrl;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch {
      window.location.href = telegramUrl;
    }
    onShowToast('در حال انتقال به تلگرام مشاور اختصاصی مزون ولا...');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md p-0 sm:p-4 md:p-6 flex items-center justify-center animate-fade-in select-none">
      <div className="fixed inset-0" onClick={onClose} />

      {/* Main Checkout Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#181411] sm:rounded-3xl shadow-2xl border border-white/10 flex flex-col max-h-screen sm:max-h-[92vh] overflow-hidden z-10 animate-pop text-right">
        
        {/* Header */}
        <div className="px-5 sm:px-8 py-4.5 bg-[#14100E] border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#C5A880]/15 border border-[#C5A880]/30 text-[#C5A880] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-[#C5A880]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-sm tracking-widest text-white font-bold uppercase">VELA LABEL</span>
                <span className="text-[#C5A880] text-xs">•</span>
                <h2 className="font-display text-sm sm:text-base font-bold text-white">
                  تسویه‌حساب و ثبت سفارش
                </h2>
              </div>
              <p className="text-[11px] text-[#A89B90]">
                {items.length > 0
                  ? `${toPersianDigits(items.length)} آیتم در سبد خرید شما`
                  : 'سبد خرید شما خالی است'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-white/80 flex items-center justify-center hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="بستن"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8">
          {items.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#C5A880]">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-lg text-white font-semibold">
                  سبد خرید شما خالی است
                </h3>
                <p className="text-xs text-[#A89B90] max-w-xs leading-relaxed">
                  کالکشن جدید وست، شلوار و کت‌های تک آتلیه ولا را مشاهده فرمایید.
                </p>
              </div>
              <button
                onClick={onClose}
                className="mt-2 py-2.5 px-7 rounded-full bg-[#C5A880] text-[#120E0C] text-xs font-bold hover:bg-[#D4B890] transition-colors cursor-pointer shadow-md"
              >
                مشاهده کالکشن مزون
              </button>
            </div>
          ) : (
            /* 2-Column Desktop Checkout Layout */
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
              
              {/* Right Column: Steps 01, 02, 03 (7 cols) */}
              <div className="md:col-span-7 space-y-6">
                
                {/* 01 — Cart Review */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-sm font-bold text-white tracking-wide">
                      ۰۱ — بازبینی اقلام سبد خرید
                    </span>
                    <button
                      onClick={onClearCart}
                      className="text-xs text-[#C5A880] hover:text-red-400 transition-colors cursor-pointer"
                    >
                      خالی کردن سبد
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3.5 rounded-2xl bg-[#14100E] border border-white/10 gap-3"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-14 h-18 object-cover rounded-xl border border-white/10 shrink-0"
                        />

                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-white truncate">
                            {item.product.title}
                          </h4>
                          <div className="text-xs text-[#A89B90] mt-0.5">
                            سایز: <strong className="text-white font-bold">{item.size}</strong> • رنگ: {item.color}
                          </div>
                          <div className="text-sm font-extrabold text-[#E5CCA8] mt-1 font-display">
                            {formatTomans(item.product.price * item.quantity)}
                          </div>
                        </div>

                        <div className="flex flex-col items-end justify-between h-18 py-0.5 shrink-0">
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-[#8E827A] hover:text-red-400 transition-colors p-1 cursor-pointer"
                            title="حذف از سبد"
                            aria-label="حذف آیتم"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                          <div className="flex items-center gap-1 bg-[#1E1915] border border-white/15 px-2 py-0.5 rounded-full">
                            <button
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="text-white font-bold px-1 text-xs hover:text-[#C5A880] cursor-pointer"
                              aria-label="کاهش تعداد"
                            >
                              -
                            </button>
                            <span className="text-xs px-1 font-bold text-white">
                              {toPersianDigits(item.quantity)}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="text-white font-bold px-1 text-xs hover:text-[#C5A880] cursor-pointer"
                              aria-label="افزایش تعداد"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 02 — Customer Contact & Delivery Info */}
                <div className="space-y-3 pt-2">
                  <div className="pb-2 border-b border-white/10">
                    <span className="text-sm font-bold text-white tracking-wide">
                      ۰۲ — اطلاعات تماس و آدرس گیرنده
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-[#EAE0D5] mb-1.5 font-bold">
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
                          className="w-full h-11 px-3.5 rounded-xl bg-[#14100E] border border-white/10 text-white text-sm font-medium focus:outline-none focus:border-[#C5A880] placeholder:text-[#786C65]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-[#EAE0D5] mb-1.5 font-bold">
                          شماره همراه <span className="text-[#C5A880]">*</span>
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
                          className="w-full h-11 px-3.5 rounded-xl bg-[#14100E] border border-white/10 text-white text-sm font-medium focus:outline-none focus:border-[#C5A880] text-right placeholder:text-[#786C65]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-[#EAE0D5] mb-1.5 font-bold">
                        کد پستی (۱۰ رقمی)
                      </label>
                      <input
                        type="text"
                        dir="ltr"
                        placeholder="1987654321"
                        value={customerData.postalCode || ''}
                        onChange={(e) =>
                          onCustomerDataChange({
                            ...customerData,
                            postalCode: e.target.value,
                          })
                        }
                        className="w-full h-11 px-3.5 rounded-xl bg-[#14100E] border border-white/10 text-white text-sm font-medium focus:outline-none focus:border-[#C5A880] text-right placeholder:text-[#786C65]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-[#EAE0D5] mb-1.5 font-bold">
                        آدرس دقیق پستی <span className="text-[#C5A880]">*</span>
                      </label>
                      <textarea
                        rows={2}
                        placeholder="استان، شهر، خیابان اصلی، کوچه، پلاک، واحد..."
                        value={customerData.address}
                        onChange={(e) =>
                          onCustomerDataChange({
                            ...customerData,
                            address: e.target.value,
                          })
                        }
                        className="w-full p-3 rounded-xl bg-[#14100E] border border-white/10 text-white text-sm font-medium focus:outline-none focus:border-[#C5A880] placeholder:text-[#786C65] resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 03 — Payment Information (Bank Card) */}
                <div className="space-y-3 pt-2">
                  <div className="pb-2 border-b border-white/10">
                    <span className="text-sm font-bold text-white tracking-wide">
                      ۰۳ — واریز کارت‌به‌کارت
                    </span>
                  </div>

                  {/* Pasargad Card */}
                  <div className="relative overflow-hidden rounded-2xl p-5 sm:p-6 text-white shadow-xl border border-white/15 bg-gradient-to-bl from-[#2A2016] via-[#1E1712] to-[#120E0C]">
                    <div className="absolute -left-16 -top-16 w-56 h-56 rounded-full bg-[#C5A880]/15 blur-3xl pointer-events-none" />
                    <div className="absolute -right-10 -bottom-20 w-56 h-56 rounded-full bg-[#8A6F52]/20 blur-3xl pointer-events-none" />
                    <div aria-hidden dir="ltr" className="absolute -bottom-8 right-2 font-mono text-[92px] leading-none font-bold text-white/[0.04] select-none">
                      5022
                    </div>

                    <div className="relative flex items-center justify-between">
                      <span className="text-sm font-bold text-[#EAE0D5]">{BANK_CARD_DETAILS.bankName}</span>
                      <span className="w-11 h-8 rounded-md bg-gradient-to-br from-[#E9DCC8] via-[#C9A87A] to-[#8A6F52] shadow-inner relative overflow-hidden shrink-0">
                        <span className="absolute inset-x-0 top-1/2 h-px bg-[#5A4A36]/60" />
                        <span className="absolute inset-y-0 left-1/2 w-px bg-[#5A4A36]/60" />
                      </span>
                    </div>

                    <div dir="ltr" className="relative text-center font-mono text-lg sm:text-[22px] font-bold tracking-[0.14em] my-5 text-[#F5EDE3]">
                      {BANK_CARD_DETAILS.cardNumber.split('-').join('  ')}
                    </div>

                    <div className="relative flex items-end justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-[10px] text-[#A89B90]">دارنده کارت</div>
                        <div className="text-sm font-bold text-white truncate">{BANK_CARD_DETAILS.accountHolder}</div>
                      </div>
                      <button
                        onClick={handleCopyCard}
                        className="flex items-center gap-1.5 text-xs font-bold bg-[#C5A880] text-[#120E0C] hover:bg-[#D4B890] px-4 py-2 rounded-full transition-all active:scale-95 cursor-pointer shrink-0 shadow-sm"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#120E0C]" />
                            <span>کپی شد</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>کپی شماره کارت</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-[#A89B90] leading-relaxed">
                    پس از واریز مبلغ سفارش، تصویر رسید بانکی را در تلگرام مشاور ولا ارسال فرمایید.
                  </p>
                </div>

              </div>

              {/* Left Column: Step 04 — Order Summary & Action (5 cols) */}
              <div className="md:col-span-5 md:sticky md:top-0 space-y-4">
                <div className="p-5 sm:p-6 rounded-2xl bg-[#14100E] border border-white/10 space-y-4 shadow-md">
                  <div className="pb-2.5 border-b border-white/10">
                    <span className="text-sm font-bold text-white tracking-wide">
                      ۰۴ — خلاصه فاکتور سفارش
                    </span>
                  </div>

                  <div className="space-y-3 text-sm font-medium text-[#A89B90]">
                    <div className="flex justify-between">
                      <span>مجموع ارزش اقلام ({toPersianDigits(items.length)} عدد):</span>
                      <span className="text-white font-semibold">{formatTomans(totalPrice)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>کاور اختصاصی و ارسال بیمه‌شده:</span>
                      <span className="text-emerald-400 font-medium">رایگان (کپسول مزونی)</span>
                    </div>

                    <div className="flex justify-between">
                      <span>خدمات شخصی‌دوزی و بسته‌بندی:</span>
                      <span className="text-white font-medium">محاسبه‌شده</span>
                    </div>
                  </div>

                  {/* Final Total */}
                  <div className="pt-3.5 border-t border-white/10 flex items-baseline justify-between gap-2">
                    <span className="text-sm sm:text-base font-extrabold text-white">
                      مبلغ نهایی سفارش:
                    </span>
                    <span className="text-xl sm:text-2xl font-extrabold text-[#E5CCA8] font-display">
                      {formatTomans(totalPrice)}
                    </span>
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-2 space-y-2.5">
                    <button
                      onClick={handleSubmitTelegramOrder}
                      className="w-full py-3.5 px-6 rounded-full bg-[#C5A880] hover:bg-[#D4B890] text-[#120E0C] font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#C5A880]/20 active:scale-95 cursor-pointer"
                      id="submit-telegram-order-btn"
                    >
                      <Send className="w-4 h-4 text-[#120E0C]" />
                      <span>تایید و ارسال سفارش در تلگرام</span>
                    </button>

                    <p className="text-center text-[10.5px] text-[#A89B90] leading-normal px-2">
                      ارتباط مستقیم با کارشناس آتلیه ولا (@velalabel) جهت ثبت قطعی و ارسال فیش واریزی
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10 text-xs text-[#A89B90] space-y-1">
                  <div className="font-semibold text-white">ضمانت اصالت و سلامت مرسوله:</div>
                  <div>تمامی سفارشات با کاور زیپ‌دار اختصاصی مزون و چوب‌لباسی نفیس ارسال می‌گردند.</div>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
