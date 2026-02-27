export const SITE_NAME = "GloTech";

export type Category = {
    id: string;
    name: string;
    slug: string;
};

export type Article = {
    id: string | number;
    title: string;
    summary: string;
    content: string;
    imageUrl?: string;
    image_url?: string;
    category: Category | string;
    publishedAt?: string;
    published_date?: string;
    slug: string;
    author: string;
};

export const CATEGORIES: Category[] = [
    { id: "1", name: "AI", slug: "ai" },
    { id: "2", name: "Cybersecurity", slug: "cybersecurity" },
    { id: "3", name: "Gadgets", slug: "gadgets" },
    { id: "4", name: "Mobile", slug: "mobile" },
    { id: "5", name: "Startups", slug: "startups" },
];

export const FEATURED_ARTICLE: Article = {
    id: "featured-1",
    title: "Apple releases the fastest, leanest iPhone ever in history",
    summary:
        "This spring, the crown prince of Silicon Valley meets the biggest changes yet. Tim Cook unveils the new direction for mobile design.",
    content: "Full content of the article goes here...",
    imageUrl: "https://placehold.co/1200x600/2563EB/ffffff?text=Tim+Cook+Keynote",
    category: CATEGORIES.find((c) => c.slug === "mobile") || CATEGORIES[3],
    publishedAt: "2026-02-27T08:00:00Z",
    slug: "apple-releases-fastest-leanest-iphone",
    author: "Michael Kent",
};

export const ARTICLES: Article[] = [
    {
        id: "a1",
        title: "How to create a cohesive omnichannel experience in the buying process",
        summary:
            "The term 'omnichannel' has long surpassed its initial buzzword status to become a cornerstone of modern retail strategy...",
        content: "Full content here...",
        imageUrl: "https://placehold.co/600x400/10B981/ffffff?text=Omnichannel",
        category: CATEGORIES.find((c) => c.slug === "startups") || CATEGORIES[4],
        publishedAt: "2026-01-24T10:00:00Z",
        slug: "cohesive-omnichannel-experience",
        author: "Sarah Jenkins",
    },
    {
        id: "a2",
        title: "The power and business value of visual communication",
        summary:
            "In this micro-blog, we'll uncover the various ways AI is making its presence felt, transforming mundane tasks into streamlined processes.",
        content: "Full content here...",
        imageUrl: "https://placehold.co/600x400/2563EB/ffffff?text=Visual+Communication",
        category: CATEGORIES.find((c) => c.slug === "ai") || CATEGORIES[0],
        publishedAt: "2026-01-24T12:00:00Z",
        slug: "power-business-value-visual-communication",
        author: "David Lee",
    },
    {
        id: "a3",
        title: "The Rise of AI in Everyday Life: Transforming the Norm",
        summary:
            "Ever noticed how your morning routine has subtly changed over the years? From your smart speaker to algorithm-driven news...",
        content: "Full content here...",
        imageUrl: "https://placehold.co/600x400/6B7280/ffffff?text=AI+Everyday",
        category: CATEGORIES.find((c) => c.slug === "ai") || CATEGORIES[0],
        publishedAt: "2026-01-24T14:00:00Z",
        slug: "rise-of-ai-in-everyday-life",
        author: "Emma Stone",
    },
    {
        id: "a4",
        title: "The Future of Work: Navigating the Remote Revolution",
        summary:
            "The concept of 'going to work' has dramatically changed. With a laptop and a stable internet connection, the world is your office.",
        content: "Full content here...",
        imageUrl: "https://placehold.co/600x400/F59E0B/ffffff?text=Remote+Revolution",
        category: CATEGORIES.find((c) => c.slug === "startups") || CATEGORIES[4],
        publishedAt: "2026-01-24T16:00:00Z",
        slug: "future-of-work-remote-revolution",
        author: "Chris Evans",
    },
    {
        id: "a5",
        title: "Demystifying Blockchain: Beyond Cryptocurrency",
        summary:
            "Blockchain is often synonymously mentioned with Bitcoin, but its potential stretches far beyond digital currencies.",
        content: "Full content here...",
        imageUrl: "https://placehold.co/600x400/8B5CF6/ffffff?text=Blockchain",
        category: CATEGORIES.find((c) => c.slug === "cybersecurity") || CATEGORIES[1],
        publishedAt: "2026-01-24T18:00:00Z",
        slug: "demystifying-blockchain",
        author: "Anna Kendrick",
    },
];
