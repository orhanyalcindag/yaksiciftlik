'use client';

import React from 'react';
import {
  Wheat,
  Truck,
  ShieldCheck,
  Award,
  Sparkles,
  Heart,
  CheckCircle,
} from 'lucide-react';

const PILLARS = [
  {
    title: 'Doğal Beslenme',
    subtitle: 'Katkısız & Tamamen Doğal',
    description:
      'Tavuklarımız ve kanatlılarımız Istranca meralarında serbestçe otlar, katkısız doğal buğday, mısır ve yeşilliklerle beslenir.',
    icon: Wheat,
    color: 'bg-[#FFF7ED] text-[#D97706] border-[#FDBA74]',
    tag: '%100 Doğal Yem',
  },
  {
    title: 'Çiftlikten Doğrudan',
    subtitle: 'Aracısız Taze Teslimat',
    description:
      'Balaban Köyü’ndeki çiftliğimizden hiçbir aracı olmadan, doğrudan kümesten sofranıza günlük tazelikle ulaştırıyoruz.',
    icon: Truck,
    color: 'bg-[#F0FDF4] text-[#2D5A27] border-[#86EFAC]',
    tag: 'Taze & Güvenilir',
  },
  {
    title: 'Güvenilir Üretim',
    subtitle: 'Hijyen & Veteriner Kontrolü',
    description:
      'Düzenli veteriner denetimi, tertemiz kümes ortamı ve her sabah titizlikle tek tek elle yapılan yumurta toplama rutini.',
    icon: ShieldCheck,
    color: 'bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]',
    tag: 'Sıkı Kontrol',
  },
  {
    title: 'Kaliteli Sürü Yönetimi',
    subtitle: 'Safkan & Güçlü Genetik',
    description:
      'Yüksek döllülük oranına sahip damızlık horozlar, sağlıklı ördekler ve dayanıklı beç tavuğu ırkları ile profesyonel bakım.',
    icon: Award,
    color: 'bg-[#F8FAFC] text-[#334155] border-[#CBD5E1]',
    tag: 'Damızlık Kalite',
  },
];

export default function FarmPillars() {
  return (
    <section id="neden-biz" className="py-12 sm:py-16 bg-[#FDFBF7] relative border-b border-[#EAE0D0] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EBF3E8] text-[#2D5A27] text-xs font-bold tracking-wide uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Çiftliğimizin Temel Değerleri</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-black text-[#4A2E18] tracking-tight">
            Neden Yakşi Çiftlik?
          </h2>
          <p className="text-[#6B5744] text-sm sm:text-base mt-2">
            Balaban Köyü’nün yemyeşil doğasında, doğaya ve hayvan refahına saygılı üretim ilkelerimizle çalışıyoruz.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="relative bg-white rounded-2xl p-6 border border-[#E8DCC9] shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 group"
              >
                {/* Header with Icon and Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center border ${pillar.color} shadow-sm group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-[#8C6D53] bg-[#FAF6EE] px-2.5 py-1 rounded-full border border-[#EAE0D0]">
                    {pillar.tag}
                  </span>
                </div>

                {/* Pillar Title & Subtitle */}
                <h3 className="text-lg font-bold text-[#4A2E18] group-hover:text-[#2D5A27] transition-colors">
                  {pillar.title}
                </h3>
                <div className="text-xs font-semibold text-[#D97706] mb-2.5">
                  {pillar.subtitle}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#6B5744] leading-relaxed">
                  {pillar.description}
                </p>

                {/* Decorative Bottom Line */}
                <div className="mt-4 pt-3 border-t border-[#F5EFE6] flex items-center gap-1.5 text-[11px] font-semibold text-[#2D5A27]">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Garantili Tazelik</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
