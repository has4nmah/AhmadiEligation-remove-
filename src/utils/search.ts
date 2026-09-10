import { ObjectionItem } from '../types';

/**
 * Normalizes text for better search matching in Bengali & English
 */
export function normalizeText(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[।.,;:'"?!()[\]{}—–\-_\/\\`~@#$%^&*+=|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Search objections with scoring and ranking
 */
export function searchObjections(
  items: ObjectionItem[],
  query: string,
  selectedCategory: string = 'all',
  selectedTag: string | null = null
): ObjectionItem[] {
  const normQuery = normalizeText(query);
  const queryTokens = normQuery.split(' ').filter(token => token.length > 0);

  return items
    .filter(item => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Tag filter
      if (selectedTag && !item.tags.includes(selectedTag)) {
        return false;
      }
      return true;
    })
    .map(item => {
      if (queryTokens.length === 0) {
        return { item, score: 0 };
      }

      const titleNorm = normalizeText(item.title);
      const allegNorm = normalizeText(item.allegation);
      const sumNorm = normalizeText(item.summary);
      const tagsNorm = item.tags.map(t => normalizeText(t)).join(' ');
      const pointsNorm = item.keyPoints.map(p => normalizeText(p)).join(' ');
      const detailsNorm = item.detailedAnswer.map(d => normalizeText(d)).join(' ');
      const refsNorm = item.references.map(r => normalizeText(`${r.source} ${r.translation}`)).join(' ');

      let score = 0;
      let allTokensMatch = true;

      for (const token of queryTokens) {
        let tokenFound = false;

        if (titleNorm.includes(token)) {
          score += 50;
          if (titleNorm.startsWith(token)) score += 30;
          tokenFound = true;
        }
        if (tagsNorm.includes(token)) {
          score += 35;
          tokenFound = true;
        }
        if (allegNorm.includes(token)) {
          score += 25;
          tokenFound = true;
        }
        if (sumNorm.includes(token)) {
          score += 20;
          tokenFound = true;
        }
        if (pointsNorm.includes(token)) {
          score += 15;
          tokenFound = true;
        }
        if (refsNorm.includes(token)) {
          score += 15;
          tokenFound = true;
        }
        if (detailsNorm.includes(token)) {
          score += 10;
          tokenFound = true;
        }

        if (!tokenFound) {
          allTokensMatch = false;
        }
      }

      // Exact phrase match bonus
      if (normQuery.length > 2) {
        if (titleNorm.includes(normQuery)) score += 100;
        if (allegNorm.includes(normQuery)) score += 50;
        if (sumNorm.includes(normQuery)) score += 40;
      }

      return {
        item,
        score: allTokensMatch ? score : score * 0.2 // reward items that match all terms
      };
    })
    .filter(res => queryTokens.length === 0 || res.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(res => res.item);
}

/**
 * Splits text into highlighted chunks according to query
 */
export function getHighlightedParts(text: string, query: string): { text: string; isMatch: boolean }[] {
  if (!query || !query.trim()) {
    return [{ text, isMatch: false }];
  }

  const tokens = normalizeText(query).split(' ').filter(t => t.length > 1);
  if (tokens.length === 0) {
    return [{ text, isMatch: false }];
  }

  // Create regex pattern safely
  const pattern = tokens.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const regex = new RegExp(`(${pattern})`, 'gi');
  const parts = text.split(regex);

  return parts.map(part => ({
    text: part,
    isMatch: tokens.some(tok => tok.toLowerCase() === part.toLowerCase())
  }));
}
