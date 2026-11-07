export type ProductCategory =
  | 'tum'
  | 'yumurtalar'
  | 'canli-hayvan'
  | 'yavru'
  | 'hizmet';

export interface ProductUnitOption {
  label: string;
  multiplier: number;
  note?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'yumurtalar' | 'canli-hayvan' | 'yavru' | 'hizmet';
  categoryLabel: string;
  price: number;
  unit: string; // e.g. "Adet", "30'lu Koli", "Kg"
  unitOptions?: ProductUnitOption[];
  image: string;
  tags: string[];
  badge?: string; // e.g. "Günün Fırsatı", "En Çok Satan", "Damızlık", "Taze Toplandı"
  description: string;
  detailedInfo?: string;
  inStock: boolean;
  stockNote?: string;
  featured?: boolean;
  rating?: number;
  reviewsCount?: number;
  minOrder?: number;
}

export interface CartItem {
  id: string; // unique item line id (product.id + unit)
  productId: string;
  name: string;
  image: string;
  unit: string;
  unitPrice: number;
  quantity: number;
  category: string;
}

export type OrderStatus =
  | 'yeni'
  | 'hazirlaniyor'
  | 'kargoda'
  | 'teslim-edildi'
  | 'iptal';

export interface OrderItemSummary {
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName?: string;
  customerPhone?: string;
  customerAddress?: string;
  orderNote?: string;
  items: OrderItemSummary[];
  totalAmount: number;
  status: OrderStatus;
  waChatUrl?: string;
}

export interface FarmSettings {
  farmName: string;
  tagline: string;
  phone: string;
  displayPhone: string;
  whatsappNumber: string;
  location: string;
  addressFull: string;
  workingHours: string;
  announcement: string;
  bannerActive: boolean;
  eggCurrentPrice: number; // For fast tracking
}
