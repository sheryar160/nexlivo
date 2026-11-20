import {useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {Menu, X} from 'lucide-react';
import {BrandLogo} from './BrandLogo';

const NAV_ITEMS = [
  {to: '/', label: 'Home'},
  {to: '/articles', label: 'All Articles'},
  {to: '/about', label: 'About Us'},
  {to: '/contact', label: 'Contact Us'},
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-pink-100/90 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <Link
          to="/"
          onClick={() => setMobileOpen(false)}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-600 focus-visible:ring-offset-2 rounded-lg"
          aria-label="NEXLIVO Home"
        >
          <BrandLogo />
        </Link>

        {/* Zone 2: Clean single-line navigation links */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({isActive}) =>
                `relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-600 focus-visible:ring-offset-2 rounded ${
                  isActive
                    ? 'text-pink-700 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-pink-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/articles"
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-pink-700 px-4 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-pink-800 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-600 focus-visible:ring-offset-2"
          >
            Explore Guides
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:border-pink-200 hover:bg-pink-50 hover:text-pink-700 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-600"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-pink-100 bg-white px-4 py-4 md:hidden">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({isActive}) =>
                  `rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-pink-50 text-pink-700'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/articles"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-pink-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pink-800"
            >
              Explore Guides
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
