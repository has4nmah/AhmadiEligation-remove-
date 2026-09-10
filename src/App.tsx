import React, { useState, useMemo, useEffect } from 'react';
import { 
  OBJECTIONS_DATA, 
  CATEGORIES 
} from './data/objections';
import { ObjectionItem } from './types';
import { searchObjections } from './utils/search';
import { Header } from './components/Header';
import { StatsBar } from './components/StatsBar';
import { SearchBar } from './components/SearchBar';
import { CategoryFilter } from './components/CategoryFilter';
import { ObjectionCard } from './components/ObjectionCard';
import { ObjectionDetailModal } from './components/ObjectionDetailModal';
import { AboutModal } from './components/AboutModal';
import { Toast } from './components/Toast';
import { 
  BookOpen, 
  SearchX, 
  ArrowUp, 
  Bookmark, 
  RefreshCw,
  Sparkles,
  ExternalLink,
  MessageCircleQuestion
} from 'lucide-react';

export default function App() {
  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [activeItem, setActiveItem] = useState<ObjectionItem | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'info'>('success');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Bookmarks persistence
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ahmadiyya_archive_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Font size persistence
  useEffect(() => {
    try {
      const savedFont = localStorage.getItem('ahmadiyya_archive_font_size');
      if (savedFont && ['sm', 'base', 'lg'].includes(savedFont)) {
        setFontSize(savedFont as 'sm' | 'base' | 'lg');
      }
    } catch {
      // ignore
    }
  }, []);

  const handleFontSizeChange = (size: 'sm' | 'base' | 'lg') => {
    setFontSize(size);
    try {
      localStorage.setItem('ahmadiyya_archive_font_size', size);
    } catch {
      // ignore
    }
  };

  // Save bookmarks
  const toggleBookmark = (id: string) => {
    setBookmarks((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('ahmadiyya_archive_bookmarks', JSON.stringify(updated));
      } catch {
        // ignore
      }
      showToast(
        exists ? 'বুকমার্ক থেকে সরানো হয়েছে' : 'বুকমার্কে সফলভাবে সংরক্ষণ করা হয়েছে',
        'success'
      );
      return updated;
    });
  };

  // Toast trigger
  const showToast = (msg: string, type: 'success' | 'info' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
  };

  // Scroll listener for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle URL hash deep linking for sharing individual objections
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const found = OBJECTIONS_DATA.find((item) => item.id === hash);
        if (found) {
          setActiveItem(found);
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Popular search tags derived from data
  const popularTags = useMemo(() => {
    return [
      'খতমে নবুওয়ত',
      'ঈসা (আ.)',
      'ওফাত',
      'প্রতিশ্রুত মসীহ',
      'জিহাদ',
      'ব্রিটিশ চর',
      'মৃত্যু রহস্য',
      'সহীহ বুখারী',
      'খেলাফত',
      'সূর্যগ্রহণ'
    ];
  }, []);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: OBJECTIONS_DATA.length
    };
    for (const item of OBJECTIONS_DATA) {
      counts[item.category] = (counts[item.category] || 0) + 1;
    }
    return counts;
  }, []);

  // Category name lookup map
  const categoryNameMap = useMemo(() => {
    const map: Record<string, string> = {};
    for (const cat of CATEGORIES) {
      map[cat.id] = cat.name;
    }
    return map;
  }, []);

  // Filtered & Ranked objections
  const filteredObjections = useMemo(() => {
    let list = OBJECTIONS_DATA;

    // Filter by bookmarks if requested
    if (showBookmarksOnly) {
      list = list.filter((item) => bookmarks.includes(item.id));
    }

    // Search and filter by category / tag
    return searchObjections(list, searchQuery, selectedCategory, selectedTag);
  }, [searchQuery, selectedCategory, selectedTag, showBookmarksOnly, bookmarks]);

  // Copy Answer & References helper
  const handleCopyAnswer = (item: ObjectionItem) => {
    const text = `প্রশ্ন / আপত্তি: ${item.title}\n\nউত্থাপিত অভিযোগ:\n"${item.allegation}"\n\nযৌক্তিক ও তথ্যভিত্তিক সমাধান:\n${item.summary}\n\nপ্রধান দলিল:\n${item.references.map((r) => `- ${r.source}: ${r.translation}`).join('\n')}\n\nউৎস: আহমদীয়া জামাত: আপত্তি ও সমাধান ডিজিটাল আর্কাইভ`;

    navigator.clipboard.writeText(text);
    showToast('উত্তর ও রেফারেন্স ক্লিপবোর্ডে কপি করা হয়েছে', 'success');
  };

  // Copy custom text
  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(label, 'success');
  };

  // Share Item deep link
  const handleShareItem = (item: ObjectionItem) => {
    const url = `${window.location.origin}${window.location.pathname}#${item.id}`;
    navigator.clipboard.writeText(url);
    showToast('এই জবাবের সরাসরি লিংক কপি করা হয়েছে', 'success');
  };

  // Share App link
  const handleShareApp = () => {
    navigator.clipboard.writeText(window.location.href.split('#')[0]);
    showToast('ওয়েবসাইটের লিংক সফলভাবে কপি করা হয়েছে', 'success');
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedTag(null);
    setShowBookmarksOnly(false);
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasActiveFilters =
    Boolean(searchQuery) ||
    selectedCategory !== 'all' ||
    selectedTag !== null ||
    showBookmarksOnly;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      {/* Header */}
      <Header
        bookmarksCount={bookmarks.length}
        showBookmarksOnly={showBookmarksOnly}
        onToggleBookmarksOnly={() => setShowBookmarksOnly((prev) => !prev)}
        onOpenAbout={() => setIsAboutOpen(true)}
        fontSize={fontSize}
        onChangeFontSize={handleFontSizeChange}
        onShareApp={handleShareApp}
      />

      {/* Stats and Guarantee Banner */}
      <StatsBar
        totalCount={OBJECTIONS_DATA.length}
        categoriesCount={CATEGORIES.length}
        filteredCount={filteredObjections.length}
        hasActiveFilter={hasActiveFilters}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Bookmarks banner if active */}
        {showBookmarksOnly && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-amber-900 font-medium">
              <Bookmark className="w-5 h-5 text-amber-600 fill-current" />
              <span>আপনার সংরক্ষিত বুকমার্ক তালিকা প্রদর্শিত হচ্ছে ({filteredObjections.length}টি)</span>
            </div>
            <button
              onClick={() => setShowBookmarksOnly(false)}
              className="text-xs font-bold text-amber-800 hover:text-amber-950 underline"
            >
              সকল আপত্তিতে ফিরে যান
            </button>
          </div>
        )}

        {/* Search Bar & Instant Filter Tags */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedTag={selectedTag}
          onSelectTag={setSelectedTag}
          popularTags={popularTags}
          totalResults={filteredObjections.length}
        />

        {/* Category Filter Pills */}
        <CategoryFilter
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={(catId) => {
            setSelectedCategory(catId);
            setSelectedTag(null);
          }}
          categoryCounts={categoryCounts}
        />

        {/* Active Filter Bar if user filtered */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white p-3.5 rounded-xl border border-slate-200">
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-700">
              <span className="font-semibold text-slate-900">সক্রিয় ফিল্টার:</span>
              {searchQuery && (
                <span className="inline-flex items-center bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-200">
                  অনুসন্ধান: "{searchQuery}"
                </span>
              )}
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-200">
                  বিভাগ: {categoryNameMap[selectedCategory]}
                </span>
              )}
              {selectedTag && (
                <span className="inline-flex items-center bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-200">
                  ট্যাগ: #{selectedTag}
                </span>
              )}
            </div>

            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              সমস্ত ফিল্টার মুছুন
            </button>
          </div>
        )}

        {/* Objections Grid or Empty State */}
        {filteredObjections.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {filteredObjections.map((item) => (
              <ObjectionCard
                key={item.id}
                item={item}
                categoryName={categoryNameMap[item.category] || 'অন্যান্য'}
                isBookmarked={bookmarks.includes(item.id)}
                onToggleBookmark={toggleBookmark}
                onOpenDetail={(it) => setActiveItem(it)}
                onCopyAnswer={handleCopyAnswer}
                onShareItem={handleShareItem}
                searchQuery={searchQuery}
                fontSize={fontSize}
                onTagClick={(tag) => setSelectedTag(tag)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center max-w-xl mx-auto my-8">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <SearchX className="w-8 h-8" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 font-serif">
              কোনো তথ্য খুঁজে পাওয়া যায়নি
            </h3>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              আপনার প্রদত্ত শব্দ বা ফিল্টারের সাথে মিলে এমন কোনো আপত্তি বা জবাব পাওয়া যায়নি। বানান সঠিক আছে কি না পরীক্ষা করুন অথবা অন্য কোনো শব্দ ব্যবহার করুন।
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-semibold transition-colors shadow-xs"
            >
              <RefreshCw className="w-4 h-4" />
              সকল আপত্তি ও জবাব প্রদর্শন করুন
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center space-x-2 text-white font-bold text-base font-serif mb-1">
                <BookOpen className="w-5 h-5 text-emerald-400" />
                <span>আহমদীয়া জামাত: আপত্তি ও সমাধান</span>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm max-w-md leading-relaxed">
                পবিত্র কুরআন, সহীহ হাদিস ও যুক্তিনির্ভর তথ্যের মাধ্যমে সত্য উন্মোচন ও পারস্পরিক শ্রদ্ধা বৃদ্ধির এক উন্মুক্ত ডিজিটাল প্রয়াস।
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300">
              <button
                onClick={() => setIsAboutOpen(true)}
                className="hover:text-white transition-colors"
              >
                তথ্যকোষ সম্পর্কে
              </button>
              <button
                onClick={handleShareApp}
                className="hover:text-white transition-colors"
              >
                শেয়ার করুন
              </button>
              <span className="text-slate-600">|</span>
              <span className="text-emerald-400 font-medium">
                সবার জন্য ভালোবাসা, কারও প্রতি ঘৃণা নয়
              </span>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
            পবিত্র কুরআন ও হাদিস শরীফের বিশ্বস্ত প্রামাণ্য দলিলের ভিত্তিতে সংকলিত ও উপস্থাপিত।
          </div>
        </div>
      </footer>

      {/* Detail Modal */}
      {activeItem && (
        <ObjectionDetailModal
          item={activeItem}
          onClose={() => {
            setActiveItem(null);
            // clean url hash if any
            if (window.location.hash) {
              history.replaceState(null, '', window.location.pathname);
            }
          }}
          categoryName={categoryNameMap[activeItem.category] || 'অন্যান্য'}
          isBookmarked={bookmarks.includes(activeItem.id)}
          onToggleBookmark={toggleBookmark}
          onCopyText={handleCopyText}
          onShareItem={handleShareItem}
          fontSize={fontSize}
          onChangeFontSize={handleFontSizeChange}
        />
      )}

      {/* About & Methodology Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
        type={toastType}
      />

      {/* Scroll to top floating button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-30 p-3 bg-white text-slate-700 hover:text-emerald-700 rounded-full shadow-lg border border-slate-200 transition-all hover:scale-105"
          title="উপরে যান"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
