import React from 'react';
import { 
  Bookmark, 
  Share2, 
  ArrowRight, 
  BookOpen, 
  FileText,
  ChevronRight
} from 'lucide-react';
import { ObjectionItem } from '../types';
import { getHighlightedParts } from '../utils/search';

interface ObjectionCardProps {
  item: ObjectionItem;
  categoryName: string;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onOpenDetail: (item: ObjectionItem) => void;
  onCopyAnswer: (item: ObjectionItem) => void;
  onShareItem: (item: ObjectionItem) => void;
  searchQuery: string;
  fontSize: 'sm' | 'base' | 'lg';
  onTagClick: (tag: string) => void;
  index: number;
}

export const ObjectionCard: React.FC<ObjectionCardProps> = ({
  item,
  categoryName,
  isBookmarked,
  onToggleBookmark,
  onOpenDetail,
  onShareItem,
  searchQuery,
  fontSize,
  index
}) => {
  const titleFontClasses = {
    sm: 'text-base sm:text-lg',
    base: 'text-lg sm:text-xl',
    lg: 'text-xl sm:text-2xl'
  }[fontSize];

  const renderHighlighted = (text: string) => {
    const parts = getHighlightedParts(text, searchQuery);
    return (
      <>
        {parts.map((part, i) =>
          part.isMatch ? (
            <mark key={i} className="bg-amber-200 text-slate-900 rounded-xs px-1 font-semibold">
              {part.text}
            </mark>
          ) : (
            <React.Fragment key={i}>{part.text}</React.Fragment>
          )
        )}
      </>
    );
  };

  return (
    <article
      id={`objection-item-${item.id}`}
      itemScope
      itemType="https://schema.org/Question"
      onClick={() => onOpenDetail(item)}
      className="group relative bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-emerald-500/60 transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Category Badge & Meta */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
              {index + 1}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/70">
              <BookOpen className="w-3 h-3" />
              {categoryName}
            </span>
          </div>

          <div
            className="flex items-center gap-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              id={`bookmark-btn-${item.id}`}
              onClick={() => onToggleBookmark(item.id)}
              className={`p-1.5 rounded-lg transition-colors ${
                isBookmarked
                  ? 'text-amber-600 bg-amber-50 hover:bg-amber-100'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
              }`}
              title={isBookmarked ? 'বুকমার্ক থেকে সরান' : 'বুকমার্কে সংরক্ষণ করুন'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            <button
              id={`share-btn-${item.id}`}
              onClick={() => onShareItem(item)}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              title="লিংক কপি করুন"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Title (শিরোনাম) */}
        <h3
          itemProp="name"
          className={`font-bold text-slate-900 group-hover:text-emerald-800 transition-colors font-serif leading-snug tracking-tight mb-2 ${titleFontClasses}`}
        >
          {renderHighlighted(item.title)}
        </h3>
      </div>

      {/* Footer Call-To-Action: Click to view details */}
      <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-md text-slate-600 font-medium">
            <FileText className="w-3.5 h-3.5 text-emerald-600" />
            {item.references.length}টি প্রামাণ্য দলিল
          </span>
          {item.references.some((r) => r.type === 'book') && (
            <span className="hidden sm:inline-block text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              রূহানী খাযায়েন উদ্ধৃতি
            </span>
          )}
        </div>

        <div className="inline-flex items-center gap-1.5 font-semibold text-emerald-700 group-hover:text-emerald-900 transition-colors">
          <span>বিস্তারিত ও যুক্তি দেখুন</span>
          <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </article>
  );
};
