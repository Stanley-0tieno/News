"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function SubscribeForm() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "success">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            try {
                const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
                const res = await fetch(`${API_URL}/subscriptions/subscribe`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                });
                if (res.ok) {
                    setStatus("success");
                    setTimeout(() => setStatus("idle"), 3000);
                    setEmail("");
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className="bg-[var(--brand-card)] p-8 rounded-2xl shadow-sm border border-[var(--brand-border)] text-center w-full max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-[var(--brand-text)] mb-2">
                Stay Updated with GloTech
            </h3>
            <p className="text-[var(--brand-muted)] mb-6">
                Get the latest tech news, reviews, and insights delivered to your inbox.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 justify-center max-w-md mx-auto">
                <input
                    type="email"
                    placeholder="Enter your email address"
                    className="input input-bordered w-full bg-[var(--brand-bg)] text-[var(--brand-text)]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" className="btn bg-[var(--brand-primary)] text-white hover:bg-blue-700 border-none shrink-0">
                    Subscribe <Send className="w-4 h-4 ml-1" />
                </button>
            </form>

            {status === "success" && (
                <p className="text-sm text-[var(--brand-accent)] font-medium mt-3">
                    Thanks for subscribing! Check your inbox soon.
                </p>
            )}

            {/* Push Notifications Placeholder */}
            <div className="mt-6 flex justify-center">
                <button
                    type="button"
                    className="btn btn-sm btn-ghost text-[var(--brand-muted)] text-xs"
                    onClick={() => alert("Push Notifications integration to be added.")}
                >
                    Enable Browser Notifications
                </button>
            </div>
        </div>
    );
}
