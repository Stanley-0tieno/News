import { fetchArticles } from "./lib/api";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimatedCounter from "./components/AnimatedCounter";
import DashboardArticleCard from "./components/DashboardArticleCard";
import { Article } from "./lib/dummy-data";

export default async function Home() {
  const articles = await fetchArticles(15);
  const topStory = articles.length > 0 ? articles[0] : null;
  const topArticles = articles.slice(1, 4);
  const remainingArticles = articles.slice(4);

  return (
    <div className="flex flex-col min-h-screen font-sans w-full">

      {/* HERO SECTION - Matching Image 1 */}
      <section className="bg-white dark:bg-[#111827] text-gray-900 dark:text-white pt-16 pb-0 relative overflow-hidden flex flex-col justify-between min-h-[500px] lg:min-h-[700px]">
        {topStory && (
          <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-8 items-center lg:items-end flex-grow pb-12">
            <div className="lg:w-7/12 pt-8 pb-8 lg:pb-16 flex flex-col justify-center h-full">
              <div className="flex gap-3 mb-8">
                <span className="bg-[#3B82F6] text-white text-[11px] font-bold px-3 py-1 uppercase tracking-widest rounded shadow-sm">Featured</span>
                <span className="bg-[#3B82F6] text-white text-[11px] font-bold px-3 py-1 uppercase tracking-widest rounded shadow-sm">
                  {typeof topStory.category === 'string' ? topStory.category : topStory.category?.name || 'News'}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1] mb-8 lg:mb-10 text-gray-900 dark:text-white">
                {topStory.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl leading-relaxed">
                {topStory.summary}
              </p>
              <Link href={`/articles/${topStory.slug}`} className="inline-flex items-center text-gray-900 dark:text-white font-bold hover:text-[#3B82F6] dark:hover:text-blue-300 transition-colors group text-lg tracking-wide">
                Read Story <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>

            <div className="lg:w-5/12 flex justify-center lg:justify-end items-end relative w-full lg:absolute lg:right-0 lg:bottom-0 h-full">
              {/* Large image simulating the featured person standing */}
              <img
                src={topStory.image_url || topStory.imageUrl}
                alt={topStory.title}
                className="max-h-[400px] lg:max-h-[85%] object-cover object-center lg:object-right rounded-t-3xl lg:rounded-none w-full lg:w-auto shadow-2xl lg:shadow-none"
              />
              {/* Overlay gradient to blend bottom edge if needed */}
              <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white dark:from-[#111827] to-transparent lg:hidden"></div>
            </div>
          </div>
        )}

        {/* Embedded small articles on top of the dark section */}
        <div className="container mx-auto px-6 lg:px-12 pb-12 relative z-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-4 pt-8 border-t border-gray-800/80">
            {topArticles.map((article: Article) => (
              <Link href={`/articles/${article.slug}`} key={article.id || article.slug} className="flex gap-4 items-center group cursor-pointer">
                <img src={article.image_url || article.imageUrl} alt={article.title} className="w-20 h-20 object-cover rounded shadow-md group-hover:shadow-lg transition-all" />
                <div className="flex-1">
                  <h4 className="text-[15px] font-bold text-gray-900 dark:text-white leading-tight line-clamp-2 group-hover:text-[#3B82F6] transition-colors duration-200 mb-2">
                    {article.title}
                  </h4>
                  <div className="flex flex-wrap gap-2 items-center text-[11px] font-bold">
                    <span className="bg-[#3B82F6] text-white px-2 py-0.5 rounded-sm uppercase tracking-wider">
                      {typeof article.category === 'string' ? article.category : article.category?.name || 'News'}
                    </span>
                    <span className="text-gray-400 font-medium tracking-wide">•
                      {new Date(article.published_date || article.publishedAt || new Date()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BLUE STRIP - Matching Image 1 */}
      <section className="bg-[#3B82F6] text-white py-12 shadow-inner">
        <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 items-center w-full md:w-auto text-center sm:text-left">
            <h2 className="text-2xl font-bold tracking-tight">Top Articles</h2>
            <div className="flex flex-wrap justify-center gap-6 text-[13px] font-bold text-blue-200 uppercase tracking-widest mt-2 sm:mt-0">
              <button className="text-white border-b-2 border-white pb-1 transition-all">This Week</button>
              <button className="hover:text-white transition-colors pb-1 border-b-2 border-transparent hover:border-blue-300">This Month</button>
              <button className="hover:text-white transition-colors pb-1 border-b-2 border-transparent hover:border-blue-300">All Time</button>
            </div>
          </div>
          <div className="w-full md:w-auto text-center md:text-right border-t border-blue-400/50 pt-6 md:border-none md:pt-0">
            <h2 className="text-2xl font-bold tracking-tight">Editor&apos;s Pick</h2>
          </div>
        </div>
      </section>

      {/* ALL OTHER STORIES GRID - Matching Image 2 */}
      <section className="py-24 px-6 lg:px-12 bg-[#F9FAFB] dark:bg-[#111827]">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12 mb-16">
            {remainingArticles.map((article: Article) => (
              <DashboardArticleCard key={article.id || article.slug} article={article} />
            ))}
          </div>

          <div className="flex justify-center border-t border-gray-200 dark:border-gray-800 pt-16">
            <button className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1F2937] hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-white py-4 px-16 rounded-xl font-bold text-[13px] uppercase tracking-widest transition-colors shadow-sm w-full max-w-3xl">
              View More
            </button>
          </div>
        </div>
      </section>

      {/* ANIMATED COUNTERS - Bottom/Middle */}
      <section className="py-24 px-6 border-y border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1F2937]">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-center mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Impact in Numbers</h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl leading-relaxed">
              A quick glance at the current reach and active subscribers of our platform. We are growing every second thanks to readers like you.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-800">
            <div className="pt-8 md:pt-0">
              <p className="text-5xl lg:text-7xl font-bold text-[#3B82F6] mb-4">
                <AnimatedCounter value={2} suffix=".4M" duration={1500} />
              </p>
              <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-sm">Total Views</p>
            </div>
            <div className="pt-8 md:pt-0">
              <p className="text-5xl lg:text-7xl font-bold text-[#3B82F6] mb-4 flex justify-center">
                <AnimatedCounter value={14209} duration={2000} />
                <span>+</span>
              </p>
              <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-sm">Active Subscribers</p>
            </div>
            <div className="pt-8 md:pt-0">
              <p className="text-5xl lg:text-7xl font-bold text-[#3B82F6] mb-4">
                <AnimatedCounter value={142} duration={2500} />
              </p>
              <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-sm">Published Articles</p>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER TEMPLATE SECTION - Matching Image 2 Bottom */}
      <section className="py-28 px-6 bg-[#F9FAFB] dark:bg-[#111827]">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">
            Publication & Newsletter Template for Figma
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Elevate your projects effortlessly with our contemporary designs and user-friendly customization. Redefine your design journey. Explore now.
          </p>

          {/* Newsletter Subscription introduced as requested */}
          <div className="bg-white dark:bg-[#1F2937] p-8 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 max-w-2xl mx-auto mb-16">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Get the latest news directly in your inbox</h3>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Email Address"
                className="px-6 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-[#F9FAFB] dark:bg-[#111827] text-gray-900 dark:text-white w-full focus:outline-none focus:ring-2 focus:ring-[#f97316]/50 transition-shadow text-[15px]"
                required
              />
              <button
                type="button"
                className="bg-[#f97316] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#ea580c] transition-colors shadow-md hover:shadow-lg w-full sm:w-auto shrink-0 whitespace-nowrap text-[15px]"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-[#f97316] text-white px-10 py-4 rounded-xl font-bold hover:bg-[#ea580c] transition-colors shadow-md w-full sm:w-auto text-[15px] tracking-wide">
              Newsletter
            </button>
            <button className="bg-white dark:bg-[#1F2937] text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-800 px-10 py-4 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm w-full sm:w-auto text-[15px] tracking-wide">
              Contact Us
            </button>
          </div>

          <div className="mt-20 flex items-center justify-center opacity-50">
            <div className="h-px bg-gray-300 dark:bg-gray-700 w-16"></div>
            <div className="mx-4 flex gap-1 text-gray-400">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
            </div>
            <div className="h-px bg-gray-300 dark:bg-gray-700 w-16"></div>
          </div>
        </div>
      </section>

    </div>
  );
}
