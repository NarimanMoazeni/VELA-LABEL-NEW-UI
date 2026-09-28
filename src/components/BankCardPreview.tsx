import React, { useState, useRef, useCallback } from 'react';
import { Copy, Check, Wifi } from 'lucide-react';

interface BankCardPreviewProps {
  bankName?: string;
  accountHolder?: string;
  cardNumber?: string;
  cardNumberRaw?: string;
  expiryDate?: string;
  onCopySuccess?: (message: string) => void;
}

export const BankCardPreview: React.FC<BankCardPreviewProps> = ({
  bankName = 'بانک ملی ایران',
  accountHolder = 'مزون ولا لیبل (آتلیه اصفهان)',
  cardNumber = '۶۰۳۷ • ۹۹۷۵ • ۱۲۳۴ • ۵۶۷۸',
  cardNumberRaw = '6037997512345678',
  expiryDate = '۰۸ / ۰۶',
  onCopySuccess,
}) => {
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle restrained tilt: max 6 degrees
    const rotateX = -((y - centerY) / centerY) * 6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.22,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setRotate({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard
      .writeText(cardNumberRaw)
      .then(() => {
        setCopied(true);
        if (onCopySuccess) {
          onCopySuccess('شماره کارت با موفقیت کپی شد');
        }
        setTimeout(() => setCopied(false), 2400);
      })
      .catch(() => {
        if (onCopySuccess) {
          onCopySuccess(`شماره کارت: ${cardNumber}`);
        }
      });
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* 3D Container with Perspective */}
      <div
        className="w-full max-w-[420px] select-none"
        style={{ perspective: '1000px' }}
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleCopy}
          style={{
            transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
            transition: 'transform 0.15s ease-out',
            transformStyle: 'preserve-3d',
          }}
          className="relative w-full aspect-[1.586/1] rounded-2xl p-5 sm:p-6 text-white shadow-xl border border-[#C5A880]/30 overflow-hidden cursor-pointer group bg-gradient-to-br from-[#261E18] via-[#1A1410] to-[#120E0C]"
          title="جهت کپی شماره کارت کلیک کنید"
        >
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-[#C5A880]/15 blur-3xl pointer-events-none" />
          <div className="absolute -right-16 -bottom-16 w-56 h-56 rounded-full bg-[#8A6F52]/15 blur-3xl pointer-events-none" />

          {/* Interactive Dynamic Glare Reflection */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(229, 204, 168, ${glare.opacity}), transparent 60%)`,
            }}
          />

          {/* Guilloche / Luxury Line Pattern (Watermark) */}
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="luxury-grid"
                width="28"
                height="28"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="14" cy="14" r="13" fill="none" stroke="#C5A880" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#luxury-grid)" />
          </svg>

          {/* Card Top Row: Bank Info (RTL right) + Contactless Wave (RTL left) */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-pulse" />
              <span className="font-sans text-xs sm:text-sm font-bold text-[#EAE0D5] tracking-wide">
                {bankName}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-[#C5A880] border border-[#C5A880]/20 font-medium mr-1.5">
                واریز کارت‌به‌کارت
              </span>
            </div>

            {/* Contactless Wave Icon */}
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4 text-[#C5A880] rotate-90 opacity-80" />
              <span className="font-serif text-[11px] font-bold tracking-widest text-[#C5A880]/80">
                VELA
              </span>
            </div>
          </div>

          {/* Chip & Security Feature Row */}
          <div className="relative z-10 flex items-center gap-4 my-3 sm:my-3.5">
            {/* Realistic EMV Metallic Chip */}
            <div className="w-11 h-8 sm:w-12 sm:h-9 rounded-md bg-gradient-to-br from-[#F5E6CA] via-[#C5A880] to-[#8C6D46] shadow-md border border-[#F5E6CA]/60 relative overflow-hidden shrink-0">
              {/* Etched Circuit Pathways */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-[#4A3824]/60" />
              <div className="absolute inset-y-0 left-1/3 w-px bg-[#4A3824]/60" />
              <div className="absolute inset-y-0 right-1/3 w-px bg-[#4A3824]/60" />
              <div className="absolute inset-1.5 rounded-xs border border-[#4A3824]/40" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#E5CCA8]/80" />
            </div>

            {/* Subtle Watermark Tag */}
            <span className="text-[10px] text-[#A89B90] tracking-wider uppercase font-latin">
              DIRECT SETTLEMENT
            </span>
          </div>

          {/* Card Number Row: Prominent, Letterspaced & Embossed */}
          <div className="relative z-10 my-2">
            <div
              dir="ltr"
              className="font-mono text-base sm:text-lg lg:text-[20px] font-bold tracking-[0.16em] text-[#FAF5EE] text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
            >
              {cardNumber}
            </div>
          </div>

          {/* Bottom Row: Cardholder & Expiry & Copy Action */}
          <div className="relative z-10 flex items-end justify-between pt-1">
            {/* Right in RTL: Account Holder */}
            <div className="min-w-0 pr-1">
              <span className="block text-[9.5px] sm:text-[10px] text-[#9E9085] font-medium leading-none mb-1">
                به‌نام / صاحب حساب:
              </span>
              <span className="font-sans text-xs sm:text-[13px] font-bold text-white truncate block">
                {accountHolder}
              </span>
            </div>

            {/* Left in RTL: Expiry & Copy Button */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="text-left hidden min-[360px]:block pl-1" dir="ltr">
                <span className="block text-[9px] text-[#9E9085] font-latin uppercase leading-none mb-1">
                  EXPIRES
                </span>
                <span className="font-mono text-[11px] font-bold text-[#E5CCA8]">
                  {expiryDate}
                </span>
              </div>

              {/* Copy Button */}
              <button
                type="button"
                onClick={handleCopy}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 shadow-xs cursor-pointer ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#C5A880] hover:bg-[#D4B890] text-[#120E0C]'
                }`}
                title="کپی شماره کارت"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>کپی شد</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>کپی</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Helper text below card */}
      <p className="text-[11px] text-[#8E827A] dark:text-[#A89B90] mt-2.5 text-center leading-relaxed">
        برای تسویه سفارش، مبلغ فاکتور را به شماره کارت فوق واریز نموده و فیش را در تلگرام ارسال فرمایید.
      </p>
    </div>
  );
};
