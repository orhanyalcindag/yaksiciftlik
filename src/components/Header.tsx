'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Phone,
  MapPin,
  ShoppingBag,
  Menu,
  X,
  MessageCircle,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { useFarm } from '@/context/FarmContext';

export default function Header() {
  const { farmSettings, cartItemCount, cartTotal, setIsCartOpen } = useFarm();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#EAE0D0] transition-all overflow-x-clip">
      {/* Top Announcement Bar */}
      {farmSettings.bannerActive && (
        <div className="bg-[#2D5A27] text-[#FDFBF7] text-xs py-1.5 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
            <div className="flex items-center gap-2 font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse flex-shrink-0" />
              <span className="truncate max-w-xl">{farmSettings.announcement}</span>
            </div>
            <div className="hidden md:flex items-center gap-3 text-xs opacity-90 flex-shrink-0">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
                {farmSettings.location}
              </span>
              <span>•</span>
              <a
                href={`tel:${farmSettings.phone}`}
                className="hover:underline flex items-center gap-1 font-semibold text-[#FDFBF7]"
              >
                <Phone className="w-3.5 h-3.5 text-[#F59E0B]" />
                {farmSettings.displayPhone}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-4">
          
          {/* Brand Logo & Title */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#D9822B] shadow-sm group-hover:scale-105 transition-transform bg-[#FDFBF7]">
              <Image
                src="/images/brand/logo.png"
                alt="Yakşi Çiftlik Logo"
                fill
                sizes="(max-width: 768px) 48px, 56px"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-black tracking-tight text-[#4A2E18] group-hover:text-[#2D5A27] transition-colors leading-none">
                Yakşi Çiftlik
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#6B5744] font-medium tracking-wide mt-0.5">
                Balaban Köyü • Demirköy • Kırklareli
              </span>
            </div>
          </Link>

          {/* Desktop Navigation (Distinct Sections, Sleek & Responsive) */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            <a
              href="#katalog"
              className="h-10 px-3 xl:px-3.5 rounded-xl text-xs font-bold whitespace-nowrap bg-[#FAF6EE] text-[#4A2E18] border border-[#E8DCC9] hover:bg-[#2D5A27] hover:text-white hover:border-[#2D5A27] shadow-xs hover:shadow transition-all flex items-center justify-center gap-1.5 transform active:scale-95 group"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D97706] group-hover:text-[#FDE68A] transition-colors flex-shrink-0" />
              <span>Ürün Kataloğu</span>
            </a>
            <a
              href="#ciftligimiz"
              className="h-10 px-3 xl:px-3.5 rounded-xl text-xs font-bold whitespace-nowrap bg-[#FAF6EE] text-[#4A2E18] border border-[#E8DCC9] hover:bg-[#2D5A27] hover:text-white hover:border-[#2D5A27] shadow-xs hover:shadow transition-all flex items-center justify-center gap-1.5 transform active:scale-95 group"
            >
              <span className="text-sm">🌿</span>
              <span>Çiftliğimiz</span>
            </a>
            <a
              href="#neden-biz"
              className="h-10 px-3 xl:px-3.5 rounded-xl text-xs font-bold whitespace-nowrap bg-[#FAF6EE] text-[#4A2E18] border border-[#E8DCC9] hover:bg-[#2D5A27] hover:text-white hover:border-[#2D5A27] shadow-xs hover:shadow transition-all flex items-center justify-center gap-1.5 transform active:scale-95 group"
            >
              <span className="text-sm">⭐</span>
              <span>Neden Biz?<span className="hidden xl:inline"> (Yakşi Çiftlik)</span></span>
            </a>
            <a
              href="#iletisim"
              className="h-10 px-3 xl:px-3.5 rounded-xl text-xs font-bold whitespace-nowrap bg-[#FAF6EE] text-[#4A2E18] border border-[#E8DCC9] hover:bg-[#2D5A27] hover:text-white hover:border-[#2D5A27] shadow-xs hover:shadow transition-all flex items-center justify-center gap-1.5 transform active:scale-95 group"
            >
              <MapPin className="w-3.5 h-3.5 text-[#D97706] group-hover:text-[#FDE68A] transition-colors flex-shrink-0" />
              <span>İletişim<span className="hidden xl:inline"> & Konum</span></span>
            </a>
          </nav>

          {/* Right Actions: WhatsApp Callout & Cart */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Direct WhatsApp Action Button */}
            <a
              href={`https://wa.me/${farmSettings.whatsappNumber}?text=${encodeURIComponent(
                'Merhaba Yakşi Çiftlik, bilgi almak ve sipariş vermek istiyorum.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center gap-2 h-10 px-3.5 rounded-xl text-xs font-bold whitespace-nowrap bg-[#25D366] text-white hover:bg-[#20ba59] shadow-xs hover:shadow transition-all transform active:scale-95"
              title="Doğrudan WhatsApp'tan Yazın"
            >
              <MessageCircle className="w-4 h-4 fill-current flex-shrink-0" />
              <span>WhatsApp İletişim</span>
            </a>

            {/* Shopping Cart Drawer Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center justify-center gap-2 h-10 px-3.5 rounded-xl bg-[#2D5A27] hover:bg-[#22441D] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all transform active:scale-95"
              aria-label="Sepeti Görüntüle"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#F59E0B] text-[#331F0F] font-bold text-[10px] flex items-center justify-center shadow animate-bounce">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">
                {cartTotal > 0 ? `${cartTotal.toLocaleString('tr-TR')} ₺` : 'Sepetim'}
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-[#4A2E18] hover:bg-[#EFE6D4] transition-colors h-10 w-10 flex items-center justify-center"
              aria-label="Menüyü Aç"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu (Laser-Aligned Navigation) */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-[#EAE0D0] bg-[#FAF6EE] px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          
          {/* Top Quick Action Row */}
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#EAE0D0]">
            <a
              href={`tel:${farmSettings.phone}`}
              className="h-11 flex items-center justify-center gap-2 rounded-xl bg-white border border-[#EAE0D0] text-xs font-bold text-[#4A2E18] shadow-xs active:scale-95"
            >
              <Phone className="w-3.5 h-3.5 text-[#2D5A27]" />
              <span>{farmSettings.displayPhone}</span>
            </a>
            <a
              href={`https://wa.me/${farmSettings.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] text-white text-xs font-bold shadow-xs active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp Sipariş</span>
            </a>
          </div>

          {/* Laser-Aligned Navigation List */}
          <div className="space-y-2 pt-1">
            <a
              href="#katalog"
              onClick={() => setMobileMenuOpen(false)}
              className="h-12 w-full px-3.5 rounded-2xl bg-white border border-[#EAE0D0] hover:border-[#2D5A27] flex items-center gap-3 shadow-xs active:scale-98 transition-all group"
            >
              <div className="w-8 h-8 rounded-xl bg-[#FAF6EE] border border-[#EAE0D0] flex items-center justify-center text-sm flex-shrink-0 group-hover:bg-[#EBF3E8] transition-colors">
                🌾
              </div>
              <span className="font-bold text-xs text-[#4A2E18] flex-1 text-left">
                Ürün Kataloğu
              </span>
              <ChevronRight className="w-4 h-4 text-[#8C6D53] opacity-40 group-hover:opacity-100 flex-shrink-0" />
            </a>

            <a
              href="#ciftligimiz"
              onClick={() => setMobileMenuOpen(false)}
              className="h-12 w-full px-3.5 rounded-2xl bg-white border border-[#EAE0D0] hover:border-[#2D5A27] flex items-center gap-3 shadow-xs active:scale-98 transition-all group"
            >
              <div className="w-8 h-8 rounded-xl bg-[#FAF6EE] border border-[#EAE0D0] flex items-center justify-center text-sm flex-shrink-0 group-hover:bg-[#EBF3E8] transition-colors">
                🌿
              </div>
              <span className="font-bold text-xs text-[#4A2E18] flex-1 text-left">
                Çiftliğimiz (Balaban Köyü)
              </span>
              <ChevronRight className="w-4 h-4 text-[#8C6D53] opacity-40 group-hover:opacity-100 flex-shrink-0" />
            </a>

            <a
              href="#neden-biz"
              onClick={() => setMobileMenuOpen(false)}
              className="h-12 w-full px-3.5 rounded-2xl bg-white border border-[#EAE0D0] hover:border-[#2D5A27] flex items-center gap-3 shadow-xs active:scale-98 transition-all group"
            >
              <div className="w-8 h-8 rounded-xl bg-[#FAF6EE] border border-[#EAE0D0] flex items-center justify-center text-sm flex-shrink-0 group-hover:bg-[#EBF3E8] transition-colors">
                ⭐
              </div>
              <span className="font-bold text-xs text-[#4A2E18] flex-1 text-left">
                Neden Yakşi Çiftlik?
              </span>
              <ChevronRight className="w-4 h-4 text-[#8C6D53] opacity-40 group-hover:opacity-100 flex-shrink-0" />
            </a>

            <a
              href="#iletisim"
              onClick={() => setMobileMenuOpen(false)}
              className="h-12 w-full px-3.5 rounded-2xl bg-white border border-[#EAE0D0] hover:border-[#2D5A27] flex items-center gap-3 shadow-xs active:scale-98 transition-all group"
            >
              <div className="w-8 h-8 rounded-xl bg-[#FAF6EE] border border-[#EAE0D0] flex items-center justify-center text-sm flex-shrink-0 group-hover:bg-[#EBF3E8] transition-colors">
                📍
              </div>
              <span className="font-bold text-xs text-[#4A2E18] flex-1 text-left">
                İletişim & Konum Bilgisi
              </span>
              <ChevronRight className="w-4 h-4 text-[#8C6D53] opacity-40 group-hover:opacity-100 flex-shrink-0" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
