import React from 'react';
import { X, BookOpen, ShieldCheck, Heart, ExternalLink, CheckCircle } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-serif">
              তথ্যকোষ সম্পর্কে ও গবেষণা পদ্ধতি
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7 space-y-5 text-sm sm:text-base text-slate-700 leading-relaxed max-h-[75vh] overflow-y-auto">
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
            <p className="font-semibold text-emerald-900 mb-1">
              "সত্য সমাগত, মিথ্যা অপসৃত; নিশ্চয় মিথ্যা অপসৃত হওয়ারই ছিল।" — (সূরা বনী ইসরাঈল ১৭:৮২)
            </p>
            <p className="text-xs sm:text-sm text-emerald-800">
              উদ্দেশ্য: আহমদীয়া মুসলিম জামাত সম্পর্কে সমাজে প্রচলিত ভুল ধারণা, অপপ্রচার ও ভিত্তিহীন অভিযোগসমূহের কুরআন, হাদিস, ইতিহাস ও যুক্তিনির্ভর সমাধান সবার সামনে সহজভাবে তুলে ধরা।
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              প্রামাণিক তথ্যসূত্র ও দলিলসমূহ
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 pl-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>পবিত্র কুরআনুল কারীম:</strong> বিশ্বস্ত তাফসীর ও শাব্দিক আরবি বিশ্লেষণের আলোকে।</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>সিহাহ সিত্তাহ সহীহ হাদিস গ্রন্থাবলি:</strong> সহীহ বুখারী, সহীহ মুসলিম, সুনানে আবু দাউদ, তিরমিযী, ইবনে মাজা ও মুসনাদে আহমদ।</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>ক্লাসিক্যাল মুফাসসির ও সালাফে সালেহীন:</strong> শাইখুল আকবর ইবনে আরাবী, মোল্লা আলী ক্বারী, ইমাম রাগিব ইস্পাহানী, শাহ ওয়ালীউল্লাহ দেহলভী প্রমুখের গ্রন্থ।</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>মূল রচনার অবিকৃত রেফারেন্স:</strong> প্রতিষ্ঠাতা হযরত মির্যা গোলাম আহমদ (আ.)-এর মূল গ্রন্থাবলি (রূহানী খাযায়েন) এবং ঐতিহাসিক নথি।</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-600" />
              আমাদের মূলনীতি
            </h4>
            <p className="text-sm text-slate-600">
              জামাতে আহমদীয়ার মূল শিক্ষা হলো <strong>"সবার জন্য ভালোবাসা, কারও প্রতি ঘৃণা নয়"</strong> (Love for All, Hatred for None)। আমরা বিশ্বাস করি সুস্থ বিতর্ক ও আন্তরিক আলোচনার মাধ্যমে ভ্রাতৃত্ববোধ ও পারস্পরিক শ্রদ্ধা বৃদ্ধি পায়। কোনো বিদ্বেষ বা বিশৃঙ্খলা নয়, বরং সত্য ও প্রজ্ঞার আলো ছড়ানোই আমাদের ব্রত।
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-semibold transition-colors"
          >
            ধন্যবাদ
          </button>
        </div>
      </div>
    </div>
  );
};
