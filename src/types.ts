export interface ColorOption {
  name: string;
  hex: string;
  border?: boolean;
}

export interface Product {
  id: string;
  code: string;
  title: string;
  category: 'all' | 'blazer' | 'coat' | 'silk' | 'trousers' | 'set' | 'bespoke';
  categoryLabel: string;
  price: number;
  priceFormatted: string;
  badge?: string;
  badgeType?: 'limited' | 'new' | 'bespoke' | 'exclusive';
  image: string;
  gallery: string[];
  fabric: string;
  origin: string;
  description: string;
  features: string[];
  sizes: string[];
  colors: ColorOption[];
}

export interface CartItem {
  id: string; // unique item composite id: productId + size + color
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export interface CustomerOrderData {
  fullName: string;
  phone: string;
  address: string;
  postalCode?: string;
  notes?: string;
}

export interface ToastData {
  id: number;
  message: string;
  type?: 'success' | 'info' | 'cart';
}
