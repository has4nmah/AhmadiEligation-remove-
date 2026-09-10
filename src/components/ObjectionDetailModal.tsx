import React, { useEffect, useRef } from 'react';
import { 
  X, 
  Bookmark, 
  Copy, 
  Share2, 
  BookOpen, 
  CheckCircle2, 
  Printer, 
  Type, 
  HelpCircle,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { ObjectionItem } from '../types';

interface ObjectionDetailModalProps {
  item: ObjectionItem | null;
  onClose: () => void;
  categoryName: string;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onCopyText: (text: string, label: string) => void;
  onShareItem: (item: ObjectionItem) => void;
  fontSize: 'sm' | 'base' | 'lg';
  onChangeFontSize: (size: 'sm' | 'base' | 'lg') => void;
}

export const ObjectionDetailModal: React.FC<ObjectionDetailModalProps> = ({
  item,
  onClose,
  categoryName,
  isBookmarked,
  onToggleBookmark,
  onCopyText,
  onShareItem,
  fontSize,
  onChangeFontSize
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const fontClasses = {
    sm: 'text-sm leading-relaxed',
    base: 'text-base leading-relaxed',
    lg: 'text-lg leading-loose'
  }[fontSize];

  const handleCopyAll = () => {
    const refsText = item.references
      .map(
        (r, i) =>
          `[${i + 1}] ${r.source}\n${r.arabicText ? `${r.arabicText}\n` : ''}অনুবাদ: ${r.translation}`
      )
      .join('\n\n');

    const fullContent = `প্রশ্ন / আপত্তি: ${item.title}\n\nউত্থাপিত অভিযোগ:\n"${item.allegation}"\n\nযৌক্তিক ও তথ্যভিত্তিক সমাধান:\n${item.summary}\n\nবিস্তারিত জবাব:\n${item.detailedAnswer.join('\n\n')}\n\nরেফারেন্সসমূহ:\n${refsText}\n\nউৎস: আহমদীয়া জামাত: আপত্তি ও সমাধান ডিজিটাল আর্কাইভ`;

    onCopyText(fullContent, 'সম্পূর্ণ জবাব ও দলিলসমূহ কপি করা হয়েছে');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        ref={modalRef}
        id="objection-detail-modal-container"
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              <BookOpen className="w-3.5 h-3.5" />
              {categoryName}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Font size control */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
              <button
                onClick={() => onChangeFontSize('sm')}
                className={`px-2 py-1 rounded ${fontSize === 'sm' ? 'bg-white text-emerald-700 font-bold shadow-xs' : 'text-slate-600'}`}
              >
                A-
              </button>
              <button
                onClick={() => onChangeFontSize('base')}
                className={`px-2 py-1 rounded ${fontSize === 'base' ? 'bg-white text-emerald-700 font-bold shadow-xs' : 'text-slate-600'}`}
              >
                A
              </button>
              <button
                onClick={() => onChangeFontSize('lg')}
                className={`px-2 py-1 rounded ${fontSize === 'lg' ? 'bg-white text-emerald-700 font-bold shadow-xs' : 'text-slate-600'}`}
              >
                A+
              </button>
            </div>

            {/* Bookmark */}
            <button
              id="modal-bookmark-btn"
              onClick={() => onToggleBookmark(item.id)}
              className={`p-2 rounded-lg border border-slate-200 transition-colors ${
                isBookmarked
                  ? 'bg-amber-50 text-amber-600 border-amber-200'
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
              title={isBookmarked ? 'বুকমার্ক থেকে মুছুন' : 'বুকমার্ক করুন'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            {/* Copy full answer */}
            <button
              id="modal-copy-btn"
              onClick={handleCopyAll}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
              title="সম্পূর্ণ লেখা কপি করুন"
            >
              <Copy className="w-4 h-4" />
            </button>

            {/* Share */}
            <button
              id="modal-share-btn"
              onClick={() => onShareItem(item)}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
              title="লিংক শেয়ার করুন"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Print */}
            <button
              id="modal-print-btn"
              onClick={handlePrint}
              className="hidden sm:inline-flex p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
              title="প্রিন্ট করুন"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Close */}
            <button
              id="modal-close-btn"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors ml-2"
              title="বন্ধ করুন (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Main Title */}
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 font-serif leading-snug">
              {item.title}
            </h2>
          </div>

          {/* Allegation Box */}
          <div className="bg-amber-50/70 border-l-4 border-amber-500 p-4 rounded-r-xl">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1.5 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              উত্থাপিত অভিযোগ বা বিভ্রান্তি
            </h4>
            <p className="text-slate-800 text-sm sm:text-base leading-relaxed italic">
              "{item.allegation}"
            </p>
          </div>

          {/* Quick Summary / Solution TL;DR */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-950 mb-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              <span>যৌক্তিক ও তথ্যভিত্তিক সমাধান (সারসংক্ষেপ)</span>
            </div>
            <p className={`text-slate-800 font-medium ${fontClasses}`}>
              {item.summary}
            </p>
          </div>

          {/* Key Rational Points */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              মৌলিক যুক্তি ও তথ্যবিন্দুসমূহ:
            </h4>
            <div className="grid grid-cols-1 gap-2.5">
              {item.keyPoints.map((pt, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80"
                >
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-slate-800 text-sm sm:text-base leading-relaxed">{pt}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Scholarly Answer */}
          <div className="space-y-4 pt-2">
            <h4 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2">
              বিশদ প্রামাণিক বিশ্লেষণ ও পর্যালোচনা
            </h4>
            <div className={`space-y-4 text-slate-800 ${fontClasses}`}>
              {item.detailedAnswer.map((para, i) => (
                <p key={i} className="text-justify leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Authentic References (Quran, Hadith, Books) */}
          <div className="pt-4 border-t border-slate-200">
            <h4 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-700" />
              প্রামাণ্য দলিল ও সূত্রসমূহ (কুরআন, হাদিস ও রূহানী খাযায়েন উদ্ধৃতি)
            </h4>

            <div className="space-y-3.5">
              {item.references.map((ref, idx) => (
                <div
                  key={idx}
                  className={`border rounded-xl p-4 sm:p-5 relative ${
                    ref.type === 'book'
                      ? 'bg-amber-50/40 border-amber-200'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold border ${
                        ref.type === 'book'
                          ? 'bg-amber-100 text-amber-950 border-amber-300'
                          : 'bg-white text-emerald-800 border-emerald-200'
                      }`}
                    >
                      {ref.type === 'book' ? '📖 মির্যা সাহেবের মূল গ্রন্থ: ' : `দলিল ${idx + 1}: `}
                      {ref.source}
                    </span>
                    <button
                      onClick={() =>
                        onCopyText(
                          `${ref.source}\n${ref.arabicText ? `${ref.arabicText}\n` : ''}অনুবাদ: ${ref.translation}`,
                          'রেফারেন্স কপি করা হয়েছে'
                        )
                      }
                      className="text-xs text-slate-500 hover:text-emerald-700 flex items-center gap-1 font-medium transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" /> কপি
                    </button>
                  </div>

                  {ref.arabicText && (
                    <div className="my-2.5 p-3.5 bg-white rounded-lg border border-slate-200/80 font-arabic text-lg sm:text-xl text-slate-900 text-right leading-loose dir-rtl">
                      {ref.arabicText}
                    </div>
                  )}

                  <div className="text-slate-800 text-sm sm:text-base leading-relaxed">
                    <strong className="text-slate-900 font-semibold">
                      {ref.type === 'book' ? 'মূল বাণী / যুক্তি: ' : 'অনুবাদ: '}
                    </strong>
                    {ref.translation}
                  </div>

                  {ref.note && (
                    <div className="mt-2 text-xs text-slate-500 italic bg-amber-50/50 p-2 rounded">
                      টীকা: {ref.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">সংশ্লিষ্ট ট্যাগ:</span>
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            সত্যসন্ধানীদের জন্য নিরপেক্ষ ও জ্ঞানভিত্তিক তথ্যভাণ্ডার
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyAll}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Copy className="w-4 h-4" />
              <span>সম্পূর্ণ জবাব কপি করুন</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs sm:text-sm font-medium transition-colors"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
