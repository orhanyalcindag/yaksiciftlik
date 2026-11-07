'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
  Upload,
  Image as ImageIcon,
  Check,
  RefreshCw,
  X,
  Link as LinkIcon,
  Sparkles,
} from 'lucide-react';

interface ImageUploaderProps {
  currentImage: string;
  onImageChange: (url: string) => void;
  label?: string;
}

const SAMPLE_GALLERY = [
  { label: 'Köy Yumurtası', path: '/images/products/hd/koy-yumurtasi.jpg' },
  { label: 'Ördek Yumurtası', path: '/images/products/hd/ordek-yumurtasi.jpg' },
  { label: 'Beç Yumurtası', path: '/images/products/hd/bec-yumurtasi.jpg' },
  { label: 'Kuluçkalık Yumurta', path: '/images/products/hd/kuluckalik-yumurta.jpg' },
  { label: 'Tavuk', path: '/images/products/hd/tavuk.jpg' },
  { label: 'Horoz', path: '/images/products/hd/horoz.jpg' },
  { label: 'Ördek', path: '/images/products/hd/ordek.jpg' },
  { label: 'Beç Tavuğu', path: '/images/products/hd/bec-tavugu.jpg' },
  { label: 'Civciv', path: '/images/products/hd/civciv.jpg' },
  { label: 'Ördek Yavrusu', path: '/images/products/hd/ordek-yavrusu.jpg' },
  { label: 'Beç Yavrusu', path: '/images/products/hd/bec-yavrusu.jpg' },
  { label: 'Kuluçka Hizmeti', path: '/images/products/hd/kulucka-hizmeti.jpg' },
  { label: 'Taze Yumurta Kaseleri', path: '/images/products/koy-yumurtasi-fresh-bowls.jpg' },
  { label: 'Organik Yumurta Sepeti', path: '/images/products/organic-eggs-basket.jpg' },
];

export default function ImageUploader({
  currentImage,
  onImageChange,
  label = 'Ürün Fotoğrafı',
}: ImageUploaderProps) {
  const [mode, setMode] = useState<'upload' | 'gallery' | 'url'>('upload');
  const [isUploading, setIsUploading] = useState(false);
  const [customUrl, setCustomUrl] = useState(currentImage.startsWith('http') ? currentImage : '');
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle local file selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('Fotoğraf boyutu en fazla 10 MB olabilir.');
      return;
    }

    setUploadError('');
    setIsUploading(true);

    try {
      // 1. Try uploading to server API
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          onImageChange(data.url);
          setIsUploading(false);
          return;
        }
      }

      // 2. Fallback to base64 Data URL if server upload had an issue
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onImageChange(event.target.result as string);
        }
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      // Base64 fallback on network/server error
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onImageChange(event.target.result as string);
        }
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-3">
      {/* Label and Mode Selector */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-[#4A2E18] block">
          {label}
        </label>

        {/* Upload Mode Tabs */}
        <div className="flex items-center gap-1 bg-[#FAF6EE] p-0.5 rounded-lg border border-[#EAE0D0] text-[10px] font-semibold">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2 py-1 rounded-md transition-all ${
              mode === 'upload'
                ? 'bg-[#2D5A27] text-white shadow-xs'
                : 'text-[#6B5744] hover:text-[#4A2E18]'
            }`}
          >
            📁 Dosya Yükle
          </button>
          <button
            type="button"
            onClick={() => setMode('gallery')}
            className={`px-2 py-1 rounded-md transition-all ${
              mode === 'gallery'
                ? 'bg-[#2D5A27] text-white shadow-xs'
                : 'text-[#6B5744] hover:text-[#4A2E18]'
            }`}
          >
            🖼️ Galeriden Seç
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2 py-1 rounded-md transition-all ${
              mode === 'url'
                ? 'bg-[#2D5A27] text-white shadow-xs'
                : 'text-[#6B5744] hover:text-[#4A2E18]'
            }`}
          >
            🔗 URL Gir
          </button>
        </div>
      </div>

      {/* Current Preview Box */}
      {currentImage && (
        <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-[#FAF6EE] border border-[#E8DCC9]">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white border border-[#D9CDBB] flex-shrink-0">
            <Image
              src={currentImage}
              alt="Seçilen Fotoğraf Önizleme"
              fill
              sizes="64px"
              className="object-cover"
              unoptimized={currentImage.startsWith('data:')}
            />
          </div>
          <div className="flex-1 min-w-0 text-xs">
            <span className="font-bold text-[#2D5A27] flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-[#2D5A27]" />
              Fotoğraf Seçildi
            </span>
            <span className="text-[11px] text-[#8C6D53] truncate block mt-0.5">
              {currentImage.startsWith('data:')
                ? 'Cihazınızdan yüklenen özel fotoğraf'
                : currentImage}
            </span>
          </div>
        </div>
      )}

      {/* 1. FILE UPLOAD INTERFACE */}
      {mode === 'upload' && (
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/webp, image/jpg"
            className="hidden"
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-[#D9CDBB] hover:border-[#2D5A27] bg-white hover:bg-[#FAF6EE]/50 rounded-2xl p-5 text-center cursor-pointer transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-[#EBF3E8] text-[#2D5A27] flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
              {isUploading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <Upload className="w-5 h-5" />
              )}
            </div>
            <div className="text-xs font-bold text-[#4A2E18]">
              {isUploading ? 'Fotoğraf Yükleniyor...' : 'Bilgisayarınızdan / Telefonunuzdan Fotoğraf Seçin'}
            </div>
            <p className="text-[11px] text-[#8C6D53] mt-1">
              PNG, JPG, WEBP (Maksimum 10 MB) • Tıklayarak seçin veya buraya sürükleyin
            </p>
          </div>

          {uploadError && (
            <p className="text-[11px] text-red-600 font-semibold mt-1">
              {uploadError}
            </p>
          )}
        </div>
      )}

      {/* 2. GALLERY SELECTION */}
      {mode === 'gallery' && (
        <div className="space-y-2">
          <div className="grid grid-cols-4 gap-2 max-h-40 overflow-y-auto p-1 bg-white rounded-xl border border-[#EAE0D0]">
            {SAMPLE_GALLERY.map((item) => {
              const isSelected = currentImage === item.path;
              return (
                <div
                  key={item.path}
                  onClick={() => onImageChange(item.path)}
                  className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                    isSelected
                      ? 'border-[#2D5A27] ring-2 ring-[#2D5A27]/30 scale-95'
                      : 'border-transparent hover:border-[#D9CDBB]'
                  }`}
                  title={item.label}
                >
                  <Image
                    src={item.path}
                    alt={item.label}
                    fill
                    sizes="60px"
                    className="object-cover"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-[#2D5A27]/40 flex items-center justify-center text-white">
                      <Check className="w-4 h-4 font-bold" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <span className="text-[10px] text-[#8C6D53] block text-center">
            Katalogdaki hazır çiftlik fotoğraflarından birine tıklayarak seçin.
          </span>
        </div>
      )}

      {/* 3. EXTERNAL URL INPUT */}
      {mode === 'url' && (
        <div className="flex gap-2">
          <div className="relative flex-1">
            <LinkIcon className="w-3.5 h-3.5 text-[#8C6D53] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="url"
              value={customUrl}
              onChange={(e) => {
                setCustomUrl(e.target.value);
                if (e.target.value.trim()) {
                  onImageChange(e.target.value.trim());
                }
              }}
              placeholder="https://example.com/resim.jpg"
              className="w-full pl-8 pr-3 py-2 rounded-xl bg-white border border-[#EAE0D0] text-xs focus:outline-none focus:ring-1 focus:ring-[#2D5A27]"
            />
          </div>
          <button
            type="button"
            onClick={() => {
              if (customUrl.trim()) onImageChange(customUrl.trim());
            }}
            className="px-3 py-2 rounded-xl bg-[#2D5A27] text-white text-xs font-bold hover:bg-[#20421C]"
          >
            Uygula
          </button>
        </div>
      )}
    </div>
  );
}
