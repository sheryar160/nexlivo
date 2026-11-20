import {useState} from 'react';
import {Link} from 'react-router-dom';
import {ArrowRight, Briefcase} from 'lucide-react';
import {BusinessArticle} from '../types/article';

interface ArticleCardProps {
  article: BusinessArticle;
}

export function ArticleCard({article}: ArticleCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/85 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-pink-200 hover:shadow-[0_14px_34px_-12px_rgba(190,24,93,0.16)]">
      <Link
        to={`/articles/${article.slug}`}
        className="relative block aspect-[16/10] w-full overflow-hidden bg-pink-50/40"
        tabIndex={-1}
      >
        {!imgError ? (
          <img
            src={article.image}
            alt={article.imageAlt}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-pink-50 via-white to-rose-100 p-6 text-center">
            <Briefcase className="h-8 w-8 text-pink-600" />
            <span className="text-sm font-semibold text-slate-800">{article.title}</span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <span className="tabular-nums text-pink-700">
            {String(article.id).padStart(2, '0')}
          </span>
          <span aria-hidden="true">·</span>
          <span>{article.category}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readTime}</span>
        </div>

        <h3 className="mt-2.5 text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-pink-700">
          <Link to={`/articles/${article.slug}`} className="focus-visible:outline-none">
            {article.title}
          </Link>
        </h3>

        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-600">
          {article.shortDescription}
        </p>

        <div className="mt-5 pt-4 border-t border-slate-100">
          <Link
            to={`/articles/${article.slug}`}
            className="inline-flex items-center gap-2 rounded-lg bg-pink-700 px-4 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:bg-pink-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-600 focus-visible:ring-offset-2"
          >
            <span>Read More</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
