import { ARTICLES, FEATURED_ARTICLE } from "../../lib/dummy-data";
import AdPlaceholder from "../../components/AdPlaceholder";
import CategoryBadge from "../../components/CategoryBadge";
import ArticleCard from "../../components/ArticleCard";
import RelatedArticles from "../../components/RelatedArticles";

interface ArticlePageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const { slug } = await params;

    // Find article in general articles or featured
    const allArticles = [...ARTICLES, FEATURED_ARTICLE];
    const article = allArticles.find((a) => a.slug === slug);

    if (!article) {
        return <div className="p-8 text-center text-xl font-semibold text-[var(--brand-text)]">Article not found</div>;
    }

    const relatedArticles = ARTICLES.filter((a) => a.category.id === article.category.id && a.id !== article.id).slice(0, 3);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-12">

                {/* Main Content */}
                <div className="lg:w-3/4">
                    <div className="mb-8">
                        <div className="flex gap-2 mb-4">
                            <CategoryBadge category={article.category} />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-[var(--brand-text)] leading-tight mb-4">
                            {article.title}
                        </h1>
                        <div className="flex items-center gap-3 text-[var(--brand-muted)] text-sm mb-8">
                            <span className="font-semibold">{article.author}</span>
                            <span>•</span>
                            <time dateTime={article.publishedAt}>
                                {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </time>
                        </div>

                        <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="w-full rounded-2xl mb-10 object-cover aspect-video"
                        />

                        <div className="prose max-w-none text-[var(--brand-text)] prose-headings:text-[var(--brand-text)] prose-a:text-[var(--brand-primary)]">
                            <p className="text-xl leading-relaxed mb-6 font-medium text-[var(--brand-muted)]">{article.summary}</p>

                            {/* Dummy Content Expansion */}
                            <p className="mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <AdPlaceholder className="my-8 h-[150px]" />
                            <p className="mb-4">
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                            <h2 className="text-2xl font-bold mt-8 mb-4">The Impact of Innovation</h2>
                            <p className="mb-4">
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                            </p>
                        </div>
                    </div>

                    {/* Related Articles */}
                    <RelatedArticles articles={relatedArticles} />
                </div>

                {/* Sidebar */}
                <aside className="lg:w-1/4 flex flex-col gap-8">
                    <AdPlaceholder className="h-[600px] sticky top-24" />
                </aside>
            </div>
        </div>
    );
}
