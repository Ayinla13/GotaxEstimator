import { ArrowRight, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { BlogPost } from '../data/blogPosts';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
          {post.category}
        </span>
        <span className="flex items-center gap-1">
          <CalendarDays className="h-4 w-4" />
          {post.publishDate}
        </span>
      </div>

      <h3 className="mb-3 text-xl font-semibold text-slate-900">{post.title}</h3>
      <p className="mb-5 text-sm leading-6 text-slate-600">{post.description}</p>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-blue-600">Read article</span>
        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
        >
          View
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
