import React from 'react';
import { BookOpen, ShieldCheck, CheckCircle2, Zap } from 'lucide-react';

interface StatsBarProps {
  totalCount: number;
  categoriesCount: number;
  filteredCount: number;
  hasActiveFilter: boolean;
}

export const StatsBar: React.FC<StatsBarProps> = ({
  totalCount,
  categoriesCount,
  filteredCount,
  hasActiveFilter
}) => {
  return (
    <div className="bg-emerald-900 text-emerald-50 py-3.5 px-4 sm:px-6 border-b border-emerald-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-1.5 font-medium">
            <BookOpen className="w-4 h-4 text-emerald-300" />
            <span>মোট আপত্তি ও উত্তর:</span>
            <span className="font-bold text-white bg-emerald-800 px-2 py-0.5 rounded text-xs">
              {totalCount}টি বিষয়
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>বিষয়ভিত্তিক শাখা:</span>
            <span className="font-bold text-white bg-emerald-800 px-2 py-0.5 rounded text-xs">
              {categoriesCount - 1}টি
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 font-medium text-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>কুরআন, সহীহ বুখারী, মুসলিম ও ক্লাসিক্যাল মুফাসসিরদের সরাসরি রেফারেন্সযুক্ত</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-emerald-200">
          <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
          <span>
            {hasActiveFilter ? (
              <span>
                ফিল্টার ফলাফল: <strong className="text-white">{filteredCount}</strong>টি বিষয় প্রদর্শিত
              </span>
            ) : (
              <span>দ্রুত অনুসন্ধান প্রস্তুত</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
