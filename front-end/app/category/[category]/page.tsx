import { fetchCategoryArticles } from "../../lib/api";
import ArticleCard from "../../components/ArticleCard";
import AdPlaceholder from "../../components/AdPlaceholder";
import { Article } from "../../lib/dummy-data";

interface CategoryPageProps {
    params: Promise<{
        category: string;
    }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { category } = await params;

    // Simulate fetching articles by category
    const categoryArticles = await fetchCategoryArticles(category);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-[var(--brand-text)] capitalize border-b border-[var(--brand-border)] pb-4">
                {category} News
            </h1>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-3/4">
                    {categoryArticles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {categoryArticles.map((article: Article) => (
                                <ArticleCard key={article.id} article={article} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-[var(--brand-muted)] text-lg">
                            No articles found in this category right now. Check back later!
                        </p>
                    )}
                </div>
                <div className="lg:w-1/4 hidden lg:block space-y-8">
                    <AdPlaceholder className="h-[300px]" />
                    <AdPlaceholder className="h-[300px]" />
                </div>
            </div>
        </div>
    );
}
