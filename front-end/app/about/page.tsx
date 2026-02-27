export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--brand-text)] mb-8 text-center">About GloTech</h1>

            <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
                <div className="md:w-1/2">
                    <img
                        src="https://placehold.co/800x600/1F2937/ffffff?text=GloTech+Team"
                        alt="GloTech Team"
                        className="rounded-2xl shadow-md w-full"
                    />
                </div>
                <div className="md:w-1/2">
                    <p className="text-lg text-[var(--brand-text)] mb-4">
                        Welcome to GloTech, your premier destination for the latest insights, breakthroughs, and trends shaping the technology landscape. We believe in providing clear, concise, and forward-thinking journalism.
                    </p>
                    <p className="text-lg text-[var(--brand-text)]">
                        Our team of expert writers and industry veterans are dedicated to uncovering the stories that matter in AI, cybersecurity, mobile innovation, and startup ecosystems.
                    </p>
                </div>
            </div>
        </div>
    );
}
