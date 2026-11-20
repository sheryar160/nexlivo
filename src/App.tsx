import {useEffect} from 'react';
import {BrowserRouter, Route, Routes, useLocation, Link} from 'react-router-dom';
import {ArrowLeft} from 'lucide-react';
import {Header} from './components/Header';
import {Footer} from './components/Footer';
import {HomePage} from './pages/HomePage';
import {AllArticlesPage} from './pages/AllArticlesPage';
import {ArticleDetailPage} from './pages/ArticleDetailPage';
import {AboutPage} from './pages/AboutPage';
import {ContactPage} from './pages/ContactPage';
import {
  CookiePolicyPage,
  DisclaimerPage,
  PrivacyPolicyPage,
  TermsPage,
} from './pages/LegalPages';

function ScrollToTop() {
  const {pathname} = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function NotFoundPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-pink-700">404</p>
      <h1
        className="mt-2 text-3xl font-bold text-slate-900"
        style={{fontFamily: 'var(--font-display)'}}
      >
        Page Not Found
      </h1>
      <p className="mt-3 text-base text-slate-600">
        The page you requested could not be located. Return home or browse our 14 business guides.
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
          All Articles
        </Link>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-white text-slate-800">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/articles" element={<AllArticlesPage />} />
            <Route path="/articles/:slug" element={<ArticleDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-and-conditions" element={<TermsPage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
            <Route path="/cookie-policy" element={<CookiePolicyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
