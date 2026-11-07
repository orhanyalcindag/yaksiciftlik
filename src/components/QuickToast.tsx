'use client';

import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useFarm } from '@/context/FarmContext';

export default function QuickToast() {
  const { toasts, removeToast } = useFarm();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-2xl shadow-xl border animate-in slide-in-from-top-2 duration-300 ${
            toast.type === 'success'
              ? 'bg-[#2D5A27] text-white border-[#447C3B]'
              : toast.type === 'warning'
              ? 'bg-[#D97706] text-white border-[#F59E0B]'
              : 'bg-[#4A2E18] text-white border-[#6E4524]'
          }`}
        >
          <div className="flex items-center gap-2.5 text-xs font-semibold">
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-[#FDE68A] flex-shrink-0" />
            ) : toast.type === 'warning' ? (
              <AlertCircle className="w-4 h-4 text-[#FEF3C7] flex-shrink-0" />
            ) : (
              <Info className="w-4 h-4 text-[#EED9B3] flex-shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 rounded-lg hover:bg-white/20 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
