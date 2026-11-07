'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Plus,
  Minus,
  ShoppingBag,
  Info,
  Check,
  Star,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { Product } from '@/types';
import { useFarm } from '@/context/FarmContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, setSelectedProductModal } = useFarm();
  
  // Selected packaging/unit (defaults to product.unit or first unitOption)
  const defaultUnit = product.unitOptions?.[0]?.label || product.unit;
  const [selectedUnit, setSelectedUnit] = useState<string>(defaultUnit);
  const [quantity, setQuantity] = useState<number>(1);
  const [justAdded, setJustAdded] = useState<boolean>(false);

  // Calculate price based on selected unit multiplier
  const currentUnitOption = product.unitOptions?.find((u) => u.label === selectedUnit);
  const multiplier = currentUnitOption?.multiplier || 1;
  const currentUnitPrice = product.price * multiplier;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedUnit, currentUnitPrice);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const incrementQty = () => setQuantity((prev) => prev + 1);
  const decrementQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-[#E8DCC9] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative">
      
      {/* Product Image Section */}
      <div className="relative w-full aspect-[4/3] bg-[#FAF6EE] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badge Overlay (Top Left) */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-[#4A2E18]/90 backdrop-blur-sm text-[#FDFBF7] text-[11px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1 border border-white/20">
            <span>{product.badge}</span>
          </div>
        )}

        {/* Stock Status Indicator (Top Right) */}
        <div className="absolute top-3 right-3">
          {product.inStock ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#E8F5E9]/95 text-[#2E7D32] border border-[#C8E6C9] shadow-sm backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32] animate-pulse" />
              Stokta Var
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#FFEBEE]/95 text-[#C62828] border border-[#FFCDD2] shadow-sm">
              Tükendi
            </span>
          )}
        </div>

        {/* Quick View Info Trigger */}
        <button
          onClick={() => setSelectedProductModal(product)}
          className="absolute bottom-3 right-3 p-2 rounded-xl bg-white/90 hover:bg-white text-[#4A2E18] shadow hover:shadow-md transition-all opacity-90 hover:opacity-100"
          title="Ürün Detaylarını İncele"
          aria-label="Ürün Detayı"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-[#8C6D53] font-medium mb-1.5">
            <span className="uppercase tracking-wider text-[11px] font-bold text-[#2D5A27]">
              {product.categoryLabel}
            </span>
            {product.rating && (
              <span className="flex items-center gap-1 text-[#D97706] font-semibold">
                <Star className="w-3.5 h-3.5 fill-current" />
                {product.rating.toFixed(1)}
                {product.reviewsCount && (
                  <span className="text-[#A38872] text-[10px]">({product.reviewsCount})</span>
                )}
              </span>
            )}
          </div>

          {/* Product Title */}
          <h3
            onClick={() => setSelectedProductModal(product)}
            className="text-lg font-bold text-[#4A2E18] hover:text-[#2D5A27] transition-colors cursor-pointer leading-tight mb-2"
          >
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-[#6B5744] line-clamp-2 leading-relaxed mb-3">
            {product.description}
          </p>

          {/* Feature Tags */}
          <div className="flex flex-wrap gap-1.5">
            {product.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#FAF6EE] text-[#735A46] border border-[#EAE0D0]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Unit Selection Options (if available) */}
        {product.unitOptions && product.unitOptions.length > 1 && (
          <div className="space-y-1.5 pt-2 border-t border-[#F5EFE6]">
            <span className="text-[11px] font-semibold text-[#8C6D53] block">
              Paket / Birim Seçimi:
            </span>
            <div className={`grid gap-1.5 ${product.unitOptions.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
              {product.unitOptions.map((opt) => {
                const isSelected = selectedUnit === opt.label;
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setSelectedUnit(opt.label)}
                    className={`text-[11px] py-1 px-1.5 rounded-lg border font-medium text-center transition-all ${
                      isSelected
                        ? 'bg-[#2D5A27] text-white border-[#2D5A27] shadow-sm font-bold'
                        : 'bg-[#FAF6EE] text-[#5C4533] border-[#E8DCC9] hover:bg-[#F2EAE0]'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Price & Action Area */}
        <div className="pt-3 border-t border-[#F5EFE6] space-y-3">
          
          {/* Price Label */}
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-[#8C6D53] font-medium">Birim Fiyat:</span>
            <div className="text-right">
              <span className="text-2xl font-black text-[#2D5A27]">
                {currentUnitPrice.toLocaleString('tr-TR')} ₺
              </span>
              <span className="text-xs text-[#735A46] font-medium ml-1">
                / {selectedUnit}
              </span>
            </div>
          </div>

          {/* Quantity Controls & Add to Cart */}
          <div className="flex items-center gap-2">
            
            {/* Quantity Stepper */}
            <div className="flex items-center border border-[#D9CDBB] rounded-xl bg-[#FAF6EE] overflow-hidden">
              <button
                type="button"
                onClick={decrementQty}
                className="p-2 text-[#5C4533] hover:bg-[#EAE0D0] transition-colors"
                title="Miktarı Azalt"
                disabled={!product.inStock}
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-xs font-bold text-[#4A2E18]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={incrementQty}
                className="p-2 text-[#5C4533] hover:bg-[#EAE0D0] transition-colors"
                title="Miktarı Artır"
                disabled={!product.inStock}
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                !product.inStock
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed border border-gray-300'
                  : justAdded
                  ? 'bg-[#15803D] text-white scale-[1.02]'
                  : 'bg-[#4A2E18] hover:bg-[#341F10] text-white active:scale-95 shadow hover:shadow-md'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4 text-[#FDE68A]" />
                  <span>Eklendi!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>{product.inStock ? 'Sepete Ekle' : 'Tükendi'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
