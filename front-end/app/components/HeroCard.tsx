import Image from "next/image";
import Link from "next/link";
import { Article } from "../lib/dummy-data";
import CategoryBadge from "./CategoryBadge";
import { ArrowRight } from "lucide-react";

export default function HeroCard({ article }: { article: Article }) {
    return (
        <div className="relative w-full rounded-2xl overflow-hidden group">
            {/* Background Image Container */}
            <div className="relative h-[60vh] min-h-[400px] w-full">
                {/* We use standard img element primarily because remote images require next.config.ts setup.
            We'll use unoptimized or regular img tags for dummy placeholders to ease setup. */}
                <img
                    src={article.image_url || article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white">
                <div className="flex gap-2 mb-4">
                    <CategoryBadge category={article.category} />
                </div>

                <h1 className="text-3xl md:text-5xl font-bold mb-4 max-w-4xl leading-tight">
                    <Link href={`/articles/${article.slug}`} className="hover:underline">
                        {article.title}
                    </Link>
                </h1>

                <p className="text-gray-200 md:text-lg max-w-2xl mb-6 line-clamp-2 md:line-clamp-none">
                    {article.summary}
                </p>

                <Link
                    href={`/articles/${article.slug}`}
                    className="inline-flex items-center font-semibold text-white hover:text-[var(--brand-accent)] transition-colors group/link"
                >
                    Read Story <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
            </div>
        </div>
    );
}
