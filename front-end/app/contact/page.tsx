"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactPage() {
    const [status, setStatus] = useState<"idle" | "success">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const name = (form.elements.namedItem('name') as HTMLInputElement).value;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value;
        const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
            const res = await fetch(`${API_URL}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message })
            });

            if (res.ok) {
                setStatus("success");
                setTimeout(() => setStatus("idle"), 3000);
                form.reset();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container mx-auto px-4 py-16 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--brand-text)] mb-4 text-center">Contact Us</h1>
            <p className="text-center text-[var(--brand-muted)] mb-12">
                Have a story tip, partnership inquiry, or just want to say hello? Drop us a message below.
            </p>

            <div className="bg-[var(--brand-card)] p-8 rounded-2xl shadow-sm border border-[var(--brand-border)]">
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-[var(--brand-text)] font-semibold">Name</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            className="input input-bordered bg-[var(--brand-bg)] text-[var(--brand-text)] w-full"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-[var(--brand-text)] font-semibold">Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email Address"
                            className="input input-bordered bg-[var(--brand-bg)] text-[var(--brand-text)] w-full"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-[var(--brand-text)] font-semibold">Message</span>
                        </label>
                        <textarea
                            name="message"
                            className="textarea textarea-bordered h-32 bg-[var(--brand-bg)] text-[var(--brand-text)] w-full"
                            placeholder="Your Message..."
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="btn w-full bg-[var(--brand-primary)] text-white hover:bg-blue-700 border-none">
                        Send Message <Send className="w-4 h-4 ml-1" />
                    </button>
                </form>

                {status === "success" && (
                    <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg text-center font-medium">
                        Message sent successfully! We will get back to you soon.
                    </div>
                )}
            </div>
        </div>
    );
}
