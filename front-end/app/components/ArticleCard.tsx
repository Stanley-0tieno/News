import Link from "next/link";
import { Article } from "../lib/dummy-data";
import CategoryBadge from "./CategoryBadge";

export default function ArticleCard({ article, compact = false }: { article: Article, compact?: boolean }) {
    return (
        <div className="card bg-[var(--brand-card)] shadow-sm border border-[var(--brand-border)] overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
            {!compact && (
                <figure className="aspect-video relative overflow-hidden">
                    <img
                        src={article.image_url || article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                </figure>
            )}

            <div className="card-body p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-2 text-xs text-[var(--brand-muted)]">
                    <CategoryBadge category={article.category} />
                    <span>•</span>
                    <time dateTime={article.published_date || article.publishedAt || new Date().toISOString()}>
                        {new Date(article.published_date || article.publishedAt || new Date()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </time>
                </div>

                <h2 className={`card-title font-bold text-[var(--brand-text)] hover:text-[var(--brand-primary)] leading-tight ${compact ? 'text-lg' : 'text-xl'}`}>
                    <Link href={`/articles/${article.slug}`}>
                        {article.title}
                    </Link>
                </h2>

                {!compact && (
                    <p className="text-[var(--brand-muted)] text-sm mt-2 flex-grow line-clamp-3">
                        {article.summary}
                    </p>
                )}

                <div className="card-actions justify-start mt-4">
                    <Link
                        href={`/articles/${article.slug}`}
                        className="text-[var(--brand-primary)] font-semibold text-sm hover:underline"
                    >
                        {compact ? 'Read more →' : 'Learn More →'}
                    </Link>
                </div>
            </div>
        </div>
    );
}
