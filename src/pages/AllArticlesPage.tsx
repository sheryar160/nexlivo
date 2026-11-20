import {useMemo, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {Compass, Search, X} from 'lucide-react';
import {ARTICLES, BUSINESS_CATEGORIES} from '../data/articles';
import {BusinessCategory} from '../types/article';
import {ArticleCard} from '../components/ArticleCard';
import {AdSlot} from '../components/AdSlot';
import {SeoHead} from '../components/SeoHead';

type SortOption = 'featured' | 'alphabetical' | 'readTime';

export function AllArticlesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [category, setCategory] = useState<'All' | BusinessCategory>('All');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const handleQueryChange = (value: string) => {
    setQuery(value);
    if (value.trim()) {
      setSearchParams({q: value});
    } else {
      setSearchParams({});
    }
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = ARTICLES.filter((article) => {
      const catMatch = category === 'All' || article.category === category;
      if (!catMatch) return false;
      if (!q) return true;
      return (
        article.title.toLowerCase().includes(q) ||
        article.shortDescription.toLowerCase().includes(q) ||
        article.category.toLowerCase().includes(q) ||
        article.sections.some((sec) => sec.heading.toLowerCase().includes(q))
      );
    });

    if (sortBy === 'alphabetical') {
      return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sortBy === 'readTime') {
      return [...filtered].sort(
        (a, b) => parseInt(a.readTime, 10) - parseInt(b.readTime, 10),
      );
    }
    return filtered;
  }, [query, category, sortBy]);

  return (
    <>
      <SeoHead
        title="All 14 Business Articles & Industry Guides | NEXLIVO"
        description="Browse and search all 14 NEXLIVO business guides covering real estate, e-commerce, online trading, AI, marketing, freelancing, and more."
      />

      <section className="border-b border-pink-100 bg-gradient-to-b from-pink-50/50 to-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-pink-700">
            Complete Directory
          </span>
          <h1
            className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl"
            style={{fontFamily: 'var(--font-display)'}}
          >
            All Business Articles
          </h1>
          <p className="mt-3 max-w-2xl text-base text-slate-600">
            Search and filter every industry briefing published on NEXLIVO. Each guide includes
            business mechanics, step-by-step beginner guidance, risks, required skills, and FAQs.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-12">
            <div className="relative md:col-span-8">
              <label htmlFor="directory-search" className="sr-only">
                Search all 14 business articles
              </label>
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                id="directory-search"
                type="search"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                placeholder="Search by topic, skill, or business model..."
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => handleQueryChange('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="md:col-span-4">
              <label htmlFor="article-sort" className="sr-only">
                Sort articles
              </label>
              <select
                id="article-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
              >
                <option value="featured">Sort: Editorial Order (01–14)</option>
                <option value="alphabetical">Sort: Title (A–Z)</option>
                <option value="readTime">Sort: Shortest Read First</option>
              </select>
            </div>
          </div>

          <div
            role="group"
            aria-label="Filter by business category"
            className="mt-5 flex flex-wrap items-center gap-2"
          >
            {BUSINESS_CATEGORIES.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-600 ${
                    active
                      ? 'bg-pink-700 text-white'
                      : 'border border-slate-200 bg-white text-slate-700 hover:border-pink-200 hover:bg-pink-50/60 hover:text-pink-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
            <span className="ml-auto text-xs font-medium tabular-nums text-slate-500">
              {results.length} {results.length === 1 ? 'article' : 'articles'}
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <AdSlot slotId="nexlivo-directory-top-banner" variant="leaderboard" />
      </div>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {results.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-pink-100 bg-pink-50/30 px-6 py-14 text-center">
            <Compass className="mx-auto h-8 w-8 text-pink-600" />
            <h2 className="mt-3 text-lg font-semibold text-slate-900">
              No business articles matched your search
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Clear your filters to view all 14 business guides on NEXLIVO.
            </p>
            <button
              type="button"
              onClick={() => {
                handleQueryChange('');
                setCategory('All');
              }}
              className="mt-5 inline-flex items-center justify-center rounded-lg bg-pink-700 px-4 py-2 text-xs font-semibold text-white hover:bg-pink-800"
            >
              Show All 14 Articles
            </button>
          </div>
        )}
      </section>
    </>
  );
}
