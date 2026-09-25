import React from 'react';
import { CheckCircle2, Sparkles, X } from 'lucide-react';
import { ToastData } from '../types';

interface ToastProps {
  toasts: ToastData[];
  onDismiss: (id: number) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none w-full max-w-sm px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#2A2421] text-[#FAF6F0] px-5 py-2.5 rounded-full shadow-2xl flex items-center justify-between gap-3 border border-white/10 animate-fade-in w-auto max-w-full"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#D4C5B9] shrink-0" />
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-[#978A7F] hover:text-white p-0.5"
            aria-label="بستن اعلان"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
    </div>
  );
};
