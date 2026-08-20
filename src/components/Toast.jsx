import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Toast = () => {
  const { toast } = usePortfolio();

  if (!toast.visible) return null;

  const isSuccess = toast.type === 'success';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up flex items-center gap-3 px-4 py-3 rounded-2xl shadow-dropdown border bg-white border-[#D3E2EB] text-[#17212B]">
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
        isSuccess 
          ? 'bg-emerald-100 text-emerald-600' 
          : 'bg-red-100 text-red-600'
      }`}>
        {isSuccess ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
      </div>
      <div className="text-xs sm:text-sm font-semibold">
        {toast.message}
      </div>
    </div>
  );
};
