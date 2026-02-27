import { ARTICLES, FEATURED_ARTICLE } from "./lib/dummy-data";
import HeroCard from "./components/HeroCard";
import ArticleCard from "./components/ArticleCard";
import AdPlaceholder from "./components/AdPlaceholder";
import SubscribeForm from "./components/SubscribeForm";

export default function Home() {
  const latestArticles = ARTICLES.slice(0, 3);
  const otherArticles = ARTICLES.slice(3);

  return (
    <div className="container mx-auto px-4 py-8 space-y-16">

      {/* 1. Hero Section */}
      <section>
        <HeroCard article={FEATURED_ARTICLE} />
      </section>

      {/* 2. Middle Section (Latest Articles + Ad) */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-[var(--brand-text)] border-b border-[var(--brand-border)] pb-2">
          Latest Stories
        </h2>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
          <div className="lg:w-1/4 hidden lg:block">
            <AdPlaceholder className="h-full min-h-[400px]" />
          </div>
        </div>
      </section>

      {/* 3. Bottom Section (Other Articles + Ad) */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-[var(--brand-text)] border-b border-[var(--brand-border)] pb-2">
          More News
        </h2>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/4 flex flex-col gap-6">
            {otherArticles.map((article) => (
              <ArticleCard key={article.id} article={article} compact={true} />
            ))}
          </div>
          <div className="lg:w-1/4 flex flex-col gap-6">
            <AdPlaceholder className="h-[250px]" />
            <AdPlaceholder className="h-[250px]" />
          </div>
        </div>
      </section>

      {/* 4. Subscription Section */}
      <section className="py-12">
        <SubscribeForm />
      </section>

    </div>
  );
}
