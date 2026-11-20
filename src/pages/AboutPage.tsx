import {Link} from 'react-router-dom';
import {ArrowRight, BookOpen, Globe2, Layers, ShieldCheck} from 'lucide-react';
import {SeoHead} from '../components/SeoHead';

const PRINCIPLES = [
  {
    icon: BookOpen,
    title: 'Clear, Practical Explanations',
    description:
      'Every NEXLIVO guide breaks down how an industry earns revenue, what day-to-day operations look like, and what beginners must learn before starting.',
  },
  {
    icon: Layers,
    title: 'Structured Side-by-Side Comparison',
    description:
      'By organizing all 14 business sectors around consistent sections—steps, advantages, risks, required skills, and FAQs—readers can compare models objectively.',
  },
  {
    icon: ShieldCheck,
    title: 'Balanced Risk Awareness',
    description:
      'We avoid exaggerated income claims. Each guide highlights real startup hurdles, licensing boundaries, capital constraints, and common mistakes.',
  },
  {
    icon: Globe2,
    title: 'Accessible Global Perspective',
    description:
      'Whether exploring digital services, remote freelancing, software, or physical trade, our content focuses on foundational business principles applicable worldwide.',
  },
];

export function AboutPage() {
  return (
    <>
      <SeoHead
        title="About NEXLIVO – Business Information & Entrepreneurship Platform"
        description="Learn about NEXLIVO, an educational business information platform helping readers explore entrepreneurship, digital opportunities, and modern industries."
      />

      <section className="border-b border-pink-100 bg-gradient-to-b from-pink-50/50 to-white py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-pink-700">
            About NEXLIVO
          </span>
          <h1
            className="mt-3 font-bold tracking-tight text-slate-900"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.1rem, 4vw, 3.25rem)',
              lineHeight: 1.12,
            }}
          >
            Clarity for Aspiring Founders, Builders, and Independent Thinkers
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
            NEXLIVO is an online business information platform created to help readers understand
            modern business models, entrepreneurship paths, investment fundamentals, and digital
            career opportunities through clear, organized, and realistic guides.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="space-y-4 text-base leading-relaxed text-slate-700 lg:col-span-7">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Our Mission & Editorial Purpose
            </h2>
            <p>
              Starting a venture or transitioning into an independent business sector can feel
              overwhelming when information online is scattered between overly academic textbooks
              and unrealistic promotional hype. NEXLIVO exists to provide a grounded, structured
              starting point.
            </p>
            <p>
              Across fourteen dedicated industry briefings—spanning Real Estate, E-Commerce, Online
              Trading, Business Formation, Digital Marketing, Freelancing, Artificial Intelligence,
              Graphic Design, Content Creation, Import and Export, Online Education, Business
              Consulting, Software and Apps, and Financial Services—we outline how each model works
              in practice.
            </p>
            <p>
              NEXLIVO operates strictly as an independent educational publication. We do not sell
              get-rich-quick programs, and our articles are written to encourage disciplined skill
              building, thorough local regulatory research, and sound financial judgment.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-pink-100 bg-white p-3 shadow-sm">
              <img
                src="/assets/aistudio/22__3__9b869a6a.png"
                alt="Business team reviewing strategic documents and growth charts"
                referrerPolicy="no-referrer"
                className="aspect-[4/3] w-full rounded-xl object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PRINCIPLES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-pink-100 bg-pink-50/25 p-6"
              >
                <Icon className="h-6 w-6 text-pink-700" />
                <h3 className="mt-3 text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-pink-100 bg-white p-8 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Ready to explore our guides?</h2>
            <p className="mt-1 text-sm text-slate-600">
              Browse all 14 business articles or reach out with editorial questions.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 rounded-xl bg-pink-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pink-800"
            >
              <span>Browse All 14 Articles</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:border-pink-200 hover:bg-pink-50/50"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
