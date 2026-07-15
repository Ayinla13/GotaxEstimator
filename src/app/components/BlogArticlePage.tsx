import { ArrowLeft, Calculator, CalendarDays } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';

export function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = blogPosts.find((article) => article.slug === slug);

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Article not found</h2>
          <p className="mt-3 text-sm text-slate-600">The article you are looking for does not exist yet.</p>
          <button
            onClick={() => navigate('/blog')}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <button onClick={() => navigate('/blog')} className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </button>

          <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-blue-600 hover:text-blue-600">
            <Calculator className="h-4 w-4" />
            Calculator home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              {post.publishDate}
            </span>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">{post.description}</p>

          <div className="mt-8 space-y-5 text-base leading-8 text-slate-700">
            {post.content.map((paragraph, index) => (
              <p key={`${post.slug}-${index}`}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
            <p className="text-sm font-semibold text-emerald-800">Need a quick estimate?</p>
            <p className="mt-2 text-sm text-emerald-700">
              Use the GoTax Estimator calculator to estimate PAYE and other Nigerian tax liabilities instantly.
            </p>
            <Link to="/" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-800">
              Open the calculator
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}
