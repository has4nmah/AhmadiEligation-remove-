import React from 'react';
import { 
  Layers, 
  ShieldCheck, 
  BookOpen, 
  Award, 
  Feather, 
  History, 
  HeartPulse, 
  Users, 
  Sparkles,
  LucideIcon
} from 'lucide-react';
import { Category } from '../types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  categoryCounts: Record<string, number>;
}

const ICON_MAP: Record<string, LucideIcon> = {
  Layers,
  ShieldCheck,
  BookOpen,
  Award,
  Feather,
  History,
  HeartPulse,
  Users,
  Sparkles
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  categoryCounts
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2.5">
        <h2 className="text-sm font-bold text-slate-800 tracking-wide">
          বিষয়ভিত্তিক বিভাগসমূহ
        </h2>
        {selectedCategory !== 'all' && (
          <button
            id="reset-category-btn"
            onClick={() => onSelectCategory('all')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
          >
            সবগুলো দেখুন
          </button>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-200">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const Icon = ICON_MAP[cat.iconName] || Layers;
          const count = categoryCounts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              id={`cat-btn-${cat.id}`}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all shrink-0 ${
                isSelected
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-200' : 'text-emerald-700'}`} />
              <span>{cat.name}</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[11px] font-semibold ${
                  isSelected ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
