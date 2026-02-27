import Link from "next/link";
import { SITE_NAME } from "../lib/dummy-data";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer footer-center p-10 bg-[var(--brand-card)] text-[var(--brand-text)] border-t border-[var(--brand-border)] mt-auto">
            <aside>
                <p className="font-bold text-lg text-[var(--brand-primary)]">
                    {SITE_NAME}
                </p>
                <p>Copyright © {currentYear} - All right reserved</p>
            </aside>
            <nav className="grid grid-flow-col gap-4">
                <Link href="/about" className="link link-hover text-[var(--brand-muted)] hover:text-[var(--brand-primary)]">About us</Link>
                <Link href="/contact" className="link link-hover text-[var(--brand-muted)] hover:text-[var(--brand-primary)]">Contact</Link>
                <Link href="#" className="link link-hover text-[var(--brand-muted)] hover:text-[var(--brand-primary)]">Privacy Policy</Link>
                <Link href="#" className="link link-hover text-[var(--brand-muted)] hover:text-[var(--brand-primary)]">Terms of Service</Link>
                <Link href="#" className="link link-hover text-[var(--brand-muted)] hover:text-[var(--brand-primary)]">Disclaimer</Link>
            </nav>
        </footer>
    );
}
