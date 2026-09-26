import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  Send,
  CreditCard,
  Building2,
  CheckCircle2,
  Phone,
  User,
  MapPin,
  Mail,
  Copy,
  Check,
  AlertCircle,
} from 'lucide-react';
import { CartItem, CustomerOrderData } from '../types';
import { formatTomans, toPersianDigits } from '../data/products';

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
  const [copiedCard, setCopiedCard] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof CustomerOrderData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const rawSubtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const shippingFee = 0; // رایگان با کاور اختصاصی
  const finalTotal = rawSubtotal + shippingFee;

  const handleCopyCard = () => {
    navigator.clipboard.writeText('6037997512345678');
    setCopiedCard(true);
    onShowToast('شماره کارت آتلیه ولا کپی شد');
    setTimeout(() => setCopiedCard(false), 2500);
  };

  const validate = (): boolean => {
    const errs: Partial<Record<keyof CustomerOrderData, string>> = {};
    if (!customerData.fullName.trim()) errs.fullName = 'نام و نام خانوادگی الزامی است';
    if (!customerData.phone.trim()) {
      errs.phone = 'شماره موبایل الزامی است';
    } else if (!/^09\d{9}$/.test(customerData.phone.replace(/\s+/g, ''))) {
      errs.phone = 'شماره موبایل باید ۱۱ رقم با فرمت ۰۹ باشد';
    }
    if (!customerData.address.trim()) errs.address = 'آدرس کامل پستی الزامی است';
    if (!customerData.postalCode.trim()) {
      errs.postalCode = 'کد پستی ۱۰ رقمی الزامی است';
    } else if (!/^\d{10}$/.test(customerData.postalCode.replace(/\s+/g, ''))) {
      errs.postalCode = 'کد پستی باید ۱۰ رقم بدون خط تیره باشد';
    }
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const generateTelegramMessage = () => {
    const itemsList = items
      .map(
        (i, idx) =>
          `🔹 *آیتم ${toPersianDigits(idx + 1)}:* ${i.product.title}\n   • کد: \`${i.product.code}\`\n   • سایز: *${i.size}* | رنگ: *${i.color}*\n   • تعداد: ${toPersianDigits(i.quantity)} عدد\n   • مبلغ: ${formatTomans(i.product.price * i.quantity)}`
      )
      .join('\n\n');

    return `✨ *ثبت سفارش جدید در آتلیه ولا لیبل*\n━━━━━━━━━━━━━━━━━━━━\n👤 *مشخصات خریدار:*\n• نام و نام خانوادگی: ${customerData.fullName}\n• شماره تماس: \`${customerData.phone}\`\n• کد پستی: \`${customerData.postalCode}\`\n• نشانی: ${customerData.address}\n\n🛍️ *اقلام سفارش:*\n${itemsList}\n\n━━━━━━━━━━━━━━━━━━━━\n💳 *مبلغ کل فاکتور:* *${formatTomans(finalTotal)}*\n📦 *هزینه ارسال:* *رایگان (همراه با کاور اختصاصی مزون)*\n\n📌 *فیش واریزی پیوست شد:*`;
  };

  const handleCheckoutToTelegram = () => {
    if (!validate()) {
      onShowToast('لطفاً فرم مشخصات گیرنده را کامل فرمایید');
      return;
    }
    setIsSubmitting(true);
    const msg = generateTelegramMessage();
    const encoded = encodeURIComponent(msg);
    const tgUrl = `https://t.me/velalabel?text=${encoded}`;
    
    // Smooth transition
    setTimeout(() => {
      window.open(tgUrl, '_blank');
      setIsSubmitting(false);
      onShowToast('در حال انتقال به تلگرام جهت ارسال فاکتور...');
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-fade-in select-none">
      
      {/* Background Dim Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Main Checkout Modal Container */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#181411] sm:rounded-3xl shadow-2xl border border-[#DDD5C9] dark:border-white/10 flex flex-col max-h-screen sm:max-h-[92vh] overflow-hidden z-10 animate-pop text-right">
        
        {/* Header */}
        <div className="px-5 sm:px-8 py-4.5 bg-[#FAF7F2] dark:bg-[#14100E] border-b border-[#DDD5C9] dark:border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#7A5B36]/10 dark:bg-[#C5A880]/15 border border-[#7A5B36]/30 dark:border-[#C5A880]/30 text-[#7A5B36] dark:text-[#C5A880] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-[#7A5B36] dark:text-[#C5A880]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-sm tracking-widest text-[#181310] dark:text-white font-bold uppercase">VELA LABEL</span>
                <span className="text-[#7A5B36] dark:text-[#C5A880] text-xs">•</span>
                <h2 className="font-display text-sm sm:text-base font-bold text-[#181310] dark:text-white">
                  تسویه‌حساب و ثبت سفارش
                </h2>
              </div>
              <p className="text-[11px] text-[#6B5C51] dark:text-[#A89B90]">
                {items.length > 0
                  ? `${toPersianDigits(items.length)} آیتم در سبد خرید شما`
                  : 'سبد خرید شما خالی است'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 dark:bg-white/5 border border-[#DDD5C9] dark:border-white/10 text-[#4A3E36] dark:text-white/80 flex items-center justify-center hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
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
              <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-white/5 border border-[#DDD5C9] dark:border-white/10 flex items-center justify-center text-[#7A5B36] dark:text-[#C5A880]">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-lg text-[#181310] dark:text-white font-semibold">
                  سبد خرید شما خالی است
                </h3>
                <p className="text-xs text-[#6B5C51] dark:text-[#A89B90] max-w-xs leading-relaxed">
                  کالکشن جدید وست، شلوار و کت‌های تک آتلیه ولا را مشاهده فرمایید.
                </p>
              </div>
              <button
                onClick={onClose}
                className="mt-2 py-2.5 px-7 rounded-full bg-[#181310] dark:bg-[#C5A880] text-[#F8F5F0] dark:text-[#120E0C] text-xs font-bold hover:bg-[#2C231E] dark:hover:bg-[#D4B890] transition-colors cursor-pointer shadow-md"
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
                  <div className="flex items-center justify-between pb-2 border-b border-[#DDD5C9] dark:border-white/10">
                    <span className="text-sm font-bold text-[#181310] dark:text-white tracking-wide">
                      ۰۱ — بازبینی اقلام سبد خرید
                    </span>
                    <button
                      onClick={onClearCart}
                      className="text-xs text-[#7A5B36] dark:text-[#C5A880] hover:text-red-500 transition-colors cursor-pointer"
                    >
                      خالی کردن سبد
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF7F2] dark:bg-[#14100E] border border-[#DDD5C9] dark:border-white/10 gap-3"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-14 h-18 object-cover rounded-xl border border-[#DDD5C9] dark:border-white/10 shrink-0"
                        />

                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-[#181310] dark:text-white truncate">
                            {item.product.title}
                          </h4>
                          <div className="text-xs text-[#6B5C51] dark:text-[#A89B90] mt-0.5">
                            سایز: <strong className="text-[#181310] dark:text-white font-bold">{item.size}</strong> • رنگ: {item.color}
                          </div>
                          <div className="text-sm font-extrabold text-[#6E4F2E] dark:text-[#E5CCA8] mt-1 font-display">
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

                          <div className="flex items-center gap-1 bg-white dark:bg-[#1E1915] border border-[#DDD5C9] dark:border-white/15 px-2 py-0.5 rounded-full">
                            <button
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="text-[#181310] dark:text-white font-bold px-1 text-xs hover:text-[#7A5B36] dark:hover:text-[#C5A880] cursor-pointer"
                              aria-label="کاهش تعداد"
                            >
                              -
                            </button>
                            <span className="text-xs px-1 font-bold text-[#181310] dark:text-white">
                              {toPersianDigits(item.quantity)}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="text-[#181310] dark:text-white font-bold px-1 text-xs hover:text-[#7A5B36] dark:hover:text-[#C5A880] cursor-pointer"
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

                {/* 02 — Customer Order Form */}
                <div className="space-y-3.5 pt-2">
                  <div className="pb-2 border-b border-[#DDD5C9] dark:border-white/10">
                    <span className="text-sm font-bold text-[#181310] dark:text-white tracking-wide">
                      ۰۲ — مشخصات گیرنده و نشانی پستی
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      
                      {/* Full Name */}
                      <div className="space-y-1">
                        <label className="text-xs text-[#55473D] dark:text-[#A89B90] flex items-center gap-1.5 font-medium">
                          <User className="w-3.5 h-3.5 text-[#7A5B36] dark:text-[#C5A880]" />
                          <span>نام و نام خانوادگی</span>
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={customerData.fullName}
                          onChange={(e) =>
                            onCustomerDataChange({ ...customerData, fullName: e.target.value })
                          }
                          placeholder="مثال: مریم کریمی"
                          className={`w-full bg-[#FAF7F2] dark:bg-[#14100E] border rounded-xl px-3.5 py-2.5 text-xs text-[#181310] dark:text-white focus:outline-none transition-colors ${
                            formErrors.fullName
                              ? 'border-red-500 focus:border-red-500'
                              : 'border-[#DDD5C9] dark:border-white/10 focus:border-[#7A5B36] dark:focus:border-[#C5A880]'
                          }`}
                        />
                        {formErrors.fullName && (
                          <p className="text-[10px] text-red-500 flex items-center gap-1 mt-0.5">
                            <AlertCircle className="w-3 h-3" />
                            <span>{formErrors.fullName}</span>
                          </p>
                        )}
                      </div>

                      {/* Phone Number */}
                      <div className="space-y-1">
                        <label className="text-xs text-[#55473D] dark:text-[#A89B90] flex items-center gap-1.5 font-medium">
                          <Phone className="w-3.5 h-3.5 text-[#7A5B36] dark:text-[#C5A880]" />
                          <span>شماره موبایل (تماس و هماهنگی)</span>
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          value={customerData.phone}
                          onChange={(e) =>
                            onCustomerDataChange({ ...customerData, phone: e.target.value })
                          }
                          placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                          dir="ltr"
                          className={`w-full bg-[#FAF7F2] dark:bg-[#14100E] border rounded-xl px-3.5 py-2.5 text-xs text-[#181310] dark:text-white focus:outline-none transition-colors ${
                            formErrors.phone
                              ? 'border-red-500 focus:border-red-500'
                              : 'border-[#DDD5C9] dark:border-white/10 focus:border-[#7A5B36] dark:focus:border-[#C5A880]'
                          }`}
                        />
                        {formErrors.phone && (
                          <p className="text-[10px] text-red-500 flex items-center gap-1 mt-0.5">
                            <AlertCircle className="w-3 h-3" />
                            <span>{formErrors.phone}</span>
                          </p>
                        )}
                      </div>

                    </div>

                    {/* Postal Code */}
                    <div className="space-y-1">
                      <label className="text-xs text-[#55473D] dark:text-[#A89B90] flex items-center gap-1.5 font-medium">
                        <Mail className="w-3.5 h-3.5 text-[#7A5B36] dark:text-[#C5A880]" />
                        <span>کد پستی ۱۰ رقمی</span>
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        maxLength={10}
                        value={customerData.postalCode}
                        onChange={(e) =>
                          onCustomerDataChange({ ...customerData, postalCode: e.target.value })
                        }
                        placeholder="کد پستی محل سکونت یا کار"
                        dir="ltr"
                        className={`w-full bg-[#FAF7F2] dark:bg-[#14100E] border rounded-xl px-3.5 py-2.5 text-xs text-[#181310] dark:text-white focus:outline-none transition-colors ${
                          formErrors.postalCode
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-[#DDD5C9] dark:border-white/10 focus:border-[#7A5B36] dark:focus:border-[#C5A880]'
                        }`}
                      />
                      {formErrors.postalCode && (
                        <p className="text-[10px] text-red-500 flex items-center gap-1 mt-0.5">
                          <AlertCircle className="w-3 h-3" />
                          <span>{formErrors.postalCode}</span>
                        </p>
                      )}
                    </div>

                    {/* Full Address */}
                    <div className="space-y-1">
                      <label className="text-xs text-[#55473D] dark:text-[#A89B90] flex items-center gap-1.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#7A5B36] dark:text-[#C5A880]" />
                        <span>نشانی دقیق پستی (استان، شهر، خیابان، پلاک و واحد)</span>
                        <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={2}
                        value={customerData.address}
                        onChange={(e) =>
                          onCustomerDataChange({ ...customerData, address: e.target.value })
                        }
                        placeholder="مثال: اصفهان، خیابان نظر شرقی، کوچه میرفندرسکی، پلاک ۱۲، واحد ۳"
                        className={`w-full bg-[#FAF7F2] dark:bg-[#14100E] border rounded-xl px-3.5 py-2 text-xs text-[#181310] dark:text-white focus:outline-none transition-colors resize-none ${
                          formErrors.address
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-[#DDD5C9] dark:border-white/10 focus:border-[#7A5B36] dark:focus:border-[#C5A880]'
                        }`}
                      />
                      {formErrors.address && (
                        <p className="text-[10px] text-red-500 flex items-center gap-1 mt-0.5">
                          <AlertCircle className="w-3 h-3" />
                          <span>{formErrors.address}</span>
                        </p>
                      )}
                    </div>

                  </div>
                </div>

              </div>

              {/* Left Column: 03 Payment Instruction & Submit CTA (5 cols) */}
              <div className="md:col-span-5 space-y-4">
                
                {/* 03 — Bank Transfer Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] dark:bg-[#14100E] border border-[#DDD5C9] dark:border-white/10 space-y-3.5">
                  <div className="flex items-center justify-between pb-2 border-b border-[#DDD5C9] dark:border-white/10 text-xs">
                    <span className="font-bold text-[#181310] dark:text-white flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-[#7A5B36] dark:text-[#C5A880]" />
                      <span>۰۳ — واریز کارت به کارت</span>
                    </span>
                    <span className="text-[10.5px] text-[#7A5B36] dark:text-[#C5A880] font-semibold bg-[#7A5B36]/10 dark:bg-[#C5A880]/10 px-2 py-0.5 rounded-full">
                      بدون کارمزد
                    </span>
                  </div>

                  {/* Card Display Box */}
                  <div className="p-3.5 rounded-xl bg-white dark:bg-black/40 border border-[#DDD5C9] dark:border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#6B5C51] dark:text-[#A89B90]">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-[#7A5B36] dark:text-[#C5A880]" />
                        <span>بانک ملی ایران</span>
                      </span>
                      <span className="font-semibold text-[#181310] dark:text-white">به نام: مزون ولا (آتلیه)</span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span
                        className="font-latin font-bold text-sm tracking-widest text-[#181310] dark:text-[#C5A880]"
                        dir="ltr"
                      >
                        6037 • 9975 • 1234 • 5678
                      </span>
                      <button
                        onClick={handleCopyCard}
                        className="p-1.5 rounded-lg bg-stone-100 dark:bg-white/10 hover:bg-[#7A5B36] hover:text-white dark:hover:bg-[#C5A880] dark:hover:text-[#120E0C] text-[#55473D] dark:text-white transition-colors cursor-pointer"
                        title="کپی شماره کارت"
                      >
                        {copiedCard ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#6B5C51] dark:text-[#A89B90] leading-relaxed">
                    پس از تکمیل مشخصات، دکمه زیر را فشار دهید تا جزئیات به تلگرام اختصاصی منتقل شده و با ارسال فیش، سفارش نهایی گردد.
                  </p>
                </div>

                {/* Order Summary & Final Total */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] dark:bg-[#14100E] border border-[#DDD5C9] dark:border-white/10 space-y-3">
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between text-[#6B5C51] dark:text-[#A89B90]">
                      <span>مجموع ارزش سفارش:</span>
                      <span className="font-bold text-[#181310] dark:text-white font-display">
                        {formatTomans(rawSubtotal)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[#6B5C51] dark:text-[#A89B90]">
                      <span>بسته‌بندی و ارسال اختصاصی:</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                        رایگان (کاور مزون)
                      </span>
                    </div>
                    <div className="pt-2 border-t border-[#DDD5C9] dark:border-white/10 flex items-center justify-between text-sm">
                      <span className="font-bold text-[#181310] dark:text-white">مبلغ نهایی قابل واریز:</span>
                      <span className="font-extrabold text-base text-[#6E4F2E] dark:text-[#E5CCA8] font-display">
                        {formatTomans(finalTotal)}
                      </span>
                    </div>
                  </div>

                  {/* Primary Checkout CTA */}
                  <div className="space-y-2 pt-1">
                    <button
                      onClick={handleCheckoutToTelegram}
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-full bg-[#181310] hover:bg-[#2C231E] dark:bg-[#C5A880] dark:hover:bg-[#D4B890] text-[#F8F5F0] dark:text-[#120E0C] font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95 cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-4 h-4 text-[#F8F5F0] dark:text-[#120E0C]" />
                      <span>{isSubmitting ? 'در حال اتصال...' : 'تکمیل سفارش و ارسال در تلگرام'}</span>
                    </button>

                    <p className="text-center text-[10.5px] text-[#6B5C51] dark:text-[#A89B90] leading-normal px-2">
                      ارتباط مستقیم با کارشناس آتلیه ولا (@velalabel) جهت ثبت قطعی و ارسال فیش واریزی
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-[#FAF7F2] dark:bg-white/5 rounded-2xl border border-[#DDD5C9] dark:border-white/10 text-xs text-[#6B5C51] dark:text-[#A89B90] space-y-1">
                  <div className="font-semibold text-[#181310] dark:text-white">ضمانت اصالت و سلامت مرسوله:</div>
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
