import Link from "next/link";
import { Article } from "../lib/dummy-data";
import { ArrowRight, Lightbulb } from "lucide-react";

export default function DashboardArticleCard({ article }: { article: Article }) {
    return (
        <div className="bg-[var(--brand-card)] rounded-2xl p-6 border border-[var(--brand-border)] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
            <div className="overflow-hidden rounded-xl mb-6 aspect-video w-full bg-[var(--brand-bg)]">
                <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
            </div>

            <div className="flex gap-4 items-center mb-4 text-sm font-medium">
                <span className="flex items-center text-[#ea580c] bg-orange-50 dark:bg-orange-900/20 px-2 py-0.5 rounded-full">
                    <Lightbulb className="w-3.5 h-3.5 mr-1" />
                    Spotlight
                </span>
                <span className="text-[var(--brand-muted)] text-xs">
                    {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
            </div>

            <h3 className="text-xl lg:text-2xl font-bold text-[var(--brand-text)] mb-3 line-clamp-2 leading-tight">
                {article.title}
            </h3>

            <p className="text-[var(--brand-muted)] text-[15px] mb-6 line-clamp-3 leading-relaxed flex-grow">
                {article.summary}
            </p>

            <Link
                href={`/articles/${article.slug}`}
                className="text-[#ea580c] font-bold text-[15px] inline-flex items-center hover:text-[#c2410c] transition-colors group mt-auto"
            >
                Learn More <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1.5 transition-transform" />
            </Link>
        </div>
    );
}
