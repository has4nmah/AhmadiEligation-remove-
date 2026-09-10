import React from 'react';
import { Bookmark, Info, Share2, BookOpen, Sparkles, Type } from 'lucide-react';

interface HeaderProps {
  bookmarksCount: number;
  showBookmarksOnly: boolean;
  onToggleBookmarksOnly: () => void;
  onOpenAbout: () => void;
  fontSize: 'sm' | 'base' | 'lg';
  onChangeFontSize: (size: 'sm' | 'base' | 'lg') => void;
  onShareApp: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  bookmarksCount,
  showBookmarksOnly,
  onToggleBookmarksOnly,
  onOpenAbout,
  fontSize,
  onChangeFontSize,
  onShareApp
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-md shadow-emerald-900/10">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-serif">
                  আহমদীয়া জামাত: আপত্তি ও সমাধান
                </h1>
                <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <Sparkles className="w-3 h-3 mr-1" /> নির্ভরযোগ্য আর্কাইভ
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                কুরআন, হাদিস ও যুক্তিনির্ভর প্রামাণ্য জবাবের সুবিশাল তথ্যভাণ্ডার
              </p>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Font Size Selector */}
            <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
              <span className="px-2 text-xs text-slate-500 flex items-center gap-1 font-medium">
                <Type className="w-3.5 h-3.5" /> হরফ
              </span>
              <button
                id="font-size-sm"
                onClick={() => onChangeFontSize('sm')}
                className={`px-2 py-1 text-xs rounded font-medium transition-colors ${
                  fontSize === 'sm' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="ছোট ফন্ট"
              >
                ছোট
              </button>
              <button
                id="font-size-base"
                onClick={() => onChangeFontSize('base')}
                className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                  fontSize === 'base' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="স্বাভাবিক ফন্ট"
              >
                স্বাভাবিক
              </button>
              <button
                id="font-size-lg"
                onClick={() => onChangeFontSize('lg')}
                className={`px-2 py-1 text-xs rounded font-medium transition-colors ${
                  fontSize === 'lg' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="বড় ফন্ট"
              >
                বড়
              </button>
            </div>

            {/* Bookmarks Toggle */}
            <button
              id="bookmarks-toggle-btn"
              onClick={onToggleBookmarksOnly}
              className={`relative inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                showBookmarksOnly
                  ? 'bg-amber-600 text-white shadow-sm hover:bg-amber-700'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
              title="সংরক্ষিত তালিকা দেখুন"
            >
              <Bookmark className={`w-4 h-4 ${showBookmarksOnly ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">সংরক্ষিত</span>
              {bookmarksCount > 0 && (
                <span
                  className={`inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold rounded-full ${
                    showBookmarksOnly ? 'bg-white text-amber-700' : 'bg-emerald-600 text-white'
                  }`}
                >
                  {bookmarksCount}
                </span>
              )}
            </button>

            {/* Share Button */}
            <button
              id="share-app-btn"
              onClick={onShareApp}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
              title="ওয়েবসাইট লিংক কপি করুন"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* About Modal Button */}
            <button
              id="about-modal-btn"
              onClick={onOpenAbout}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
              title="তথ্যকোষ সম্পর্কে ও রেফারেন্স পদ্ধতি"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
