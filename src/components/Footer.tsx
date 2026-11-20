import {Link} from 'react-router-dom';
import {ARTICLES} from '../data/articles';
import {BrandLogo} from './BrandLogo';

export function Footer() {
  const featuredGuides = ARTICLES.slice(0, 6);
  const moreGuides = ARTICLES.slice(6, 12);

  return (
    <footer className="border-t border-pink-100 bg-slate-50/70 text-slate-600">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" aria-label="NEXLIVO Home" className="inline-block">
              <BrandLogo />
            </Link>
            <p className="text-sm leading-relaxed text-slate-600">
              NEXLIVO is an international business information platform dedicated to explaining
              modern industries, entrepreneurship models, investments, and practical skills clearly
              for aspiring founders and independent operators.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900">Platform</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link to="/" className="transition-colors hover:text-pink-700">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/articles" className="transition-colors hover:text-pink-700">
                  All 14 Business Articles
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition-colors hover:text-pink-700">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-pink-700">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900">Featured Industries</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {featuredGuides.map((article) => (
                <li key={article.slug}>
                  <Link
                    to={`/articles/${article.slug}`}
                    className="transition-colors hover:text-pink-700"
                  >
                    {article.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900">More Guides & Legal</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {moreGuides.slice(0, 2).map((article) => (
                <li key={article.slug}>
                  <Link
                    to={`/articles/${article.slug}`}
                    className="transition-colors hover:text-pink-700"
                  >
                    {article.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/privacy-policy" className="transition-colors hover:text-pink-700">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="transition-colors hover:text-pink-700">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="transition-colors hover:text-pink-700">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="transition-colors hover:text-pink-700">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-pink-100/90 pt-8 text-xs text-slate-500 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} NEXLIVO. Educational Business Information Platform.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link to="/privacy-policy" className="hover:text-pink-700 transition-colors">
              Privacy
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-pink-700 transition-colors">
              Terms
            </Link>
            <Link to="/disclaimer" className="hover:text-pink-700 transition-colors">
              Disclaimer
            </Link>
            <Link to="/cookie-policy" className="hover:text-pink-700 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
