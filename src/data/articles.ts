import {ARTICLES_PART_1} from './articlesPart1';
import {ARTICLES_PART_2} from './articlesPart2';
import {BusinessArticle, BusinessCategory} from '../types/article';

export const ARTICLES: BusinessArticle[] = [...ARTICLES_PART_1, ...ARTICLES_PART_2];

export const BUSINESS_CATEGORIES: ('All' | BusinessCategory)[] = [
  'All',
  'Digital & Technology',
  'Marketing & Media',
  'Real Estate & Trade',
  'Finance & Markets',
  'Advisory & Formation',
];

export function getArticleBySlug(slug: string): BusinessArticle | undefined {
  return ARTICLES.find((article) => article.slug === slug);
}

export function getRelatedArticles(article: BusinessArticle): BusinessArticle[] {
  return article.relatedSlugs
    .map((slug) => ARTICLES.find((item) => item.slug === slug))
    .filter((item): item is BusinessArticle => Boolean(item));
}
