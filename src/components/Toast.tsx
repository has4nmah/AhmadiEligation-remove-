import React, { useEffect } from 'react';
import { CheckCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
  type?: 'success' | 'info';
}

export const Toast: React.FC<ToastProps> = ({ message, onClose, type = 'success' }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-200">
      <div className="flex items-center gap-2.5 px-4 py-3 bg-slate-900 text-white rounded-xl shadow-xl border border-slate-800 text-sm font-medium">
        {type === 'success' ? (
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
        ) : (
          <Info className="w-4 h-4 text-sky-400 shrink-0" />
        )}
        <span>{message}</span>
      </div>
    </div>
  );
};
