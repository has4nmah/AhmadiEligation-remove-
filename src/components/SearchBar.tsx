import React from 'react';
import { Search, X, Tag } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
  popularTags: string[];
  totalResults: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedTag,
  onSelectTag,
  popularTags,
  totalResults
}) => {
  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6 mb-6">
      {/* Search Input Box */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
          <Search className="w-5 h-5 text-emerald-600" />
        </div>
        <input
          id="search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="যেকোনো অভিযোগ, আপত্তি, শব্দ বা রেফারেন্স দিয়ে খুঁজুন (যেমন: খতমে নবুওয়ত, ঈসার ওফাত, জিহাদ, ব্রিটিশ...)"
          className="w-full pl-11 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm sm:text-base transition-all"
        />
        {searchQuery && (
          <button
            id="clear-search-btn"
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
            title="সার্চ মুছুন"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Suggested Quick Search Tags */}
      <div className="mt-3.5 flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-500 font-medium flex items-center gap-1">
          <Tag className="w-3.5 h-3.5 text-emerald-600" />
          জনপ্রিয় অনুসন্ধান:
        </span>
        {popularTags.map((tag) => {
          const isSelected = selectedTag === tag;
          return (
            <button
              key={tag}
              id={`tag-${tag}`}
              onClick={() => onSelectTag(isSelected ? null : tag)}
              className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
                isSelected
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200/60'
              }`}
            >
              #{tag}
              {isSelected && <X className="w-3 h-3 inline-block ml-1" />}
            </button>
          );
        })}

        {selectedTag && (
          <button
            id="reset-tag-filter"
            onClick={() => onSelectTag(null)}
            className="text-xs text-rose-600 hover:underline font-semibold ml-auto"
          >
            ট্যাগ ফিল্টার সরান
          </button>
        )}
      </div>
    </div>
  );
};
