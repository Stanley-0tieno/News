import { fetchArticleBySlug, fetchRelatedArticles } from "../../lib/api";
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

    const article = await fetchArticleBySlug(slug);

    if (!article) {
        return <div className="p-8 text-center text-xl font-semibold text-[var(--brand-text)]">Article not found</div>;
    }

    const relatedArticles = await fetchRelatedArticles(slug);

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
                            <time dateTime={article.published_date || article.publishedAt || new Date().toISOString()}>
                                {new Date(article.published_date || article.publishedAt || new Date()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </time>
                        </div>


                        <div className="prose max-w-none text-[var(--brand-text)] prose-headings:text-[var(--brand-text)] prose-a:text-[var(--brand-primary)]">
                            <p className="text-xl leading-relaxed mb-6 font-medium text-[var(--brand-muted)]">{article.summary}</p>

                            <div
                                className="mt-8 mb-8 prose-p:mb-4 prose-p:leading-relaxed prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-a:text-[#3B82F6] hover:prose-a:underline prose-img:rounded-xl prose-img:my-6"
                                dangerouslySetInnerHTML={{ __html: article.content || '<p>No full content available for this article.</p>' }}
                            />

                            <AdPlaceholder className="my-8 h-[150px]" />
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
