'use client';

import React from 'react';
import { MessageCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { useFarm } from '@/context/FarmContext';

export default function FloatingWhatsAppButton() {
  const { farmSettings, cartItemCount, cartTotal, setIsCartOpen } = useFarm();

  return (
    <>
      {/* Floating WhatsApp Action Pill for Desktop & Mobile (Bottom Right) */}
      <aside aria-label="Hızlı WhatsApp İletişim Butonu" className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-30 flex flex-col items-end gap-2">
        <a
          href={`https://wa.me/${farmSettings.whatsappNumber}?text=${encodeURIComponent(
            'Merhaba Yakşi Çiftlik, ürünler ve sipariş hakkında bilgi almak istiyorum.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 p-3 sm:px-4 sm:py-3 rounded-full bg-[#25D366] text-white shadow-xl hover:shadow-2xl hover:bg-[#20ba59] transition-all transform hover:scale-105 active:scale-95 border-2 border-white"
          title="WhatsApp ile İletişime Geçin"
        >
          <MessageCircle className="w-6 h-6 fill-current animate-pulse" />
          <span className="hidden sm:inline font-bold text-xs tracking-wide">
            WhatsApp Sipariş
          </span>
        </a>
      </aside>

      {/* Mobile Bottom Sticky Bar (Visible when cart has items on small screens) */}
      {cartItemCount > 0 && (
        <nav aria-label="Mobil Sepet Çubuğu" className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF6EE] border-t-2 border-[#D9822B] px-4 py-2.5 shadow-2xl flex items-center justify-between gap-3 animate-in slide-in-from-bottom duration-300">
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 text-left"
          >
            <div className="relative w-9 h-9 rounded-xl bg-[#2D5A27] text-white flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#F59E0B] text-[#331F0F] font-bold text-[10px] flex items-center justify-center">
                {cartItemCount}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#8C6D53] font-bold block uppercase">
                Sepet Toplamı
              </span>
              <span className="text-base font-black text-[#4A2E18]">
                {cartTotal.toLocaleString('tr-TR')} ₺
              </span>
            </div>
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#25D366] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Siparişi Tamamla</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </nav>
      )}
    </>
  );
}
