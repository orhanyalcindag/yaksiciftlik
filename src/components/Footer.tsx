'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Heart,
  ShieldCheck,
  Settings,
  Egg,
} from 'lucide-react';
import { useFarm } from '@/context/FarmContext';

export default function Footer() {
  const { farmSettings } = useFarm();

  return (
    <footer id="iletisim" className="bg-[#4A2E18] text-[#FDFBF7] pt-14 pb-8 border-t-4 border-[#8C5029] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-[#6E4524]">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#D9822B] bg-[#FDFBF7] shadow">
                <Image
                  src="/images/brand/logo.png"
                  alt="Yakşi Çiftlik Logo"
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-serif font-black text-xl text-[#FDFBF7]">
                  Yakşi Çiftlik
                </h3>
                <span className="text-xs text-[#EED9B3]">
                  Doğal Köy Ürünleri & Canlı Sürü
                </span>
              </div>
            </div>

            <p className="text-xs text-[#D9C4AC] leading-relaxed">
              Kırklareli Demirköy Balaban Köyü’nde özgürce gezen, doğal tahıllarla beslenen mutlu tavuklarımız ve damızlık kanatlılarımızla sofranıza doğallık taşıyoruz.
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs text-[#EED9B3]">
              <ShieldCheck className="w-4 h-4 text-[#F59E0B]" />
              <span>%100 Doğal • Katkısız • Günlük Taze</span>
            </div>
          </div>

          {/* Quick Product Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-base text-[#FEF3C7] border-b border-[#6E4524] pb-2">
              Ürünlerimiz
            </h4>
            <ul className="space-y-2 text-xs text-[#D9C4AC]">
              <li>
                <a href="#katalog" className="hover:text-white transition-colors">
                  • Günlük Köy Yumurtası (10 ₺)
                </a>
              </li>
              <li>
                <a href="#katalog" className="hover:text-white transition-colors">
                  • Taze Ördek Yumurtası
                </a>
              </li>
              <li>
                <a href="#katalog" className="hover:text-white transition-colors">
                  • Beç Tavuğu Yumurtası (Protein Deposu)
                </a>
              </li>
              <li>
                <a href="#katalog" className="hover:text-white transition-colors">
                  • Kuluçkalık Yumurta (%85+ Döl)
                </a>
              </li>
              <li>
                <a href="#katalog" className="hover:text-white transition-colors">
                  • Damızlık Tavuk, Horoz ve Ördek
                </a>
              </li>
              <li>
                <a href="#katalog" className="hover:text-white transition-colors">
                  • Günlük Civciv & Yavru Çıkımları
                </a>
              </li>
              <li>
                <a href="#katalog" className="hover:text-white transition-colors">
                  • Profesyonel Kuluçka Çıkım Hizmeti
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Location Details */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-base text-[#FEF3C7] border-b border-[#6E4524] pb-2">
              İletişim & Konum
            </h4>
            <ul className="space-y-2.5 text-xs text-[#D9C4AC]">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                <span>{farmSettings.addressFull}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#F59E0B] flex-shrink-0" />
                <a href={`tel:${farmSettings.phone}`} className="hover:text-white font-bold">
                  {farmSettings.displayPhone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#25D366] flex-shrink-0" />
                <a
                  href={`https://wa.me/${farmSettings.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white font-bold"
                >
                  WhatsApp Sipariş Hattı
                </a>
              </li>
              <li className="flex items-center gap-2 text-[11px] text-[#C4AD94]">
                <Clock className="w-4 h-4 text-[#F59E0B] flex-shrink-0" />
                <span>{farmSettings.workingHours}</span>
              </li>
            </ul>
          </div>

          {/* WhatsApp Direct Action & Admin Link */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-base text-[#FEF3C7] border-b border-[#6E4524] pb-2">
              Hızlı WhatsApp Siparişi
            </h4>
            <p className="text-xs text-[#D9C4AC]">
              Toptan veya perakende tüm siparişleriniz için 7/24 WhatsApp hattımıza yazabilirsiniz.
            </p>
            <a
              href={`https://wa.me/${farmSettings.whatsappNumber}?text=${encodeURIComponent(
                'Merhaba Yakşi Çiftlik, sipariş vermek istiyorum.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp ile Mesaj Gönder</span>
            </a>

            <div className="pt-2">
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 text-xs text-[#D9C4AC] hover:text-white transition-colors"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Çiftlik Sahibi Yönetim Paneli</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#C4AD94]">
          <div className="flex items-center gap-1">
            <span>© 2026 Yakşi Çiftlik. Tüm Hakları Saklıdır.</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Doğallığı Sofranıza Getiriyoruz</span>
            <Heart className="w-3.5 h-3.5 text-[#F59E0B] fill-current" />
            <span>Balaban Köyü / Kırklareli</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
