'use client';

import React from 'react';
import { FarmProvider } from '@/context/FarmContext';
import CartDrawer from './CartDrawer';
import ProductDetailModal from './ProductDetailModal';
import QuickToast from './QuickToast';
import FloatingWhatsAppButton from './FloatingWhatsAppButton';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <FarmProvider>
      {children}
      <CartDrawer />
      <ProductDetailModal />
      <FloatingWhatsAppButton />
      <QuickToast />
    </FarmProvider>
  );
}
