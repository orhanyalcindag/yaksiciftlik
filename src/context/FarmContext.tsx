'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  OrderStatus,
  FarmSettings,
} from '@/types';
import { INITIAL_PRODUCTS, INITIAL_FARM_SETTINGS } from '@/data/initialProducts';

interface ToastInfo {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface CustomerCheckoutInfo {
  name: string;
  phone: string;
  address: string;
  note: string;
}

interface FarmContextType {
  products: Product[];
  farmSettings: FarmSettings;
  cart: CartItem[];
  orders: Order[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedProductModal: Product | null;
  setSelectedProductModal: (product: Product | null) => void;
  toasts: ToastInfo[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;

  // Cart actions
  addToCart: (
    product: Product,
    quantity?: number,
    selectedUnit?: string,
    unitPrice?: number
  ) => void;
  updateCartItemQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;

  // Checkout action
  checkoutViaWhatsApp: (customerInfo?: CustomerCheckoutInfo) => string;

  // Admin Product Actions
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  toggleStockStatus: (id: string) => void;
  quickUpdateProducts: (
    updates: Array<{ id: string; price: number; inStock: boolean; stockNote?: string }>
  ) => void;
  resetToDefaults: () => void;

  // Admin Order Actions
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  deleteOrder: (orderId: string) => void;

  // Settings Actions
  updateFarmSettings: (settings: Partial<FarmSettings>) => void;
}

const FarmContext = createContext<FarmContextType | undefined>(undefined);

const PRODUCTS_STORAGE_KEY = 'yaksi_farm_products_v3';
const CART_STORAGE_KEY = 'yaksi_farm_cart_v1';
const ORDERS_STORAGE_KEY = 'yaksi_farm_orders_v1';
const SETTINGS_STORAGE_KEY = 'yaksi_farm_settings_v1';

export function FarmProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [farmSettings, setFarmSettings] = useState<FarmSettings>(INITIAL_FARM_SETTINGS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (storedProducts) {
        const parsed: Product[] = JSON.parse(storedProducts);
        const merged = parsed.map((item) => {
          const initial = INITIAL_PRODUCTS.find((p) => p.id === item.id);
          if (initial) {
            const isCustom = item.image.startsWith('data:') || item.image.includes('custom-');
            return {
              ...item,
              image: isCustom ? item.image : initial.image,
              unitOptions: item.unitOptions && item.unitOptions.length >= 2 ? item.unitOptions : initial.unitOptions,
            };
          }
          return item;
        });
        setProducts(merged);
      } else {
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
      }

      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }

      const storedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      }

      const storedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (storedSettings) {
        setFarmSettings(JSON.parse(storedSettings));
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to LocalStorage whenever products change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
      } catch (e) {
        console.warn('Failed to save products:', e);
      }
    }
  }, [products, isLoaded]);

  // Save cart
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      } catch (e) {
        console.warn('Failed to save cart:', e);
      }
    }
  }, [cart, isLoaded]);

  // Save orders
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
      } catch (e) {
        console.warn('Failed to save orders:', e);
      }
    }
  }, [orders, isLoaded]);

  // Save settings
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(farmSettings));
      } catch (e) {
        console.warn('Failed to save settings:', e);
      }
    }
  }, [farmSettings, isLoaded]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedUnit?: string,
    unitPrice?: number
  ) => {
    const unit = selectedUnit || product.unit;
    const price = unitPrice !== undefined ? unitPrice : product.price;
    const cartItemId = `${product.id}-${unit}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            productId: product.id,
            name: product.name,
            image: product.image,
            unit,
            unitPrice: price,
            quantity,
            category: product.category,
          },
        ];
      }
    });

    showToast(`${quantity} x ${product.name} (${unit}) sepete eklendi!`, 'success');
  };

  const updateCartItemQuantity = (id: string, delta: number) => {
    setCart((prev) =>
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

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showToast('Ürün sepetten çıkarıldı.', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const checkoutViaWhatsApp = (customerInfo?: CustomerCheckoutInfo): string => {
    if (cart.length === 0) {
      showToast('Sepetiniz boş. Lütfen önce ürün ekleyin.', 'warning');
      return '';
    }

    const orderNumber = `YKS-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const itemsSummary = cart.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      unit: item.unit,
      unitPrice: item.unitPrice,
      total: item.unitPrice * item.quantity,
    }));

    // Build WhatsApp formatted message with clean, universally supported text formatting (NO broken unicode emojis or box characters)
    let msg = `*YAKŞİ ÇİFTLİK SİPARİŞ TALEBİ*\n`;
    msg += `----------------------------------------\n`;
    msg += `*Sipariş Kodu:* #${orderNumber}\n`;
    msg += `*Tarih:* ${formattedDate}\n`;
    msg += `----------------------------------------\n`;

    if (customerInfo?.name || customerInfo?.phone || customerInfo?.address) {
      msg += `*Müşteri Bilgileri:*\n`;
      if (customerInfo.name) msg += `• İsim: ${customerInfo.name}\n`;
      if (customerInfo.phone) msg += `• Telefon: ${customerInfo.phone}\n`;
      if (customerInfo.address) msg += `• Adres: ${customerInfo.address}\n`;
      if (customerInfo.note) msg += `• Not: ${customerInfo.note}\n`;
      msg += `----------------------------------------\n`;
    }

    msg += `*Sipariş Edilen Ürünler:*\n`;
    cart.forEach((item, index) => {
      const lineTotal = item.unitPrice * item.quantity;
      msg += `${index + 1}) *${item.name}* (${item.unit})\n`;
      msg += `   ${item.quantity} Adet x ${item.unitPrice} TL = *${lineTotal.toLocaleString('tr-TR')} TL*\n`;
    });

    msg += `----------------------------------------\n`;
    msg += `*TOPLAM TUTAR: ${cartTotal.toLocaleString('tr-TR')} TL*\n`;
    msg += `----------------------------------------\n`;
    msg += `*Konum:* Balaban Köyü • Demirköy • Kırklareli\n\n`;
    msg += `Merhaba Yakşi Çiftlik, web sitenizden sepetime eklediğim ürünleri sipariş etmek istiyorum. Teslimat ve ödeme detayları hakkında bilgi alabilir miyim?`;

    const encodedMsg = encodeURIComponent(msg);
    const waUrl = `https://wa.me/${farmSettings.whatsappNumber}?text=${encodedMsg}`;

    // Create order log record
    const newOrder: Order = {
      id: Date.now().toString(),
      orderNumber,
      createdAt: now.toISOString(),
      customerName: customerInfo?.name || 'WhatsApp Müşterisi',
      customerPhone: customerInfo?.phone || '',
      customerAddress: customerInfo?.address || '',
      orderNote: customerInfo?.note || '',
      items: itemsSummary,
      totalAmount: cartTotal,
      status: 'yeni',
      waChatUrl: waUrl,
    };

    setOrders((prev) => [newOrder, ...prev]);

    return waUrl;
  };

  // Admin CRUD for products
  const addProduct = (newProdData: Omit<Product, 'id'>) => {
    const id = newProdData.slug || `prod-${Date.now()}`;
    const newProduct: Product = {
      ...newProdData,
      id,
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`"${newProduct.name}" kataloğa eklendi!`, 'success');
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    showToast(`"${updatedProduct.name}" güncellendi.`, 'success');
  };

  const deleteProduct = (id: string) => {
    const itemToDelete = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast(`"${itemToDelete?.name || 'Ürün'}" katalogdan silindi.`, 'info');
  };

  const toggleStockStatus = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextStock = !p.inStock;
          return {
            ...p,
            inStock: nextStock,
            stockNote: nextStock ? 'Stokta Var' : 'Tükendi',
          };
        }
        return p;
      })
    );
  };

  const quickUpdateProducts = (
    updates: Array<{ id: string; price: number; inStock: boolean; stockNote?: string }>
  ) => {
    setProducts((prev) =>
      prev.map((p) => {
        const update = updates.find((u) => u.id === p.id);
        if (update) {
          return {
            ...p,
            price: update.price,
            inStock: update.inStock,
            stockNote: update.stockNote !== undefined ? update.stockNote : p.stockNote,
          };
        }
        return p;
      })
    );

    // If koy-yumurtasi price changed, also update farmSettings.eggCurrentPrice
    const eggUpdate = updates.find((u) => u.id === 'koy-yumurtasi');
    if (eggUpdate) {
      setFarmSettings((prev) => ({
        ...prev,
        eggCurrentPrice: eggUpdate.price,
      }));
    }

    showToast('Fiyatlar ve stok durumları başarıyla güncellendi!', 'success');
  };

  const resetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    setFarmSettings(INITIAL_FARM_SETTINGS);
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(INITIAL_FARM_SETTINGS));
    showToast('Katalog varsayılan çiftlik verilerine sıfırlandı.', 'info');
  };

  // Order actions
  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    showToast('Sipariş durumu güncellendi.', 'success');
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    showToast('Sipariş kaydı silindi.', 'info');
  };

  const updateFarmSettings = (newSettings: Partial<FarmSettings>) => {
    setFarmSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Çiftlik ayarları kaydedildi.', 'success');
  };

  return (
    <FarmContext.Provider
      value={{
        products,
        farmSettings,
        cart,
        orders,
        isCartOpen,
        setIsCartOpen,
        selectedProductModal,
        setSelectedProductModal,
        toasts,
        showToast,
        removeToast,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartItemCount,
        checkoutViaWhatsApp,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleStockStatus,
        quickUpdateProducts,
        resetToDefaults,
        updateOrderStatus,
        deleteOrder,
        updateFarmSettings,
      }}
    >
      {children}
    </FarmContext.Provider>
  );
}

export function useFarm() {
  const context = useContext(FarmContext);
  if (!context) {
    throw new Error('useFarm must be used within a FarmProvider');
  }
  return context;
}
