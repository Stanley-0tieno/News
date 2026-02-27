import ArticleCard from "./ArticleCard";
import { Article } from "../lib/dummy-data";

interface RelatedArticlesProps {
    articles: Article[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
    if (!articles || articles.length === 0) return null;

    return (
        <div className="mt-16 border-t border-[var(--brand-border)] pt-8">
            <h3 className="text-2xl font-bold mb-6 text-[var(--brand-text)]">Related Read</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>
        </div>
    );
}
