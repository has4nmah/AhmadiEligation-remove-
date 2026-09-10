import React from 'react';
import { 
  Bookmark, 
  Share2, 
  Copy, 
  ArrowRight, 
  BookOpen, 
  CheckCircle,
  HelpCircle,
  Hash
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
}

export const ObjectionCard: React.FC<ObjectionCardProps> = ({
  item,
  categoryName,
  isBookmarked,
  onToggleBookmark,
  onOpenDetail,
  onCopyAnswer,
  onShareItem,
  searchQuery,
  fontSize,
  onTagClick
}) => {
  const fontClasses = {
    sm: 'text-xs sm:text-sm',
    base: 'text-sm sm:text-base',
    lg: 'text-base sm:text-lg'
  }[fontSize];

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
            <mark key={i} className="bg-amber-200 text-slate-900 rounded-xs px-0.5 font-medium">
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
    <div
      id={`objection-card-${item.id}`}
      className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
    >
      <div>
        {/* Top Meta: Category & Actions */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/70">
            <BookOpen className="w-3.5 h-3.5" />
            {categoryName}
          </span>

          <div className="flex items-center gap-1.5">
            <button
              id={`bookmark-btn-${item.id}`}
              onClick={() => onToggleBookmark(item.id)}
              className={`p-2 rounded-lg transition-colors ${
                isBookmarked
                  ? 'text-amber-600 bg-amber-50 hover:bg-amber-100'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
              }`}
              title={isBookmarked ? 'বুকমার্ক থেকে সরান' : 'বুকমার্কে সংরক্ষণ করুন'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            <button
              id={`copy-btn-${item.id}`}
              onClick={() => onCopyAnswer(item)}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              title="উত্তর ও রেফারেন্স কপি করুন"
            >
              <Copy className="w-4 h-4" />
            </button>

            <button
              id={`share-btn-${item.id}`}
              onClick={() => onShareItem(item)}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              title="লিংক কপি করুন"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Objection Question / Heading */}
        <h3
          onClick={() => onOpenDetail(item)}
          className={`font-bold text-slate-900 leading-snug cursor-pointer hover:text-emerald-700 transition-colors mb-3 font-serif ${titleFontClasses}`}
        >
          {renderHighlighted(item.title)}
        </h3>

        {/* Allegation Framing */}
        <div className="mb-3.5 bg-slate-50 border-l-4 border-slate-300 px-3.5 py-2.5 rounded-r-lg">
          <p className="text-xs text-slate-500 font-semibold mb-1 flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            উত্থাপিত অভিযোগ বা বিভ্রান্তি:
          </p>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
            "{renderHighlighted(item.allegation)}"
          </p>
        </div>

        {/* Solution Summary / TL;DR */}
        <div className="mb-4 bg-emerald-50/70 border border-emerald-100 rounded-xl p-3.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 mb-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>যৌক্তিক ও তথ্যভিত্তিক সারসংক্ষেপ:</span>
          </div>
          <p className={`text-slate-800 leading-relaxed ${fontClasses}`}>
            {renderHighlighted(item.summary)}
          </p>
        </div>

        {/* 2 Key Rational Highlights */}
        <div className="mb-4 space-y-1.5">
          {item.keyPoints.slice(0, 2).map((pt, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
              <span className="line-clamp-2">{renderHighlighted(pt)}</span>
            </div>
          ))}
        </div>

        {/* Scripture Reference Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {item.references.slice(0, 2).map((ref, i) => (
            <span
              key={i}
              className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200"
            >
              📖 {ref.source}
            </span>
          ))}
          {item.references.length > 2 && (
            <span className="text-[11px] font-medium text-emerald-700 self-center">
              +{item.references.length - 2}টি রেফারেন্স
            </span>
          )}
        </div>
      </div>

      {/* Footer: Tags & Read More Button */}
      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1">
          {item.tags.slice(0, 3).map((tag) => (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              className="inline-flex items-center text-[11px] text-slate-500 hover:text-emerald-700 font-medium px-1.5 py-0.5 rounded hover:bg-slate-100 transition-colors"
            >
              <Hash className="w-2.5 h-2.5 mr-0.5" />
              {tag}
            </button>
          ))}
        </div>

        <button
          id={`view-detail-btn-${item.id}`}
          onClick={() => onOpenDetail(item)}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-900 group transition-colors ml-auto"
        >
          <span>পূর্ণাঙ্গ দলিল ও জবাব</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
