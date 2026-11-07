'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  MessageCircle,
  Truck,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Sparkles,
  MapPin,
  User,
  Phone,
  FileText,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useFarm } from '@/context/FarmContext';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    cartItemCount,
    checkoutViaWhatsApp,
    farmSettings,
  } = useFarm();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNote, setCustomerNote] = useState('');
  const [showAddressFields, setShowAddressFields] = useState(false);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    // Trigger confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2D5A27', '#F59E0B', '#8C5029', '#EAB308'],
      });
    } catch (e) {
      // Confetti fallback
    }

    const waUrl = checkoutViaWhatsApp({
      name: customerName.trim(),
      phone: customerPhone.trim(),
      address: customerAddress.trim(),
      note: customerNote.trim(),
    });

    if (waUrl) {
      window.open(waUrl, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FDFBF7] shadow-2xl flex flex-col border-l border-[#EAE0D0] animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="px-5 py-4 bg-[#FAF6EE] border-b border-[#EAE0D0] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#2D5A27] text-white flex items-center justify-center shadow-sm">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#4A2E18]">
                  Sipariş Sepetim
                </h3>
                <span className="text-xs text-[#8C6D53]">
                  {cartItemCount > 0 ? `${cartItemCount} adet ürün var` : 'Sepetiniz henüz boş'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-[#6B5744] hover:text-[#4A2E18] hover:bg-[#EFE6D4] transition-colors"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length > 0 ? (
              <>
                <div className="space-y-3">
                  {cart.map((item) => {
                    const lineTotal = item.unitPrice * item.quantity;
                    return (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-2xl bg-white border border-[#E8DCC9] shadow-sm flex items-center gap-3 relative group"
                      >
                        {/* Item Thumbnail */}
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#FAF6EE] flex-shrink-0 border border-[#EAE0D0]">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>

                        {/* Title & Unit Price */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm text-[#4A2E18] truncate">
                            {item.name}
                          </h4>
                          <div className="text-xs text-[#8C6D53] font-medium mt-0.5">
                            {item.unit} • {item.unitPrice} ₺
                          </div>
                          <div className="text-xs font-bold text-[#2D5A27] mt-1">
                            Toplam: {lineTotal.toLocaleString('tr-TR')} ₺
                          </div>
                        </div>

                        {/* Quantity Controls & Remove */}
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#B91C1C] hover:text-red-700 p-1 opacity-70 group-hover:opacity-100 transition-opacity"
                            title="Ürünü Çıkar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          <div className="flex items-center border border-[#D9CDBB] rounded-lg bg-[#FAF6EE] overflow-hidden">
                            <button
                              onClick={() => updateCartItemQuantity(item.id, -1)}
                              className="px-2 py-0.5 text-xs text-[#5C4533] hover:bg-[#EAE0D0] transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-[#4A2E18]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartItemQuantity(item.id, 1)}
                              className="px-2 py-0.5 text-xs text-[#5C4533] hover:bg-[#EAE0D0] transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Optional Customer Information Form for WhatsApp Checkout */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddressFields(!showAddressFields)}
                    className="w-full text-left py-2 px-3 rounded-xl bg-[#FAF6EE] border border-[#EAE0D0] text-xs font-bold text-[#4A2E18] flex items-center justify-between hover:bg-[#F2EAE0] transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#2D5A27]" />
                      <span>Teslimat Bilgilerini Ekle (İsteğe Bağlı)</span>
                    </span>
                    <span className="text-[10px] text-[#2D5A27] font-semibold">
                      {showAddressFields ? 'Gizle ▲' : 'Doldur ▼'}
                    </span>
                  </button>

                  {showAddressFields && (
                    <div className="p-3.5 mt-2 rounded-2xl bg-white border border-[#E8DCC9] space-y-2.5 animate-in fade-in duration-200">
                      <div>
                        <label className="text-[11px] font-semibold text-[#6B5744] block mb-1">
                          Adınız Soyadınız:
                        </label>
                        <input
                          type="text"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Örn: Ahmet Yılmaz"
                          className="w-full text-xs p-2 rounded-lg bg-[#FAF6EE] border border-[#EAE0D0] focus:outline-none focus:ring-1 focus:ring-[#2D5A27]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-[#6B5744] block mb-1">
                          Telefon Numaranız:
                        </label>
                        <input
                          type="tel"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="Örn: 05xx xxx xx xx"
                          className="w-full text-xs p-2 rounded-lg bg-[#FAF6EE] border border-[#EAE0D0] focus:outline-none focus:ring-1 focus:ring-[#2D5A27]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-[#6B5744] block mb-1">
                          Teslimat Adresi / İlçe:
                        </label>
                        <textarea
                          rows={2}
                          value={customerAddress}
                          onChange={(e) => setCustomerAddress(e.target.value)}
                          placeholder="Örn: Kırklareli Merkez, İstasyon Mah. No: 12"
                          className="w-full text-xs p-2 rounded-lg bg-[#FAF6EE] border border-[#EAE0D0] focus:outline-none focus:ring-1 focus:ring-[#2D5A27] resize-none"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-[#6B5744] block mb-1">
                          Sipariş Notu (Özel istekleriniz):
                        </label>
                        <input
                          type="text"
                          value={customerNote}
                          onChange={(e) => setCustomerNote(e.target.value)}
                          placeholder="Örn: Hafta sonu teslim edilirse sevinirim"
                          className="w-full text-xs p-2 rounded-lg bg-[#FAF6EE] border border-[#EAE0D0] focus:outline-none focus:ring-1 focus:ring-[#2D5A27]"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Packaging & Freshness Assurance note */}
                <div className="p-3 rounded-xl bg-[#E8F0E6] border border-[#C5DBC1] text-[11px] text-[#2D5A27] flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#2D5A27]" />
                  <span>
                    Yumurtalarımız özel korumalı viyollerle kırılmaya karşı garantili olarak paketlenir ve çiftliğimizden taze olarak gönderilir.
                  </span>
                </div>
              </>
            ) : (
              /* Empty Cart State */
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-[#FAF6EE] border-2 border-dashed border-[#D9CDBB] flex items-center justify-center text-[#8C6D53]">
                  <ShoppingBag className="w-10 h-10 opacity-40" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-[#4A2E18]">
                    Sepetiniz Boş
                  </h4>
                  <p className="text-xs text-[#6B5744] mt-1 max-w-xs">
                    Taze toplanmış köy yumurtaları ve çiftlik ürünlerimizden sepetinize ekleyerek başlayabilirsiniz.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#2D5A27] text-white text-xs font-bold hover:bg-[#20421C] transition-colors"
                >
                  Kataloğa Göz At
                </button>
              </div>
            )}
          </div>

          {/* Drawer Footer with Checkout Button */}
          {cart.length > 0 && (
            <div className="p-5 bg-[#FAF6EE] border-t border-[#EAE0D0] space-y-3">
              
              {/* Total Calculation */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#8C6D53] font-medium block">
                    Ara Toplam:
                  </span>
                  <span className="text-2xl font-serif font-black text-[#4A2E18]">
                    {cartTotal.toLocaleString('tr-TR')} ₺
                  </span>
                </div>
                <button
                  onClick={clearCart}
                  className="text-xs text-[#8C6D53] hover:text-[#B91C1C] underline"
                >
                  Sepeti Temizle
                </button>
              </div>

              {/* Prominent WhatsApp Checkout Button */}
              <button
                type="button"
                onClick={handleCheckout}
                className="w-full py-4 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageCircle className="w-5 h-5 fill-current flex-shrink-0" />
                <span>WhatsApp ile Sipariş Ver</span>
                <ArrowRight className="w-4 h-4 ml-1 flex-shrink-0" />
              </button>

              <div className="text-center">
                <span className="text-[11px] text-[#735A46]">
                  Siparişiniz doğrudan çiftliğimizin <strong>{farmSettings.displayPhone}</strong> nolu WhatsApp hattına iletilir.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
