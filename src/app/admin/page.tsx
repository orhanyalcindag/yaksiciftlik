'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Lock,
  Unlock,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  Save,
  RotateCcw,
  ShoppingBag,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  Eye,
  AlertTriangle,
  Sparkles,
  ArrowLeft,
  DollarSign,
  Package,
  Layers,
  Settings,
  Sliders,
  CheckCircle2,
  Upload,
} from 'lucide-react';
import { useFarm } from '@/context/FarmContext';
import { Product, Order, OrderStatus, ProductUnitOption } from '@/types';
import ImageUploader from '@/components/ImageUploader';

type AdminTab = 'products' | 'quick-update' | 'orders' | 'settings';

export default function AdminPage() {
  const {
    products,
    farmSettings,
    orders,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleStockStatus,
    quickUpdateProducts,
    resetToDefaults,
    updateOrderStatus,
    deleteOrder,
    updateFarmSettings,
    showToast,
  } = useFarm();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<AdminTab>('products');

  // Edit/Create Product Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // New Product Form State
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<'yumurtalar' | 'canli-hayvan' | 'yavru' | 'hizmet'>('yumurtalar');
  const [newProdPrice, setNewProdPrice] = useState<number>(10);
  const [newProdUnit, setNewProdUnit] = useState('Adet');
  const [newProdImage, setNewProdImage] = useState('/images/products/koy-yumurtasi.jpg');
  const [newProdTags, setNewProdTags] = useState('Doğal, Taze, Günlük');
  const [newProdBadge, setNewProdBadge] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdDetail, setNewProdDetail] = useState('');
  const [newProdInStock, setNewProdInStock] = useState(true);

  // Unit Options for New Product
  const [unitOpt1Label, setUnitOpt1Label] = useState('1 Adet');
  const [unitOpt1Mult, setUnitOpt1Mult] = useState(1);
  const [unitOpt2Label, setUnitOpt2Label] = useState("5'li Takım");
  const [unitOpt2Mult, setUnitOpt2Mult] = useState(5);
  const [unitOpt3Label, setUnitOpt3Label] = useState("10'lu Sürü");
  const [unitOpt3Mult, setUnitOpt3Mult] = useState(10);

  // Quick Edit State (holds draft edits for the table)
  const [quickEdits, setQuickEdits] = useState<
    Record<string, { price: number; inStock: boolean; stockNote: string }>
  >({});

  // Selected Order Detail Modal
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Check saved admin auth in sessionStorage
  useEffect(() => {
    const auth = sessionStorage.getItem('yaksi_admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Update default unit options placeholders based on category selection
  useEffect(() => {
    if (newProdCategory === 'yumurtalar') {
      setUnitOpt1Label(`1 ${newProdUnit}`);
      setUnitOpt1Mult(1);
      setUnitOpt2Label("15'li Viyol");
      setUnitOpt2Mult(15);
      setUnitOpt3Label("30'lu Koli");
      setUnitOpt3Mult(30);
    } else if (newProdCategory === 'canli-hayvan') {
      setUnitOpt1Label(`1 ${newProdUnit}`);
      setUnitOpt1Mult(1);
      setUnitOpt2Label("2'li Damızlık");
      setUnitOpt2Mult(2);
      setUnitOpt3Label("5'li Takım");
      setUnitOpt3Mult(5);
    } else if (newProdCategory === 'yavru') {
      setUnitOpt1Label(`1 ${newProdUnit}`);
      setUnitOpt1Mult(1);
      setUnitOpt2Label("5'li Takım");
      setUnitOpt2Mult(5);
      setUnitOpt3Label("10'lu Sürü");
      setUnitOpt3Mult(10);
    } else {
      setUnitOpt1Label(`1 ${newProdUnit}`);
      setUnitOpt1Mult(1);
      setUnitOpt2Label("50'lik Tepsi");
      setUnitOpt2Mult(50);
      setUnitOpt3Label("100'lük Tepsi");
      setUnitOpt3Mult(100);
    }
  }, [newProdCategory, newProdUnit]);

  // Initialize quickEdits whenever products change
  useEffect(() => {
    const initialMap: Record<string, { price: number; inStock: boolean; stockNote: string }> = {};
    products.forEach((p) => {
      initialMap[p.id] = {
        price: p.price,
        inStock: p.inStock,
        stockNote: p.stockNote || (p.inStock ? 'Stokta Var' : 'Tükendi'),
      };
    });
    setQuickEdits(initialMap);
  }, [products]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'yaksi123' || passwordInput === '1234') {
      setIsAuthenticated(true);
      sessionStorage.setItem('yaksi_admin_auth', 'true');
      setAuthError('');
      showToast('Yönetim Paneline hoş geldiniz!', 'success');
    } else {
      setAuthError('Hatalı şifre! (Varsayılan şifre: yaksi123)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('yaksi_admin_auth');
    showToast('Çıkış yapıldı.', 'info');
  };

  // Quick edit value changes
  const handleQuickPriceChange = (id: string, val: number) => {
    setQuickEdits((prev) => ({
      ...prev,
      [id]: { ...prev[id], price: val },
    }));
  };

  const handleQuickStockToggle = (id: string) => {
    setQuickEdits((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        inStock: !prev[id]?.inStock,
        stockNote: !prev[id]?.inStock ? 'Stokta Var' : 'Tükendi',
      },
    }));
  };

  const handleQuickNoteChange = (id: string, note: string) => {
    setQuickEdits((prev) => ({
      ...prev,
      [id]: { ...prev[id], stockNote: note },
    }));
  };

  const handleSaveQuickUpdates = () => {
    const updates = Object.entries(quickEdits).map(([id, data]) => ({
      id,
      price: data.price,
      inStock: data.inStock,
      stockNote: data.stockNote,
    }));
    quickUpdateProducts(updates);
  };

  // Open Edit Product Modal
  const handleOpenEdit = (p: Product) => {
    // Ensure unitOptions exists
    const safeProduct: Product = {
      ...p,
      unitOptions:
        p.unitOptions && p.unitOptions.length > 0
          ? p.unitOptions
          : [
              { label: `1 ${p.unit}`, multiplier: 1 },
              { label: "5'li Takım", multiplier: 5 },
              { label: "10'lu Sürü", multiplier: 10 },
            ],
    };
    setEditingProduct(safeProduct);
  };

  // Save Product Edit
  const handleSaveProductEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    updateProduct(editingProduct);
    setEditingProduct(null);
  };

  // Handle Create Product
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = newProdName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-');

    const catLabels = {
      yumurtalar: 'Yumurtalar',
      'canli-hayvan': 'Canlı Hayvanlar',
      yavru: 'Civcivler & Yavrular',
      hizmet: 'Çiftlik Hizmetleri',
    };

    // Build configured unit options
    const builtOptions: ProductUnitOption[] = [
      { label: unitOpt1Label.trim() || `1 ${newProdUnit}`, multiplier: Math.max(1, Number(unitOpt1Mult)) },
      { label: unitOpt2Label.trim() || "5'li Takım", multiplier: Math.max(1, Number(unitOpt2Mult)) },
      { label: unitOpt3Label.trim() || "10'lu Sürü", multiplier: Math.max(1, Number(unitOpt3Mult)) },
    ].filter((opt) => Boolean(opt.label));

    addProduct({
      name: newProdName,
      slug: slug || `urun-${Date.now()}`,
      category: newProdCategory,
      categoryLabel: catLabels[newProdCategory],
      price: Number(newProdPrice),
      unit: newProdUnit,
      unitOptions: builtOptions,
      image: newProdImage,
      tags: newProdTags.split(',').map((t) => t.trim()).filter(Boolean),
      badge: newProdBadge || undefined,
      description: newProdDesc,
      detailedInfo: newProdDetail,
      inStock: newProdInStock,
      stockNote: newProdInStock ? 'Stokta Var' : 'Tükendi',
      featured: false,
    });

    // Reset Form
    setNewProdName('');
    setNewProdPrice(10);
    setNewProdDesc('');
    setIsAddModalOpen(false);
  };

  /* -------------------------------------------------------------
     IF NOT AUTHENTICATED: RENDER SECURE LOGIN BARRIER
  ------------------------------------------------------------- */
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F7F2E7] via-[#FDFBF7] to-[#FAF6EE] flex flex-col justify-center items-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl border border-[#E8DCC9] shadow-2xl p-8 space-y-6">
          <div className="text-center space-y-3">
            <div className="w-20 h-20 rounded-full border-2 border-[#D9822B] mx-auto overflow-hidden shadow relative bg-[#FDFBF7]">
              <Image
                src="/images/brand/logo.png"
                alt="Yakşi Çiftlik"
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#4A2E18]">
              Yakşi Çiftlik Yönetim Paneli
            </h2>
            <p className="text-xs text-[#6B5744]">
              Çiftlik sahibi günlük fiyat, stok ve ürün yönetimi erişimi
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-[#4A2E18] block mb-1.5">
                Yönetici Şifresi
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Şifrenizi girin..."
                  autoFocus
                  className="w-full py-3 px-4 rounded-xl bg-[#FAF6EE] border border-[#EAE0D0] text-sm text-[#4A2E18] focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                />
                <Lock className="w-4 h-4 text-[#8C6D53] absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
              {authError && (
                <span className="text-xs text-red-600 font-semibold mt-1.5 block">
                  {authError}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-[#2D5A27] hover:bg-[#20421C] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Giriş Yap</span>
            </button>
          </form>

          <div className="pt-2 border-t border-[#F5EFE6] flex items-center justify-between text-xs text-[#8C6D53]">
            <Link href="/" className="hover:text-[#2D5A27] flex items-center gap-1 font-semibold">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Mağazaya Dön</span>
            </Link>
            <span className="text-[11px] bg-[#FAF6EE] px-2 py-0.5 rounded border border-[#EAE0D0]">
              Varsayılan: <strong>yaksi123</strong>
            </span>
          </div>
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------
     AUTHENTICATED ADMIN DASHBOARD
  ------------------------------------------------------------- */
  return (
    <div className="min-h-screen bg-[#F7F2E7] flex flex-col text-[#28190E]">
      
      {/* Admin Top Navigation Bar */}
      <header className="bg-[#4A2E18] text-[#FDFBF7] sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group" title="Mağazaya Git">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#D9822B] bg-[#FDFBF7]">
                <Image
                  src="/images/brand/logo.png"
                  alt="Yakşi Çiftlik"
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>
              <span className="font-serif font-black text-lg text-[#FDFBF7] group-hover:text-[#FBBF24] transition-colors">
                Yakşi Çiftlik
              </span>
            </Link>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-[#2D5A27] text-white border border-[#447C3B]">
              Yönetim Paneli
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mağazayı Görüntüle</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-800/60 hover:bg-red-800 text-xs font-semibold text-white transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Çıkış</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-4 border border-[#E8DCC9] shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#8C6D53] block">
                Toplam Ürün
              </span>
              <span className="text-2xl font-black text-[#4A2E18]">
                {products.length}
              </span>
              <span className="text-[11px] text-[#2D5A27] block font-medium">
                {products.filter((p) => p.inStock).length} Adet Stokta
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#FAF6EE] text-[#4A2E18] flex items-center justify-center border border-[#EAE0D0]">
              <Package className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-[#E8DCC9] shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#8C6D53] block">
                Güncel Köy Yumurtası
              </span>
              <span className="text-2xl font-black text-[#2D5A27]">
                {farmSettings.eggCurrentPrice} ₺
              </span>
              <span className="text-[11px] text-[#8C6D53] block">
                Tane Birim Fiyatı
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#EBF3E8] text-[#2D5A27] flex items-center justify-center border border-[#BFDCB7]">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-[#E8DCC9] shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#8C6D53] block">
                WhatsApp Sipariş Kaydı
              </span>
              <span className="text-2xl font-black text-[#D97706]">
                {orders.length}
              </span>
              <span className="text-[11px] text-[#6B5744] block">
                {orders.filter((o) => o.status === 'yeni').length} Yeni Sipariş
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#FFF7ED] text-[#D97706] flex items-center justify-center border border-[#FDBA74]">
              <MessageCircle className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-[#E8DCC9] shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#8C6D53] block">
                Çiftlik İletişim
              </span>
              <span className="text-sm font-bold text-[#4A2E18] truncate block">
                {farmSettings.displayPhone}
              </span>
              <span className="text-[11px] text-[#8C6D53] block truncate">
                Balaban Köyü
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#FAF6EE] text-[#8C6D53] flex items-center justify-center border border-[#EAE0D0]">
              <Phone className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="bg-white rounded-2xl p-2 border border-[#E8DCC9] shadow-sm flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'products'
                ? 'bg-[#2D5A27] text-white shadow'
                : 'text-[#6B5744] hover:bg-[#FAF6EE]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Ürün Yönetimi (CRUD)</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/10">
              {products.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('quick-update')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'quick-update'
                ? 'bg-[#2D5A27] text-white shadow'
                : 'text-[#6B5744] hover:bg-[#FAF6EE]'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Hızlı Fiyat & Stok Güncelleme</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'orders'
                ? 'bg-[#2D5A27] text-white shadow'
                : 'text-[#6B5744] hover:bg-[#FAF6EE]'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Sipariş Kayıtları</span>
            {orders.length > 0 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#F59E0B] text-black font-bold">
                {orders.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'settings'
                ? 'bg-[#2D5A27] text-white shadow'
                : 'text-[#6B5744] hover:bg-[#FAF6EE]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Çiftlik Ayarları</span>
          </button>
        </div>

        {/* -------------------------------------------------------------
            TAB 1: PRODUCT MANAGEMENT (CRUD)
        ------------------------------------------------------------- */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#E8DCC9]">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#4A2E18]">
                  Ürün Listesi & Yönetimi
                </h3>
                <p className="text-xs text-[#6B5744]">
                  Kendi fotoğrafınızı yükleyerek yeni ürün ekleyebilir, fiyat ve paket seçeneklerini güncelleyebilirsiniz.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#2D5A27] hover:bg-[#20421C] text-white text-xs font-bold shadow transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Yeni Ürün Ekle</span>
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl border border-[#E8DCC9] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#FAF6EE] border-b border-[#EAE0D0] text-[#6B5744] font-bold">
                      <th className="py-3 px-4">Görsel</th>
                      <th className="py-3 px-4">Ürün Adı</th>
                      <th className="py-3 px-4">Kategori</th>
                      <th className="py-3 px-4">Birim Fiyat</th>
                      <th className="py-3 px-4">Paket Seçenekleri</th>
                      <th className="py-3 px-4">Stok Durumu</th>
                      <th className="py-3 px-4">Rozet</th>
                      <th className="py-3 px-4 text-right">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F5EFE6]">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-[#FAF6EE]/50 transition-colors">
                        <td className="py-2.5 px-4">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#FAF6EE] border border-[#EAE0D0]">
                            <Image
                              src={p.image}
                              alt={p.name}
                              fill
                              sizes="48px"
                              className="object-cover"
                              unoptimized={p.image.startsWith('data:')}
                            />
                          </div>
                        </td>
                        <td className="py-2.5 px-4 font-bold text-[#4A2E18]">
                          <div>{p.name}</div>
                          <div className="text-[10px] text-[#8C6D53] font-normal truncate max-w-xs">
                            {p.tags.join(', ')}
                          </div>
                        </td>
                        <td className="py-2.5 px-4 text-[#2D5A27] font-semibold">
                          {p.categoryLabel}
                        </td>
                        <td className="py-2.5 px-4">
                          <span className="font-bold text-[#4A2E18] text-sm">
                            {p.price} ₺
                          </span>{' '}
                          <span className="text-[#8C6D53]">/ {p.unit}</span>
                        </td>
                        <td className="py-2.5 px-4">
                          {p.unitOptions && p.unitOptions.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {p.unitOptions.map((opt, i) => (
                                <span
                                  key={i}
                                  className="text-[10px] px-1.5 py-0.5 rounded bg-[#FAF6EE] text-[#5C4533] border border-[#EAE0D0]"
                                >
                                  {opt.label}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-[#A38872] italic text-[10px]">Tekli Satış</span>
                          )}
                        </td>
                        <td className="py-2.5 px-4">
                          <button
                            onClick={() => toggleStockStatus(p.id)}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                              p.inStock
                                ? 'bg-[#E8F5E9] text-[#2E7D32] border-[#C8E6C9]'
                                : 'bg-[#FFEBEE] text-[#C62828] border-[#FFCDD2]'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                p.inStock ? 'bg-[#2E7D32]' : 'bg-[#C62828]'
                              }`}
                            />
                            {p.inStock ? 'Stokta Var' : 'Tükendi'}
                          </button>
                        </td>
                        <td className="py-2.5 px-4">
                          {p.badge ? (
                            <span className="bg-[#FAF6EE] text-[#8C6D53] border border-[#EAE0D0] px-2 py-0.5 rounded text-[10px] font-bold">
                              {p.badge}
                            </span>
                          ) : (
                            <span className="text-[#A38872]">—</span>
                          )}
                        </td>
                        <td className="py-2.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEdit(p)}
                              className="p-1.5 rounded-lg bg-[#FAF6EE] hover:bg-[#EFE6D4] text-[#4A2E18] transition-colors"
                              title="Düzenle"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`"${p.name}" ürününü silmek istediğinize emin misiniz?`)) {
                                  deleteProduct(p.id);
                                }
                              }}
                              className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 transition-colors"
                              title="Sil"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB 2: QUICK PRICE & STOCK UPDATES (FAST EDIT TABLE)
        ------------------------------------------------------------- */}
        {activeTab === 'quick-update' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#E8DCC9]">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#4A2E18]">
                  Hızlı Fiyat & Günlük Stok Güncelleme
                </h3>
                <p className="text-xs text-[#6B5744]">
                  Sabah yumurta toplandığında veya günlük fiyat değiştiğinde tek ekrandan tüm ürünleri anında güncelleyin.
                </p>
              </div>

              <button
                onClick={handleSaveQuickUpdates}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2D5A27] hover:bg-[#20421C] text-white text-xs sm:text-sm font-bold shadow-md transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Tüm Değişiklikleri Kaydet</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8DCC9] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#FAF6EE] border-b border-[#EAE0D0] text-[#6B5744] font-bold">
                      <th className="py-3 px-4">Ürün Adı</th>
                      <th className="py-3 px-4">Kategori</th>
                      <th className="py-3 px-4">Fiyat (₺)</th>
                      <th className="py-3 px-4">Stok Durumu</th>
                      <th className="py-3 px-4">Stok Notu (Örn: Bol Stok / 15 Koli)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F5EFE6]">
                    {products.map((p) => {
                      const editState = quickEdits[p.id] || {
                        price: p.price,
                        inStock: p.inStock,
                        stockNote: p.stockNote || '',
                      };
                      return (
                        <tr key={p.id} className="hover:bg-[#FAF6EE]/40 transition-colors">
                          <td className="py-3 px-4 font-bold text-[#4A2E18]">
                            <div className="flex items-center gap-2.5">
                              <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-[#FAF6EE] border border-[#EAE0D0]">
                                <Image
                                  src={p.image}
                                  alt={p.name}
                                  fill
                                  sizes="32px"
                                  className="object-cover"
                                  unoptimized={p.image.startsWith('data:')}
                                />
                              </div>
                              <span>{p.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-[#2D5A27] font-medium">
                            {p.categoryLabel}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1.5">
                              <input
                                type="number"
                                min={1}
                                step={1}
                                value={editState.price}
                                onChange={(e) =>
                                  handleQuickPriceChange(p.id, Number(e.target.value))
                                }
                                className="w-24 px-2 py-1.5 rounded-lg border border-[#D9CDBB] bg-[#FAF6EE] text-sm font-bold text-[#4A2E18] focus:outline-none focus:ring-1 focus:ring-[#2D5A27]"
                              />
                              <span className="text-[#8C6D53]">₺ / {p.unit}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <button
                              type="button"
                              onClick={() => handleQuickStockToggle(p.id)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                                editState.inStock
                                  ? 'bg-[#E8F5E9] text-[#2E7D32] border-[#C8E6C9]'
                                  : 'bg-[#FFEBEE] text-[#C62828] border-[#FFCDD2]'
                              }`}
                            >
                              {editState.inStock ? '✓ Stokta Var' : '✕ Tükendi'}
                            </button>
                          </td>
                          <td className="py-3 px-4">
                            <input
                              type="text"
                              value={editState.stockNote}
                              onChange={(e) => handleQuickNoteChange(p.id, e.target.value)}
                              placeholder="Örn: Günlük Taze Toplandı"
                              className="w-full max-w-xs px-2 py-1.5 rounded-lg border border-[#D9CDBB] bg-[#FAF6EE] text-xs text-[#4A2E18] focus:outline-none focus:ring-1 focus:ring-[#2D5A27]"
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSaveQuickUpdates}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2D5A27] hover:bg-[#20421C] text-white text-sm font-bold shadow-md transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Tüm Değişiklikleri Kaydet</span>
              </button>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB 3: WHATSAPP ORDER LOG
        ------------------------------------------------------------- */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#E8DCC9]">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#4A2E18]">
                  WhatsApp Sipariş Kayıtları
                </h3>
                <p className="text-xs text-[#6B5744]">
                  Müşterilerin web sitesinden WhatsApp ile başlattığı tüm siparişler burada arşivlenir.
                </p>
              </div>

              <span className="text-xs font-bold text-[#8C6D53] bg-[#FAF6EE] px-3 py-1.5 rounded-xl border border-[#EAE0D0]">
                Toplam {orders.length} Sipariş
              </span>
            </div>

            {orders.length > 0 ? (
              <div className="bg-white rounded-2xl border border-[#E8DCC9] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#FAF6EE] border-b border-[#EAE0D0] text-[#6B5744] font-bold">
                        <th className="py-3 px-4">Sipariş No</th>
                        <th className="py-3 px-4">Tarih</th>
                        <th className="py-3 px-4">Müşteri</th>
                        <th className="py-3 px-4">Ürünler</th>
                        <th className="py-3 px-4">Tutar</th>
                        <th className="py-3 px-4">Durum</th>
                        <th className="py-3 px-4 text-right">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F5EFE6]">
                      {orders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-[#FAF6EE]/50 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-[#4A2E18]">
                            #{ord.orderNumber}
                          </td>
                          <td className="py-3 px-4 text-[#8C6D53]">
                            {new Date(ord.createdAt).toLocaleDateString('tr-TR', {
                              day: '2-digit',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </td>
                          <td className="py-3 px-4 font-bold text-[#4A2E18]">
                            <div>{ord.customerName || 'WhatsApp Müşterisi'}</div>
                            {ord.customerPhone && (
                              <div className="text-[10px] text-[#2D5A27]">
                                {ord.customerPhone}
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-[#6B5744]">
                              {ord.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-bold text-[#2D5A27] text-sm">
                            {ord.totalAmount.toLocaleString('tr-TR')} ₺
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={ord.status}
                              onChange={(e) =>
                                updateOrderStatus(ord.id, e.target.value as OrderStatus)
                              }
                              className={`py-1 px-2 rounded-lg text-xs font-bold border cursor-pointer ${
                                ord.status === 'yeni'
                                  ? 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]'
                                  : ord.status === 'hazirlaniyor'
                                  ? 'bg-[#DBEAFE] text-[#1E40AF] border-[#BFDBFE]'
                                  : ord.status === 'kargoda'
                                  ? 'bg-[#E0E7FF] text-[#3730A3] border-[#C7D2FE]'
                                  : ord.status === 'teslim-edildi'
                                  ? 'bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]'
                                  : 'bg-[#FEE2E2] text-[#991B1B] border-[#FECACA]'
                              }`}
                            >
                              <option value="yeni">Yeni Sipariş</option>
                              <option value="hazirlaniyor">Hazırlanıyor</option>
                              <option value="kargoda">Kargoda / Yolda</option>
                              <option value="teslim-edildi">Teslim Edildi</option>
                              <option value="iptal">İptal Edildi</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setSelectedOrder(ord)}
                                className="p-1.5 rounded-lg bg-[#FAF6EE] hover:bg-[#EFE6D4] text-[#4A2E18]"
                                title="Sipariş Detayı"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>

                              {ord.customerPhone && (
                                <a
                                  href={`https://wa.me/${ord.customerPhone.replace(/[^0-9]/g, '')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg bg-[#E8F5E9] text-[#2E7D32] hover:bg-[#C8E6C9]"
                                  title="Müşteriye WhatsApp'tan Yaz"
                                >
                                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                                </a>
                              )}

                              <button
                                onClick={() => {
                                  if (confirm('Bu sipariş kaydını silmek istiyor musunuz?')) {
                                    deleteOrder(ord.id);
                                  }
                                }}
                                className="p-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100"
                                title="Kaydı Sil"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="p-12 bg-white rounded-2xl border border-[#E8DCC9] text-center space-y-2">
                <MessageCircle className="w-10 h-10 text-[#8C6D53] mx-auto opacity-40" />
                <h4 className="font-bold text-[#4A2E18]">Henüz Kayıtlı Sipariş Yok</h4>
                <p className="text-xs text-[#6B5744]">
                  Müşteriler web sitesinden sepeti onaylayıp WhatsApp butonuna tıkladıkça siparişler otomatik buraya düşer.
                </p>
              </div>
            )}
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB 4: FARM SETTINGS
        ------------------------------------------------------------- */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl bg-white p-6 rounded-2xl border border-[#E8DCC9] shadow-sm space-y-6">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#4A2E18]">
                Çiftlik & İletişim Ayarları
              </h3>
              <p className="text-xs text-[#6B5744]">
                Web sitesinde görünen telefon, WhatsApp numarası ve duyuru metnini güncelleyin.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-[#4A2E18] block mb-1">
                  Çiftlik Adı:
                </label>
                <input
                  type="text"
                  value={farmSettings.farmName}
                  onChange={(e) => updateFarmSettings({ farmName: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#FAF6EE] border border-[#EAE0D0] text-sm font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#4A2E18] block mb-1">
                    Görünen Telefon:
                  </label>
                  <input
                    type="text"
                    value={farmSettings.displayPhone}
                    onChange={(e) => updateFarmSettings({ displayPhone: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#FAF6EE] border border-[#EAE0D0] text-sm"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#4A2E18] block mb-1">
                    WhatsApp Numarası (Ülke kodu ile, örn: 905362588376):
                  </label>
                  <input
                    type="text"
                    value={farmSettings.whatsappNumber}
                    onChange={(e) => updateFarmSettings({ whatsappNumber: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#FAF6EE] border border-[#EAE0D0] text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#4A2E18] block mb-1">
                  Tam Adres:
                </label>
                <input
                  type="text"
                  value={farmSettings.addressFull}
                  onChange={(e) => updateFarmSettings({ addressFull: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#FAF6EE] border border-[#EAE0D0] text-sm"
                />
              </div>

              <div>
                <label className="font-bold text-[#4A2E18] block mb-1">
                  Üst Duyuru Bandı Metni:
                </label>
                <input
                  type="text"
                  value={farmSettings.announcement}
                  onChange={(e) => updateFarmSettings({ announcement: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#FAF6EE] border border-[#EAE0D0] text-sm"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="bannerCheck"
                  checked={farmSettings.bannerActive}
                  onChange={(e) => updateFarmSettings({ bannerActive: e.target.checked })}
                  className="w-4 h-4 rounded text-[#2D5A27] focus:ring-[#2D5A27]"
                />
                <label htmlFor="bannerCheck" className="font-bold text-[#4A2E18] cursor-pointer">
                  Üst duyuru bandını aktif tut
                </label>
              </div>

              <div className="pt-6 border-t border-[#EAE0D0] flex items-center justify-between">
                <div>
                  <span className="font-bold text-red-700 block">Sıfırlama İşlemi:</span>
                  <span className="text-[11px] text-[#8C6D53]">
                    Kataloğu ve ayarları orijinal çiftlik verilerine döndürür.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Tüm ürünleri varsayılan fabrika verilerine sıfırlamak istiyor musunuz?')) {
                      resetToDefaults();
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-800 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Varsayılana Sıfırla</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* -------------------------------------------------------------
          MODAL: ADD NEW PRODUCT (WITH CUSTOM PHOTO UPLOAD & UNIT OPTIONS)
      ------------------------------------------------------------- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            onClick={() => setIsAddModalOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />
          <div className="min-h-full flex items-center justify-center p-4">
            <div className="relative w-full max-w-xl bg-[#FDFBF7] rounded-3xl shadow-2xl border border-[#EAE0D0] p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#EAE0D0] pb-3">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#4A2E18]">
                    Yeni Ürün Ekle
                  </h3>
                  <span className="text-[11px] text-[#8C6D53]">
                    Kendi fotoğrafınızı seçip paketleme seçeneklerini belirleyin
                  </span>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 rounded-lg text-[#6B5744] hover:bg-[#FAF6EE]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
                
                {/* 1. Custom Image Uploader */}
                <ImageUploader
                  currentImage={newProdImage}
                  onImageChange={setNewProdImage}
                  label="1. Ürün Fotoğrafı (Kendi Fotoğrafınızı Yükleyin veya Seçin):"
                />

                {/* 2. Product Name & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="font-bold text-[#4A2E18] block mb-1">
                      Ürün Adı:
                    </label>
                    <input
                      type="text"
                      required
                      value={newProdName}
                      onChange={(e) => setNewProdName(e.target.value)}
                      placeholder="Örn: Damızlık Horoz / Köy Yumurtası"
                      className="w-full p-2.5 rounded-xl bg-white border border-[#EAE0D0] text-sm"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#4A2E18] block mb-1">
                      Kategori:
                    </label>
                    <select
                      value={newProdCategory}
                      onChange={(e) => setNewProdCategory(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl bg-white border border-[#EAE0D0] text-xs font-semibold"
                    >
                      <option value="yumurtalar">Yumurtalar</option>
                      <option value="canli-hayvan">Canlı Hayvanlar</option>
                      <option value="yavru">Civcivler & Yavrular</option>
                      <option value="hizmet">Çiftlik Hizmetleri</option>
                    </select>
                  </div>
                </div>

                {/* 3. Base Price & Base Unit */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-[#4A2E18] block mb-1">
                      Birim Fiyat (₺):
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={newProdPrice}
                      onChange={(e) => setNewProdPrice(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl bg-white border border-[#EAE0D0] text-sm font-bold"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#4A2E18] block mb-1">
                      Temel Birim:
                    </label>
                    <input
                      type="text"
                      value={newProdUnit}
                      onChange={(e) => setNewProdUnit(e.target.value)}
                      placeholder="Adet, Koli, Çıkım vb."
                      className="w-full p-2.5 rounded-xl bg-white border border-[#EAE0D0] text-xs"
                    />
                  </div>
                </div>

                {/* 4. Unit / Packaging Options Configurator */}
                <div className="p-3.5 rounded-2xl bg-white border border-[#E8DCC9] space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-[#4A2E18] block text-xs">
                      Paketleme / Adet Seçenekleri (Kartın Altındaki Butonlar):
                    </label>
                    <span className="text-[10px] text-[#2D5A27] font-semibold">
                      (Kartın altı boş kalmaz)
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <span className="text-[10px] text-[#8C6D53] font-semibold block mb-1">
                        1. Buton (Tekli)
                      </span>
                      <input
                        type="text"
                        value={unitOpt1Label}
                        onChange={(e) => setUnitOpt1Label(e.target.value)}
                        placeholder="Örn: 1 Adet"
                        className="w-full p-2 rounded-xl bg-[#FAF6EE] border border-[#EAE0D0] text-xs font-medium"
                      />
                    </div>

                    <div>
                      <span className="text-[10px] text-[#8C6D53] font-semibold block mb-1">
                        2. Buton (Orta Paket)
                      </span>
                      <input
                        type="text"
                        value={unitOpt2Label}
                        onChange={(e) => setUnitOpt2Label(e.target.value)}
                        placeholder="Örn: 5'li Takım"
                        className="w-full p-2 rounded-xl bg-[#FAF6EE] border border-[#EAE0D0] text-xs font-medium"
                      />
                      <div className="mt-1 flex items-center gap-1 text-[10px] text-[#8C6D53]">
                        <span>Kat:</span>
                        <input
                          type="number"
                          min={1}
                          value={unitOpt2Mult}
                          onChange={(e) => setUnitOpt2Mult(Number(e.target.value))}
                          className="w-12 p-0.5 rounded border border-[#EAE0D0] text-center"
                        />
                        <span>x</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] text-[#8C6D53] font-semibold block mb-1">
                        3. Buton (Büyük Sürü)
                      </span>
                      <input
                        type="text"
                        value={unitOpt3Label}
                        onChange={(e) => setUnitOpt3Label(e.target.value)}
                        placeholder="Örn: 10'lu Sürü"
                        className="w-full p-2 rounded-xl bg-[#FAF6EE] border border-[#EAE0D0] text-xs font-medium"
                      />
                      <div className="mt-1 flex items-center gap-1 text-[10px] text-[#8C6D53]">
                        <span>Kat:</span>
                        <input
                          type="number"
                          min={1}
                          value={unitOpt3Mult}
                          onChange={(e) => setUnitOpt3Mult(Number(e.target.value))}
                          className="w-12 p-0.5 rounded border border-[#EAE0D0] text-center"
                        />
                        <span>x</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. Badge & Description */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-[#4A2E18] block mb-1">
                      Rozet (Örn: Damızlık, En Çok Satan):
                    </label>
                    <input
                      type="text"
                      value={newProdBadge}
                      onChange={(e) => setNewProdBadge(e.target.value)}
                      placeholder="Boş bırakılabilir"
                      className="w-full p-2 rounded-xl bg-white border border-[#EAE0D0] text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#4A2E18] block mb-1">
                      Etiketler (Virgülle ayırın):
                    </label>
                    <input
                      type="text"
                      value={newProdTags}
                      onChange={(e) => setNewProdTags(e.target.value)}
                      className="w-full p-2 rounded-xl bg-white border border-[#EAE0D0] text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-[#4A2E18] block mb-1">
                    Kısa Açıklama:
                  </label>
                  <textarea
                    rows={2}
                    value={newProdDesc}
                    onChange={(e) => setNewProdDesc(e.target.value)}
                    placeholder="Balaban Köyü'nde doğal otlayan sağlıklı ırk..."
                    className="w-full p-2 rounded-xl bg-white border border-[#EAE0D0] text-xs"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="newStockCheck"
                    checked={newProdInStock}
                    onChange={(e) => setNewProdInStock(e.target.checked)}
                    className="w-4 h-4 rounded text-[#2D5A27]"
                  />
                  <label htmlFor="newStockCheck" className="font-bold text-[#4A2E18] cursor-pointer">
                    Hemen stokta satışa açılsın
                  </label>
                </div>

                <div className="pt-4 border-t border-[#EAE0D0] flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-[#FAF6EE] text-[#6B5744] font-bold"
                  >
                    Vazgeç
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#2D5A27] text-white font-bold shadow hover:bg-[#20421C] transition-all"
                  >
                    Ürünü Kataloğa Ekle
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          MODAL: EDIT EXISTING PRODUCT
      ------------------------------------------------------------- */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            onClick={() => setEditingProduct(null)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />
          <div className="min-h-full flex items-center justify-center p-4">
            <div className="relative w-full max-w-xl bg-[#FDFBF7] rounded-3xl shadow-2xl border border-[#EAE0D0] p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#EAE0D0] pb-3">
                <h3 className="font-serif font-bold text-lg text-[#4A2E18]">
                  Ürünü Düzenle: {editingProduct.name}
                </h3>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="p-1 rounded-lg text-[#6B5744] hover:bg-[#FAF6EE]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProductEdit} className="space-y-4 text-xs">
                
                {/* Photo Uploader */}
                <ImageUploader
                  currentImage={editingProduct.image}
                  onImageChange={(url) =>
                    setEditingProduct({ ...editingProduct, image: url })
                  }
                  label="Fotoğrafı Değiştir (Yeni Dosya Yükle veya Galeriden Seç):"
                />

                <div>
                  <label className="font-bold text-[#4A2E18] block mb-1">
                    Ürün Adı:
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, name: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl bg-white border border-[#EAE0D0] text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-[#4A2E18] block mb-1">
                      Fiyat (₺):
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={editingProduct.price}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          price: Number(e.target.value),
                        })
                      }
                      className="w-full p-2.5 rounded-xl bg-white border border-[#EAE0D0] text-sm font-bold"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#4A2E18] block mb-1">
                      Birim:
                    </label>
                    <input
                      type="text"
                      value={editingProduct.unit}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, unit: e.target.value })
                      }
                      className="w-full p-2.5 rounded-xl bg-white border border-[#EAE0D0] text-sm"
                    />
                  </div>
                </div>

                {/* Unit Options Editor */}
                <div className="p-3 rounded-2xl bg-white border border-[#E8DCC9] space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-[#4A2E18] block text-xs">
                      Paketleme & Takım Seçenekleri (Butonlar):
                    </label>
                    <span className="text-[10px] text-[#8C6D53]">
                      Müşterinin kart altında gördüğü birimler
                    </span>
                  </div>

                  <div className="space-y-2">
                    {(editingProduct.unitOptions || []).map((opt, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="w-4 text-center font-bold text-[#8C6D53]">
                          {idx + 1}.
                        </span>
                        <input
                          type="text"
                          value={opt.label}
                          onChange={(e) => {
                            const newOptions = [...(editingProduct.unitOptions || [])];
                            newOptions[idx] = { ...newOptions[idx], label: e.target.value };
                            setEditingProduct({ ...editingProduct, unitOptions: newOptions });
                          }}
                          placeholder="Örn: 1 Adet / 5'li Takım"
                          className="flex-1 p-1.5 rounded-lg bg-[#FAF6EE] border border-[#EAE0D0] text-xs"
                        />
                        <div className="flex items-center gap-1">
                          <span className="text-[11px] text-[#8C6D53]">Kat:</span>
                          <input
                            type="number"
                            min={1}
                            value={opt.multiplier}
                            onChange={(e) => {
                              const newOptions = [...(editingProduct.unitOptions || [])];
                              newOptions[idx] = {
                                ...newOptions[idx],
                                multiplier: Math.max(1, Number(e.target.value)),
                              };
                              setEditingProduct({ ...editingProduct, unitOptions: newOptions });
                            }}
                            className="w-14 p-1 rounded-lg bg-[#FAF6EE] border border-[#EAE0D0] text-xs text-center font-bold"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const newOptions = (editingProduct.unitOptions || []).filter(
                              (_, i) => i !== idx
                            );
                            setEditingProduct({ ...editingProduct, unitOptions: newOptions });
                          }}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                          title="Seçeneği Kaldır"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => {
                        const newOptions = [
                          ...(editingProduct.unitOptions || []),
                          { label: "Yeni Paket", multiplier: 1 },
                        ];
                        setEditingProduct({ ...editingProduct, unitOptions: newOptions });
                      }}
                      className="text-[11px] text-[#2D5A27] font-bold hover:underline flex items-center gap-1 pt-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Yeni Paket / Takım Butonu Ekle</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-[#4A2E18] block mb-1">
                    Rozet (Örn: En Çok Satan):
                  </label>
                  <input
                    type="text"
                    value={editingProduct.badge || ''}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, badge: e.target.value })
                    }
                    className="w-full p-2 rounded-xl bg-white border border-[#EAE0D0] text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#4A2E18] block mb-1">
                    Kısa Açıklama:
                  </label>
                  <textarea
                    rows={2}
                    value={editingProduct.description}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        description: e.target.value,
                      })
                    }
                    className="w-full p-2 rounded-xl bg-white border border-[#EAE0D0] text-xs"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <label className="flex items-center gap-1.5 font-bold text-[#4A2E18] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingProduct.inStock}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          inStock: e.target.checked,
                          stockNote: e.target.checked ? 'Stokta Var' : 'Tükendi',
                        })
                      }
                      className="w-4 h-4 rounded text-[#2D5A27]"
                    />
                    <span>Stokta Var</span>
                  </label>

                  <label className="flex items-center gap-1.5 font-bold text-[#4A2E18] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!editingProduct.featured}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          featured: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded text-[#2D5A27]"
                    />
                    <span>Öne Çıkarılan Ürün</span>
                  </label>
                </div>

                <div className="pt-4 border-t border-[#EAE0D0] flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2 rounded-xl bg-[#FAF6EE] text-[#6B5744] font-bold"
                  >
                    Vazgeç
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#2D5A27] text-white font-bold shadow hover:bg-[#20421C]"
                  >
                    Güncelle
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          MODAL: VIEW ORDER DETAILS
      ------------------------------------------------------------- */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            onClick={() => setSelectedOrder(null)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />
          <div className="min-h-full flex items-center justify-center p-4">
            <div className="relative w-full max-w-md bg-[#FDFBF7] rounded-3xl shadow-2xl border border-[#EAE0D0] p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#EAE0D0] pb-3">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#4A2E18]">
                    Sipariş Detayı #{selectedOrder.orderNumber}
                  </h3>
                  <span className="text-xs text-[#8C6D53]">
                    {new Date(selectedOrder.createdAt).toLocaleString('tr-TR')}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-1 rounded-lg text-[#6B5744] hover:bg-[#FAF6EE]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Customer Info */}
              <div className="bg-white p-3.5 rounded-2xl border border-[#E8DCC9] space-y-1 text-xs">
                <div className="font-bold text-[#4A2E18] text-sm">
                  {selectedOrder.customerName}
                </div>
                {selectedOrder.customerPhone && (
                  <div className="text-[#2D5A27] font-semibold">
                    📞 {selectedOrder.customerPhone}
                  </div>
                )}
                {selectedOrder.customerAddress && (
                  <div className="text-[#6B5744]">
                    📍 {selectedOrder.customerAddress}
                  </div>
                )}
                {selectedOrder.orderNote && (
                  <div className="text-[#D97706] italic pt-1">
                    💬 "{selectedOrder.orderNote}"
                  </div>
                )}
              </div>

              {/* Ordered Items */}
              <div className="space-y-2 text-xs">
                <span className="font-bold text-[#4A2E18] block">Sipariş Edilen Ürünler:</span>
                <div className="divide-y divide-[#EAE0D0] bg-white rounded-2xl border border-[#E8DCC9] p-3">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="py-2 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-[#4A2E18]">{item.name}</span>
                        <div className="text-[11px] text-[#8C6D53]">
                          {item.quantity} x {item.unitPrice} ₺ ({item.unit})
                        </div>
                      </div>
                      <span className="font-bold text-[#2D5A27]">
                        {item.total.toLocaleString('tr-TR')} ₺
                      </span>
                    </div>
                  ))}
                  <div className="pt-2 flex items-center justify-between font-bold text-sm text-[#4A2E18]">
                    <span>Toplam Tutar:</span>
                    <span className="text-base text-[#2D5A27]">
                      {selectedOrder.totalAmount.toLocaleString('tr-TR')} ₺
                    </span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Action */}
              {selectedOrder.customerPhone && (
                <a
                  href={`https://wa.me/${selectedOrder.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Merhaba ${selectedOrder.customerName}, Yakşi Çiftlik'ten #${selectedOrder.orderNumber} nolu siparişiniz için yazıyorum.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#25D366] text-white font-bold text-xs flex items-center justify-center gap-2 shadow"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Müşteriye WhatsApp'tan Mesaj Gönder</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
