'use client';

import React from 'react';
import Image from 'next/image';
import {
  Sun,
  Heart,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  MapPin,
  Trees,
  Award,
} from 'lucide-react';
import { useFarm } from '@/context/FarmContext';

export default function FarmStory() {
  const { farmSettings } = useFarm();

  return (
    <section id="ciftligimiz" className="py-16 sm:py-24 bg-[#FDFBF7] relative overflow-hidden border-b border-[#EAE0D0] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Feature Grid: Story + Basket Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Basket Visual from Brand Poster */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-[340px] sm:max-w-[370px] rounded-3xl overflow-hidden border-4 border-[#8C5029] bg-[#4A2E18] shadow-2xl p-2.5">
              {/* Full Unobscured Poster Image */}
              <div className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden bg-[#FAF6EE]">
                <Image
                  src="/images/brand/poster_basket.jpg"
                  alt="Organik Yumurta Köyden Sofranıza"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-top hover:scale-102 transition-transform duration-700"
                  priority
                />
              </div>

              {/* Green Banner Underneath the Image */}
              <div className="mt-2.5 bg-[#2D5A27] rounded-2xl py-3 px-4 text-center text-white border border-[#3E7337] shadow-inner">
                <span className="text-[11px] uppercase font-bold tracking-wider text-[#FDE68A] block">
                  🌿 Istranca Ormanları • Balaban Köyü
                </span>
                <span className="font-serif font-black text-sm text-[#FDFBF7] mt-0.5 block">
                  Katkısız & Günlük Taze Lezzet
                </span>
              </div>
            </div>
          </div>

          {/* Right: Farm Narrative */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF3E8] border border-[#BFDCB7] text-[#2D5A27] text-xs font-bold">
              <Trees className="w-4 h-4 text-[#2D5A27]" />
              <span>Istranca Ormanlarının Kalbinde Bir Çiftlik</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#4A2E18] tracking-tight leading-tight">
              Balaban Köyü’nün Bereketli Topraklarından Sofranıza
            </h2>

            <p className="text-[#5C4533] text-sm sm:text-base leading-relaxed">
              <strong>Yakşi Çiftlik</strong> olarak, Kırklareli Demirköy’e bağlı <strong>Balaban Köyü</strong>’nde doğanın ritmine ayak uydurarak üretim yapıyoruz. Endüstriyel kafes sistemlerini, suni yem katkılarını ve kimyasal hızlandırıcıları kapımızdan içeri sokmuyoruz.
            </p>

            <p className="text-[#5C4533] text-sm sm:text-base leading-relaxed">
              Tavuklarımız, yeşil başlı ördeklerimiz ve beç tavuklarımız geniş yeşil meralarda gün boyu özgürce dolaşır; taze otlar, böcekler ve katkısız tahıllarla beslenir. İşte bu yüzden yumurtalarımızın sarısı altın renginde ve lezzeti çocukluğumuzun köy kahvaltılarındaki gibidir.
            </p>

            {/* Feature Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#FAF6EE] border border-[#E8DCC9]">
                <CheckCircle2 className="w-5 h-5 text-[#2D5A27] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-[#4A2E18]">Serbest Gezen Sürüler</h4>
                  <p className="text-[11px] text-[#6B5744]">Stresten uzak, doğal gün ışığında temiz hava ile beslenen kanatlılar.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#FAF6EE] border border-[#E8DCC9]">
                <CheckCircle2 className="w-5 h-5 text-[#2D5A27] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-[#4A2E18]">Günlük El ile Toplama</h4>
                  <p className="text-[11px] text-[#6B5744]">Her sabah folluklardan tek tek titizlikle kontrol edilerek toplanır.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#FAF6EE] border border-[#E8DCC9]">
                <CheckCircle2 className="w-5 h-5 text-[#2D5A27] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-[#4A2E18]">Özel Koruyucu Ambalaj</h4>
                  <p className="text-[11px] text-[#6B5744]">Kırılmayı önleyici kalın viyol ve strafor kutular ile güvenli teslimat.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#FAF6EE] border border-[#E8DCC9]">
                <CheckCircle2 className="w-5 h-5 text-[#2D5A27] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-[#4A2E18]">Damızlık ve Çıkım Desteği</h4>
                  <p className="text-[11px] text-[#6B5744]">Yetiştiriciler için safkan kanatlılar ve kuluçka danışmanlığı.</p>
                </div>
              </div>
            </div>

            {/* Address & Direct Tel */}
            <div id="iletisim" className="pt-2 flex flex-col sm:flex-row items-center gap-4 scroll-mt-28">
              <a
                href={`tel:${farmSettings.phone}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#4A2E18] text-white text-xs sm:text-sm font-bold shadow hover:bg-[#341F10] transition-colors"
              >
                <span>Doğrudan Çiftliği Arayın: {farmSettings.displayPhone}</span>
              </a>

              <span className="text-xs text-[#735A46] flex items-center gap-1">
                <MapPin className="w-4 h-4 text-[#D97706]" />
                <span>{farmSettings.addressFull}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
