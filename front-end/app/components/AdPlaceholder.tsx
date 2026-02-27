export default function AdPlaceholder({ className = "" }: { className?: string }) {
    return (
        <div
            className={`min-h-[250px] w-full border border-dashed border-[var(--brand-border)] bg-[var(--brand-card)] flex flex-col items-center justify-center text-[var(--brand-muted)] rounded-lg ${className}`}
        >
            <span className="uppercase text-sm font-semibold tracking-widest">Ad Space</span>
            <span className="text-xs mt-1 opacity-70">Placeholder</span>
        </div>
    );
}
