'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  Search,
  Filter,
  Egg,
  Bird,
  Baby,
  Wrench,
  Sparkles,
  ArrowUpDown,
  MessageCircle,
  CheckCircle2,
} from 'lucide-react';
import { useFarm } from '@/context/FarmContext';
import ProductCard from './ProductCard';
import { ProductCategory } from '@/types';

interface CategoryTab {
  id: ProductCategory;
  label: string;
  icon: React.ElementType;
  countKey?: string;
}

const CATEGORY_TABS: CategoryTab[] = [
  { id: 'tum', label: 'Tüm Ürünler', icon: Sparkles },
  { id: 'yumurtalar', label: 'Köy Yumurtaları', icon: Egg },
  { id: 'canli-hayvan', label: 'Canlı Hayvan & Sürü', icon: Bird },
  { id: 'yavru', label: 'Civcivler & Yavrular', icon: Baby },
  { id: 'hizmet', label: 'Kuluçka Hizmeti', icon: Wrench },
];

export default function ProductCatalog() {
  const { products, farmSettings } = useFarm();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('tum');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Filter & sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'tum' && p.category !== selectedCategory) {
          return false;
        }
        // Search query filter
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase().trim();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchTags = p.tags.some((t) => t.toLowerCase().includes(q));
          return matchName || matchDesc || matchTags;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        // Default: featured first, then original order
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  // Count items per category
  const categoryCounts = useMemo(() => {
    return {
      tum: products.length,
      yumurtalar: products.filter((p) => p.category === 'yumurtalar').length,
      'canli-hayvan': products.filter((p) => p.category === 'canli-hayvan').length,
      yavru: products.filter((p) => p.category === 'yavru').length,
      hizmet: products.filter((p) => p.category === 'hizmet').length,
    };
  }, [products]);

  return (
    <section id="katalog" className="py-14 sm:py-20 bg-[#FAF6EE] relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Rustic Wood Badge */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          
          {/* Wood Tag Style Heading Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-2xl bg-[#4A2E18] text-[#FDFBF7] shadow-md border-2 border-[#8C5029] mb-4">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-wide">
              Ürün Kataloğu
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-black text-[#4A2E18] tracking-tight">
            Çiftliğimizden Taptaze & Doğal Lezzetler
          </h2>
          <p className="text-[#6B5744] text-sm sm:text-base mt-2 max-w-xl mx-auto">
            Balaban Köyü’nün temiz havasında serbestçe dolaşan mutlu hayvanlarımızın taptaze yumurtaları, canlı sürüleri ve kuluçka hizmetimiz.
          </p>
        </div>

        {/* Filter Bar: Categories, Search, and Sorting */}
        <div className="space-y-4 mb-8 sm:mb-10">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none sm:justify-center">
            {CATEGORY_TABS.map((tab) => {
              const Icon = tab.icon;
              const isSelected = selectedCategory === tab.id;
              const count = categoryCounts[tab.id as keyof typeof categoryCounts] || 0;

              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border ${
                    isSelected
                      ? 'bg-[#2D5A27] text-white border-[#2D5A27] shadow-md shadow-[#2D5A27]/20 scale-105'
                      : 'bg-white text-[#5C4533] border-[#E8DCC9] hover:bg-[#F2EAE0] hover:text-[#4A2E18]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-[#F59E0B]' : 'text-[#8C6D53]'}`} />
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-[#FAF6EE] text-[#8C6D53]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input & Sort Selector */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            
            {/* Search Box */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C6D53]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ürün veya etiket ara (örn. Ördek, Ataks, Taze)..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-[#E8DCC9] text-xs sm:text-sm text-[#4A2E18] placeholder:text-[#A38872] focus:outline-none focus:ring-2 focus:ring-[#2D5A27] focus:border-transparent transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C6D53] hover:text-[#4A2E18]"
                >
                  Temizle
                </button>
              )}
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#8C6D53]" />
              <span className="text-xs text-[#8C6D53] font-medium hidden sm:inline">
                Sıralama:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-[#E8DCC9] text-[#4A2E18] text-xs font-semibold rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#2D5A27] shadow-sm cursor-pointer"
              >
                <option value="featured">Öne Çıkanlar</option>
                <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
                <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
                <option value="rating">En Yüksek Puanlı</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 bg-white rounded-3xl border border-[#E8DCC9] p-8 max-w-md mx-auto shadow-sm">
            <Egg className="w-12 h-12 text-[#D97706] mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-bold text-[#4A2E18] mb-1">
              Aradığınız kriterde ürün bulunamadı
            </h3>
            <p className="text-xs text-[#6B5744] mb-4">
              Arama filtrenizi temizleyerek veya farklı bir kategori seçerek tekrar deneyebilirsiniz.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('tum');
              }}
              className="px-4 py-2 rounded-xl bg-[#2D5A27] text-white text-xs font-bold hover:bg-[#20421C] transition-colors"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}

        {/* Custom Order Callout Strip */}
        <div className="mt-14 bg-gradient-to-r from-[#4A2E18] to-[#341F10] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F59E0B]/20 text-[#FBBF24] text-xs font-bold border border-[#F59E0B]/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Özel Toplu Sipariş & Canlı Sevkiyat</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-black tracking-tight text-[#FAF6EE]">
              Toptan Yumurta veya Özel Sürü mü Arıyorsunuz?
            </h3>
            <p className="text-xs sm:text-sm text-[#E2D4C3] max-w-xl">
              Restoranlar, fırınlar, şarküteriler ve yeni kümes kuracak yetiştiriciler için özel toptan fiyatlandırma ve sevkiyat desteği sağlıyoruz.
            </p>
          </div>

          <a
            href={`https://wa.me/${farmSettings.whatsappNumber}?text=${encodeURIComponent(
              'Merhaba Yakşi Çiftlik, toptan alım ve toplu sürü hakkında özel teklif almak istiyorum.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Toptan Fiyat İçin WhatsApp'tan Yazın</span>
          </a>
        </div>
      </div>
    </section>
  );
}
