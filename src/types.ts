export interface ScriptureReference {
  type: 'quran' | 'hadith' | 'scholar' | 'book' | 'historicalContext';
  source: string; // e.g. "সূরা আল-আহযাব (৩৩:৪১)", "সহীহ বুখারী, কিতাবুল আম্বিয়া"
  arabicText?: string;
  translation: string;
  note?: string;
}

export interface ObjectionItem {
  id: string;
  title: string; // The allegation/objection title
  allegation: string; // Full description of what critics allege
  category: string; // Category ID
  summary: string; // Quick summary / TL;DR
  detailedAnswer: string[]; // Paragraphs of rational and scriptural answer
  keyPoints: string[]; // Bullet key rational points
  references: ScriptureReference[];
  historicalContext?: string;
  tags: string[];
  viewsCount?: number;
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  description: string;
  count?: number;
}
