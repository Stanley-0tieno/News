import Link from "next/link";
import { Category } from "../lib/dummy-data";

export default function CategoryBadge({ category }: { category: Category | string }) {
    const slug = typeof category === 'string' ? category : category.slug;
    const name = typeof category === 'string' ? category.charAt(0).toUpperCase() + category.slice(1) : category.name;

    return (
        <Link
            href={`/category/${slug}`}
            className="badge bg-blue-100 text-[var(--brand-primary)] border-none text-xs font-semibold px-3 py-3 hover:bg-blue-200 transition-colors"
        >
            {name}
        </Link>
    );
}
