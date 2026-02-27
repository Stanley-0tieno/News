import Link from "next/link";
import { Category } from "../lib/dummy-data";

export default function CategoryBadge({ category }: { category: Category }) {
    return (
        <Link
            href={`/category/${category.slug}`}
            className="badge bg-blue-100 text-[var(--brand-primary)] border-none text-xs font-semibold px-3 py-3 hover:bg-blue-200 transition-colors"
        >
            {category.name}
        </Link>
    );
}
