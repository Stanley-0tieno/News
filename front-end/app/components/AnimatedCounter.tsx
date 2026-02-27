"use client";
import { useEffect, useState, useRef } from "react";

interface AnimatedCounterProps {
    value: number;
    duration?: number;
    suffix?: string;
}

export default function AnimatedCounter({ value, duration = 2000, suffix = "" }: AnimatedCounterProps) {
    const [count, setCount] = useState(0);
    const elementRef = useRef<HTMLSpanElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        });
        if (elementRef.current) {
            observer.observe(elementRef.current);
        }
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        // For very small numbers, increment by 1
        // For large numbers, increment smoothly
        let start = 0;
        const frames = duration / 16;
        const increment = value / frames;

        const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.ceil(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [value, duration, isVisible]);

    return (
        <span ref={elementRef}>
            {count.toLocaleString()}
            {count === value ? suffix : ""}
        </span>
    );
}
