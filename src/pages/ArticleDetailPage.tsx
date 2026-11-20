import {useMemo, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Wrench,
  XCircle,
} from 'lucide-react';
import {getArticleBySlug, getRelatedArticles} from '../data/articles';
import {ArticleCard} from '../components/ArticleCard';
import {AdSlot} from '../components/AdSlot';
import {SeoHead} from '../components/SeoHead';

export function ArticleDetailPage() {
  const {slug = ''} = useParams<{slug: string}>();
  const article = getArticleBySlug(slug);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [heroImgError, setHeroImgError] = useState(false);

  const relatedArticles = useMemo(() => {
    if (!article) return [];
    return getRelatedArticles(article);
  }, [article]);

  const jsonLd = useMemo(() => {
    if (!article) return undefined;
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.seoDescription,
        image: article.image,
        publisher: {
          '@type': 'Organization',
          name: 'NEXLIVO',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: article.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ];
  }, [article]);

  if (!article) {
    return (
      <>
        <SeoHead
          title="Article Not Found | NEXLIVO"
          description="The requested business guide could not be found on NEXLIVO."
        />
        <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <h1
            className="text-3xl font-bold text-slate-900"
            style={{fontFamily: 'var(--font-display)'}}
          >
            Business Guide Not Found
          </h1>
          <p className="mt-3 text-base text-slate-600">
            The article URL you visited does not exist or may have moved. Explore all 14 business
            guides from our home directory.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl bg-pink-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-pink-800"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
            <Link
              to="/articles"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:border-pink-200 hover:bg-pink-50/50"
            >
              View All 14 Articles
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <SeoHead title={article.seoTitle} description={article.seoDescription} jsonLd={jsonLd} />

      <article className="bg-white">
        {/* Article Header */}
        <header className="border-b border-pink-100 bg-gradient-to-b from-pink-50/45 to-white py-10 sm:py-14">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <Link to="/" className="font-medium hover:text-pink-700 transition-colors">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <Link to="/articles" className="font-medium hover:text-pink-700 transition-colors">
                All Articles
              </Link>
              <span aria-hidden="true">/</span>
              <span className="font-semibold text-pink-700">{article.title}</span>
            </nav>

            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
              <span className="tabular-nums font-semibold text-pink-700">
                Guide {String(article.id).padStart(2, '0')}
              </span>
              <span aria-hidden="true">·</span>
              <span>{article.category}</span>
              <span aria-hidden="true">·</span>
              <span>{article.readTime}</span>
            </div>

            <h1
              className="mt-3 font-bold tracking-tight text-slate-900"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                lineHeight: 1.12,
              }}
            >
              {article.title}
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
              {article.shortDescription}
            </p>

            {/* Featured Image */}
            <figure className="mt-8 overflow-hidden rounded-2xl border border-pink-100 bg-pink-50/30 shadow-sm">
              {!heroImgError ? (
                <img
                  src={article.image}
                  alt={article.imageAlt}
                  referrerPolicy="no-referrer"
                  onError={() => setHeroImgError(true)}
                  className="aspect-[16/9] w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[16/9] w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-pink-50 to-white p-8 text-center">
                  <BookOpen className="h-10 w-10 text-pink-600" />
                  <span className="text-base font-semibold text-slate-800">{article.title}</span>
                </div>
              )}
              <figcaption className="border-t border-pink-100/80 bg-white px-5 py-3 text-xs italic text-slate-500">
                {article.imageCaption}
              </figcaption>
            </figure>
          </div>
        </header>

        {/* Main Body + Sidebar Layout */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Primary Reading Column */}
            <div className="space-y-12 lg:col-span-8">
              {/* Professional Introduction */}
              <section aria-labelledby="intro-heading" className="space-y-4">
                <h2 id="intro-heading" className="text-2xl font-bold tracking-tight text-slate-900">
                  Introduction & Industry Overview
                </h2>
                {article.introduction.map((para, idx) => (
                  <p
                    key={idx}
                    className={`text-base leading-relaxed text-slate-700 ${
                      idx === 0
                        ? 'first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-5xl first-letter:font-bold first-letter:leading-none first-letter:text-pink-700'
                        : ''
                    }`}
                  >
                    {para}
                  </p>
                ))}
              </section>

              {/* Detailed Core Sections */}
              {article.sections.map((section, idx) => (
                <section key={section.heading} className="space-y-4 border-t border-slate-100 pt-8">
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-base leading-relaxed text-slate-700">
                      {p}
                    </p>
                  ))}
                  {section.keyPoints && section.keyPoints.length > 0 && (
                    <div className="mt-4 rounded-xl border border-pink-100 bg-pink-50/35 p-5">
                      <h3 className="text-sm font-bold text-slate-900">Key Industry Takeaways</h3>
                      <ul className="mt-3 space-y-2">
                        {section.keyPoints.map((point) => (
                          <li key={point} className="flex items-start gap-2.5 text-sm text-slate-700">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-pink-600" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Inline RevBid Ad Placement after first detailed section */}
                  {idx === 0 && (
                    <div className="pt-4">
                      <AdSlot
                        slotId={`nexlivo-article-${article.slug}-inline`}
                        variant="article-inline"
                      />
                    </div>
                  )}
                </section>
              ))}

              {/* Optional Secondary Visual (e.g., Trading psychology visual) */}
              {article.secondaryImage && (
                <figure className="overflow-hidden rounded-2xl border border-pink-100 bg-white">
                  <img
                    src={article.secondaryImage}
                    alt={article.secondaryImageCaption ?? article.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="aspect-[16/9] w-full object-cover"
                  />
                  {article.secondaryImageCaption && (
                    <figcaption className="border-t border-pink-100 px-5 py-3 text-xs italic text-slate-500">
                      {article.secondaryImageCaption}
                    </figcaption>
                  )}
                </figure>
              )}

              {/* Step-by-Step Beginner Guidance */}
              <section
                id="beginner-steps"
                className="space-y-6 border-t border-slate-100 pt-10"
              >
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-pink-700">
                    Getting Started
                  </span>
                  <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                    Step-by-Step Beginner Guidance
                  </h2>
                </div>

                <ol className="space-y-4">
                  {article.beginnerSteps.map((step) => (
                    <li
                      key={step.stepNumber}
                      className="flex gap-4 rounded-2xl border border-slate-200/85 bg-white p-5 transition-colors hover:border-pink-200"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-pink-700 text-xs font-bold tabular-nums text-white">
                        {String(step.stepNumber).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-slate-600">
                          {step.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              {/* Advantages and Disadvantages */}
              <section
                id="pros-cons"
                className="space-y-6 border-t border-slate-100 pt-10"
              >
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  Advantages & Disadvantages
                </h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/30 p-6">
                    <h3 className="flex items-center gap-2 text-base font-bold text-slate-900">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      <span>Advantages</span>
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700">
                      {article.advantages.map((pro) => (
                        <li key={pro} className="flex items-start gap-2.5">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-rose-200/80 bg-rose-50/35 p-6">
                    <h3 className="flex items-center gap-2 text-base font-bold text-slate-900">
                      <XCircle className="h-5 w-5 text-rose-600" />
                      <span>Disadvantages & Risks</span>
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700">
                      {article.disadvantages.map((con) => (
                        <li key={con} className="flex items-start gap-2.5">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-600" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Required Skills and Resources */}
              <section
                id="skills-resources"
                className="space-y-6 border-t border-slate-100 pt-10"
              >
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  Required Skills & Essential Resources
                </h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="rounded-2xl border border-pink-100 bg-pink-50/30 p-6">
                    <h3 className="flex items-center gap-2 text-base font-bold text-slate-900">
                      <BookOpen className="h-5 w-5 text-pink-700" />
                      <span>Core Skills Needed</span>
                    </h3>
                    <ul className="mt-4 space-y-2.5 text-sm text-slate-700">
                      {article.requiredSkills.map((skill) => (
                        <li key={skill} className="flex items-start gap-2.5">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pink-600" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-slate-200/85 bg-white p-6">
                    <h3 className="flex items-center gap-2 text-base font-bold text-slate-900">
                      <Wrench className="h-5 w-5 text-pink-700" />
                      <span>Tools & Resources</span>
                    </h3>
                    <ul className="mt-4 space-y-2.5 text-sm text-slate-700">
                      {article.requiredResources.map((res) => (
                        <li key={res} className="flex items-start gap-2.5">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500" />
                          <span>{res}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Common Mistakes to Avoid */}
              <section
                id="common-mistakes"
                className="space-y-6 border-t border-slate-100 pt-10"
              >
                <div className="flex items-center gap-2.5">
                  <AlertTriangle className="h-5 w-5 text-pink-700" />
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                    Common Mistakes to Avoid
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {article.commonMistakes.map((mistake) => (
                    <div
                      key={mistake.title}
                      className="rounded-2xl border border-slate-200/85 bg-white p-5"
                    >
                      <h3 className="text-sm font-bold text-slate-900">{mistake.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        {mistake.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Frequently Asked Questions */}
              <section id="faqs" className="space-y-5 border-t border-slate-100 pt-10">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  Frequently Asked Questions
                </h2>

                <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
                  {article.faqs.map((faq, index) => {
                    const isOpen = openFaqIndex === index;
                    return (
                      <div key={faq.question}>
                        <button
                          type="button"
                          onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                          aria-expanded={isOpen}
                          className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-pink-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-pink-600"
                        >
                          <span className="text-sm font-semibold text-slate-900 sm:text-base">
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`h-4 w-4 shrink-0 text-pink-700 transition-transform duration-200 ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-5 text-sm leading-relaxed text-slate-600">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Back to Home Button */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-pink-100 pt-8">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-xl bg-pink-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-pink-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-600 focus-visible:ring-offset-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Home</span>
                </Link>
                <Link
                  to="/articles"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-pink-200 hover:bg-pink-50/50"
                >
                  Explore All 14 Business Articles
                </Link>
              </div>
            </div>

            {/* Article Sidebar */}
            <aside className="space-y-8 lg:col-span-4">
              <div className="rounded-2xl border border-pink-100 bg-pink-50/30 p-6">
                <h2 className="text-sm font-bold text-slate-900">Inside This Guide</h2>
                <ul className="mt-4 space-y-2.5 text-sm">
                  <li>
                    <a href="#intro-heading" className="text-slate-600 hover:text-pink-700">
                      01. Introduction & Overview
                    </a>
                  </li>
                  <li>
                    <a href="#beginner-steps" className="text-slate-600 hover:text-pink-700">
                      02. Step-by-Step Beginner Guide
                    </a>
                  </li>
                  <li>
                    <a href="#pros-cons" className="text-slate-600 hover:text-pink-700">
                      03. Advantages & Disadvantages
                    </a>
                  </li>
                  <li>
                    <a href="#skills-resources" className="text-slate-600 hover:text-pink-700">
                      04. Required Skills & Resources
                    </a>
                  </li>
                  <li>
                    <a href="#common-mistakes" className="text-slate-600 hover:text-pink-700">
                      05. Common Mistakes to Avoid
                    </a>
                  </li>
                  <li>
                    <a href="#faqs" className="text-slate-600 hover:text-pink-700">
                      06. Frequently Asked Questions
                    </a>
                  </li>
                </ul>
              </div>

              <AdSlot
                slotId={`nexlivo-article-${article.slug}-sidebar`}
                variant="article-sidebar"
              />

              <div className="rounded-2xl border border-slate-200/85 bg-white p-6">
                <h2 className="text-sm font-bold text-slate-900">Educational Notice</h2>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  NEXLIVO publishes independent informational guides for educational research.
                  Always consult qualified legal, tax, or financial professionals before making
                  major investments or formal corporate filings.
                </p>
                <Link
                  to="/disclaimer"
                  className="mt-3 inline-block text-xs font-semibold text-pink-700 hover:underline"
                >
                  Read Full Disclaimer
                </Link>
              </div>
            </aside>
          </div>
        </div>

        {/* Related Business Articles */}
        <section className="border-t border-pink-100 bg-pink-50/25 py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-pink-700">
                  Continue Exploring
                </span>
                <h2
                  className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
                  style={{fontFamily: 'var(--font-display)'}}
                >
                  Related Business Articles
                </h2>
              </div>
              <Link
                to="/articles"
                className="text-sm font-semibold text-pink-700 hover:underline"
              >
                View all 14 articles
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((related) => (
                <ArticleCard key={related.slug} article={related} />
              ))}
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
