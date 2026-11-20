import {useMemo, useState} from 'react';
import {Link} from 'react-router-dom';
import {ArrowRight, Compass, Search, X} from 'lucide-react';
import {ARTICLES, BUSINESS_CATEGORIES} from '../data/articles';
import {BusinessCategory} from '../types/article';
import {ArticleCard} from '../components/ArticleCard';
import {AdSlot} from '../components/AdSlot';
import {SeoHead} from '../components/SeoHead';

const WHY_EXPLORE_PILLARS = [
  {
    index: '01',
    title: 'Clear Business Mechanics',
    body: 'Every guide explains how revenue actually flows—unit economics, margins, licensing boundaries, and day-to-day operational realities—without hype.',
  },
  {
    index: '02',
    title: 'Step-by-Step Beginner Roadmaps',
    body: 'New founders get sequenced entry steps showing how to validate demand, test small, and build early momentum before committing heavy capital.',
  },
  {
    index: '03',
    title: 'Balanced Risks & Skill Checklists',
    body: 'Alongside upside opportunities, each industry profile outlines real drawbacks, startup requirements, and costly mistakes to avoid early.',
  },
  {
    index: '04',
    title: 'Built for Modern Entrepreneurs',
    body: 'From real estate and cross-border trade to AI automation, SaaS, and digital media, compare traditional and online ventures side by side.',
  },
];

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | BusinessCategory>('All');

  const filteredArticles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return ARTICLES.filter((article) => {
      const matchesCategory =
        selectedCategory === 'All' || article.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!query) return true;

      return (
        article.title.toLowerCase().includes(query) ||
        article.shortDescription.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        article.sections.some((section) => section.heading.toLowerCase().includes(query))
      );
    });
  }, [searchQuery, selectedCategory]);

  const scrollToOpportunities = () => {
    const el = document.getElementById('explore-opportunities');
    if (el) {
      el.scrollIntoView({behavior: 'smooth'});
    }
  };

  return (
    <>
      <SeoHead
        title="NEXLIVO – Business Opportunities & Entrepreneurship Guides"
        description="Explore 14 modern business models, online earning opportunities, startup formation, trading, and digital industries with NEXLIVO."
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-pink-100/80 bg-gradient-to-b from-pink-50/55 via-white to-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="flex flex-col justify-center lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-widest text-pink-700">
                International Business & Industry Intelligence
              </p>
              <h1
                className="mt-4 font-bold tracking-tight text-slate-900"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.25rem, 4.2vw, 3.75rem)',
                  lineHeight: 1.1,
                }}
              >
                Understand Modern Businesses Before You Build or Invest
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                NEXLIVO introduces aspiring founders, independent creators, and global learners to
                fourteen high-impact business industries—breaking down how each model works, what
                skills you need, and how beginners can start responsibly.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={scrollToOpportunities}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-pink-700 px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-pink-800 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-600 focus-visible:ring-offset-2"
                >
                  <span>Explore Business Opportunities</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center rounded-xl border border-pink-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition-colors duration-150 hover:border-pink-300 hover:bg-pink-50/50 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-600 focus-visible:ring-offset-2"
                >
                  About NEXLIVO
                </Link>
              </div>
            </div>

            {/* Hero Editorial Visual Mosaic */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="grid grid-cols-2 gap-3.5 rounded-2xl border border-pink-100 bg-white p-3.5 shadow-sm">
                <Link
                  to="/articles/business-formation"
                  className="group relative col-span-2 aspect-[16/9] overflow-hidden rounded-xl bg-slate-100"
                >
                  <img
                    src="/assets/aistudio/22__16__2a1c7379.png"
                    alt="Business partners shaking hands over a modern city skyline"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-transparent p-4">
                    <span className="text-xs font-medium text-pink-200">Featured Guide</span>
                    <p className="text-sm font-semibold text-white">
                      Business Formation & Company Strategy
                    </p>
                  </div>
                </Link>
                <Link
                  to="/articles/ai-business-opportunities"
                  className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100"
                >
                  <img
                    src="/assets/aistudio/22__9__463953ce.png"
                    alt="Artificial intelligence automation concept"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 to-transparent p-3">
                    <p className="text-xs font-semibold text-white">AI Opportunities</p>
                  </div>
                </Link>
                <Link
                  to="/articles/real-estate-business"
                  className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100"
                >
                  <img
                    src="/assets/aistudio/22__15__d67c3ea8.png"
                    alt="Modern residential real estate property"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 to-transparent p-3">
                    <p className="text-xs font-semibold text-white">Real Estate</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Grounded Platform Overview Strip */}
          <div className="mt-12 grid grid-cols-2 gap-6 border-t border-pink-100 pt-8 sm:grid-cols-4">
            <div>
              <p className="text-2xl font-bold tabular-nums text-slate-900">14</p>
              <p className="mt-1 text-xs font-medium text-slate-500">Complete Industry Guides</p>
            </div>
            <div>
              <p className="text-2xl font-bold tabular-nums text-slate-900">5</p>
              <p className="mt-1 text-xs font-medium text-slate-500">Core Business Sectors</p>
            </div>
            <div>
              <p className="text-2xl font-bold tabular-nums text-slate-900">70+</p>
              <p className="mt-1 text-xs font-medium text-slate-500">Step-by-Step Entry Actions</p>
            </div>
            <div>
              <p className="text-2xl font-bold tabular-nums text-slate-900">56</p>
              <p className="mt-1 text-xs font-medium text-slate-500">Industry FAQs Answered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top RevBid Advertising Space */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <AdSlot slotId="nexlivo-home-top-leaderboard" variant="leaderboard" />
      </div>

      {/* Short Introduction Explaining NEXLIVO */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 rounded-2xl border border-pink-100 bg-pink-50/35 p-8 lg:grid-cols-12 lg:items-center lg:p-10">
          <div className="lg:col-span-5">
            <span className="text-xs font-semibold uppercase tracking-widest text-pink-700">
              Platform Overview
            </span>
            <h2
              className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
              style={{fontFamily: 'var(--font-display)'}}
            >
              Practical Business Clarity for Every Stage
            </h2>
          </div>
          <div className="space-y-3 text-sm leading-relaxed text-slate-600 sm:text-base lg:col-span-7">
            <p>
              Choosing a business model without understanding its daily operations, capital needs,
              and common pitfalls leads to avoidable setbacks. NEXLIVO organizes essential industry
              knowledge into structured, readable briefings designed for real-world clarity.
            </p>
            <p>
              Whether you are evaluating digital entrepreneurship—such as e-commerce, freelancing,
              AI services, or SaaS—or established sectors like real estate, consulting, and
              international import-export, every guide walks you from fundamentals to practical
              next steps.
            </p>
          </div>
        </div>
      </section>

      {/* Prominent "Explore Business Opportunities" Section */}
      <section
        id="explore-opportunities"
        className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col gap-6 border-b border-slate-200 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-pink-700">
              Industry Library
            </span>
            <h2
              className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
              style={{fontFamily: 'var(--font-display)'}}
            >
              Explore Business Opportunities
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
              Browse all 14 in-depth business guides or search by topic, skill, or industry sector.
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full lg:w-80">
            <label htmlFor="home-article-search" className="sr-only">
              Search business articles
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                id="home-article-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 14 business guides..."
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-9 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Interactive Category Filter Buttons */}
        <div
          role="group"
          aria-label="Filter articles by industry category"
          className="mt-6 flex flex-wrap items-center gap-2"
        >
          {BUSINESS_CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-600 ${
                  active
                    ? 'bg-pink-700 text-white'
                    : 'border border-slate-200 bg-white text-slate-700 hover:border-pink-200 hover:bg-pink-50/60 hover:text-pink-800'
                }`}
              >
                {category}
              </button>
            );
          })}
          <span className="ml-auto text-xs font-medium tabular-nums text-slate-500">
            Showing {filteredArticles.length} of {ARTICLES.length} articles
          </span>
        </div>

        {/* 14 Business Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-pink-100 bg-pink-50/30 px-6 py-12 text-center">
            <Compass className="mx-auto h-8 w-8 text-pink-600" />
            <h3 className="mt-3 text-base font-semibold text-slate-900">
              No matching business guides found
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Try a broader keyword such as &ldquo;marketing&rdquo;, &ldquo;trading&rdquo;, or
              &ldquo;software&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-5 inline-flex items-center justify-center rounded-lg bg-pink-700 px-4 py-2 text-xs font-semibold text-white hover:bg-pink-800"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Mid-Page RevBid Advertising Space */}
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <AdSlot slotId="nexlivo-home-mid-banner" variant="in-feed" />
      </div>

      {/* Why Visitors Should Explore NEXLIVO */}
      <section className="border-y border-pink-100 bg-pink-50/25 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-pink-700">
              Editorial Standards
            </span>
            <h2
              className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
              style={{fontFamily: 'var(--font-display)'}}
            >
              Why Readers Trust & Explore NEXLIVO
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Each industry briefing is structured around practical decision-making rather than
              unrealistic promises.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {WHY_EXPLORE_PILLARS.map((pillar) => (
              <div
                key={pillar.index}
                className="rounded-2xl border border-pink-100 bg-white p-6 transition-shadow duration-200 hover:shadow-md"
              >
                <span className="text-xs font-bold tabular-nums text-pink-700">
                  {pillar.index}.
                </span>
                <h3 className="mt-2 text-lg font-bold text-slate-900">{pillar.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About NEXLIVO Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-pink-700">
              About NEXLIVO
            </span>
            <h2
              className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
              style={{fontFamily: 'var(--font-display)'}}
            >
              Built to Demystify Entrepreneurship & Global Commerce
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              <p>
                NEXLIVO was created as an accessible, structured knowledge resource for people
                evaluating career shifts, side ventures, digital skills, or new commercial
                industries. Instead of fragmented advice, we present consistent side-by-side
                breakdowns across fourteen essential sectors.
              </p>
              <p>
                From legal company formation and financial services to content creation, online
                education, and software entrepreneurship, our goal is straightforward: give every
                visitor honest, educational clarity before they commit time or capital.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-xl bg-pink-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pink-800"
              >
                <span>Read Our Story</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:border-pink-200 hover:bg-pink-50/50"
              >
                Get in Touch
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-2xl border border-pink-100 bg-white p-3 shadow-sm">
              <img
                src="/assets/aistudio/22__3__9b869a6a.png"
                alt="Team collaborating around analytics reports and laptops"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="aspect-[16/10] w-full rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom RevBid Advertising Space */}
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <AdSlot slotId="nexlivo-home-bottom-banner" variant="in-feed" />
      </div>
    </>
  );
}
