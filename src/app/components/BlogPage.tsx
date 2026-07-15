import { ArrowRight, Calculator, CalendarDays, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { BlogCard } from './BlogCard';

export function BlogPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 text-left"
          >
            <div className="rounded-lg bg-blue-600 p-2 text-white">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-900">GoTax Estimator</h1>
              <p className="text-xs text-slate-500">Nigeria tax guides and resources</p>
            </div>
          </button>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-blue-600 hover:text-blue-600"
            >
              <Home className="h-4 w-4" />
              Home Calculator
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="max-w-3xl">
            <p className="mb-3 inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
              Tax insights for Nigerians
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Nigeria Tax Guides & Resources
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Explore practical explanations, updates, and examples that help employees, freelancers, and business owners understand Nigerian tax obligations.
            </p>
            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-900"
            >
              Try the free calculator
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Latest articles</h3>
                <p className="text-sm text-slate-500">Simple, useful tax guides you can read in minutes.</p>
              </div>
            </div>

            <div className="grid gap-6">
              {blogPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Need a quick estimate?</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Use the calculator to estimate PAYE, CIT, VAT, and your tax position instantly.
            </p>
            <Link
              to="/"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600"
            >
              Go to homepage calculator
              <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </section>
      </main>
    </div>
  );
}
