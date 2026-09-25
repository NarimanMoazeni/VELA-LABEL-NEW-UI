import { Product } from '../types';

export const toPersianDigits = (num: number | string): string => {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num
    .toString()
    .replace(/\d/g, (x) => farsiDigits[parseInt(x, 10)]);
};

export const formatTomans = (amount: number): string => {
  const formattedWithCommas = amount.toLocaleString('en-US');
  return `${toPersianDigits(formattedWithCommas)} تومان`;
};

export const defaultColors = [
  { name: 'مشکی کلاغی', hex: '#1C1917' },
  { name: 'شکلاتی پاییزی', hex: '#5C3A21' },
  { name: 'زغالی عمیق', hex: '#2A2421' },
  { name: 'کرم نود', hex: '#E5D7CA' },
];

export const CATEGORIES = [
  { id: 'all', label: 'همه محصولات', hasStar: false },
  { id: 'set', label: 'ست وست و شلوار' },
  { id: 'blazer', label: 'کت و بلیزر' },
  { id: 'bespoke', label: 'شخصی‌دوزی مزون' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'vla-st-002',
    code: 'VLA-ST-002',
    title: 'ست وست و شلوار شکلاتی ولا',
    category: 'set',
    categoryLabel: 'ست وست و شلوار',
    price: 4450000,
    priceFormatted: '۴,۴۵۰,۰۰۰ تومان',
    badge: 'لوک اختصاصی ولا',
    badgeType: 'limited',
    image: '/products/vla-st-002.webp',
    gallery: [
      '/products/vla-st-002.webp',
      '/products/vla-st-003.webp',
    ],
    fabric: 'پارچه بافت‌دار پاییزه ترک',
    origin: 'آتلیه تخصصی ولا • اصفهان',
    description: 'ست سه‌تکه شامل جلیقه (وست) بافت‌دار طرحدار، شلوار واید راسته خوش‌فرم با فاق بلند و شومیز آستین پفی. همراه با کمربند چرمی اختصاصی.',
    features: [
      'پارچه وارداتی بافت‌دار بدون چروک و بدون آبرفت',
      'شلوار واید با ایستایی شکیل و خط اتوی ماندگار',
      'طراحی انحصاری کپسول پاییز و زمستان ولا',
      'ارسال در کاور اختصاصی مزونی همراه با چوب‌لباسی'
    ],
    sizes: ['۳۶', '۳۸', '۴۰', '۴۲'],
    colors: [
      { name: 'شکلاتی پاییزی', hex: '#5C3A21' },
      { name: 'نسکافه‌ای تیره', hex: '#7A5C43' },
    ]
  },
  {
    id: 'vla-adl-001',
    code: 'VLA-ADL-001',
    title: 'کت تک کلاسیک مشکی آدل',
    category: 'blazer',
    categoryLabel: 'کت و بلیزر تک',
    price: 3850000,
    priceFormatted: '۳,۸۵۰,۰۰۰ تومان',
    badge: 'پرفروش‌ترین',
    badgeType: 'new',
    image: '/products/vla-adl-001.webp',
    gallery: [
      '/products/vla-adl-001.webp',
      '/products/vla-adl-002.webp'
    ],
    fabric: 'کرپ مازراتی درجه یک وارداتی',
    origin: 'آتلیه تخصصی ولا • اصفهان',
    description: 'کت تک کلاسیک با جیب‌های فیلتابی لبه‌دار، لایی‌کشی سنتی اتویی و آسترکشی تمام. تک‌دکمه متقارن با یقه بلیزر خوش‌فرم جهت استایل‌های رسمی و اداری.',
    features: [
      'ایستایی چهارفصل بدون پرزدهی و بدون چروک',
      'جیب‌های لبه‌دار فیلتابی با دوخت دست‌دوز تمیز',
      'آستر ابریشمی با تنفس‌پذیری بالا',
      'امکان شخصی‌دوزی و تنظیم قد در آتلیه'
    ],
    sizes: ['۳۸', '۴۰', '۴۲'],
    colors: [
      { name: 'مشکی کلاغی', hex: '#1C1917' },
      { name: 'زغالی عمیق', hex: '#2A2421' }
    ]
  },
  {
    id: 'vla-lrn-001',
    code: 'VLA-LRN-001',
    title: 'کت تک مزونی مشکی لورن',
    category: 'blazer',
    categoryLabel: 'کت و بلیزر تک',
    price: 3950000,
    priceFormatted: '۳,۹۵۰,۰۰۰ تومان',
    badge: 'جدیدترین طرح',
    badgeType: 'new',
    image: '/products/vla-lrn-002.webp',
    gallery: [
      '/products/vla-lrn-002.webp',
      '/products/vla-lrn-001.webp'
    ],
    fabric: 'فاستونی کش کتی اعلا',
    origin: 'آتلیه تخصصی ولا • اصفهان',
    description: 'کت تک مینیمال با جیب‌های شکافی مدرن، خط شانه کشیده و دوخت تمام مزونی. گزینه‌ای باوقار برای ست با شلوار واید یا استایل کژوال اسمارت.',
    features: [
      'برش مینیمال با جیب‌های مخفی شکافی',
      'لایی‌کشی ساختاریافته بدون تغییر فرم در شستشو',
      'تک‌دکمه مات دودی هماهنگ با پارچه',
      'بسته‌بندی نفیس و ارسال رایگان بیمه‌شده'
    ],
    sizes: ['۳۸', '۴۰', '۴۲'],
    colors: [
      { name: 'مشکی عمیق', hex: '#1C1917' },
      { name: 'کرم استخوانی', hex: '#D4C5B3' }
    ]
  }
];

export const BANK_CARD_DETAILS = {
  bankName: 'بانک پاسارگاد',
  accountHolder: 'مزون ولا لیبل',
  cardNumber: '۵۰۲۲-۲۹۱۰-۸۴۷۳-۱۹۰۲',
  cardNumberRaw: '5022291084731902',
};
