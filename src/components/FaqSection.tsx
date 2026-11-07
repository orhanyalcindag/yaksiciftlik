'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { useFarm } from '@/context/FarmContext';

const FAQS = [
  {
    q: 'Yumurtalarınız taze mi ve nasıl toplanıyor?',
    a: 'Çiftliğimizde tüm yumurtalar her sabah 07:00 - 09:00 saatleri arasında doğal folluklardan el ile tek tek toplanır. Yıkanmadan (doğal koruyucu kütikül tabakasını kaybetmemesi için) temizlenir ve aynı gün paketlenir.',
  },
  {
    q: 'Kargo veya elden teslimatta kırılma riski var mı?',
    a: 'Yumurtalarımızı özel darbeye dayanıklı kalın viyollerde ve korumalı kutularda paketliyoruz. Herhangi bir olumsuzluk durumunda kırılan adet kadar anında telafi veya para iadesi garantisi veriyoruz.',
  },
  {
    q: 'WhatsApp üzerinden sipariş nasıl işliyor?',
    a: 'Web sitemizdeki sepetinizden "WhatsApp ile Sipariş Ver" butonuna bastığınızda seçtiğiniz ürünler, adetler ve adresiniz otomatik olarak mesaj kutunuza dolar. Mesajı gönderdikten sonra çiftlik yetkilimiz 5-10 dakika içerisinde siparişinizi onaylayıp teslimat planını paylaşır.',
  },
  {
    q: 'Canlı tavuk, horoz, ördek veya civciv sevkiyatı nasıl yapılıyor?',
    a: 'Canlı hayvan ve civcivlerimiz Balaban Köyü çiftliğimizden bizzat teslim alınabilir. Ayrıca Kırklareli, Edirne, Tekirdağ ve İstanbul güzergahına özel havalandırmalı araçlarımızla belirli günlerde toplu sevkiyat yapıyoruz.',
  },
  {
    q: 'Kuluçkalık yumurtaların döl garantisi nedir?',
    a: 'Damızlık sürülerimizde horoz-tavuk ve ördek oranları ideal damızlık standartlarındadır. Kuluçkalık yumurtalarımız 7 günden taze olup ortalama %85 ve üzeri döllülük oranına sahiptir.',
  },
  {
    q: 'Kendi yumurtalarımız için kuluçka hizmeti alabilir miyiz?',
    a: 'Evet! Tam otomatik endüstriyel kuluçka makinelerimizde kendi getirdiğiniz kanatlı yumurtalarınız için profesyonel ısı, nem ve çevirme takibi yaparak çıkım hizmeti sunuyoruz.',
  },
];

export default function FaqSection() {
  const { farmSettings } = useFarm();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="iletisim" className="py-16 sm:py-20 bg-[#FAF6EE] relative border-b border-[#EAE0D0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EBF3E8] text-[#2D5A27] text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Merak Edilenler</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-black text-[#4A2E18]">
            Sıkça Sorulan Sorular
          </h2>
          <p className="text-[#6B5744] text-xs sm:text-sm mt-2">
            Çiftliğimiz, ürünlerimiz, kuluçka ve teslimat süreçleri hakkında tüm merak ettikleriniz.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E8DCC9] overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#4A2E18] hover:text-[#2D5A27] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#8C6D53] transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-[#2D5A27]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5C4533] leading-relaxed border-t border-[#F5EFE6] animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-10 p-6 rounded-3xl bg-white border border-[#E8DCC9] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-bold text-sm sm:text-base text-[#4A2E18]">
              Aklınıza takılan başka bir soru mu var?
            </h4>
            <p className="text-xs text-[#6B5744] mt-0.5">
              Çiftliğimizi bizzat arayabilir veya WhatsApp üzerinden anında yazabilirsiniz.
            </p>
          </div>

          <a
            href={`https://wa.me/${farmSettings.whatsappNumber}?text=${encodeURIComponent(
              'Merhaba Yakşi Çiftlik, bir konuda danışmak istiyorum.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] text-white font-bold text-xs sm:text-sm shadow hover:bg-[#20ba59] transition-all flex-shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>WhatsApp Destek Hattı</span>
          </a>
        </div>
      </div>
    </section>
  );
}
