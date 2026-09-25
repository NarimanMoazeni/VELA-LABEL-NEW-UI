# VELA LABEL — New UI & Design System

A quiet luxury Persian RTL women's fashion e-commerce experience for **VELA LABEL** (`مزون و آتلیه ولا`), featuring curated seasonal capsule collections, bespoke tailoring consultations, and Telegram ordering.

---

## ✦ Design System & Visual Architecture

### 1. Palette & Surfaces
- **Base Background**: Luxury Dark Espresso (`#120E0C` / `#14100E`)
- **Card & Elevated Surfaces**: Deep Espresso Charcoal (`#181411` / `#1E1915`) with subtle `border-white/10`
- **Champagne Gold Accent**: `#C5A880` / `#D4B890` (active navigation indicators, filter pills, price highlights, buttons)
- **Typography Colors**: Off-white `#FFFFFF` for primary titles, Warm Alabaster `#FAF6F0` for body copy, Muted Camel `#A89B90` for metadata.

### 2. High-Fidelity Persian & Editorial Typography
- **Primary Persian Font**: Official `Estedad` webfonts (Weights 400, 500, 600, 700) with `Vazirmatn` fallback.
- **Brand Serif**: `Italiana` for the `VELA` wordmark.
- **Latin Accent & Metadata**: `Montserrat` (`font-latin`) with refined letter spacing for uppercase product codes and atelier tags (`ATELIER • ISFAHAN`, `AUTUMN / WINTER 2026`).

---

## ✦ Key Components

1. **Header & Announcement Strip**:
   - Fixed, compact header with `border-b border-white/10`.
   - Announcement banner: `ارسال فوری با کاور اختصاصی مزون ولا`.
   - 3-zone layout with optically centered circular logo (`public/products/logo.webp`).
   - Circular action buttons: Search, Theme Toggle (Sun/Moon), Wishlist, and Cart pill with live count.
   - Fluid mobile navigation drawer.

2. **Cinematic Hero Banner (Autumn / Winter 2026)**:
   - Wide atmospheric banner (`rounded-[32px]`) with seamless dark gradient blend integrating the model photo with the architectural stone background.
   - Persian headline: `اصالت، وقار و سادگی` with dynamic subtitle and editorial copy.
   - Dual CTAs: Solid champagne gold pill (`مشاهده کلکسیون ←`) + Glass outline pill (`بررسی ست وست و شلوار`).
   - Slide pagination (`01 / 03`) with interactive dots and edge navigation chevrons.
   - Touch swipe gestures for mobile ergonomics.

3. **Trust Strip & 3-Column Category Cards**:
   - 3-column horizontal Trust Bar:
     - `ضمانت کیفیت — تضمین اصالت کالا`
     - `پرداخت امن — درگاه‌های معتبر بانکی`
     - `ارسال سریع به سراسر کشور — با بسته‌بندی ایمن`
   - Visual category cards (`شخصی‌دوزی مزون`, `ست وست و شلوار`, `کت و بلیزر`).

4. **Best Sellers Atmospheric Header Banner**:
   - Ambient textured banner with diagonal lighting.
   - Title: `پرفروش‌ترین محصولات` + Subtitle: `محبوب‌ترین انتخاب‌های شما، با بالاترین رضایت`.
   - Poetic brand statement: `«کیفیت، سبک و اصالت در هر انتخاب شماست.»`.

5. **Category Filter & Sort Bar**:
   - Solid gold active filter pills (`همه محصولات`) and sleek outline pills (`ست وست و شلوار`, `کت و بلیزر`, `شخصی‌دوزی مزون`).
   - Active count (`نمایش ۳ از ۳`) and custom luxury sort dropdown (`جدیدترین‌ها`).

6. **Editorial Product Cards**:
   - 3:4 aspect ratio with real high-resolution WebP imagery.
   - Top-right badges (`لوک اختصاصی ولا`, `پرفروش‌ترین`, `جدیدترین طرح`).
   - Top-left circular glass wishlist heart button.
   - Bottom-right circular gallery cycle button.
   - Aligned info: Product code, Persian title, champagne gold price, color swatches, and circular cart button.

7. **Atelier Philosophy & Bespoke Concierge**:
   - Traditional canvas interlining (`لایی‌کشی سنتی`), premium fabrics (`کرپ مازراتی و فاستونی`), and custom tailoring in Isfahan (`آتلیه اصفهان`).
   - Telegram order & sizing concierge (`@velalabel`).

8. **4-Step Checkout Drawer**:
   - Step 01: Cart review with quantity steppers.
   - Step 02: Recipient contact & full address validation.
   - Step 03: Pasargad Bank card-to-card transfer details (`۵۰۲۲-۲۹۱۰-۸۴۷۳-۱۹۰۲`).
   - Step 04: Order summary & instant 1-click submission to Telegram.

---

## ✦ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Location**: Atelier Isfahan (`اصفهان • آتلیه تخصصی ولا`)
