import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { SITE_NAME, CATEGORIES } from "../lib/dummy-data";
import { Menu } from "lucide-react";

export default function Navbar() {
    return (
        <div className="navbar bg-[var(--brand-card)] text-[var(--brand-text)] border-b border-[var(--brand-border)] sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <Menu className="h-5 w-5" />
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[var(--brand-card)] rounded-box w-52"
                    >
                        {CATEGORIES.map((category) => (
                            <li key={category.id}>
                                <Link href={`/category/${category.slug}`}>{category.name}</Link>
                            </li>
                        ))}
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                    </ul>
                </div>
                <Link href="/" className="btn btn-ghost text-xl font-bold text-[var(--brand-primary)]">
                    {SITE_NAME}
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {CATEGORIES.map((category) => (
                        <li key={category.id}>
                            <Link href={`/category/${category.slug}`} className="hover:text-[var(--brand-primary)] font-medium">
                                {category.name}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <Link href="/" className="hover:text-[var(--brand-primary)] font-medium">
                            Home
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-end gap-2">
                <ThemeToggle />
                <Link href="/subscribe" className="btn bg-[var(--brand-primary)] text-white hover:bg-blue-700 border-none hidden sm:flex">
                    Subscribe
                </Link>
            </div>
        </div>
    );
}
