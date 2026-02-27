const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function fetchArticles(limit: number = 10) {
    try {
        const res = await fetch(`${API_URL}/articles?limit=${limit}`, { cache: "no-store" });
        if (!res.ok) return [];
        return await res.json();
    } catch (e) {
        console.error("Failed to fetch articles:", e);
        return [];
    }
}

export async function fetchArticleBySlug(slug: string) {
    try {
        const res = await fetch(`${API_URL}/articles/${slug}`, { cache: "no-store" });
        if (!res.ok) return null;
        return await res.json();
    } catch (e) {
        console.error(`Failed to fetch article ${slug}:`, e);
        return null;
    }
}

export async function fetchRelatedArticles(slug: string) {
    try {
        const res = await fetch(`${API_URL}/articles/${slug}/related`, { cache: "no-store" });
        if (!res.ok) return [];
        return await res.json();
    } catch (e) {
        console.error(`Failed to fetch related articles for ${slug}:`, e);
        return [];
    }
}

export async function fetchCategoryArticles(category: string, limit: number = 10) {
    try {
        const res = await fetch(`${API_URL}/categories/${category}/articles?limit=${limit}`, { cache: "no-store" });
        if (!res.ok) return [];
        return await res.json();
    } catch (e) {
        console.error(`Failed to fetch category articles for ${category}:`, e);
        return [];
    }
}
