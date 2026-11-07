'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  X,
  Plus,
  Minus,
  ShoppingBag,
  Star,
  CheckCircle2,
  ShieldCheck,
  MessageCircle,
  Truck,
  Heart,
  Egg,
} from 'lucide-react';
import { useFarm } from '@/context/FarmContext';

export default function ProductDetailModal() {
  const {
    selectedProductModal,
    setSelectedProductModal,
    addToCart,
    farmSettings,
  } = useFarm();

  const product = selectedProductModal;
  const defaultUnit = product?.unitOptions?.[0]?.label || product?.unit || 'Adet';
  const [selectedUnit, setSelectedUnit] = useState<string>(defaultUnit);
  const [quantity, setQuantity] = useState<number>(1);
  const [justAdded, setJustAdded] = useState(false);

  if (!product) return null;

  const currentUnitOption = product.unitOptions?.find((u) => u.label === selectedUnit);
  const multiplier = currentUnitOption?.multiplier || 1;
  const unitPrice = product.price * multiplier;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    addToCart(product, quantity, selectedUnit, unitPrice);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      setSelectedProductModal(null);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setSelectedProductModal(null)}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-3xl shadow-2xl border border-[#EAE0D0] overflow-hidden animate-in zoom-in-95 duration-200">
          
          {/* Close Button */}
          <button
            onClick={() => setSelectedProductModal(null)}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#4A2E18] shadow transition-colors"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Image Side */}
            <div className="relative aspect-square md:aspect-auto bg-[#FAF6EE] min-h-[280px]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 350px"
                className="object-cover"
              />
              {product.badge && (
                <div className="absolute top-4 left-4 bg-[#4A2E18] text-[#FDFBF7] text-xs font-bold px-3 py-1 rounded-full shadow border border-white/20">
                  {product.badge}
                </div>
              )}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-2.5 rounded-2xl border border-[#E8DCC9] text-xs text-[#5C4533] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2D5A27] flex-shrink-0" />
                <span>Balaban Köyü / Kırklareli Çiftliğimizden</span>
              </div>
            </div>

            {/* Info Side */}
            <div className="p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                
                {/* Category & Rating */}
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-[#2D5A27] uppercase tracking-wider">
                    {product.categoryLabel}
                  </span>
                  {product.rating && (
                    <span className="flex items-center gap-1 text-[#D97706]">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      {product.rating.toFixed(1)} / 5
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-serif text-2xl font-bold text-[#4A2E18] leading-tight">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#5C4533] leading-relaxed">
                  {product.description}
                </p>

                {/* Detailed Information */}
                {product.detailedInfo && (
                  <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#E8DCC9] text-xs text-[#6B5744] space-y-1">
                    <span className="font-bold text-[#4A2E18] block">Çiftlik Notu:</span>
                    <p>{product.detailedInfo}</p>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {product.tags.map((t, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#EBF3E8] text-[#2D5A27] border border-[#BFDCB7]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Unit Selection */}
                {product.unitOptions && product.unitOptions.length > 1 && (
                  <div className="space-y-1.5 pt-2">
                    <span className="text-xs font-bold text-[#4A2E18]">
                      Paketleme / Adet Seçimi:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {product.unitOptions.map((opt) => {
                        const isSel = selectedUnit === opt.label;
                        return (
                          <button
                            key={opt.label}
                            type="button"
                            onClick={() => setSelectedUnit(opt.label)}
                            className={`p-2 rounded-xl text-left border text-xs transition-all ${
                              isSel
                                ? 'bg-[#2D5A27] text-white border-[#2D5A27] shadow'
                                : 'bg-[#FAF6EE] text-[#5C4533] border-[#E8DCC9] hover:bg-[#F2EAE0]'
                            }`}
                          >
                            <div className="font-bold">{opt.label}</div>
                            {opt.note && (
                              <div
                                className={`text-[10px] mt-0.5 ${
                                  isSel ? 'text-[#FDE68A]' : 'text-[#8C6D53]'
                                }`}
                              >
                                {opt.note}
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Price & Add to Cart Controls */}
              <div className="pt-4 border-t border-[#EAE0D0] space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-[#8C6D53] block">Toplam Fiyat</span>
                    <span className="text-2xl font-black text-[#2D5A27]">
                      {totalPrice.toLocaleString('tr-TR')} ₺
                    </span>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-[#D9CDBB] rounded-xl bg-[#FAF6EE] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                      className="p-2 text-[#5C4533] hover:bg-[#EAE0D0]"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center text-sm font-bold text-[#4A2E18]">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-2 text-[#5C4533] hover:bg-[#EAE0D0]"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleAdd}
                    className="py-3 px-4 rounded-xl bg-[#2D5A27] hover:bg-[#20421C] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{justAdded ? 'Sepete Eklendi!' : 'Sepete Ekle'}</span>
                  </button>

                  <a
                    href={`https://wa.me/${farmSettings.whatsappNumber}?text=${encodeURIComponent(
                      `Merhaba Yakşi Çiftlik, "${product.name}" ürünü hakkında bilgi almak istiyorum.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>WhatsApp Sor</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
