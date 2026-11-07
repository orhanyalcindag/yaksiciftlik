'use client';

import React from 'react';
import Image from 'next/image';
import {
  Phone,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Sun,
  ShieldCheck,
  Egg,
} from 'lucide-react';
import { useFarm } from '@/context/FarmContext';

export default function Hero() {
  const { farmSettings } = useFarm();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F2E7] via-[#FDFBF7] to-[#FAF6EE] pt-8 sm:pt-14 pb-16 border-b border-[#EAE0D0]">
      {/* Decorative Warm Rustic Background Elements */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#EFE3CF]/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-[#D7E8D3]/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Brand Story & Call to Actions */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            {/* Top Pill / Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EBF3E8] border border-[#BFDCB7] text-[#2D5A27] text-xs sm:text-sm font-semibold shadow-sm">
              <Sun className="w-4 h-4 text-[#D97706] fill-[#F59E0B]" />
              <span>Istranca Ormanları Etekleri • Balaban Köyü / Kırklareli</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-[#4A2E18] tracking-tight leading-[1.15]">
              Doğal Ortamda <br />
              <span className="text-[#2D5A27] inline-block relative">
                Özgürce Gezen
                <svg
                  className="absolute -bottom-2 left-0 w-full text-[#F59E0B]/60 h-2.5"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span>{' '}
              <br />
              Mutlu Tavuklar & Taptaze Ürünler
            </h1>

            {/* Subtitle / Description */}
            <p className="text-[#5C4533] text-base sm:text-lg max-w-2xl leading-relaxed">
              Katkısız, tamamen doğal tahıllarla beslenen serbest gezen tavuklarımız, ördeklerimiz ve beç tavuklarımızdan{' '}
              <strong className="text-[#4A2E18] font-bold">her sabah taze toplanan hakiki köy yumurtaları</strong> ve
              sağlıklı damızlıklar kapınıza geliyor.
            </p>

            {/* Special 10 TL Egg Highlight Pill & Farm Key Benefits */}
            <div className="w-full max-w-xl bg-white/90 border border-[#E8DCC9] rounded-2xl p-4 sm:p-5 shadow-sm space-y-3.5">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-[#F0E6D8] pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#FFF6E5] border border-[#FDE68A] flex items-center justify-center text-[#D97706] shadow-inner">
                    <Egg className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-semibold text-[#8C6D53] uppercase tracking-wider">
                      Günlük Toplanan Köy Yumurtası
                    </div>
                    <div className="text-lg font-bold text-[#4A2E18]">
                      Organik Köyden Sofranıza
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-[#2D5A27] text-white px-4 py-2 rounded-xl shadow">
                  <span className="text-xs uppercase font-medium tracking-wide">Tane</span>
                  <span className="text-2xl font-black text-[#FBBF24]">10 ₺</span>
                </div>
              </div>

              {/* 3 Quick Bullet Points matching the flyer */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-[#5C4533]">
                <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                  <CheckCircle2 className="w-4 h-4 text-[#2D5A27] flex-shrink-0" />
                  <span>Katkısız, tamamen doğal</span>
                </div>
                <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                  <CheckCircle2 className="w-4 h-4 text-[#2D5A27] flex-shrink-0" />
                  <span>Temiz havada özgür</span>
                </div>
                <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                  <CheckCircle2 className="w-4 h-4 text-[#2D5A27] flex-shrink-0" />
                  <span>Her gün taze toplanır</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto pt-2">
              <a
                href="#katalog"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-[#2D5A27] hover:bg-[#20421C] text-white font-bold text-base shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Ürün Kataloğunu İncele</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href={`https://wa.me/${farmSettings.whatsappNumber}?text=${encodeURIComponent(
                  'Merhaba Yakşi Çiftlik, güncel yumurta ve ürün fiyatları hakkında bilgi almak istiyorum.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-base shadow-md hover:shadow-lg transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>WhatsApp ile Sipariş Ver</span>
              </a>
            </div>

            {/* Quick Contact & Location Bar */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-[#735A46] pt-1">
              <a
                href={`tel:${farmSettings.phone}`}
                className="flex items-center gap-1.5 font-bold text-[#4A2E18] hover:text-[#2D5A27] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#2D5A27]" />
                <span>Sipariş & İletişim: {farmSettings.displayPhone}</span>
              </a>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#D97706]" />
                <span>{farmSettings.location}</span>
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase (Real Brand Visuals) */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Visual Frame */}
            <div className="relative w-full max-w-md sm:max-w-lg">
              
              {/* Outer decorative wooden border & warm shadow */}
              <div className="relative rounded-3xl overflow-hidden border-4 border-[#8C5029] bg-[#4A2E18] shadow-2xl p-2.5">
                
                {/* Main Brand Image */}
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#FAF6EE]">
                  <Image
                    src="/images/brand/poster_eggs.jpg"
                    alt="Yakşi Çiftlik Doğal Ortamda Özgür Gezen Mutlu Tavuklar"
                    fill
                    sizes="(max-width: 768px) 100vw, 450px"
                    className="object-cover object-top hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Overlaid Badges */}
                  <div className="absolute top-3 left-3 bg-[#2D5A27]/90 backdrop-blur-md text-[#FDFBF7] px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow">
                    <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                    <span>%100 Doğal & Köy Ürünü</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white text-center">
                    <div className="text-xl sm:text-2xl font-serif font-black tracking-tight drop-shadow-md text-[#FEF3C7]">
                      Doğallığı Sofranıza Getiriyoruz!
                    </div>
                    <div className="text-xs text-white/90 font-medium mt-0.5">
                      Balaban Köyü • Demirköy • Kırklareli
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Floating Circular Logo Badge */}
              <div className="absolute -bottom-6 -left-6 sm:-left-8 w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-white hover:rotate-6 transition-transform">
                <Image
                  src="/images/brand/logo.png"
                  alt="Yakşi Çiftlik"
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </div>

              {/* Floating Price Tag */}
              <div className="absolute -top-4 -right-4 bg-[#F59E0B] border-2 border-white text-[#331F0F] px-4 py-2 rounded-2xl shadow-xl font-bold flex flex-col items-center transform rotate-6 animate-pulse">
                <span className="text-[10px] uppercase font-bold tracking-wider">Köy Yumurtası</span>
                <span className="text-xl font-black leading-none">10 ₺ / Adet</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
